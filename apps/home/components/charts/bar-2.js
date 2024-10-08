import { useSelector, shallowEqual } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { getColor, isDarkPalette } from '@/components/GraphColors'

const Chart = ({ height = 400, labelsList, datasets }) => {
	const { palettes, collapsed, layout } = useSelector(
		(state) => ({
			palettes: state.palettes,
			collapsed: state.collapsed,
			layout: state.layout
		}),
		shallowEqual
	)
	const { background } = { ...palettes }
	const isDark = isDarkPalette(background)
	const key = `${layout}-${collapsed}-${background}`

	const labels = labelsList
	const legend = {
		display: false,
		position: 'bottom',
		labels: {
			fontColor: isDark
				? getColor('text-textColor')
				: getColor('text-textColor'),
			boxWidth: 10,
			fontSize: 14
		}
	}

	const options = {
		tooltips: {
			mode: 'index',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		animation: {
			duration: 1
		},
		maintainAspectRatio: false,
		layout: {
			padding: {
				left: 10,
				right: 10,
				top: 10,
				bottom: 10
			}
		},
		scales: {
			xAxes: [
				{
					stacked: true,
					ticks: {
						fontColor: isDark
							? getColor('text-textColor')
							: getColor('text-textColor'),
						min: 0,
						autoSkip: false,
						maxRotation: 30,
						minRotation: 0,
						fontStyle: 'bold'
					},
					gridLines: {
						drawBorder: true,
						display: true,
						color: 'rgba(0, 100, 0, 0)',
						drawOnChartArea: true
					}
				}
			],
			yAxes: [
				{
					stacked: true,
					ticks: {
						fontColor: isDark
							? getColor('text-textColor')
							: getColor('text-textColor'),
						min: 0,
						autoSkip: false,
						maxRotation: 0,
						minRotation: 0
					},
					gridLines: {
						drawBorder: true,
						display: true,
						color: 'rgba(100, 0, 0, 0)',
						drawOnChartArea: true
					}
				}
			]
		}
	}

	const data = {
		labels: labels,
		datasets: datasets
	}

	return (
		<div style={{ height: height }}>
			<Bar
				key={key}
				data={data}
				height={height}
				options={options}
				legend={legend}
			/>
		</div>
	)
}

export default Chart
