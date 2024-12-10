import { baseUrl } from '@/context/constants'
import LogoOverlay from '@/components/LogoOverlay'

export default function TwoColPage({ col1Image, header, col2 }) {
	return (
		<>
			<div className='flex flex-wrap overflow-x-hidden g-0'>
				<div className='w-full desktop:w-1/2 laptop:w-1/2 mobile:h-1/3'>
					<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center'>
						<img
							src={col1Image ? col1Image : `${baseUrl}/brand-image.png`}
							alt='Image'
							className='mobile:hidden'
						/>
					</div>
				</div>
				<div className='w-full bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3'>
					<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center mobile:mx-1 mobile:-mt-4'>
						<div className='my-10 desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5'>
							<div className='w-4/5 pt-16 text-3xl font-bold mobile:pt-2 text-textHeading'>
								<LogoOverlay />
								<div className='pt-4'>{header}</div>
							</div>
							{col2}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
