import { useSelector, shallowEqual } from 'react-redux'
import { Pie } from 'react-chartjs-2'
import { getColor, isDarkPalette } from '@/functions/colors'
import { random } from '@/functions/numbers'

const Chart = ({ height }) => {
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

	const colors = [
		getColor('bg-red-500'),
		getColor('bg-blue-500'),
		getColor('bg-yellow-500')
	]
	const hoverColors = [
		getColor('bg-red-600'),
		getColor('bg-blue-600'),
		getColor('bg-yellow-600')
	]

	const data = {
		labels: ['Orders', 'Income', 'Users'],
		datasets: [
			{
				data: [random(50, 100), random(50, 100), random(50, 100)],
				backgroundColor: colors,
				borderColor: colors,
				hoverBorderColor: hoverColors,
				hoverBackgroundColor: hoverColors
			}
		]
	}

	const legend = {
		display: true,
		labels: {
			fontColor: isDark
				? getColor('text-textColor')
				: getColor('text-textColor'),
			boxWidth: 10,
			fontSize: 11
		}
	}

	const options = {
		animation: {
			duration: 0
		},
		maintainAspectRatio: false,
		layout: {
			padding: {
				left: 10,
				right: 10,
				top: 10,
				bottom: 10
			}
		}
	}

	return (
		<div style={{ height: height }}>
			<Pie
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
