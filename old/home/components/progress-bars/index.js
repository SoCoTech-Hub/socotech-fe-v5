import PropTypes from 'prop-types'
import { ResponsiveContainer } from 'recharts'

export const ProgressBar = ({ width, index, toolTipTitle = 'Title Here' }) => {
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
	const CustomTooltip = () => {
		return (
			<div className='p-2 space-y-3 text-xs text-textColor bg-compBg rounded-lg shadow-lg   '>
				<div>
					<span className='text-lg font-bold'>{width}%</span>
				</div>
				<hr />
				<div className='text-2xs'>{toolTipTitle}</div>
			</div>
		)
	}
	return (
		<ResponsiveContainer>
			<div
				className={`relative flex flex-row w-full text-center text-xs items-center h-10`}
			>
				<div
					style={{
						width: `${width}%`,
						backgroundColor: colors[index % colors.length]
					}}
					className={`top-0 h-10 socoed_tooltip `}
				>
					<span className='socoed_tooltiptext'>{<CustomTooltip />}</span>
				</div>
			</div>
		</ResponsiveContainer>
	)
}

ProgressBar.propTypes = {
	width: PropTypes.number.isRequired,
	color: PropTypes.string
}
