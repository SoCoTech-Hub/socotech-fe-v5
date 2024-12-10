import { useEffect, useState } from 'react'
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
import SeoHead, { SEO } from '@/components/SeoHead'

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
		title: 'Support Notes Home Page',
		description: 'Explore Topic Support Notes!'
	}
	return (
		<div className='desktop:mb-4 laptop:mb-4 mobile:mb-10 col row'>
				<SEO
				title={seo.title}
				description={seo.description}
			/>
			<div className='space-y-10 desktop:gx-5 desktop:gy-4 mobile:space-y-3'>
				<div>
					<UserCover />
				</div>
				<div className=''>
					<div className='mobile:hidden'>
						<BtnBig
							label='New Note'
							link='/notes/createnote'
							color='bg-themeColorMain text-white'
						/>
					</div>
					<div className='desktop:hidden laptop:hidden'>
						<Btn
							label='New Note'
							link='/notes/createnote'
							color='bg-themeColorMain text-white'
						/>
					</div>
				</div>

				<div className='px-4 pt-3 pb-4 rounded-lg shadow-menu bg-compBg'>
					<div className='pb-2 pl-4 text-textColor'>Filter your search</div>
					<NotesSearch
						notes={initialNotes}
						setNoteList={setNoteList}
					/>
				</div>
				{noteList?.length ? (
					<>
						<div className='shadow-md mobile:hidden'>
							<NotesTable
								notes={noteList}
								refetchNotes={refetchNotes}
								setDelete={setDelete}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
								deleteId={deleteId}
							/>
						</div>
						<div className='p-2 rounded-lg shadow-md bg-compBg desktop:hidden laptop:hidden text-textColor'>
							<MobileNotesTable
								notes={noteList}
								refetchNotes={refetchNotes}
								setDelete={setDelete}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
								deleteId={deleteId}
							/>
						</div>
					</>
				) : (
					<></>
				)}
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
