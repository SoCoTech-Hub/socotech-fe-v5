import StudentReportPage from '@/components/StudentReportPage'
import getGQLRequest from '@/snippets/getGQLRequest'
// import { gql } from '@apollo/client'
// import client from '@/api/apolloClient'
// import getTimeFormat from '@/snippets/getTimeFormat'

const reports = ({ weeklyInfo, allTimeInfo, user }) => (
	<>
		<StudentReportPage
			weeklyInfo={weeklyInfo}
			allTimeInfo={allTimeInfo}
			user={user}
		/>
	</>
)
// TODO: Fix report before adding seperate app for parents.
export async function getStaticProps({ params }) {
	return {
		props: {
			weeklyInfo: {
				inProgress: 0,
				completed: 0,
				hoursSpent: 0,
				averageQuizScore: 0,
				completedList: 0
			},
			allTimeInfo: {
				inProgress: 0,
				completed: 0,
				hoursSpent: 0,
				averageQuizScore: 0,
				completedList: 0
			},
			user: null
		},
		revalidate: 60 * 60 * 24 * 7 // attempt to re-generate the page In 1 week 60 seconds * 60 min * 24 hours * 7 days
	}

	// const userid = params.id
	// var day = new Date()
	// day.setDate(day.getDate() - 7)
	// const date = day.toISOString().substring(0, 10)

	// let allTime = await client.query({
	// 	query: gql`
	//     query GetAllTime {
	//      user(id:${userid}) {
	//        id,profile{firstName,lastName,organization{name}}
	//      }
	//       subjects {
	//         id, name
	//       }
	//       lmsQuizs(where:{lessons:{subject:{id_null:false}}}) {
	//         id,
	//         lessons{
	//           subject{id}
	//         }
	//       }
	//       progresses(where:{user:{id:${userid}}}){
	//         id isComplete updated_at
	//       }
	//       allTimeSum: timeTracksConnection(where:{user:{id:${userid}}}){
	//         aggregate{
	//           sum{ timeSpent }
	//         }
	//       }
	//       weeklySum: timeTracksConnection(where:{user:{id:${userid}},updated_at_gte:"${date}"}){
	//         aggregate{
	//           sum{ timeSpent }
	//         }
	//       }
	//       quizResponses(where:{user:{id:${userid}}, response_null: false}){
	//         points, response, isCompleted, lesson { subject { id } }, updated_at
	//       }
	//     }
	//   `,
	// 	fetchPolicy: 'network-only'
	// })
	// let weeklyAverageQuizScore = 0
	// let weeklyAverage = 0
	// let weeklyCompletedList = []

	// allTime.data.quizResponses.map((resp) => {
	// 	if (resp.updated_at > day.toISOString()) {
	// 		var keys = Object.keys(resp.response)
	// 		weeklyAverage = weeklyAverage + (resp.points / keys.length) * 100
	// 	}
	// })

	// weeklyAverageQuizScore =
	// 	allTime.data.quizResponses.filter((x) => x.updated_at > day.toISOString())
	// 		.length > 0
	// 		? weeklyAverage
	// 			? weeklyAverage /
	// 			  allTime.data.quizResponses.filter(
	// 					(x) => x.updated_at > day.toISOString()
	// 			  ).length
	// 			: 0
	// 		: 0

	// allTime.data.subjects.map(async (subj) => {
	// 	let averageQuizScore = 0
	// 	let average = 0
	// 	let lengthCount = 0
	// 	allTime.data.quizResponses.map((resp) => {
	// 		if (
	// 			resp.lesson.subject.id === subj.id &&
	// 			resp.updated_at > day.toISOString()
	// 		) {
	// 			lengthCount++
	// 			var keys = Object.keys(resp.response)
	// 			average = average + (resp.points / keys.length) * 100
	// 		}
	// 	})
	// 	averageQuizScore =
	// 		lengthCount > 0 ? (average ? average / lengthCount : 0) : 0

	// 	if (lengthCount > 0) {
	// 		let quizCount = 0
	// 		allTime.data.lmsQuizs.map((x) => {
	// 			let quizOnSubject = false
	// 			x.lessons.map((y) => {
	// 				if (y.subject.id === subj.id) {
	// 					quizOnSubject = true
	// 				}
	// 			})
	// 			if (quizOnSubject) {
	// 				quizCount++
	// 			}
	// 		})

	// 		weeklyCompletedList.push({
	// 			id: subj.id,
	// 			name: subj.name,
	// 			isComplete: allTime.data.quizResponses.filter(
	// 				(x) =>
	// 					x.isCompleted === true &&
	// 					x.lesson.subject.id === subj.id &&
	// 					x.updated_at > day.toISOString()
	// 			).length,
	// 			lmsQuizs: quizCount,
	// 			averageQuizScore: averageQuizScore
	// 		})
	// 	}
	// })

	// let allTimeAverageQuizScore = 0
	// let allTimeAverage = 0
	// allTime.data.quizResponses.map((resp) => {
	// 	var keys = Object.keys(resp.response)
	// 	allTimeAverage = allTimeAverage + (resp.points / keys.length) * 100
	// })
	// allTimeAverageQuizScore =
	// 	allTime.data.quizResponses.length > 0
	// 		? allTimeAverage
	// 			? allTimeAverage / allTime.data.quizResponses.length
	// 			: 0
	// 		: 0

	// let allTimeCompletedList = []
	// allTime.data.subjects.map(async (subj) => {
	// 	let averageQuizScore = 0
	// 	let average = 0
	// 	let lengthCount = 0
	// 	allTime.data.quizResponses.map((resp) => {
	// 		if (resp.lesson.subject.id === subj.id) {
	// 			lengthCount++
	// 			var keys = Object.keys(resp.response)
	// 			average = average + (resp.points / keys.length) * 100
	// 		}
	// 	})
	// 	averageQuizScore =
	// 		lengthCount > 0 ? (average ? average / lengthCount : 0) : 0

	// 	if (lengthCount > 0) {
	// 		let quizCount = 0
	// 		allTime.data.lmsQuizs.map((x) => {
	// 			let quizOnSubject = false
	// 			x.lessons.map((y) => {
	// 				if (y.subject.id === subj.id) {
	// 					quizOnSubject = true
	// 				}
	// 			})
	// 			if (quizOnSubject) {
	// 				quizCount++
	// 			}
	// 		})

	// 		allTimeCompletedList.push({
	// 			id: subj.id,
	// 			name: subj.name,
	// 			isComplete: allTime.data.quizResponses.filter(
	// 				(x) => x.isCompleted === true && x.lesson.subject.id === subj.id
	// 			).length,
	// 			lmsQuizs: quizCount,
	// 			averageQuizScore: averageQuizScore
	// 		})
	// 	}
	// })
	// return {
	// 	props: {
	// 		weeklyInfo: {
	// 			inProgress: allTime.data.progresses.filter(
	// 				(x) => x.isComplete === false && x.updated_at > day.toISOString()
	// 			).length,
	// 			completed: allTime.data.progresses.filter(
	// 				(x) => x.isComplete === true && x.updated_at > day.toISOString()
	// 			).length,
	// 			hoursSpent: await getTimeFormat(
	// 				allTime.data.weeklySum.aggregate.sum.timeSpent
	// 			),
	// 			averageQuizScore: weeklyAverageQuizScore,
	// 			completedList: weeklyCompletedList
	// 		},
	// 		allTimeInfo: {
	// 			inProgress: allTime.data.progresses.filter(
	// 				(x) => x.isComplete === false
	// 			).length,
	// 			completed: allTime.data.progresses.filter((x) => x.isComplete === true)
	// 				.length,
	// 			hoursSpent: await getTimeFormat(
	// 				allTime.data.allTimeSum.aggregate.sum.timeSpent
	// 			),
	// 			averageQuizScore: allTimeAverageQuizScore,
	// 			completedList: allTimeCompletedList
	// 		},
	// 		user: allTime.data.users ? allTime.data.users[0] : null
	// 	},
	// 	revalidate: 60 * 60 * 24 * 7 // attempt to re-generate the page In 1 week 60 seconds * 60 min * 24 hours * 7 days
	// }
}

export async function getStaticPaths() {
	const { users } = await getGQLRequest({
		endpoint: `users`,
		fields: `id`
	})
	const paths = users?.map((user) => `/report/${user.id}`) || []
	return { paths, fallback: 'blocking' }
}
export default reports
