import { useState } from 'react'
import { useTour } from '@reactour/tour'
import Btn from '@/components/Btn'
import { CloseIcon } from '@/components/SvgIcons'
import { baseUrl } from '@/context/constants'

const index = ({ userName }) => {
	const { setIsOpen } = useTour()
	const [closed, setClosed] = useState(false)

	if (!closed) {
		return (
			<div>
				<div className='-mx-3 rounded-lg bg-compBg'>
					<div className='row'>
						<div className='flex col justify-self-center'>
							<img
								src={`${baseUrl}/welcome-img.png`}
								alt='Welcome Image'
								className='p-5'
							/>
						</div>
						<div className='col'>
							<div className='p-3'>
								<a
									onClick={() => {
										setClosed(true)
									}}
								>
									<div className='float-right w-6 h-6 cursor-pointer '>
										<CloseIcon />
									</div>
								</a>
							</div>
							<div className='pb-5 pr-3'>
								<div className='pt-3 text-5xl font-bold leading-tight text-lessonFontColor'>
									Welcome
									<br />
									{userName}
								</div>
								<div className='pt-2 pr-6 '>
									<p className='break-words text-md text-lessonFontColor'>
										Set up your new profile below. Need help navigating the
										system, no problem! Take the tour by clicking the button
										below.
									</p>
								</div>
								<div className='pt-3'>
									<Btn
										trackingAction='Click on Take the tour button'
										label='Take the tour'
										onClickFunction={() => setIsOpen(true)}
										color='bg-themeColorMain'
										width='60'
										textSize='text-lg'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return <></>
	}
}

export default index
