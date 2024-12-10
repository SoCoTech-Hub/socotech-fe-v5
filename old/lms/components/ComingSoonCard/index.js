import Link from 'next/link'
import Clamp from 'react-multiline-clamp'
import { baseUrl } from '@/context/constants'

const index = ({
	imageUrl = `${baseUrl}/coming_soon.png`,
	subject = '',
	lessonTitle = '',
	// duration = "0",
	link = '#'
}) => {
	return (
		<div>
			<div className='w-full h-44'>
				<div className='h-auto overflow-hidden bg-compBg shadow-menu rounded-lg  '>
					{link !== '#' ? (
						<Link
							href={link}
							passHref
						>
							<div
								className='mt-5 overflow-hidden cursor-pointer h-28'
								style={{
									backgroundImage: `url(${imageUrl})`,
									backgroundPosition: '50% 50%',
									backgroundSize: 'cover'
								}}
							></div>
						</Link>
					) : (
						<div
							className='mt-5 overflow-hidden h-28 '
							style={{
								backgroundImage: `url(${imageUrl})`,
								backgroundPosition: '50% 50%',
								backgroundSize: 'cover'
							}}
						></div>
					)}
					<div className='p-3 '>
						<div className='h-12 font-semibold text-center text-textColor  '>
							<Clamp lines={2}>
								<div
									className=''
									dangerouslySetInnerHTML={{ __html: lessonTitle }}
								/>
							</Clamp>
						</div>
						<div className='py-1 text-xs font-semibold text-textColor '>
							{subject}
						</div>
						<div className='py-2 font-semibold text-textColor text-xxs '></div>
						{link !== '#' ? (
							<Link
								href={link}
								passHref
							>
								<div className='w-full py-1 text-center rounded-full cursor-pointer text-textColor text-xxs bg-themeColorMain'>
									See more
								</div>
							</Link>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default index
