import Link from 'next/link'
import { useState } from 'react'
import Clamp from 'react-multiline-clamp'
import { baseUrl } from '@/context/constants'
import Modal from '../Modal'
import Redirect from './redirect'
import { LockIcon } from '../SvgIcons'

const LessonCard = ({
	imageUrl = `${baseUrl}/coming_soon.png`,
	subject = 'Coming Soon',
	lessonTitle = 'Coming Soon',
	duration = '0',
	link = '#',
	disabled = true
}) => {
	const [open, setOpen] = useState(false)
	return (
		<div className={`w-full ${disabled ? 'relative' : ''}`}>
			<Modal
				open={open}
				setOpen={setOpen}
				children={<Redirect />}
			/>
			<div
				className='desktop:h-auto laptop:h-auto mobile:h-56 overflow-hidden rounded-lg cursor-pointer bg-compBg shadow-menu'
				onClick={disabled ? () => setOpen(true) : () => {}}
			>
				{disabled ? (
					<div
						className='overflow-hidden h-28 mobile:h-16 relative'
						style={{
							backgroundImage:
								imageUrl == `${baseUrl}/coming_soon.png`
									? `url(${imageUrl})`
									: `url(${imageUrl})`,
							backgroundPosition: '50% 50%',
							backgroundSize: 'cover'
						}}
					>
						<div className='absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
							<LockIcon
								fill='#fff'
								height='40'
							/>
						</div>
					</div>
				) : (
					<Link
						href={disabled ? '' : link}
						passHref
					>
						<div
							className='overflow-hidden h-28 mobile:h-16'
							style={{
								backgroundImage:
									imageUrl == `${baseUrl}/coming_soon.png`
										? `url(${imageUrl})`
										: `url(${imageUrl})`,
								backgroundPosition: '50% 50%',
								backgroundSize: 'cover'
							}}
						></div>
					</Link>
				)}
				<div className='flex flex-wrap justify-between desktop:p-3 laptop:p-3 mobile:p-2'>
					<div className='w-full h-12 leading-tight text-textColor desktop:text-lg laptop:text-lg mobile:text-base'>
						<Clamp lines={2}>
							<div
								className=''
								dangerouslySetInnerHTML={{ __html: lessonTitle }}
							/>
						</Clamp>
					</div>
					<div className='w-full mt-3'>
						<div className=' text-textColor desktop:text-base laptop:text-base mobile:text-sm'>
							{subject}
						</div>
						<div className='mb-2 text-textColor desktop:text-sm laptop:text-sm mobile:text-xs'>
							Lesson duration {duration}min
						</div>
						{(link !== '#') & !disabled ? (
							<Link
								href={link}
								passHref
							>
								<div className='w-full py-1 text-xs text-center text-black rounded-full cursor-pointer bg-themeColorMain'>
									See more
								</div>
							</Link>
						) : (
							<div className='w-full py-1 text-xs text-center text-black rounded-full cursor-pointer bg-themeColorMain'>
								{disabled ? 'Subscribe' : 'Unavailable'}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LessonCard
