import { api } from "../../api/api";

//TODO: Check if constants can be accessed on here
interface CreateInMailParams {
  orgName: string;
  orgId?: number;
  firstName: string;
  profileId: number;
}

export const createInMail = async ({
  orgName,
  orgId,
  firstName,
  profileId,
}: CreateInMailParams): Promise<any> => {
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  const emailBody = `
    Hey there, ${firstName}
    <br/><br/>
    We’re thrilled to have you join our community!<br/><br/>
    As you explore, here’s what you’ll find with your free access:<br/>
    &#128218; <strong>Dashboard:</strong> Easily navigate through your learning resources and stay updated.<br/>
    &#128218; <strong>Blog Content:</strong> Stay informed and inspired with trending topics, tips, and educational insights.<br/>
    &#128218; <strong>Shows:</strong> Enjoy engaging content that makes learning fun and relatable.<br/>
    <br/>
    But why stop there? With ${orgName} Premium, you can take your learning to the next level:<br/>
    &#128218; <strong>Lessons in 11 Subjects:</strong> Dive deep into comprehensive, interactive lessons designed to help you excel.<br/>
    &#128218; <strong>In-Depth Exam Preparation Lessons:</strong> Access lessons taught by expert teachers to help you ace your exams.<br/>
    &#128218; <strong>Digital Library:</strong> Access an extensive collection of study guides, past papers, and more.<br/>
    &#128218; <strong>Bursary Information:</strong> Get the latest on bursary opportunities to support your academic journey.<br/>
    &#128218; <strong>Discussion Forum:</strong> Connect with other students, ask questions, and share ideas in our community forum.<br/>
    <br/>
    When you’re ready, sign up for ${orgName} Premium by following the steps below:<br/>
    Click on the <a href='${process.env.NEXT_PUBLIC_MAIN_URL}/auth/subscribe?from=/inmail'>‘Subscribe’</a> button on the menu.<br/>
    Complete your subscription to access all the new features.<br/>
    <br/>
    If you have any questions or just want to chat, we’re always here at <a href='mailto:info@${orgName}.co.za'>info@${orgName}.co.za</a><br/>
    <br/>
    Welcome to the ${orgName} family!<br/>
    <br/>
    Best regards,<br/>
    The ${orgName} Team
  `;

  try {
    const response = await api.POST("/in-mails", {
      subject: `Welcome to ${orgName}!`,
      body: emailBody,
      draft: false,
      reply: false,
      from: { id: orgId ?? 1 }, // Default orgId to 1 if not provided
      to: { id: profileId },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "An error occurred while creating the in-mail:",
      error?.response || error,
    );
    throw new Error("Failed to create in-mail.");
  }
};

export default createInMail;
