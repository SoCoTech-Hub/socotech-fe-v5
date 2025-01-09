import { api } from "../../api/api";
import {
  firstName,
  lastName,
  LogoDark,
  OrgEmail,
  orgName,
  PrimaryColor,
  uniqueId,
} from "../../context/constants";
import Invoice from "../payfast/email/invoice";

interface InvoiceDetails {
  addressLine1: string;
  postalCode: string;
  company?: string;
  vatNr?: string;
  email: string;
  date: Date;
  id: number;
  item: string;
  description: string;
  amount: number;
  formatter: Intl.NumberFormat;
  mPaymentId: string;
  eventId: number;
}

export const HandleSendInvoice = async (
  details: InvoiceDetails,
): Promise<string> => {
  const {
    addressLine1,
    postalCode,
    company,
    vatNr,
    email,
    date,
    id,
    item,
    description,
    amount,
    formatter,
    mPaymentId,
    eventId,
  } = details;

  try {
    // Generate invoice body using the provided details
    const invoiceBody = Invoice({
      PrimaryColor,
      LogoDark: LogoDark || "",
      firstName: firstName || "",
      lastName,
      addressLine1,
      postalCode,
      company,
      vatNr,
      email,
      date,
      uniqueId: uniqueId || "",
      id,
      item,
      description,
      amount,
      formatter,
    });

    // Prepare email subject
    const subject = `${orgName} Invoice ${orgName?.substring(0, 3).toUpperCase()}-${mPaymentId}-${String(
      eventId,
    ).padStart(3, "0")}`;

    // Send the invoice email
    await api.POST(`/email`, {
      from: OrgEmail,
      to: email,
      subject,
      html: invoiceBody,
    });

    return "Invoice email sent successfully.";
  } catch (error) {
    console.error("Failed to send invoice email:", error);

    // Return a more meaningful error message
    if (error instanceof Error) {
      return `Failed to send invoice email: ${error.message}`;
    }
    return "An unknown error occurred while sending the invoice email.";
  }
};
