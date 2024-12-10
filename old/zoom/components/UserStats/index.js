import React from "react"
import UserStatsBox from "@/components/UserStatsBox"
import countIsComplete from "@/snippets/countIsComplete"
import countInProgress from "@/snippets/countInProgress"
import {
  StatsCompletedIcon,
  StatsHoursIcon,
  StatsInprogressIcon,
} from "../SvgIcons"

const index = ({ stats, time }) => {
  const hours = time / 60
  const incomplete = countInProgress(stats)
  const complete = countIsComplete(stats)

  return (
		<div>
			<div className='flex flex-row justify-between stats justify text-xs'>
				<div className='p-2 col text-xs'>
					<UserStatsBox
						boxBackground='bg-totalHours'
						iconBackground='bg-totalHoursIcon'
						icon={<StatsHoursIcon className='w-8' />}
						mainText={parseFloat(hours).toFixed(2)}
						subText='Total hours Spent'
					/>
				</div>
				<div className='p-2 col text-xs'>
					<UserStatsBox
						boxBackground='bg-completedLessons'
						iconBackground='bg-completedLessonsIcon'
						icon={<StatsCompletedIcon className='w-8' />}
						mainText={complete}
						subText='Completed Lessons'
					/>
				</div>
				<div className='p-2 col text-xs'>
					<UserStatsBox
						boxBackground='bg-lessonsInProgress'
						iconBackground='bg-lessonsInProgressIcon'
						icon={<StatsInprogressIcon className='w-8' />}
						mainText={incomplete}
						subText='Lessons in progress'
					/>
				</div>
			</div>
		</div>
	)
}

export default index
