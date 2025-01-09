import formData from "form-data";
import Mailgun from "mailgun.js";

const privateApiKey = process.env.NEXT_PUBLIC_MAIL_KEY;

interface ValidateEmailResponse {
  error?: string;
  result?: "deliverable" | "undeliverable" | string;
}

export default async function validateEmail({
  email,
}: {
  email: string;
}): Promise<boolean | ValidateEmailResponse> {
  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Check email format
  if (!emailRegExp.test(email)) {
    return { error: "You have entered an invalid email address" };
  }

  // Check if the API key is available
  if (!privateApiKey) {
    console.warn("Mailgun API key is missing, skipping email validation.");
    return true; // Assume valid if the key is missing
  }

  try {
    // Initialize Mailgun client
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({
      username: "api",
      key: privateApiKey,
    });

    // Validate email with Mailgun
    const validationRes = await client.validate.get(email);

    if (validationRes.result === "deliverable") {
      return true;
    } else {
      return { error: validationRes.reason };
    }
  } catch (error: any) {
    console.error("Error validating email:", error.message, ":", error.details);
    return { error: "An error occurred while validating the email address" };
  }
}
