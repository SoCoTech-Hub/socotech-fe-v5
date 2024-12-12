// import WeeklyCalendar from '@/components/CalendarNew/Calendar/weekly'
// import getGQLRequest from '@/snippets/getGQLRequest'


// const Weekly = ({ events }) => {
// 	const seo = {
// 		title: 'Topic - Events',
// 		description: 'Explore and stay updated on events!',
// 		image: 'https://lms.topic.co.za/user/logo.png',
// 		url: 'https://topic.co.za'
// 	}
// 	return (
// 		<main className='flex flex-col items-center justify-center text-white mobile:mb-20'>
// 			<div className='flex flex-col items-center justify-center w-full gap-12 rounded-lg shadow-md desktop:py-4 laptop:py-4 mobile:py-2 desktop:px-2 laptop:px-2 mobile:px-1 desktop:container laptop:container card bg-compBg'>
// 				<WeeklyCalendar />
// 			</div>
// 		</main>
// 	)
// }

// async function CrudShowcase() {
// 	const latestPost = await api.post.getLatest.query()

// 	return (
// 		<div className='w-full max-w-xs'>
// 			{latestPost ? (
// 				<p className='truncate'>Your most recent post: {latestPost.name}</p>
// 			) : (
// 				<p>You have no posts yet.</p>
// 			)}

// 			<CreatePost />
// 		</div>
// 	)
// }

// export async function getServerSideProps({ req }) {
// 	const { organizationId, profile } = req.cookies

// 	const currentDateLessOneWeek = new Date(
// 		Date.now() - 86400000 * 7
// 	).toISOString()

// 	const { events } = await getGQLRequest({
// 		endpoint: 'events',
// 		fields: 'id, title, start, end, image {url},desciption, lesson {id}',
// 		where: `organization: { id: ${organizationId} }, start_gt: "${currentDateLessOneWeek}", _or: [{ private: false }, { private: true, author: { id: ${profile} } }]`
// 	})

// 	return {
// 		props: {
// 			events: events ? events : []
// 		}
// 	}
// }
// export default Weekly

//TODO: make a weekly calendar component