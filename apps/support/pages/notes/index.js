import { useEffect, useState } from 'react'
import Head from 'next/head'
import UserCover from '@/components/UserCover'
import NotesSearch from '@/components/NotesSearch'
import NotesTable from '@/components/NotesTable'
// import Link from "next/link"
import { parseCookies } from '@/snippets/parseCookies'
import getGQLRequest from '@/snippets/getGQLRequest'
//import { useRouter } from "next/router"
import BtnBig from '@/components/BtnBig'
import Btn from '@/components/Btn'
import MobileNotesTable from '@/components/MobileNotesTable'

const notes = ({ profileId }) => {
	//const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [noteList, setNoteList] = useState(null)
	const [initialNotes, setInitialNotes] = useState([])

	useEffect(async () => {
		getNotes()
	}, [])

	const getNotes = async () => {
		let initialNotes = await getGQLRequest({
			endpoint: `notes`,
			stateSetter: setNoteList,
			where: `profile:{id:${profileId}}`,
			fields: `id,name,subject{id,name},read,note,created_at`,
			sort: `id:desc`
		})
		setInitialNotes(initialNotes.notes)
	}

	const refetchNotes = async () => {
		getNotes()
		// router.reload()
	}

	const setDelete = async (id) => {
		setIsOpen(!isOpen)
		setDeleteId(id)
	}
const seo = {
	title: 'Topic - Support Notes Home Page',
	description: 'Explore Topic Support Notes!',
	image: 'https://lms.topic.co.za/support/logo.png',
	url: 'https://topic.co.za'
}
	return (
		<div className='desktop:mb-4 laptop:mb-4 mobile:mb-10 col row'>
			<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>
				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>
			<div className='space-y-10 desktop:gx-5 desktop:gy-4 mobile:space-y-3'>
				<div>
					<UserCover />
				</div>
				<div className=''>
					<div className='mobile:hidden'>
						<BtnBig
							label='New Note'
							link='/notes/createnote'
							color='bg-themeColorMain text-black'
						/>
					</div>
					<div className='desktop:hidden laptop:hidden'>
						<Btn
							label='New Note'
							link='/notes/createnote'
							color='bg-themeColorMain'
						/>
					</div>
				</div>
				{/* <Link href="/notes/createnote" passHref>
          <div className="w-64 px-6 py-3 text-lg font-bold text-center text-white rounded-full cursor-pointer bg-themeColorMain">
            New Note
          </div>
        </Link> */}
				<div className='px-4 pt-3 pb-4 rounded-lg bg-compBg shadow-menu'>
					<div className='pb-2 pl-4 text-textColor'>Filter your search</div>
					<NotesSearch
						notes={initialNotes}
						setNoteList={setNoteList}
					/>
				</div>
				<div className='mobile:hidden'>
					<NotesTable
						notes={noteList}
						refetchNotes={refetchNotes}
						setDelete={setDelete}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						deleteId={deleteId}
					/>
				</div>
				<div className='p-2 rounded-lg bg-compBg desktop:hidden laptop:hidden text-textColor'>
					<MobileNotesTable
						notes={noteList}
						refetchNotes={refetchNotes}
						setDelete={setDelete}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						deleteId={deleteId}
					/>
				</div>
			</div>
		</div>
	)
}
export async function getServerSideProps(context) {
	const cookies = parseCookies(context.req)
	const profileId = cookies.profile

	return {
		props: {
			profileId: profileId
		}
	}
}

export default notes
