import { mainUrl } from '@/context/constants'
import getReadableDate from '@/snippets/user/getReadableDate'
import {
	AcademicCapIcon,
	ClockIcon,
	InformationCircleIcon,
	LinkIcon,
	MapPinIcon
} from '@heroicons/react/20/solid'

const EventDetail = ({ event }) => (
	<div className='mx-auto max-h-xl desktop:px-4 py-14 mobile:py-6'>
		<div className='relative overflow-hidden rounded-lg'>
			{event.image ? (
				<div className='absolute inset-0'>
					<img
						src={event.image?.url}
						alt={event.title}
						className='object-cover object-center w-full h-full rounded-lg'
					/>
				</div>
			) : (
				<></>
			)}
			<div
				aria-hidden='true'
				className='relative w-full h-96 mobile:h-2'
			/>
			<div
				aria-hidden='true'
				className='relative w-full h-32 mobile:h-96'
			/>
			<div className='absolute inset-x-0 bottom-0 p-6 bg-black bg-opacity-75 rounded-md mobile:p-1 backdrop-blur backdrop-filter mobile:flex mobile:items-center mobile:justify-between desktop:inset-x-auto desktop:inset-y-0 laptop:inset-x-auto laptop:inset-y-0 desktop:max-w-2xl desktop:flex-col laptop:max-w-2xl laptop:flex-col'>
				<div>
					<h2 className='text-xl font-bold'>
						<p className='mb-4 text-center text-themeColorMain'>
							{event.title}
						</p>
					</h2>
					<p className='mt-1 text-sm text-gray-300'>
						<time
							dateTime={event.start}
							className='flex items-center mt-2 mobile:text-center text-textColor'
						>
							<ClockIcon
								className='w-4 h-4 mr-2 rounded-full text-textColor bg-themeColorMain'
								aria-hidden='true'
								style={{ fill: '#000' }}
							/>
							{getReadableDate(event.start)} - {getReadableDate(event.end)}
						</time>
						{event.desciption && (
							<div className='flex flex-row items-start w-11/12 mt-2 text-textColor line-clamp-4 laptop:h-1/5 desktop:h-1/5 mobile:h-1/4'>
								<span className='inline-flex flex-col items-center'>
									<InformationCircleIcon
										className='w-4 h-4 mr-2 rounded-full text-textColor bg-themeColorMain'
										aria-hidden='true'
										style={{ fill: '#000' }}
									/>
								</span>
								<div
									className='flex-col pl-6 -mt-8 text-textColor'
									dangerouslySetInnerHTML={{
										__html: event.desciption
									}}
								/>
							</div>
						)}
						{event.location && (
							<p className='flex items-center mt-2 text-textColor '>
								<MapPinIcon
									className='w-4 h-4 mr-2 rounded-full text-textColor bg-themeColorMain'
									aria-hidden='true'
									style={{ fill: '#000' }}
								/>
								{event.location}
							</p>
						)}
						{event.href && (
							<a
								href={event.href}
								className='flex items-center mt-2 text-textColor'
							>
								<LinkIcon
									className='w-4 h-4 mr-2 rounded-full text-textColor bg-themeColorMain'
									aria-hidden='true'
									style={{ fill: '#000' }}
								/>
								{event.href}
							</a>
						)}
						{event.lesson && (
							<p className='mt-4 text-textColor'>
								<a
									href={`${mainUrl}/lms/${event.lesson?.id}`}
									className='flex items-center'
								>
									<AcademicCapIcon
										className='w-4 h-4 mr-2 rounded-full text-textColor bg-themeColorMain'
										aria-hidden='true'
										style={{ fill: '#000' }}
									/>
									{event.lesson?.name}
								</a>
							</p>
						)}
					</p>
					{event.editable ? (
						<a
							href={`/user/events/edit?id=${event.id}`}
							className='flex items-center justify-center flex-shrink-0 p-2 mx-auto mt-6 font-medium text-black rounded-md bg-themeColorMain desktop:w-1/2 mobile:w-1/10'
						>
							Edit
							<span className='sr-only'>, {event.title}</span>
						</a>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	</div>
)

export default EventDetail
