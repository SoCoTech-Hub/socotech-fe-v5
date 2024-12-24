import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/api";
import { isPaying, mainUrl } from "@/context/constants";
import invoice from "@/snippets/email/invoice";
import { parseCookies } from "@/snippets/parseCookies";



import { FetchOrganizationLogos } from "@acme/snippets/functions/account/organization";
import { FetchTransactionEventsByPaymentId } from "@acme/snippets/functions/account/transactionEvent";
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

const Invoice = () => {
  const router = useRouter();
  const [transactionEvent, setTransactionEvent] = useState();
  const [organization, setOrganization] = useState();

  const [email, setEmail] = useState(transactionEvent?.email || "");
  const [alert, setAlert] = useState<string>("");
  const date = new Date(transactionEvent?.created_at || Date.now());
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
    const fetchData = async () => {
      const event = await FetchTransactionEventsByPaymentId(uniqueId); //TODO: get uniqueId
      setTransactionEvent(event);
      const org = await FetchOrganizationLogos(organizationId); //TODO: Get organizationId
      setOrganization(org);
    };
    fetchData();
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
        <form className="px-8 pt-6 pb-8 mb-4 rounded-lg shadow-md bg-compBg">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-textColor"
              htmlFor="sender"
            >
              Email invoice to:
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-black border rounded-lg shadow appearance-none focus:shadow-outline focus:outline-none"
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
              className="px-4 py-2 font-bold text-black rounded-full bg-themeColorMain focus:shadow-outline focus:outline-none"
              type="button"
              onClick={handleSendInvoice}
            >
              Send Invoice
            </button>
            <button
              className="px-4 py-2 font-bold bg-blue-500 rounded-full text-textColor focus:shadow-outline hover:bg-blue-700 focus:outline-none"
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

  const event = await FetchTransactionEventsByPaymentId(uniqueId);

  const { organization } = await FetchOrganizationLogos(cookies.organizationId);

  return {
    props: {
      event: event,
      organization,
    },
  };
}

export default Invoice;