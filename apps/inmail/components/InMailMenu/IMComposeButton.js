import React, { useEffect, useState } from 'react'
// import ControlPointIcon from "@mui/icons-material/ControlPoint"
import ComposeMail from '@/components/InMailCompose'
import { useQuery } from '@apollo/client'
import { organizationId } from '@/context/constants'
import DigilibLoad from '@/components/DigilibLoad'
import InMailEmailList from 'graphql/queries/InMailEmailList'
import InMailSingleDraft from 'graphql/queries/InMailSingleDraft'
import InMailModal from '@/components/InMailModal'

const IMComposeButton = ({
	disabled = true,
	name = 'Compose',
	bgColor = 'bg-themeColorMain',
	textColor = 'text-textColor',
	agentEmail,
	userid,
	mailID,
	draft,
	sentMails,
	refetchMails,
	width = 'w-full',
	query
}) => {
	const [open, setOpen] = useState(false)
	const [validEmailList, setValidEmailList] = useState([])
	// const [validTo, setValidTo] = useState([])
	// const [validCC, setValidCC] = useState([])
	// const [validBCC, setValidBCC] = useState([])

	const { data, error, loading } = useQuery(InMailEmailList, {
		variables: {
			orgID: parseInt(organizationId)
		}
	})

	useEffect(async () => {
		if (data) {
			let list = data.users.map((profile) => ({
				id: profile?.profile?.id,
				uniqueId: profile?.profile?.uniqueId,
				email: profile?.email
			}))
			setValidEmailList(list)
		}
	}, [data])

	const {
		data: dataD,
		loading: loadingD,
		error: errorD
	} = useQuery(InMailSingleDraft, {
		variables: {
			inMailID: mailID
		},
		skip: !draft
	})

	if (loading || loadingD) {
		return (
			<div className='flex justify-center'>
				<DigilibLoad />
			</div>
		)
	}

	if (error || errorD) {
		console.error(error)
		return null
	}

	return (
		!disabled && (
			<>
				<div
					className='cursor-pointer'
					onClick={() => setOpen(!open)}
				>
					<div className={`${width} p-2 rounded-full ${bgColor}`}>
						<div className='flex flex-row items-center justify-center align-middle'>
							{/* <ControlPointIcon className="mr-2 text-white" /> */}
							<div className={`${textColor}`}>{name}</div>
						</div>
					</div>
				</div>
				<InMailModal open={open}>
					<ComposeMail
						setShowModal={setOpen}
						showModal={open}
						userid={parseInt(userid)}
						agentEmail={agentEmail}
						draftMail={dataD?.inMails[0]}
						draftSubject={dataD?.inMails[0].subject}
						draftBody={dataD?.inMails[0].body}
						// draftTo={validTo}
						// draftCC={validCC}
						// draftBCC={validBCC}
						// draftAttachments={dataD?.inMails[0].attachments}
						validEmailList={validEmailList}
						refetchMails={refetchMails}
						handleSentMail={sentMails}
						query={query}
					/>
				</InMailModal>
			</>
		)
	)
}

IMComposeButton.displayName = 'IMComposeButton'

export default IMComposeButton
