import { NextApiRequest, NextApiResponse } from "next";

import {
  OrgEmail,
  orgName,
  OrgName,
  OrgUrl,
  OrgVat,
  testmode,
} from "../context/constants";
import Cancel from "../functions/payfast/email/cancel";
import Invoice from "../functions/payfast/email/invoice";
import { FetchOrganization } from "../functions/payfast/fetchOrganization";
import { FetchTransactionDetail } from "../functions/payfast/fetchTransactionDetail";
import { FetchTransactionEventDetail } from "../functions/payfast/fetchTransactionEventDetail";
import { FetchUserProfileId } from "../functions/payfast/fetchUserDetail";
import userNotFoundEmail from "../functions/payfast/userNotFoundEmail";
import {
  buildPfParamString,
  validatePfIp,
  validatePfPaymentData,
  validatePfServerConfirmation,
  validatePfSignature,
} from "../functions/payfast/validations";
import { api } from "./api";

// Define reusable interfaces for expected data
interface PayFastRequestBody {
  m_payment_id: string;
  item_name: string;
  payment_status: "COMPLETE" | "CANCELLED";
  pf_payment_id: string;
  amount_gross: string;
  amount_fee: string;
  amount_net: string;
  billing_date: string;
  token: string;
}

interface TransactionDetail {
  id: string;
  orgId: string;
  firstName: string;
  lastName: string;
  email: string;
  mPaymentId: string;
  addressLine1?: string;
  postalCode?: string;
  company?: string;
  vatNr?: string;
  amount: number;
  item: string;
  description: string;
}

interface Organization {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logoDark: { url: string };
}

interface TransactionEvent {
  id: string;
  eventId: string;
  type: string;
  billingDate: string;
  amountGross: string;
  amountFee: string;
  amountNet: string;
  paymentId: string;
  testmode: boolean | string;
}

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
} as const;

type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

const getPfHost = (): string =>
  process.env.NEXT_PUBLIC_TEST === "true"
    ? "sandbox.payfast.co.za"
    : "www.payfast.co.za";

const handleError = (
  res: NextApiResponse,
  error: unknown,
  status: HttpStatusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  context?: Record<string, unknown>,
) => {
  console.error("Error Context:", context);
  console.error("Error Details:", error);
  res
    .status(status)
    .json({ error: error instanceof Error ? error.message : "Unknown error" });
};

