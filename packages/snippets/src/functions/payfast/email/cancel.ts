import {
  email,
  LogoDark,
  OrgEmail,
  OrgName,
  orgName,
  OrgUrl,
  OrgVat,
  PrimaryColor,
  uniqueId,
  userName,
} from "../../../context/constants";
import { ZeroPadding } from "../../zeroPadding";
import { CommonStyles, GenerateHTMLTemplate } from "./template";

interface CancelParams {
  addressLine1?: string;
  postalCode?: string;
  company?: string;
  vatNr?: string;
  date: Date;
  id: number;
}

const Cancel = ({
  addressLine1,
  postalCode,
  company,
  vatNr,
  date,
  id,
}: CancelParams): string => {
  const header = `
  <div>
    <div>
      <div class="bold text-large">${OrgName?.toUpperCase()} CANCELLATION</div>
      <div>
        ${userName}
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
  <div>
    <table>
      <tbody>
        <tr>
          <td>
            <span>YOUR SUBSCRIPTION HAS BEEN CANCELLED</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `;

  const footer = `
  <p>
    ${OrgName}
    <br />
    VAT: ${OrgVat}
    <br />
    ${OrgEmail}
    <br />
    ${OrgUrl}
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

export default Cancel;
