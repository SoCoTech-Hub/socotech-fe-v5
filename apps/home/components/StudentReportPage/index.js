import { useEffect, useState } from 'react'
import ReportNavbar from '@/components/ReportNavbar'
import ReportBackground from '@/components/ReportBackground'
import WelcomeWidget from '@/components/WelcomeWidget'
import ReportBtn from '@/components/ReportBtn'
import ReportWidgetBig from '@/components/ReportWidgeBig'
import ReportWidgetSmall from '@/components/ReportWidgetSmall'
import LessonAnalytics from '@/components/LessonAnalytics'
import { baseUrl } from '@/context/constants'
import Head from 'next/head'

const StudentReportPage = ({ weeklyInfo, allTimeInfo, user }) => {
	const [allTime, setAllTime] = useState(true)
	const [data, setData] = useState([])

	var d = new Date()
	var date = d.toISOString().slice(0, 10)
	useEffect(() => {
		allTime ? setData(allTimeInfo) : setData(weeklyInfo)
	}, [allTime])
	const generate = async () => {
		window.print()
	}

	return (
		<div id='output'>
			<Head>
				<title>{user?.name} Student Report</title>
				<meta
					name='description'
					content='text'
					key='title'
				/>
			</Head>
			<ReportNavbar />
			<ReportBackground>
				<div className='px-4'>
					<WelcomeWidget
						date={`${date.substring(8, 10)}.${date.substring(
							5,
							7
						)}.${date.substring(0, 4)}`}
						studentName={
							user?.profile
								? `${user.profile?.firstName} ${user.profile?.lastName}`
								: ''
						}
						reportType={allTime ? 'All Time' : 'Weekly'}
						organization={
							user ? user.profile?.organization.name : 'SU Advantage'
						}
					/>
				</div>
				<div className='px-4 mt-8'>
					<div className='text-4xl font-bold text-textColor raleway'>
						Choose between “All-Time” report and “Weekly” report
					</div>
					<div className='mt-2 text-textColor raleway'>
						If you want a comprehensive overview of all your activity from the
						date you signed up, select “All-Time” report.
					</div>
					<div className='text-textColor raleway'>
						If you only want insights into the last 7 days' activity, select
						“Weekly” report.
					</div>
					<div className='flex flex-row w-full my-4 space-x-2'>
						<ReportBtn
							settingSelected={setAllTime}
							userId={user?.id}
						/>
					</div>
					<div className='mt-8 mb-8 text-4xl font-bold text-textColor raleway'>
						Showing {allTime ? 'all-time' : 'weekly'} report
					</div>
					<div className='grid w-full gap-2 mb-8 desktop:grid-cols-3 laptop:grid-cols-3 mobile:grid-cols-2'>
						<ReportWidgetBig
							title='Total completed lessons'
							data={data.completed}
							bgImage='banner-bg-3'
						/>
						<ReportWidgetBig
							bgImage='banner-bg-4'
							title='Total number of lessons in progress'
							data={data.inProgress}
						/>
						<div className='grid gap-2 desktop:grid-cols-1 laptop:grid-cols-1 mobile:col-span-2'>
							<ReportWidgetSmall
								color='bg-reportCard'
								data={data.hoursSpent}
								title='Total hours spent'
							/>
							<ReportWidgetSmall
								textColor='reportCard'
								data={data.averageQuizScore?.toFixed(2) + '%'}
								title='Average quiz results'
								bgImage='banner-bg-2'
							/>
						</div>
					</div>
					<div className='w-full mt-4 lg:w-2/3'>
						<LessonAnalytics completedList={data.completedList} />
					</div>
					<div className='mt-8 mb-20 cursor-pointer'>
						<div
							onClick={() => generate()}
							data-html2canvas-ignore
						>
							<div
								className={`desktop:w-1/3 laptop:w-1/3 mobile:w-full p-2 py-4 banner-bg-2 rounded-lg`}
							>
								<div className='text-2xl font-bold text-center text-reportCard raleway'>
									Download as pdf
								</div>
							</div>
						</div>
					</div>
					<div className='desktop:w-2/3 laptop:'></div>
					<div className='grid desktop:grid-cols-3 laptop:grid-cols-3 desktop:gap-5 laptop:gap-5 mobile:grid-cols-1 '>
						<div className=''>
							<img
								src={`${baseUrl}logo.png`}
								alt='Logo'
								className='mobile:mb-2'
							/>
							<div className='text-base font-bold raleway mobile:text-center'>
								School done your way
							</div>
						</div>
						<div className='mobile:mt-4'>
							<div className='text-base font-bold raleway mobile:text-center'>
								Help Center
							</div>
							<div className='text-base font-bold raleway mobile:text-center'>
								Email: &nbsp;
								<br className='mobile:hidden' />
								<span>
									<a href='mailto:info@suadvantage.ac.za'>
										info@suadvantage.ac.za
									</a>
								</span>
							</div>
						</div>
						<div className='mobile:mt-4'>
							<div className='text-base font-bold text-center raleway'>
								Our Content
							</div>
							<div className='flex justify-center '>
								<img
									src={`${baseUrl}CapsImg.png`}
									alt=''
									className='desktop:w-52 laptop:w-52 mobile:w-40'
								/>
							</div>
						</div>
					</div>

					<div className='w-full mb-8 border-b-2 border-white'></div>
					<div className='flex flex-wrap gap-16 mb-4'>
						<div className='mt-1 font-bold raleway'>
							© 2022 SU Advantage | All Rights Reserved |{' '}
							<a href='./pp'>Privacy Policy</a> | is powered
						</div>
						<div className='mobile:full'>
							<img
								src={`${baseUrl}FooterImg.png`}
								alt=''
								className='w-32'
							/>
						</div>
					</div>
				</div>
			</ReportBackground>
		</div>
	)
}

export default StudentReportPage
