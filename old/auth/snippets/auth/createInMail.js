import publicapi from '@/api/publicapi'

const CreateInMail = async ({ orgName, orgId, firstName, profileId }) => {
	const registerEmail = await publicapi.post(`/in-mails`, {
		subject: `Welcome to ${orgName}!`,
		body: `Hey there, ${firstName}
      <br/><br/>
      We’re thrilled to have you join our community!<br/><br/>
			As you explore, here’s what you’ll find with your free access:<br/>
			&#128218; Dashboard: Easily navigate through your learning resources and stay updated.<br/>
			&#128218; Blog Content: Stay informed and inspired with trending topics, tips and educational insights.<br/>
			&#128218; Shows: Enjoy engaging content that makes learning fun and relatable.<br/>
			<br/>
			But why stop there? With ${orgName} Premium, you can take your learning to the next level:<br/>
			&#128218; Lessons in 11 Subjects: Dive deep into comprehensive, interactive lessons designed to help you excel.<br/>
			&#128218; In-Depth Exam Preparation Lessons: Access in-depth lessons taught by expert teachers to help you ace your exams. <br/>
			&#128218; Digital Library: Access an extensive collection of study guides, past papers and more.<br/>
			&#128218; Bursary Information: Get the latest on bursary opportunities to support your academic journey.<br/>
			&#128218; Discussion Forum: Connect with other students, ask questions and share ideas in our community forum.<br/>
			<br/>
			When you’re ready, sign up for ${orgName} Premium by following the steps below: <br/>
			Click on the <a href='${process.env.NEXT_PUBLIC_MAIN_URL}/auth/subscribe?from=/inmail'>‘Subscribe’</a> button on the menu. <br/>
			Complete your subscription to access all the new features.<br/>
			<br/>
			If you have any questions or just want to chat, we’re always here at <a href='mailto:info@${orgName}.co.za'>info@${orgName}.co.za</a><br/>
			<br/>
			Welcome to the ${orgName} family!<br/>
			<br/>
			Best regards,<br/>
			The ${orgName} Team<br/>
      `,
		draft: false,
		reply: false,
		from: { id: orgId ? orgId : 1 },
		to: { id: profileId }
	})
	return registerEmail.data
}
export default CreateInMail
