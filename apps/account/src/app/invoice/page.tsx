import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ApiTransactionEventTransactionEvent } from "@acme/api/graphql";
import { api } from "@acme/snippets/api/api";
import { isPaying, mainUrl, uniqueId } from "@acme/snippets/context/constants";
import { FetchOrganizationLogos } from "@acme/snippets/functions/account/organization";
import { FetchTransactionEventsByPaymentId } from "@acme/snippets/functions/account/transactionEvent";
import invoice from "@acme/snippets/functions/payfast/email/invoice";
import { PopupAlert } from "@acme/ui";

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

const Invoice = () => {
  const router = useRouter();
  const [transactionEvent, setTransactionEvent] =
    useState<ApiTransactionEventTransactionEvent | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);

  const [email, setEmail] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const date = new Date(transactionEvent?.attributes?.createdAt || Date.now());
  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    if (!isPaying) {
      router.push(`${mainUrl}/user`);
      return;
    }

    const fetchData = async () => {
      try {
        const events = await FetchTransactionEventsByPaymentId(uniqueId || "");
        if (events.length > 0) {
          const firstEvent = events[0];
          setTransactionEvent(firstEvent);

          // Assuming `transaction` holds the email in some way
          const emailFromTransaction = firstEvent.attributes?.transaction; // Update this logic as needed
          if (emailFromTransaction) setEmail(emailFromTransaction);
        }

        const org = await FetchOrganizationLogos();
        if (org?.organization) {
          // Transform to match the `Organization` type
          const transformedOrganization: Organization = {
            name: org.organization.name || "Default Organization Name",
            primaryColor: "#000000", // Default primary color
            secondaryColor: "#FFFFFF", // Default secondary color
            logoDark: org.organization.logoDark || { url: "" },
          };
          setOrganization(transformedOrganization);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const zeroPad = (num: number, places: number): string =>
    String(num).padStart(places, "0");

  const handleSendInvoice = async () => {
    try {
      if (!transactionEvent || !organization) {
        throw new Error("Missing transaction event or organization data.");
      }

      // Extract transaction details
      const { attributes } = transactionEvent;
      if (!attributes) {
        throw new Error("Transaction attributes are missing.");
      }

      await api.POST(`/email`, {
        from: "info@topic.co.za",
        to: email,
        subject: `${organization.name} Invoice ${organization.name
          ?.substring(0, 3)
          .toUpperCase()}-${attributes.paymentId}-${zeroPad(Number(transactionEvent.id), 3)}`,
        html: Body,
      });
      setAlert("Email sent successfully.");
    } catch (error: any) {
      console.error(error);
      setAlert(error.message || "An error occurred while sending the email.");
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (!organization || !transactionEvent) {
    throw new Error("Organization or transaction event data is missing.");
  }
  //TODO:find right types
  const Body = invoice({
    OrgName: organization?.name || "Organization Name Missing", // Handle missing organization name
    orgName: organization?.name || "Org Name Missing", // Short organization name
    orgEmail: "", // Must be fetched or provided
    orgUrl: "", // Must be fetched or provided
    orgVat: "", // Must be fetched or provided
    PrimaryColor: organization?.primaryColor || "#FFFFFF", // Default primary color if missing
    LogoDark: organization?.logoDark?.url || "", // Default empty string for missing logo
    firstName: "", // Placeholder as firstName is not in the current structure
    lastName: "", // Placeholder as lastName is not in the current structure
    addressLine1: "", // Placeholder
    postalCode: "", // Placeholder
    company: "", // Placeholder
    vatNr: "", // Placeholder
    email: email || "", // Email from state
    date, // The date object
    uniqueId: transactionEvent.id || "0", // Use the transaction event ID
    id: Number(transactionEvent.id) || 0, // Ensure ID is a number for ZeroPadding
    item: transactionEvent.attributes?.item || "Unknown Item", // Default fallback
    description: transactionEvent.attributes?.description || "No description", // Default fallback
    amount: Number(transactionEvent.attributes?.amountNet) || 0, // Ensure amount is numeric
    formatter, // Currency formatter
  });
  //TODO:fix this
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
            <PopupAlert message={alert} variant={"success"} visible={!!alert} />
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
  //TODO: Fix this
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

// export async function getServerSideProps({ req }: { req: any }) { //TODO: Fix this
//   const cookies = parseCookies(req);
//   const uniqueId = cookies.uniqueId;

//   const event = await FetchTransactionEventsByPaymentId(uniqueId);

//   const { organization } = await FetchOrganizationLogos();

//   return {
//     props: {
//       event: event,
//       organization,
//     },
//   };
// }

export default Invoice;
