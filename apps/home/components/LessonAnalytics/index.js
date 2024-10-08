// import Bar2 from "@/components/charts/bar-2"
// import Widget from "@/components/widget"
// import { Donut3, PieChart1 } from "@/components/recharts/donut"
import { ProgressBar } from '@/components/progress-bars'
// import DefaultSelect from "../DefaultSelect"
// import { Select } from "../forms/selects"
import { LessonReportPieChart } from '../LessonReportPieChart'

const LessonAnalytics = ({ completedList }) => {
	return (
		<div className='px-6 py-3 rounded-lg bg-compBg'>
			<div className='flex justify-between'>
				<div className='mt-2 mb-5 text-3xl font-bold text-reportCard raleway'>
					Subject and quiz completion
				</div>
			</div>

			<div className='w-full'>
				<div className='flex flex-wrap items-center content-center'>
					<div className='flex w-1/3'>
						<div className='w-full space-y-4'>
							{completedList?.map((x, index) => (
								<div
									className='w-auto'
									key={index}
								>
									<div className='font-semibold'>{x.name}</div>
									<ProgressBar
										width={parseInt(
											((x.isComplete / x.lmsQuizs) * 100).toFixed(2)
										)}
										index={index}
										toolTipTitle={x.name}
									/>
								</div>
							))}
						</div>
					</div>
					<div className='w-2/3'>
						<LessonReportPieChart dataset={completedList} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default LessonAnalytics
