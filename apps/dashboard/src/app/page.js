import Head from 'next/head'
import { Scrollbars } from 'react-custom-scrollbars'
import ProfileUserCover from '@/components/ProfileUserCover'
import UserStats from '@/components/UserStats'
import UserAboutSection from '@/components/UserAboutSection'
import UserFeed from '@/components/UserFeed'
import sumTimeSpent from '@/snippets/sumTimeSpent'
import getGQLRequest from '@/snippets/getGQLRequest'
import { email, profileId, userId } from '@/context/constants'
import { parseCookies } from '@/snippets/parseCookies'

const userdashboard = ({ user, userName, stats, time, news }) => {
	const TimeSpent = time ? sumTimeSpent(time) : 0
	const seo = {
		title: 'Topic - User Dashboard',
		description: 'User Dashboard!',
		image: 'https://lms.topic.co.za/user/logo.png',
		url: 'https://topic.co.za'
	}
	if (user) {
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
				<div className='space-y-10 gx-5'>
					<div className=''>
						<ProfileUserCover
							userName={userName}
							lastName={user.lastName}
							email={email}
							userid={userId}
						/>
					</div>
					<div className='mt-4 ml-2 mr-2 '>
						<hr className='pb-2 border-b-2 border-themeColorMain'></hr>
					</div>
					<div className=''>
						<UserStats
							stats={stats}
							time={TimeSpent}
						/>
					</div>
					<div className='flex flex-row flex-wrap space-x-3 mobile:space-x-0'>
						<div className='col mobile:mb-4'>
							<UserAboutSection />
						</div>
						<div className='overflow-scroll desktop:w-2/3 laptop:w-2/3 mobile:w-full no-scrolly mobile:mb-6'>
							<div className='flex flex-wrap gap-x-2 gap-y-4 '>
								<Scrollbars
									style={{ height: '760px' }}
									renderThumbVertical={({ style, ...props }) => (
										<div
											{...props}
											style={{ ...style, backgroundColor: '#D6F379' }}
										/>
									)}
								>
									{news.length ? (
										news.map((feed) => (
											<UserFeed
												key={feed.id}
												news={feed}
												profileId={profileId}
											/>
										))
									) : (
										<div align='center'>No news</div>
									)}
								</Scrollbars>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return <></>
	}
}
export async function getServerSideProps({ req }) {
	const currentDate = new Date()
	currentDate.setDate(currentDate.getDate() - 30)
	const pastDate = currentDate.toISOString()

	var date = new Date()
	date.setHours(date.getHours() + 2)
	var isodate = date.toISOString()

	const cookies = parseCookies(req)

	let { profile } = await getGQLRequest({
		endpoint: `profile`,
		fields: `lastName`,
		findOne: true,
		id: cookies.profile
	})
	let { progresses } = await getGQLRequest({
		endpoint: `progresses`,
		fields: `isComplete`,
		where: `user:{id:${cookies.userid}}`
	})
	let { pageTracks } = await getGQLRequest({
		endpoint: `pageTracks`,
		fields: `time`,
		where: `user:{id:${cookies.userid}}`
	})
	let { feeds } = await getGQLRequest({
		endpoint: `feeds`,
		fields: `id,videoLink,url,description,media{url,alternativeText},social{id},author{firstName,lastName,profilePic{url}},subject{name,svgIcon},published_at`,
		where: `organization:{id:${cookies.organizationId}},grades:{id:[${cookies.Grades}]},published_at_lte:"${isodate}",published_at_gt:"${pastDate}"`,
		sort: `published_at:desc`
	})
	return {
		props: {
			user: profile ? profile : null,
			userName: cookies.userName ? cookies.userName : null,
			stats: progresses ? progresses : null,
			time: pageTracks ? pageTracks : null,
			news: feeds ? feeds : null
		}
	}
}

export default userdashboard