const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  retries = 3,
): Promise<void> => {
  try {
    await api.POST("/email", {
      to,
      from: "no-reply@socotech.co.za",
      subject,
      html: body,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    if (retries > 0) {
      console.log(`Retrying email (${3 - retries + 1}/3)...`);
      await sendEmail(to, subject, body, retries - 1);
    } else {
      console.error("Email retries exhausted.");
    }
  }
};

const handleCompletePayment = async (
  pfData: PayFastRequestBody,
  transactionDetail: TransactionDetail,
  organization: Organization,
  formatter: Intl.NumberFormat,
  date: Date,
  res: NextApiResponse,
): Promise<void> => {
  const userDetail = await FetchUserProfileId(pfData.m_payment_id);

  if (!userDetail) {
    const emailBody = userNotFoundEmail({
      firstName: transactionDetail.firstName,
      organizationName: organization.name,
      organizationPrimaryColor: organization.primaryColor,
    });
    await sendEmail(
      transactionDetail.email,
      `${organization.name} Subscription Issue`,
      emailBody,
    );
  } else {
    const nextPayDate = new Date();
    nextPayDate.setMonth(nextPayDate.getMonth() + 1);

    await api.PUT(`/profiles/${userDetail.id}`, {
      isPaying: true,
      isPayingDate: nextPayDate.toISOString(),
    });
  }

  await api.PUT(`/transactions/${transactionDetail.id}`, {
    notes: userDetail ? "" : "User Detail Not Found",
    signature: pfData.token,
  });

  const transactionEventDetail = await FetchTransactionEventDetail(
    transactionDetail.id,
    pfData.pf_payment_id,
  );

  const transactionEventPayload: TransactionEvent = {
    id: transactionEventDetail.id,
    eventId: transactionDetail.id,
    type: pfData.payment_status,
    billingDate: pfData.billing_date,
    amountGross: pfData.amount_gross,
    amountFee: pfData.amount_fee,
    amountNet: pfData.amount_net,
    paymentId: pfData.pf_payment_id,
    testmode: !!testmode || "false",
  };

  if (transactionEventDetail?.id) {
    await api.PUT(
      `/transaction-events/${transactionEventDetail.id}`,
      transactionEventPayload,
    );
  } else {
    const transactionEvent = await api.POST(
      "/transaction-events",
      transactionEventPayload,
    );

    const invoiceBody = Invoice({
      organizationName: organization.name,
      OrgName: OrgName || "Just Brands (PTY) Ltd.",
      orgName: orgName || "TOPIC",
      orgEmail: OrgEmail || "info@topic.co.za",
      orgUrl: OrgUrl || "https://topic.co.za",
      orgVat: OrgVat || "4800270201",
      PrimaryColor: organization.primaryColor,
      LogoDark: organization.logoDark.url,
      firstName: transactionDetail.firstName,
      lastName: transactionDetail.lastName,
      addressLine1: transactionDetail.addressLine1,
      postalCode: transactionDetail.postalCode,
      company: transactionDetail.company,
      vatNr: transactionDetail.vatNr,
      email: transactionDetail.email,
      date: date,
      uniqueId: transactionDetail.mPaymentId,
      id: transactionEvent.data.id,
      item: transactionDetail.item,
      description: transactionDetail.description,
      amount: transactionDetail.amount,
      formatter,
    });

    await sendEmail(
      transactionDetail.email,
      `${organization.name} Invoice`,
      invoiceBody,
    );
  }

  res.status(HTTP_STATUS.OK).json({});
};

const handleCancelledPayment = async (
  pfData: PayFastRequestBody,
  transactionDetail: TransactionDetail,
  date: Date,
  res: NextApiResponse,
): Promise<void> => {
  const transactionEvent = await api.POST("/transaction-events", {
    eventId: `${transactionDetail.id}`,
    type: pfData.payment_status,
    billingDate: pfData.billing_date,
    amountGross: pfData.amount_gross,
    amountFee: pfData.amount_fee,
    amountNet: pfData.amount_net,
    paymentId: pfData.pf_payment_id,
    testmode: process.env.NEXT_PUBLIC_TEST,
  });

  const cancelBody = Cancel({
    addressLine1: transactionDetail.addressLine1,
    postalCode: transactionDetail.postalCode,
    company: transactionDetail.company,
    vatNr: transactionDetail.vatNr,
    date: date,
    id: transactionEvent.data.id,
  });

  await api.PUT(`/transactions/${transactionDetail.id}`, {
    notes: `Payment Status: ${pfData.payment_status}`,
    signature: pfData.token,
  });

  await sendEmail(
    transactionDetail.email,
    `${transactionDetail.company} Cancellation`,
    cancelBody,
  );

  res.status(HTTP_STATUS.OK).json({});
};

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { body }: { body: PayFastRequestBody } = req;

    const transformedBody: Record<string, string> = Object.keys(body).reduce(
      (acc, key) => {
        acc[key] = String(body[key as keyof PayFastRequestBody]); // Convert all values to strings
        return acc;
      },
      {} as Record<string, string>,
    );

    const pfHost = getPfHost();
    const pfParamString = buildPfParamString(transformedBody);

    const transactionDetail = await FetchTransactionDetail(
      body.m_payment_id,
      body.item_name,
    );
    if (!transactionDetail) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Transaction not found" });
    }

    const { organization } = await FetchOrganization(transactionDetail.orgId);
    if (!organization) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Organization not found" });
    }

    const validations = await Promise.all([
      validatePfSignature(transformedBody, pfParamString),
      validatePfIp(req),
      validatePfPaymentData(transactionDetail.amount, transformedBody),
      validatePfServerConfirmation(pfHost, pfParamString),
    ]);

    if (validations.includes(false)) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Validation failed" });
    }

    const date = new Date();
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    });

    const transactionDetailConverted: TransactionDetail = {
      ...transactionDetail,
      amount: parseFloat(transactionDetail.amount),
    };
    if (body.payment_status === "COMPLETE") {
      await handleCompletePayment(
        body,
        transactionDetailConverted,
        organization,
        formatter,
        date,
        res,
      );
    } else {
      await handleCancelledPayment(body, transactionDetailConverted, date, res);
    }
  } catch (error) {
    handleError(res, error);
  }
}
