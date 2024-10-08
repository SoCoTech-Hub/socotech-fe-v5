import { useEffect, useState } from 'react'
import { useTour } from '@reactour/tour'
import { CloseIcon } from '@/components/SvgIcons'
import Tour from '@/components/Tour'
import { baseUrl } from '@/context/constants'

const index = ({ startTour }) => {
	const { isOpen, setIsOpen } = useTour()
	const [closed, setClosed] = useState(false)

	useEffect(() => {
		if (startTour) {
			setIsOpen(startTour)
		}
	}, [])
	useEffect(() => {
		if (isOpen) {
			setClosed(isOpen)
		}
	}, [isOpen])

	if (!closed) {
		return (
			<div>
				<div className='pl-8 rounded-lg bg-themeColorMain'>
					<div className='row'>
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
							<div className='pr-3 mr-20 text-3xl font-bold leading-tight mobile:pl-8 text-textColorSecondary'>
								Welcome to Topic, you're ready to start dropping some knowledge
								bombs in class.
							</div>

							<div className='mr-20 mobile:pl-8'>
								<p className='py-2 leading-tight text-textColorSecondary text-md'>
									We've curated a world-class collection of courses, videos, and
									interactive content to help you level up your school marks.
								</p>
							</div>
						</div>
						<div className='flex justify-between'>
							<div className='justify-start py-3 mt-6 text-textColorSecondary'>
								<Tour />
							</div>
							<div className='justify-end pb-3 pr-3 mobile:hidden'>
								<img
									src={`${baseUrl}/hello.gif`}
									alt='Welcome Image'
									className='object-contain'
									height={150}
									width={150}
								/>
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
