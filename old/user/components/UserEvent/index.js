import { mainUrl } from '@/context/constants'
import Clamp from 'react-multiline-clamp'

const index = ({ img, imgAlt, month, day, title, description, href }) => {
	return (
		<div className='h-full p-3 mb-3 rounded-lg bg-compBg justify-evenly shadow-menu  '>
			<div className=''>
				<img
					src={`${img}`}
					alt={imgAlt}
					className='w-full my-2 overflow-hidden desktop:h-60 laptop:h-52 mobile:h-44'
				/>
			</div>
			<div className='flex flex-row justify-between '>
				<div className='content-center w-4/12 mr-2 mobile:w-6/12'>
					<div className='p-2 border-2 border-gray-200 rounded-lg bg-compBg'>
						<div className='w-full text-center uppercase body-text '>
							{month}
						</div>
						<div className='w-full font-bold text-center heading '>{day}</div>
					</div>
				</div>
				<div className='w-10/12'>
					<div className='font-bold leading-tight  heading'>{title}</div>
					<div className='pt-1 body-text  line-clamp-3'>
						<Clamp
							showMoreElement={({ toggle }) => (
								<button
									type='button'
									onClick={toggle}
									className='mt-1 text-themeColorSecondary menu-title'
								>
									Show more
								</button>
							)}
							showLessElement={({ toggle }) => (
								<span
									type='button'
									onClick={toggle}
									className='mt-1 text-themeColorSecondary menu-title'
								>
									Show less
								</span>
							)}
							lines={3}
							withToggle
						>
							{description}
						</Clamp>
					</div>
				</div>
			</div>

			<div className='mt-2'>
				{href ? (
					<a href={`${mainUrl}/lms/${href}`}>
						<div className='w-full text-center rounded-full cursor-pointer text-textColor event-button h-7 text-xxs '>
							<div className='pt-2 text-center'>VIEW EVENT</div>
						</div>
					</a>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default index
