// import { useState } from "react"
import Link from 'next/link'
import Cookies from 'js-cookie'
// import { ListItemText } from "@mui/material"
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   LessonListDisplay,
//   LessonListItem,
//   useStyles,
// } from "./styles"

export default function CustomizedAccordions({
	modules,
	assignments,
	quizs,
	surveys,
	lessonid
}) {
	const hasSiyavulaAccess = parseInt(Cookies.get('hasSiyavulaAccess'))

	// const [expanded, setExpanded] = useState("panel1")

	// const handleChange = (panel) => (event, newExpanded) => {
	//   setExpanded(newExpanded ? panel : false)
	// }

	const moduleList = () => {
		if (!modules) {
			return <></>
		}

		return modules.map((module) => (
			<div
				className='cursor-pointer'
				key={`module-${module.id}`}
			>
				<Link
					href={`/${lessonid}/module/${module.id}`}
					passHref
				>
					<div className='grid content-center text-xs text-textColor hover:bg-themeColorMain hover:text-black'>
						<div className='my-2 ml-3'>{module.title}</div>
					</div>
				</Link>
			</div>
		))
	}
	const assignmentList = () => {
		if (!assignments) {
			return <></>
		}
		return assignments.length > 1 ? (
			<div className='cursor-pointer'>
				<Link
					href={`/${lessonid}/assignment/`}
					passHref
				>
					<div className='grid content-center text-xs text-textColor hover:bg-themeColorMain hover:text-black'>
						<div className='my-2 ml-3 '>Assignments</div>
					</div>
				</Link>
			</div>
		) : assignments.length == 1 ? (
			<>
				{assignments.map((assignment) =>
					assignment.question ? (
						<div
							className='cursor-pointer'
							key={`assignment-${assignment.id}`}
						>
							<Link
								href={`/${lessonid}/assignment/${assignment.id}`}
								passHref
							>
								<div className='grid content-center text-xs text-textColor hover:bg-themeColorMain hover:text-black'>
									<div className='my-2 ml-3'>
										{assignment.title ? assignment.title : assignment.question}
									</div>
								</div>
							</Link>
						</div>
					) : (
						<></>
					)
				)}
				<Link
					href={`/${lessonid}/assignment/${assignments[0].id}/marks`}
					passHref
				>
					<div className='grid content-center text-xs text-textColor hover:bg-themeColorMain hover:text-black'>
						<div className='my-2 ml-3'>Assignment marks</div>
					</div>
				</Link>
			</>
		) : (
			<></>
		)
	}
	const quizList = () => {
		if (!quizs) {
			return <></>
		}

		return quizs.map((quiz) => {
			let hrefLink = `/${lessonid}/quiz/${quiz.id}`

			if (quiz.siyavula) {
				if (!hasSiyavulaAccess) {
					return null
				}

				const activityIds = quiz.siyavula_activity_ids
				hrefLink = `/${lessonid}/quiz/siyavula/${activityIds[0]}`
			}

			return (
				<div
					className='cursor-pointer'
					key={`quiz-${quiz.id}`}
				>
					<Link
						href={hrefLink}
						passHref
					>
						<div className='grid content-center text-xs text-textColor hover:bg-themeColorMain hover:text-black'>
							<div className='my-2 ml-3'>{quiz.title}</div>
						</div>
						{/* <LessonListItem button>
              <ListItemText primary={quiz.title} />
            </LessonListItem> */}
					</Link>
				</div>
			)
		})
	}
	const surveyList = () => {
		if (!surveys) {
			return <></>
		}
		return surveys.map((survey) => (
			<div
				className='cursor-pointer'
				key={`survey-${survey.id}`}
			>
				<Link
					href={`/${lessonid}/survey/${survey.id}`}
					passHref
				>
					{/* <LessonListItem button>
            <ListItemText primary={survey.title} />
          </LessonListItem> */}
					<div className='grid content-center text-xs text-textColor hover:bg-themeColorMain hover:text-black'>
						<div className='my-2 ml-3'>{survey.title}</div>
					</div>
				</Link>
			</div>
		))
	}

	// const classes = useStyles()
	return (
		<div className='relative flex flex-col w-full min-w-0 mt-2 break-words rounded-lg shadow-outline bg-compBg'>
			<div className='flex-auto p-3'>
				<div className='font-bold text-textColor'>Lesson Content</div>
				<div className='mt-2 rounded-lg bg-lessonsSecondary'>
					{moduleList()}
					{assignmentList()}
					{quizList()}
					{surveyList()}
				</div>
			</div>
		</div>
	)
}
