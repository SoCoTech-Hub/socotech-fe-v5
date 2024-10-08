import { forwardRef, useEffect, useState } from 'react'
import Head from 'next/head'
import { useMutation } from '@apollo/client'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Btn from '@/components/Btn'
import VideoPlayer from '@/components/VideoPlayer'
import AWSVideoPlayer from '@/components/VideoPlayer2'
import PaperComponent from '@/components/PaperComponent'
import getGQLRequest from '@/snippets/getGQLRequest'
import NotesCreate from 'graphql/mutations/NotesCreate'
import NotesUpdate from 'graphql/mutations/NotesUpdate'
import { baseUrl, cloudinaryVideoUrl, profileId } from '@/context/constants'

const Transition = forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	)
})

const categoryDisplay = ({ show }) => {
	const [noteText, setNoteText] = useState('')
	const [noteID, setNoteID] = useState()
	const [open, setOpen] = useState(false)

	useEffect(async () => {
		const { notes } = await getGQLRequest({
			endpoint: 'notes',
			fields: 'id, note',
			where: `profile: { id: ${profileId}},show:{id:${show.id} }`
		})
		if (notes) {
			setNoteText(notes[0]?.note)
			setNoteID(notes[0]?.id)
		}
	}, [])

	const [createNote] = useMutation(NotesCreate, {
		variables: {
			name: `${show.showCategory?.name}:${show.name}`,
			note: noteText,
			read: false,
			show: show.id,
			profile: profileId
		},
		onCompleted: (userNote) => {
			setNoteID(userNote.createNote.note.id)
		}
	})

	const [updateNote] = useMutation(NotesUpdate, {
		variables: { id: noteID, name: show.name, note: noteText }
	})

	const seo = {
		title: `Topic - ${show?.name}`,
		description: show?.name,
		image: 'https://lms.topic.co.za/digilib/logo.png',
		url: 'https://topic.co.za'
	}

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
		if (noteID) {
			updateNote()
		} else {
			createNote()
		}
	}

	return (
		<div className='col row'>
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
			<div className='flex text-5xl mobile:text-2xl font-semibold text-textColor'>
				{show?.showCategory?.name}
			</div>
			<div className='flex justify-between mb-4'>
				<div className='text-base text-textColor mobile:text-xl'>
					{show?.name}
				</div>
			</div>
			<div className=''>
				{show?.url ? (
					show.url.startsWith(process.env.NEXT_PUBLIC_CLOUDFRONT) ? (
						<AWSVideoPlayer src={show.url} />
					) : show.url.startsWith(cloudinaryVideoUrl) ? (
						<VideoPlayer src={show.url} />
					) : (
						<video
							controls
							className='w-full h-96'
							src={show.url}
						>
							{/* <source src={show.url} type='video/*' />  */}
						</video>
					)
				) : (
					<img
						src={`${baseUrl}/Shows_ComingSoon.png`}
						alt='Coming Soon'
					/>
				)}
			</div>
			<div className={` flex flex-row flex-wrap justify-between gap-2 p-4 `}>
				<Btn
					label='Take notes'
					onClickFunction={handleClickOpen}
					color={`bg-themeColorMain ${show?.url ? '' : 'hidden'}`}
					width='36'
					padding='py-2'
					fontWeight='bold'
					textColor='text-black'
				/>

				<Btn
					label='Back to Shows'
					link={`/shows/category/${show?.showCategory?.id}`}
					color='bg-themeColorMain'
					width='36'
					padding='py-2'
					fontWeight='bold'
					textColor='text-black'
				/>

				<Dialog
					disableBackdropClick={true}
					hideBackdrop
					disableScrollLock
					TransitionComponent={Transition}
					open={open}
					onClose={handleClose}
					PaperComponent={PaperComponent}
					aria-labelledby='draggable-dialog-title'
				>
					<div className='border-2 border-white rounded-lg bg-compBg text-textColor'>
						<DialogTitle
							style={{ cursor: 'move' }}
							id='draggable-dialog-title'
						>
							Lesson Notes
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								<TextareaAutosize
									className='px-2 my-2 border-2 rounded-lg'
									id='user_note'
									name='user_note'
									maxRows={4}
									minRows={4}
									value={noteText}
									onChange={(e) => setNoteText(e.target.value)}
									placeholder='Type notes here...'
									style={{
										width: '250px',
										backgroundColor: '#181818',
										color: 'white'
									}}
								></TextareaAutosize>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<div className='flex flex-row justify-center w-full'>
								<div className=''>
									<Btn
										color='bg-themeColorMain'
										label='Save Notes'
										onClickFunction={handleClose}
									/>
								</div>
							</div>
						</DialogActions>
					</div>
				</Dialog>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { id } = context.query

	const { show } = await getGQLRequest({
		endpoint: 'show',
		findOne: true,
		id: id,
		fields: 'id,url,name,showCategory{id,name}'
	})

	return {
		props: {
			show: show
		}
	}
}

export default categoryDisplay
