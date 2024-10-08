import React from 'react'
import SubjectLine from '@/components/InMailSubjectLine'
import FromLine from '@/components/InMailFromLine'
import HTMLMessage from '@/components/InMailMessage'
import Attachments from '@/components/InMailAttachments'
import TextEditor from '@/components/InMailReplyBox'
// import { ComponentBg } from "@/context/constants"

const index = ({ mail, profileID }) => {
	return (
		<div>
			<div
				className={`desktop:p-4 laptop:p-4 mobile:p-1   rounded-lg shadow-card bg-compBg text-textColor`}
			>
				<SubjectLine subject={mail.subject} />
				<FromLine mail={mail} />
				<HTMLMessage body={mail?.body} />
				{mail.attachments && <Attachments attachments={mail.attachments} />}
				{mail.reply ? <TextEditor mail={mail} /> : <></>}
			</div>
		</div>
	)
}

export default index
