import React from 'react'
import UserStatsBox from '@/components/UserStatsBox'
import countIsComplete from '@/snippets/countIsComplete'
import countInProgress from '@/snippets/countInProgress'
import {
	AverageQuizScoreIcon,
	StatsCompletedIcon,
	StatsHoursIcon,
	StatsInprogressIcon
} from '../SvgIcons'

const index = ({ stats, time }) => {
	const hours = time / 60
	const incomplete = countInProgress(stats)
	const complete = countIsComplete(stats)

	return (
		<div className='mobile:overflow-x-scroll mobile:whitespace-nowrap no-scrolly mobile:overflow-y-hidden'>
			<div className='grid w-full mobile:w-screen grid-cols-3 gap-2 place-items-stretch mobile:inline-flex mobile:space-x-2'>
				<div
					className='mobile:w-96 rounded-lg'
					style={{ backgroundColor: '#6097E9' }}
				>
					<UserStatsBox
						boxBackground=''
						iconBackground=''
						icon={<StatsHoursIcon className='float-right w-8 mobile:pt-3'/>}
						mainText={parseFloat(hours).toFixed(2)}
						subText='Total Hours Spent'
					/>
				</div>
				<div
					className='mobile:w-96 rounded-lg'
					style={{ backgroundColor: '#D2EF79' }}
				>
					<UserStatsBox
						boxBackground=''
						iconBackground=''
						icon={
							<StatsCompletedIcon className='float-right w-8 mobile:pt-3'/>
						}
						mainText={complete}
						subText='Completed Lessons'
					/>
				</div>
				<div
					className='mobile:w-96 rounded-lg'
					style={{ backgroundColor: '#F5CFD2' }}
				>
					<UserStatsBox
						boxBackground=''
						iconBackground=''
						icon={
							<StatsInprogressIcon className='float-right w-8 mobile:pt-3'/>
						}
						mainText={incomplete}
						subText='Lessons in Progress'
					/>
				</div>
				{/* <div
					className='mobile:w-96 rounded-lg'
					style={{ backgroundColor: '#E95640' }}
				>
					<UserStatsBox
						boxBackground=''
						iconBackground=''
						icon={
							<AverageQuizScoreIcon className='float-right w-8 mobile:pt-3'/>
						}
						mainText={incomplete}
						subText='Average Quiz Score'
					/>
				</div> */}
			</div>
		</div>
	)
}

export default index
