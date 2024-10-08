const cancel = ({
	organizationName,
	organizationPrimaryColor,
	organizationSecondaryColor,
	organizationLogoDarkUrl,
	firstName,
	lastName,
	addressLine1,
	postalCode,
	email,
	company,
	vatNr,
	date,
	mPaymentId: mPaymentId,
	id
}) => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${organizationName} Cancelation</title>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
          .w-full {
            width: 100%;
          }
          .w-half {
            width: 50%;
          }
          .w-10 {
            width: 10%;
          }
          .w-20 {
            width: 20%;
          }
          .w-25 {
            width: 25%;
          }
          .center {
            margin: auto;
            width: 50%;
            padding: 10px;
          }
          .invoice-width {
        max-width: 100%;
      }
      @media only screen and (min-width: 1px) {
        /* For mobile phones: */
        .invoice-width {
          width: 90%;
        }
      }
      @media only screen and (max-width: 801px) {
        /* For mobile phones: */
        .invoice-width {
          width: 90%;
        }
      }
      @media only screen and (min-width: 802px) {
        /* For mobile phones: */
        .invoice-width {
          width: 75%;
        }
      }
      @media only screen and (min-width: 1440) {
        /* For mobile phones: */
        .invoice-width {
          width: 75%;
        }
      }
          .bold {
            font-weight: 700;
          }
          .su-color-primary {
            color: ${organizationPrimaryColor};
          }
          .su-color-secondary {
            color: ${organizationSecondaryColor};
          }
          .mt-3 {
            margin-top: 0.75rem;
          }
          .mb-3 {
            margin-bottom: 1rem;
          }
          .mb-6 {
            margin-bottom: 1.5rem;
          }
          .my-3 {
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
          }
          .pt-tiny {
            padding-top: 0.125rem;
          }
          .text-large {
            font-size: large;
          }
          .text-right {
            text-align: right;
          }
          .text-center {
            text-align: center;
          }
    
          .column {
            float: left;
            width: 50%;
          }
    
          .row:after {
            content: '';
            display: table;
            clear: both;
          }
          table {
            table-layout: fixed;
            width: 100%;
            border-collapse: collapse;
            border: 0.5px solid ${organizationPrimaryColor};
          }
          th,
          td {
            padding: 5px;
          }
          .table-header {
            border-bottom: 2px solid ${organizationPrimaryColor};
          }
          .table-footer {
            border-top: 2px solid ${organizationPrimaryColor};
          }
          .border {
            border-top: 0.5px solid ${organizationPrimaryColor};
          }
        </style>
      </head>
      <body>
        <div class="w-full">
          <div class="invoice-width center">
            <div class="mb-6">
              <img
                src="${organizationLogoDarkUrl}"
                alt="Invoice Logo"
                class="w-25"
              />
            </div>
            <div>
              <div class="row mb-3">
                <div class="column">
                  <div class="bold text-large">
                    ${organizationName.toUpperCase()} CANCELLATION
                  </div>
                  <div class="my-3">
                    ${firstName} ${lastName}
                    ${addressLine1 ? `<br />${addressLine1}` : ''}
                    ${postalCode ? `<br />${postalCode}` : ''}
                    ${email ? `<br />${email}` : ''}
                    ${company ? `<br />${company} ${vatNr ? vatNr : ''}` : ''}
                  </div>
                </div>
                <div class="column text-right mb-3">
                  <div class="bold">Invoice Date:</div>
                  <div>${date.toLocaleDateString()}</div>
                  <div class="bold pt-tiny">Learner Number:</div>
                  <div>${mPaymentId}</div>
                  <div class="bold pt-tiny">Invoice Number:</div>
                  <div>${organizationName
										.substring(0, 3)
										.toUpperCase()} ${zeroPad(id, 7)}</div>
                  <div class="bold pt-tiny">Reference:</div>
                  <div>
                    ${organizationName
											.substring(0, 3)
											.toUpperCase()}-${mPaymentId}-${zeroPad(id, 3)}
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span> YOUR SUBSCRIPTION HAS BEEN CANCELLED</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
            </div>
            <div class="flex-wrap">
              <p class="text-1 leading-tight">
                Just Brands Africa (PTY) Ltd
                <br />
                VAT: 4800270201
                <br />
                info@topic.co.za
                <br />
                www.topic.co.za
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `
export default cancel
