import { useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useTour } from "@reactour/tour"
import InMailMenu from '@/components/InMailMenu'
import InMailOpenMessage from '@/components/InMailOpenMessage'
import OpenMessageTopMenu from '@/components/OpenMessageTopMenu'
import { profileId } from '@/context/constants'
import client from '@/api/apolloClient'
import InMailSingle from 'graphql/queries/InMailSingle'
import InMailPaths from 'graphql/queries/InMailPaths'
import InMailSetRead from 'graphql/mutations/InMailSetRead'
import { useMutation, useQuery } from '@apollo/client'
import InMailResponseID from 'graphql/queries/InMailResponseID'
import DigilibLoad from '@/components/DigilibLoad'
import InMailSetDeleted from 'graphql/mutations/InMailSetDeleted'
import Custom404 from './404'
import GetInMailUnreadChips from 'graphql/queries/GetInMailUnreadChips'
import { SEO } from '@/components/SeoHead'

export default function openMessage({ mail }) {
	// const { setIsOpen, ...rest } = useTour()
	let fromArray = [mail.from]
	let mailRecipients = fromArray
		.concat(mail.to, mail.cc, mail.bcc)
		.findIndex((user) => user.id === profileId)
	const { data, loading, error } = useQuery(InMailResponseID, {
		variables: {
			id: profileId,
			mailID: mail.id
		}
	})
	const [setInMailRead] = useMutation(InMailSetRead)
	const [setInMailDeleted] = useMutation(InMailSetDeleted, {
		onCompleted(data) {
			if (data) router.push({ pathname: '/', query: { title: 'Inbox' } })
		}
	})

	const router = useRouter()

	useEffect(() => {
		if (data?.mailResponses[0]?.id) {
			setInMailRead({
				variables: { id: data.mailResponses[0].id, read: true },
				refetchQueries: [
					{ query: GetInMailUnreadChips, variables: { id: profileId } }
				]
			})
		}
	}, [data])

	if (mailRecipients === -1) {
		return Custom404()
	}

	if (loading) {
		return (
			<>
				<DigilibLoad loading={loading} />
			</>
		)
	}

	if (error) {
		console.error(error)
		return null
	}

	const setTrash = () => {
		if (data.mailResponses[0].deleted) {
			setInMailDeleted({
				variables: { id: data.mailResponses[0].id, deleted: false }
			})
		} else {
			setInMailDeleted({
				variables: { id: data.mailResponses[0].id, deleted: true }
			})
		}
	}

	const seo = {
		title: mail?.subject ? mail?.subject : 'Untitled Subject',
		description: 'Inbox'
	}

	return (
		<>
			<SEO
				description={seo.description}
				title={seo.title}
			/>
			<div className='row'>
				<div className='desktop:w-1/4 laptop:w-1/4 mobile:hidden'>
					<InMailMenu />
				</div>
				<div className='desktop:w-3/4 laptop:w-3/4 mobile:w-full'>
					<OpenMessageTopMenu
						sendToTrash={setTrash}
						trash={data?.mailResponses[0]?.deleted}
					/>
					<div className='h-screen overflow-scroll no-scrolly'>
						<InMailOpenMessage mail={mail} />
					</div>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps({ params }) {
	const { data } = await client.query({
		query: InMailSingle,
		variables: { id: params.id },
		fetchPolicy: 'network-only'
	})

	return {
		props: {
			mail: data.inMails[0]
		}
	}
}
