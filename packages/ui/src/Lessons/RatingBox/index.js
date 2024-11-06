import { StyledRating } from './style'

const index = ({ average = 0, total = 0 }) => {
	//TODO: Add images per rating number
	const image = [
		{ name: '1', icon: 'rating_5.png' },
		{ name: '2', icon: 'rating_5.png' },
		{ name: '3', icon: 'rating_5.png' },
		{ name: '4', icon: 'rating_5.png' },
		{ name: '5', icon: 'rating_5.png' }
	]

	return (
		<>
			<div className='h-48 p-4 rounded-lg bg-themeColorMain'>
				<div className='grid content-center'>
					<div className='flex justify-center mb-2'>
						<StyledRating
							name='average rating'
							value={average}
							size='large'
							precision={0.1}
							readOnly
						/>
					</div>
					<div className='flex flex-row items-center -mt-4 justify-evenly'>
						<div className='item'>
							<div className='text-6xl font-bold text-black'>{average}</div>
							<div className='-mt-3 text-black body-text'>Avg. Rating</div>
						</div>
						<div
							className='item '
							style={{ width: '6rem', height: '6rem' }}
						>
							<img
								src={
									image[average]
										? `/lms/${image[average].icon}`
										: `/lms/rating_5.gif`
								}
								alt=''
							/>
						</div>
					</div>

					<div className='mt-3 text-center text-black heading'>
						<span>{total}</span> Ratings
					</div>
				</div>
			</div>
		</>
	)
}

export default index
