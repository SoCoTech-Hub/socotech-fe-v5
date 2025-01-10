interface UserNotFoundEmailParams {
  organizationName: string;
  organizationPrimaryColor: string;
  firstName: string;
}

const userNotFoundEmail = ({
  organizationName,
  organizationPrimaryColor,
  firstName,
}: UserNotFoundEmailParams): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${organizationName} Subscription</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .content {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: ${organizationPrimaryColor};
            color: white;
            padding: 10px;
            font-size: 24px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
          .body {
            margin-top: 20px;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="content">
          <div class="header">${organizationName} Subscription</div>
          <div class="body">
            <p>Dear ${firstName},</p>
            <p>Thank you for subscribing to ${organizationName}. Unfortunately, we were unable to find your user details in our system.</p>
            <p>Please contact our support team to resolve this issue.</p>
            <p>Thank you!</p>
          </div>
          <div class="footer">The ${organizationName} Team</div>
        </div>
      </body>
    </html>
  `;
};

export default userNotFoundEmail;
