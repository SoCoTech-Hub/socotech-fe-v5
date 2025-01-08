import { ZeroPadding } from "../../zeroPadding";
import { CommonStyles, GenerateHTMLTemplate } from "./template";

interface InvoiceParams {
  organizationName: string;
  OrgName: string;
  orgName: string;
  orgEmail: string;
  orgUrl: string;
  orgVat: string;
  PrimaryColor: string;
  LogoDark: string;
  firstName: string;
  lastName: string;
  addressLine1?: string;
  postalCode?: string;
  company?: string;
  vatNr?: string;
  email: string;
  date: Date;
  uniqueId: string;
  id: number;
  item: string;
  description: string;
  amount: number;
  formatter: Intl.NumberFormat;
}

const Invoice = ({
  OrgName,
  orgName,
  orgEmail,
  orgUrl,
  orgVat,
  PrimaryColor,
  LogoDark,
  firstName,
  lastName,
  addressLine1,
  postalCode,
  company,
  vatNr,
  email,
  date,
  uniqueId,
  id,
  item,
  description,
  amount,
  formatter,
}: InvoiceParams): string => {
  const header = `
  <div>
      <div>
        <div class="bold text-large">${orgName?.toUpperCase()} INVOICE</div>
        <div>
          ${firstName} ${lastName}
          ${addressLine1 ? `<br />${addressLine1}` : ""}
          ${postalCode ? `<br />${postalCode}` : ""}
          ${email ? `<br />${email}` : ""}
          ${company ? `<br />${company} ${vatNr ? vatNr : ""}` : ""}
        </div>
      </div>
      <div class="text-right">
        <div class="bold">Invoice Date:</div>
        <div>${date.toLocaleDateString()}</div>
        <div class="bold">Learner Number:</div>
        <div>${uniqueId}</div>
        <div class="bold">Invoice Number:</div>
        <div>${orgName?.substring(0, 3).toUpperCase()} ${ZeroPadding(id, 7)}</div>
        <div class="bold">Reference:</div>
        <div>${orgName?.substring(0, 3).toUpperCase()}-${uniqueId}-${ZeroPadding(id, 3)}</div>
      </div>
    </div>
  `;
  const body = `
  <table>
    <thead class="table-header">
      <tr>
        <td><strong>Item</strong></td>
        <td class="text-center"><strong>Description</strong></td>
        <td class="text-center"><strong>Quantity</strong></td>
        <td class="text-center"><strong>Unit Price</strong></td>
        <td class="text-center"><strong>VAT</strong></td>
        <td class="text-right"><strong>Amount</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${item}</td>
        <td>${description}</td>
        <td class="text-center">1</td>
        <td class="text-center">${formatter.format(amount * 0.85)}</td>
        <td class="text-center">15%</td>
        <td class="text-right">${formatter.format(amount)}</td>
      </tr>
    </tbody>
    <tfoot class="table-footer">
      <tr>
        <td colspan="5" class="text-right"><strong>VAT Total:</strong></td>
        <td class="text-right">${formatter.format(amount * 0.15)}</td>
      </tr>
      <tr class="border">
        <td colspan="5" class="text-right"><strong>Total:</strong></td>
        <td class="text-right">${formatter.format(amount)}</td>
      </tr>
    </tfoot>
  </table>
  `;
  const footer = `
    <p>
      ${OrgName}
      <br />
      VAT: ${orgVat}
      <br />
      ${orgEmail}
      <br />
      ${orgUrl}
    </p>
    `;
  return GenerateHTMLTemplate({
    logo: LogoDark || "",
    title: `${orgName} Invoice`,
    styles: CommonStyles(PrimaryColor || "#f4f4f4"),
    header,
    body,
    footer,
  });
};

export default Invoice;
