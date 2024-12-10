const InfoBox = ({ icon, info }) => {
	return (
		<div>
			<div className='flex items-center content-center object-center align-middle'>
				<div className=' place-content-center'>
					<img
						src={icon}
						alt=''
						className='w-5 h-5'
					/>
				</div>
				<div className='ml-4 text-textColor'>{info}</div>
			</div>
		</div>
	)
}

export default InfoBox
