import Cookies from "js-cookie";

import { api } from "../api/api";
import { domain } from "../context/constants";

interface RegisterUserProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  uniqueId: string;
  organizationId?: number;
  refId?: string;
}

const registerUser = async ({
  first_name,
  last_name,
  email,
  password,
  uniqueId,
  organizationId = 1,
  refId,
}: RegisterUserProps): Promise<any> => {
  // Prevent function execution on the server
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Create profile
    const profileResponse = await api.POST("/profiles", {
      firstName: first_name,
      lastName: last_name,
      organization: { id: organizationId },
      uniqueId: uniqueId,
      isPaying: true,
      referral: refId ? { id: refId } : null,
    });

    const profile = profileResponse.data;

    // Register user
    const registerResponse = await api.POST("/auth/local/register", {
      username: email,
      email: email,
      password: password,
      profile: { id: profile.id },
      blocked: false,
    });

    if (!registerResponse) {
      return registerResponse;
    }

    const userData = registerResponse.data;

    // Send welcome email
    const emailResponse = await api.POST("/in-mails", {
      subject: "Welcome message",
      body: `
        Hi ${first_name},
        <br/><br/>
        Welcome to ${profile.organization.name}. We hope you're ready to start changing the way you study for the better!
        <br/><br/>
        To get started, you can head to the Dashboard page and take a tour of the system. You can also visit your Profile page to make sure we have all of your information.
        <br/><br/>
        If you have any questions, head over to our Support page and create a ticket. Our agents are always ready to assist you.
        <br/><br/>
        We hope you enjoy your experience on ${profile.organization.name}.
        <br/><br/>
        All the best with your studies,
        <br/><br/>
        The ${profile.organization.name} Team
      `,
      draft: false,
      reply: false,
      from: { id: 1 },
      to: { id: userData.user.profile.id },
    });

    if (!emailResponse) {
      return emailResponse;
    }

    // Set user email in cookies
    Cookies.set("email", userData.user.email, {
      expires: 180,
      domain: domain,
      secure: true,
    });

    return profile;
  } catch (error: any) {
    return error.response || error;
  }
};

export default registerUser;
