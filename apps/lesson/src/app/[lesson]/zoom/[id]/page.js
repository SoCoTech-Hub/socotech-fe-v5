import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Box } from 'reflexbox'
import Alert from '@/components/Alert'
import Draggable from 'react-draggable'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
// import { Button } from "@mui/material"
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Slide from '@mui/material/Slide'
import api from '@/api/api'
import { getNextButtonHref } from '@/lib/utils'
import getDataRequest from '@/snippets/getDataRequest'
import userid from '@/snippets/getUserid'
import TimeTracks from '@/snippets/timeTracks'
import Btn from '@/components/Btn'

let timeSpent = 0

function PaperComponent(props) {
	return (
		<Draggable
			handle='#draggable-dialog-title'
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	)
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	)
})

function Module({ lesson, module }) {
	const [errorMessages, setErrorMessages] = useState('')
	const [completed, setCompleted] = useState(0)
	const [lessonResponse, setLessonResponse] = useState([])
	let startTime = new Date()
	let [lessonTime, setLessonTime] = useState(0)
	const [open, setOpen] = React.useState(false)
	const [data, updateData] = useState({
		user_note: ''
	})

	useEffect(() => {
		if (lessonResponse.length) {
			setCompleted(lessonResponse[0].isComplete)
			timeSpent = lessonResponse[0].timeSpent
		}
	}, [lessonResponse])

	useEffect(() => {
		setTimeout(() => {
			let newTime = new Date()
			let currentTime = (newTime - startTime) / 1000 / 60 + lessonTime
			setLessonTime(currentTime)
		}, 1000)
		return
	}, [])

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = async () => {
		setOpen(false)
		try {
			await addUserNote(userid, module.title, data.user_note)
		} catch (err) {
			setErrorMessages('Error: ' + err)
		}
	}

	function onChange(event) {
		updateData({ ...data, [event.target.name]: event.target.value })
	}

	const addUserNote = async (user, Title, note) => {
		await api.post('/user-notes/', { user, Title, note })
	}

	async function markLessonComplete() {
		try {
			if (lessonResponse.length > 0) {
				if (completed == 0) {
					await api.put(`/time-tracks/${lessonResponse[0].id}`, {
						isComplete: 1
					})
					setCompleted(1)
					Router.push(nextButtonHref)
				} else {
					await api.put(`/time-tracks/${lessonResponse[0].id}`, {
						isComplete: 0
					})
					setCompleted(0)
				}
			}

			return
		} catch (err) {
			setErrorMessages('Error: ' + err)
		}
	}

	const [nextButtonHref, setNextButtonHref] = useState('/')

	useEffect(() => {
		const fetchNextButtonHref = async () => {
			setNextButtonHref('/')
			const href = await getNextButtonHref(lesson?.id, 'module', module?.id)
			setNextButtonHref(href)
		}

		fetchNextButtonHref()
	}, [module])

	const seo = {
		title: `Topic - ${module.title}`,
		description: module.title,
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
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

			{lesson && module ? (
				<TimeTracks
					lesson={lesson.id}
					module={module.id}
					activity='lessonModule'
					lessonResponseSetter={setLessonResponse}
				/>
			) : (
				<></>
			)}
			{module.content ? (
				<>
					<style
						dangerouslySetInnerHTML={{
							__html: module.content.css
						}}
					></style>
					<Box variant='container'>
						<div
							className='mt-5'
							dangerouslySetInnerHTML={{
								__html: module.content.html
							}}
						></div>
					</Box>
				</>
			) : module.videoLink ? (
				<iframe
					width='100%'
					height='100%'
					src={module.videoLink}
				></iframe>
			) : (
				<></>
			)}
			{/* Take Notes */}
			<div className='flex justify-between'>
				<div className=''>
					{/* <Button
            color='secondary'
            className='py-2 font-bold text-center text-white rounded-full w-36 '
            onClick={handleClickOpen}
            style={{
              backgroundColor: "#622139",
              width: "128px",
              borderRadius: "99999px",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Take Notes
          </Button> */}
					<Btn
						label='Take Notes'
						onClickFunction={handleClickOpen}
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
						<DialogTitle
							style={{ cursor: 'move' }}
							id='draggable-dialog-title'
						>
							Lesson Notes
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								<TextareaAutosize
									id='user_note'
									name='user_note'
									onChange={(event) => onChange(event)}
									rowsMax={4}
									rows={4}
									placeholder='Type notes here...'
									style={{
										width: '250px',
										backgroundColor: '#ececec'
									}}
								></TextareaAutosize>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<div className='flex flex-row justify-center w-full'>
								{/* <Button
                  onClick={handleClose}
                  color="primary"
                  style={{
                    backgroundColor: "#F6C253",
                    width: "128px",
                    borderRadius: "99999px",
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  data-tracking-action={`Created note on Module: ${module.title}`}>
                  Save Notes
                </Button> */}
								<Btn
									label='Save Notes'
									color='bg-themeColorMain'
									onClickFunction={handleClose}
									trackingAction={`Created note on Module: ${module.title}`}
								/>
							</div>
						</DialogActions>
					</Dialog>
				</div>
			</div>
			{/* Next Button */}
			<>
				{lessonTime + timeSpent >= module.duration && (
					<div className='flex flex-row justify-end mt-3'>
						{/* <Button
                color="primary"
                className="py-2 font-bold text-center text-white rounded-full w-36 "
                onClick={markLessonComplete}
                style={{
                  backgroundColor: "#F6C253",
                  width: "128px",
                  borderRadius: "99999px",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: "bold",
                }}>
                Next
              </Button> */}
						<Btn
							label='Next'
							onClickFunction={markLessonComplete}
							color='bg-themeColorMain'
							link={nextButtonHref}
						/>
					</div>
					// <div className="flex justify-center">
					//   <FormControlLabel
					//     label="Mark Completed"
					//     control={
					//       <Checkbox
					//         value={completed}
					//         checked={completed ? true : false}
					//         // onChange={markLessonComplete()}
					//         onClick={markLessonComplete}
					//         color="primary"
					//       />
					//     }
					//   />
					// </div>
				)}
				<Alert error={errorMessages} />

				{/* Back to Lesson */}
				<div className=''>
					{/* <Button
              color="primary"
              className="py-2 font-bold text-center text-white rounded-full w-36 "
              onClick={null}
              style={{
                backgroundColor: "#F6C253",
                width: "128px",
                borderRadius: "99999px",
                color: "#ffffff",
                textTransform: "none",
                fontWeight: "bold",
              }}>
              Back to lesson
            </Button> */}
					<Btn
						label='Back to Lesson'
						color='bg-themeColorMain'
						link={`/${lesson.id}/zoom`}
					/>
				</div>
			</>
		</>
	)
}

export async function getServerSideProps(context) {
	const { id, lesson } = context.query
	try {
		const lessons = await getDataRequest(`/lessons/${lesson}`, () => {})
		const module = await getDataRequest(
			`/lesson-modules/${id}?lessons=${lesson}`,
			() => {}
		)

		return {
			props: {
				lesson: lessons,
				module
			}
		}
	} catch (e) {
		const data = []
		return {
			props: {
				module: data
			}
		}
	}
}

export default Module
