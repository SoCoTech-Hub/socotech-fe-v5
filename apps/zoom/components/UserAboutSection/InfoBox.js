const InfoBox = ({ icon = 'about_school', info }) => {
	return (
		<div>
			<div className='flex items-center content-center justify-start object-center align-middle'>
				<div className=''>{icon}</div>
				<div className='ml-4 text-base font-bold text-textColor'>{info}</div>
			</div>
		</div>
	)
}

export default InfoBox
