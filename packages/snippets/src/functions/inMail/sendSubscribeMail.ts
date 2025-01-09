import { api } from "../../api/api";

interface SendSubscribeMailParams {
  orgName: string;
  profileId: number;
}

export default async function sendSubscribeMail({
  orgName,
  profileId,
}: SendSubscribeMailParams): Promise<any> {
  try {
    const response = await api.POST("/in-mails", {
      subject: `Welcome to ${orgName} Premium!`,
      body: `
        Dear Student,
        <br/><br/>
        Welcome to ${orgName} Premium!<br/>
        As a Premium member, you now have access to:<br/>
        &#128218; <b>Comprehensive Lessons:</b> Explore lessons across 11 subjects tailored to help you excel.<br/>
        &#128218; <b>Exam Preparation In-depth lessons:</b> Learn how to answer exam related questions, expert tips and guidance.<br/>
        &#128218; <b>Digital Library:</b> Utilise our extensive collection of educational resources anytime you need them.<br/>
        <br/>
        <b>Here’s How to Get Started:</b><br/>
        <b>Explore The Menu:</b><br/>
        <b>Lessons:</b> Navigate to the subjects you're studying to access detailed lesson materials and quizzes.<br/>
        <b>Digital Library:</b> Discover a range of additional resources, including past papers and workbooks, designed to support your learning.<br/>
        <b>Bursaries:</b> Visit the Bursaries tab to find valuable information on funding opportunities for your studies.<br/>
        <b>Discussion Forum:</b> Connect with other students, ask questions and share ideas in our community forum.<br/>
        <b>Need Assistance?</b><br/>
        If you have any questions or need support, our team is here to help. Feel free to reach out to us at <a href='mailto:info@${orgName}.co.za'>info@${orgName}.co.za</a> or contact us on WhatsApp on <a href='https://wa.me/27799196543'>0799196543</a>.<br/>
        <br/>
        Thank you for choosing ${orgName} Premium. <br/>
        <br/>
        Best regards,<br/>
        The ${orgName} Team
      `,
      draft: false,
      reply: false,
      from: { id: 1 },
      to: { id: profileId },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "An error occurred while sending the subscription mail:",
      error,
    );
    throw error.response || error;
  }
}
