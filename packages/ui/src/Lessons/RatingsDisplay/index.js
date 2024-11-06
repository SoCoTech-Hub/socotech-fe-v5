import { BorderLinearProgress } from "@/components/LessonRating/style"

const RatingsDisplay = ({ ratings }) => {
  return ratings.map((rating) => (
		<div
			key={rating.id}
			className='flex flex-col w-full space-y-3 '
		>
			<div className='flex flex-row items-center text-xs align-middle'>
				<div className='text-center col-2 item'>
					<div className='font-bold text-textColor'>{rating.id}</div>
				</div>
				<div className='col-8 item'>
					<BorderLinearProgress
						variant='determinate'
						value={rating.percentage ? rating.percentage : 0}
					/>
				</div>
				<div className='text-center col-2 item'>
					<div className='font-bold text-textColor '>{rating.total}</div>
				</div>
			</div>
		</div>
	))
}
export default RatingsDisplay
