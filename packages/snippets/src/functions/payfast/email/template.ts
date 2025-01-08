export const GenerateHTMLTemplate = ({
  logo,
  title,
  styles,
  header,
  body,
  footer,
}: {
  logo: string;
  title: string;
  styles: string;
  header: string;
  body: string;
  footer: string;
}): string => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${title}</title>
		<meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          <o:AllowPNG />
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <style>
      ${styles}
    </style>
  </head>
  <body>
	<div class="w-full">
		<div class="invoice-width center">
			<div>
				<img src="${logo}" alt="Invoice Logo" class="w-25" />
			</div>
			${header}
			${body}
			${footer}
		</div>
	</div>
  </body>
</html>
`;
export const CommonStyles = (PrimaryColor: string) => `
  body {
				font-family: Arial, Helvetica, sans-serif;
			}
			.w-full {
				width: 100%;
			}
			.invoice-width {
				max-width: 100%;
			}
			@media only screen and (max-width: 801px) {
				.invoice-width {
					width: 90%;
				}
			}
			@media only screen and (min-width: 802px) {
				.invoice-width {
					width: 75%;
				}
			}
			.bold {
				font-weight: 700;
			}
			.text-large {
				font-size: large;
			}
			.text-right {
				text-align: right;
			}
			.center {
				margin: auto;
				width: 50%;
				padding: 10px;
			}
			table {
				table-layout: fixed;
				width: 100%;
				border-collapse: collapse;
				border: 0.5px solid ${PrimaryColor};
			}
			th, td {
				padding: 5px;
			}
			.table-header {
				border-bottom: 2px solid ${PrimaryColor};
			}
			.table-footer {
				border-top: 2px solid ${PrimaryColor};
			}
`;
