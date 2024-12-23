import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/api";
import { isPaying, mainUrl } from "@/context/constants";
import invoice from "@/snippets/email/invoice";
import getDataRequest from "@/snippets/getDataRequest";
import { parseCookies } from "@/snippets/parseCookies";

import { FetchOrganizationLogos } from "@acme/snippets/functions/account/organization";
import Alert from "@acme/ui/Alert";

interface Transaction {
  email: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  postalCode: string;
  company: string;
  vatNr: string;
  mPaymentId: string;
  item: string;
  description: string;
  amount: number;
}

interface Event {
  id: number;
  created_at: string;
}

interface Organization {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logoDark: { url: string };
}

interface InvoiceProps {
  transaction: Transaction;
  event: Event;
  organization: Organization;
}

const Invoice: React.FC<InvoiceProps> = ({
  transaction,
  event,
  organization,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState(transaction?.email || "");
  const [alert, setAlert] = useState<string>("");
  const date = new Date(event?.created_at || Date.now());
  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    if (!isPaying) {
      router.push(`${mainUrl}/user`);
    }
  }, []);

  const zeroPad = (num: number, places: number): string =>
    String(num).padStart(places, "0");

  const handleSendInvoice = async () => {
    try {
      await api.post(`/email`, {
        from: "info@topic.co.za",
        to: email,
        subject: `${organization.name} Invoice ${organization.name
          .substring(0, 3)
          .toUpperCase()}-${transaction.mPaymentId}-${zeroPad(event.id, 3)}`,
        html: Body,
      });
      setAlert("Email sent successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const Body = invoice({
    organizationName: organization.name,
    organizationPrimaryColor: organization.primaryColor,
    organizationSecondaryColor: organization.secondaryColor,
    organizationLogoDarkUrl: organization.logoDark.url,
    firstName: transaction.firstName,
    lastName: transaction.lastName,
    addressLine1: transaction.addressLine1,
    postalCode: transaction.postalCode,
    company: transaction.company,
    vatNr: transaction.vatNr,
    date: date,
    mPaymentId: transaction.mPaymentId,
    id: event.id,
    item: transaction.item,
    description: transaction.description,
    amount: transaction.amount,
    formatter: formatter,
    zeroPad: zeroPad,
  });

  const InvoiceBodyHTML: React.FC = () => (
    <div
      dangerouslySetInnerHTML={{
        __html: generateInvoiceHTML(
          transaction,
          event,
          organization,
          date,
          zeroPad,
          formatter,
        ),
      }}
    />
  );

  return (
    <>
      <div className="col row">
        <form className="bg-compBg mb-4 rounded-lg px-8 pb-8 pt-6 shadow-md">
          <div className="mb-4">
            <label
              className="text-textColor mb-2 block text-sm font-bold"
              htmlFor="sender"
            >
              Email invoice to:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-black shadow focus:outline-none"
              id="sender"
              name="sender"
              type="email"
              value={email}
              required
              placeholder="Who is this invoice sent to? (required)"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-themeColorMain focus:shadow-outline rounded-full px-4 py-2 font-bold text-black focus:outline-none"
              type="button"
              onClick={handleSendInvoice}
            >
              Send Invoice
            </button>
            <button
              className="text-textColor focus:shadow-outline rounded-full bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700 focus:outline-none"
              type="button"
              onClick={handlePrintInvoice}
            >
              Download Invoice
            </button>
            <Alert success={alert} />
          </div>
        </form>
        <InvoiceBodyHTML />
      </div>
      <div className="print-only" id="section-to-print">
        <div dangerouslySetInnerHTML={{ __html: Body }} />
      </div>
    </>
  );
};

const generateInvoiceHTML = (
  transaction: Transaction,
  event: Event,
  organization: Organization,
  date: Date,
  zeroPad: (num: number, places: number) => string,
  formatter: Intl.NumberFormat,
): string => {
  return `
    <div class="w-full">
      <!-- Invoice body -->
    </div>
  `;
};

export async function getServerSideProps({ req }: { req: any }) {
  const cookies = parseCookies(req);
  const uniqueId = cookies.uniqueId;

  const transaction = await getDataRequest(
    `/transactions?mPaymentId=${uniqueId}`,
    () => {},
  );

  let event: Event[] = [];
  if (transaction.length) {
    event = await getDataRequest(
      `transaction-events?eventId=${transaction[0].id}`,
      () => {},
    );
  }
  const { organization } = await FetchOrganizationLogos(cookies.organizationId);

  return {
    props: {
      transaction: transaction.length ? transaction[0] : {},
      event: event.length ? event.pop() : {},
      organization,
    },
  };
}

export default Invoice;
