const userNotFoundEmail = ({
	organizationName,
	organizationPrimaryColor,
	firstName
}) => `
          <!DOCTYPE html><html lang="en"><head><title>${organizationName} Subscription</title><meta charset="utf-8" /><meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <style>
              body {font-family: Arial, Helvetica, sans-serif;}
              .content {max-width: 600px;margin: auto;padding: 20px;text-align: center;background-color: #f4f4f4;border-radius: 5px;}
              .header {background-color: ${organizationPrimaryColor};color: white;padding: 10px;font-size: 24px;border-top-left-radius: 5px;border-top-right-radius: 5px;}
              .body {margin-top: 20px;font-size: 16px;}
              .footer {margin-top: 20px;font-size: 12px;color: #888;}
            </style>
          </head><body>
            <div class="content"><div class="header">${organizationName} Subscription</div>
              <div class="body">
                <p>Dear ${firstName},</p>
                <p>Thank you for subscribing to ${organizationName}. Unfortunately, we were unable to find your user details in our system.</p>
                <p>Please contact our support team to resolve this issue.</p><p>Thank you!</p></div>
              <div class="footer">The ${organizationName} Team</div></div></body>
          </html>
        `
export default userNotFoundEmail
