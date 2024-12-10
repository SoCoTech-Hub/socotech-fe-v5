import React, { useState } from 'react'
//import { useRouter } from 'next/router'
import { Link } from '@mui/material'
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
import ReadMore from '../ReadMore'
import Btn from '@/components/Btn'
import TabContainer from '../TabContainer'
import Load from '../Load'
import { profileId } from '@/context/constants'
import { useMutation, useQuery } from '@apollo/client'
import GetLessonModuleNote from 'graphql/queries/GetLessonModuleNote'
import NotesCreate from 'graphql/mutations/NotesCreate'
import NotesUpdate from 'graphql/mutations/NotesUpdate'
import LessonListDisplay from '@/components/LessonListDisplay'
import ContentLock from '../ContentLock'

// import TabHeader from "../TabHeader"

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

const LessonTabs = ({ lesson = [], required }) => {
	//const router = useRouter()
	const { notes, overview, duration, presenter, resources, requiredLesson } =
		lesson

	const [openTab, setOpenTab] = useState(1)
	const [open, setOpen] = useState(false)

	const [noteText, setNoteText] = useState(data?.notes[0]?.note || '')
	const [noteID, setNoteID] = useState()

	const { data, loading, error } = useQuery(GetLessonModuleNote, {
		variables: { lessonID: lesson.id, profileID: profileId },
		fetchPolicy: 'network-only',
		onCompleted: (userNote) => {
			setNoteText(userNote?.notes[0]?.note)
			setNoteID(userNote.notes[0]?.id)
		}
	})

	const [createNote] = useMutation(NotesCreate, {
		variables: {
			name: `Overview`,
			note: noteText,
			read: false,
			lessonModule: lesson.id,
			subject: lesson.subject.id,
			profile: profileId
		},
		onCompleted: (userNote) => {
			setNoteID(userNote.createNote.note.id)
		}
	})

	const [updateNote] = useMutation(NotesUpdate, {
		variables: { id: noteID, name: `Overview`, note: noteText }
	})

	if (loading) {
		return (
			<>
				<Load />
			</>
		)
	}

	if (error) {
		console.error(error)
		return null
	}

	const requirementCheck = () => {
		if (!lesson.requiredLesson) {
			return true
		}
		if (required.length) {
			return true
		} else {
			return false
		}
	}

	const materialLinks = () => {
		if (!resources) {
			return <></>
		}
		return (
			<div className='relative flex flex-col w-full min-w-0 break-words rounded-lg shadow-outline bg-compBg'>
				<div className='flex-auto p-3 '>
					<div className='font-bold text-textColor'>
						Click on the links to view the materials
					</div>
					<ContentLock
						price={lesson?.price}
						children={
							<>
								<div className='mt-2 rounded-lg bg-lessonsSecondary'>
									{resources.map((material) => (
										<div
											className='cursor-pointer'
											key={`material-${material.id}`}
										>
											<Link href={`/lms/document/${material.id}`}>
												<div className='grid content-center text-xs text-textColor hover:bg-themeColorMain hover:text-black'>
													<div className='my-2 ml-3'>
														{String(material.name).replace(material.ext, '')}
													</div>
												</div>
											</Link>
										</div>
									))}
								</div>
							</>
						}
					/>
				</div>
			</div>
		)
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
		<>
			<div className='flex flex-wrap '>
				{/* Take Notes Button */}
				<div className='flex items-center justify-end w-full cursor-pointer'>
					<div className=''>
						<Btn
							color='bg-themeColorMain'
							label='Take Notes'
							onClickFunction={handleClickOpen}
						/>
					</div>
				</div>

				<div className='w-full'>
					<TabContainer containerRole='tablist'>
						<li
							className='flex w-1/3 -mb-px text-center last:mr-0'
							role='tab'
						>
							<a
								className={
									'text-sm font-bold uppercase px-3 block w-full leading-normal ' +
									(openTab === 1
										? ' border-b-2 border-themeColorSecondary bg-compBggg'
										: ' bg-compBggg ')
								}
								onClick={(e) => {
									e.preventDefault()
									setOpenTab(1)
								}}
								data-toggle='tab'
								href='#link1'
							>
								<div className='flex flex-row items-center my-2 place-content-center'>
									<div
										className='ml-2 text-textColor'
										style={{ textTransform: 'none' }}
									>
										Lesson
									</div>
								</div>
							</a>
						</li>
						{resources && resources.length ? (
							<li
								className='flex w-1/3 -mb-px text-center last:mr-0'
								role='tab'
							>
								<a
									className={
										'text-sm font-bold uppercase px-3 block w-full leading-normal ' +
										(openTab === 2
											? ' border-b-2 border-themeColorSecondary bg-compBggg'
											: ' bg-compBggg ')
									}
									onClick={(e) => {
										e.preventDefault()
										setOpenTab(2)
									}}
									data-toggle='tab'
									href='#link2'
								>
									<div className='flex flex-row items-center my-2 place-content-center'>
										<div
											className='ml-2 text-textColor'
											style={{ textTransform: 'none' }}
										>
											Materials
										</div>
									</div>
								</a>
							</li>
						) : (
							<></>
						)}
						{notes ? (
							<li
								className='flex w-1/3 -mb-px text-center last:mr-0'
								role='tab'
							>
								<a
									className={
										'text-sm font-bold uppercase px-3 block w-full leading-normal ' +
										(openTab === 3
											? ' border-b-2 border-themeColorSecondary bg-compBggg'
											: ' bg-compBggg ')
									}
									onClick={(e) => {
										e.preventDefault()
										setOpenTab(3)
									}}
									data-toggle='tab'
									href='#link3'
									style={{ borderLinecap: 'round' }}
								>
									<div className='flex flex-row items-center my-2 place-content-center'>
										<div
											className='ml-1 text-textColor'
											style={{ textTransform: 'none' }}
										>
											Teacher Notes
										</div>
									</div>
								</a>
							</li>
						) : (
							<></>
						)}
					</TabContainer>
					<div className='relative flex flex-col w-full min-w-0 break-words rounded-lg shadow-outline desktop:pb-3 laptop:pb-3'>
						<div className='flex-auto pt-3'>
							<div className='tab-content tab-space '>
								{/* Lesson Tab Start */}
								<div
									className={
										openTab === 1 ? 'block bg-compBg rounded-xl p-3' : 'hidden'
									}
									id='link1'
								>
									<div className='font-bold text-textColor'>
										Lesson Overview
									</div>
									<div className='mt-2 text-textColor'>
										<div dangerouslySetInnerHTML={{ __html: overview }}></div>
									</div>
									<div className='flex mt-3 mobile:flex-wrap laptop:flex-wrap desktop:space-x-20 mobile:text-sm'>
										{duration ? (
											<div className='mobile:w-full desktop:w-1/2 laptop:w-full'>
												<div className='flex flex-row items-center'>
													<div className='justify-start item'>
														<div className='font-bold text-textColor'>
															Duration:
														</div>
													</div>
													<div className='ml-2 text-textColor'>
														{duration} min
													</div>
												</div>
											</div>
										) : (
											<></>
										)}
										{presenter ? (
											<div className='mobile:w-full desktop:w-1/2 laptop:w-full'>
												<div className='flex flex-row'>
													<div className='justify-start '>
														<div className='font-bold text-textColor'>
															Presented by:
														</div>
													</div>
													<div className='ml-2 text-textColor'>{presenter}</div>
												</div>
											</div>
										) : (
											<></>
										)}
									</div>
									<ContentLock
										price={lesson?.price}
										children={
											<>
												{requiredLesson && (
													<div className='item'>
														<Link href={requiredLesson.id}>
															<div className='flex flex-row'>
																<div className='justify-start item'>
																	<div className='text-textColor'>
																		Lesson Requirement:
																	</div>
																</div>
																<div className='ml-2 item'>
																	{requiredLesson.name}
																</div>
															</div>
														</Link>
													</div>
												)}
												{requirementCheck() ? (
													<div className='w-full item'>
														{lesson.modules?.length ||
														lesson.lmsAssignments?.length ||
														lesson.lmsQuizs?.length ||
														lesson.lmsSurveys?.length ? (
															<LessonListDisplay
																modules={lesson.modules}
																assignments={lesson.lmsAssignments}
																quizs={lesson.lmsQuizs}
																surveys={lesson.lmsSurveys}
																lessonid={lesson.id}
															/>
														) : (
															<></>
														)}
													</div>
												) : (
													<Link
														href={`/${lesson.requiredLesson.id}`}
														passHref
													>
														<div className='w-auto px-3 py-1 text-center bg-red-100 bg-opacity-50 rounded-lg cursor-pointer text-textColor'>
															The following Lesson is required to be completed
															before you can continue:{' '}
															{lesson.requiredLesson.name}
														</div>
													</Link>
												)}
											</>
										}
									/>
								</div>

								{resources && resources.length ? (
									<div
										className={openTab === 2 ? 'block' : 'hidden'}
										id='link2'
									>
										<div className='flex flex-row flex-wrap justify-center'>
											{materialLinks()}
										</div>
									</div>
								) : (
									<></>
								)}

								{/* Teacher Notes */}
								{notes ? (
									<div
										className={openTab === 3 ? 'block' : 'hidden'}
										id='link3'
									>
										<div className='text-textColor '>Teacher Notes</div>
										<div className='mt-2'>
											<ReadMore>{notes}</ReadMore>
										</div>
									</div>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

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
            >
              Save Notessss
            </Button> */}
						</div>
					</DialogActions>
				</div>
			</Dialog>
		</>
	)
}

export default LessonTabs
