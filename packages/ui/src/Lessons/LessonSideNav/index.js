import React, { useState } from 'react'
import clsx from 'clsx'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import { Grid, NoSsr } from '@mui/material'
import { useStyles } from './styles'

export default function LessonSideNav({ lesson, children }) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	const [modules] = useState([lesson?.modules])
	const [assignments] = useState([lesson?.lmsAssignments])
	const [quizs] = useState([lesson?.lmsQuizs])
	const [surveys] = useState([lesson?.lmsSurveys])

	const moduleList = () => {
		if (modules[0] == undefined) {
			return <></>
		}

		return modules.map((module) =>
			module.map((item) => (
				<div
					className=''
					key={`module-${item.id}`}
				>
					{open ? (
						<Link
							href={`/${lesson.id}/module/${item.id}`}
							passHref
						>
							<button
								className='w-full px-8 py-4 text-textColor active:bg-tdpActive'
								style={{ textAlign: 'left' }}
							>
								<Grid
									container
									alignItems='center'
									spacing={2}
								>
									<Grid
										item
										sm={12}
										md={12}
										lg={12}
										xl={12}
									>
										<p className='break-words'>{item.title}</p>
									</Grid>
								</Grid>
							</button>
						</Link>
					) : (
						<></>
					)}
				</div>
			))
		)
	}

	const assignmentList = () => {
		if (assignments == undefined) {
			return <></>
		}

		return assignments.map((assignment) => (
			<div
				className=''
				key={`assignment-${assignment.id}`}
			>
				{open ? (
					<Link
						href={`/${lesson.id}/assignment/${assignment.id}`}
						passHref
					>
						<button
							className='w-full px-8 py-4 text-textColor active:bg-tdpActive'
							style={{ textAlign: 'left' }}
						>
							<Grid
								container
								alignItems='center'
								spacing={2}
							>
								<Grid
									item
									sm={12}
									md={12}
									lg={12}
									xl={12}
								>
									<p className='break-words'>{assignment.title}</p>
								</Grid>
							</Grid>
						</button>
					</Link>
				) : (
					<></>
				)}
			</div>
		))
	}

	const quizList = () => {
		if (quizs == undefined) {
			return <></>
		}

		return quizs.map((quiz) =>
			quiz.map((item) => (
				<div
					className=''
					key={`quiz-${item.id}`}
				>
					{open ? (
						<Link
							href={`/${lesson.id}/quiz/${item.id}`}
							passHref
						>
							<button
								className='w-full px-8 py-4 text-textColor active:bg-tdpActive'
								style={{ textAlign: 'left' }}
							>
								<Grid
									container
									alignItems='center'
									spacing={2}
								>
									<Grid
										item
										sm={12}
										md={12}
										lg={12}
										xl={12}
									>
										<p className='break-words'>{item.title}</p>
									</Grid>
								</Grid>
							</button>
						</Link>
					) : (
						<></>
					)}
				</div>
			))
		)
	}

	const surveyList = () => {
		if (surveys[0] == undefined) {
			return <></>
		}

		return surveys.map((survey) =>
			survey.map((item) => (
				<div
					className=''
					key={`survey-${item.id}`}
				>
					{open ? (
						<Link
							href={`/${lesson.id}/survey/${item.id}`}
							passHref
						>
							<button
								className='w-full px-8 py-4 text-textColor active:bg-tdpActive'
								style={{ textAlign: 'left' }}
							>
								<Grid
									container
									alignItems='center'
									spacing={2}
								>
									<Grid
										item
										sm={12}
										md={12}
										lg={12}
										xl={12}
									>
										<p className='break-words'>{item.title}</p>
									</Grid>
								</Grid>
							</button>
						</Link>
					) : (
						<></>
					)}
				</div>
			))
		)
	}

	return (
		<NoSsr>
			<div className={classes.root}>
				<Drawer
					variant='permanent'
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open
						})
					}}
				>
					{open ? (
						<>
							<div className={classes.toolbar}>
								<div className=''>
									<IconButton
										color='inherit'
										aria-label='open drawer'
										onClick={() => setOpen(!open)}
										edge='start'
										className={clsx(classes.menuButton, {
											[classes.hide]: !open
										})}
									>
										<div className='w-4 h-4'>
											<img
												src='/lms/triangle_close.svg'
												alt=''
												style={{ marginLeft: '-2px' }}
											/>
										</div>
									</IconButton>
								</div>
							</div>
							<div className='w-10 h-10 mb-2 -mt-20 ml-7'>
								<img
									src='/lms/suncep_lesson_white.svg'
									alt='Lesson Icon'
								/>
							</div>
						</>
					) : (
						<div className={classes.toolbar}>
							<div className=''>
								<IconButton
									onClick={() => setOpen(!open)}
									className={clsx(classes.menuButton, {
										[classes.hide]: open
									})}
								>
									<div className='w-4 h-4'>
										<img
											src='/lms/triangle_open.svg'
											alt=''
											style={{ marginLeft: '2px' }}
										/>
									</div>
								</IconButton>
							</div>
						</div>
					)}
					<Divider />
					<div className='mt-5 ml-8 text-textColor'>
						{/* Hidden content when closed */}
						{open ? (
							<>
								<div className='flex-wrap text-xl font-black break-words'>
									{lesson.name}
								</div>
								{lesson.subject && (
									<div className='text-sm font-black break-words'>
										{lesson.subject.name}
									</div>
								)}
							</>
						) : (
							<>
								<div className='flex-wrap text-xl font-black '></div>
								<div className='text-sm font-black'> </div>
							</>
						)}
					</div>
					<div className='mt-5'>
						{modules && moduleList()}
						{assignments.value && assignmentList()}
						{quizs && quizList()}
						{surveys && surveyList()}
					</div>
				</Drawer>

				<main className={classes.content}>{children}</main>
			</div>
		</NoSsr>
	)
}
