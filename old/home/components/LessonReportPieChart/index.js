import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
	if (active) {
		return (
			<div className='p-2 space-y-3 text-xs text-textColor bg-compBg rounded-lg shadow-lg   '>
				<div className='text-xs'>
					{payload[0].name} Avg.{' '}
					{payload[0].payload.averageQuizScore.toFixed(2)}%
				</div>
				<div>
					<span className='text-xl font-bold'>
						{payload[0].value} Completed
					</span>
				</div>
				<hr />
				<div className='text-2xs'> of {payload[0].payload.lmsQuizs} quizs</div>
			</div>
		)
	}
	return null
}

export const LessonReportPieChart = ({ dataset }) => {
	const data = dataset
	let colors = [
		'#642340',
		'#7f2855',
		'#8c3c67',
		'#9c4878',
		'#aa6489',
		'#b46b95',
		'#c085a4',
		'#cc95b5',
		'#d3a0b9',
		'#e0bed3',
		'#deb6c9',
		'#e6c8d8',
		'#e4c6d4',
		'#e7cedd'
	]

	return (
		<div style={{ width: '100%', height: 510 }}>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						innerRadius={0}
						fill='#8884d8'
						dataKey='isComplete'
					>
						{data?.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={colors[index % colors.length]}
							/>
						))}
					</Pie>
					<Tooltip content={<CustomTooltip />} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}
