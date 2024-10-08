// import WidgetIcon from '../SvgIcons'

const index = ({
	title = 'Big Widget',
	data = '1542',
	bgImage = 'banner-bg-1'
}) => {
	return (
		<div className={`desktop:h-48 p-2 rounded-lg  ${bgImage}`}>
			<div className='flex flex-wrap'>
				<div className='flex justify-between pr-2'>
					<div className='mb-1 ml-4 w-14 h-14'>{/* <WidgetIcon /> */}</div>
				</div>
				<div className='pt-1 pl-5 text-4xl font-bold text-textColor raleway'>
					{data}
				</div>
				<div className='pl-5 text-lg text-textColor raleway mobile:w-full'>
					{title}
				</div>
			</div>
		</div>
	)
}

export default index
