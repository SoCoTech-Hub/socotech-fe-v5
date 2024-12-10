import { useState } from 'react'
// import { useTour } from "@reactour/tour"
// import Btn from "@/components/Btn"
// import { CloseIcon } from "@/components/SvgIcons"
import { baseUrl } from '@/context/constants'

const index = ({
	header = 'Explore qualifications currently available in SA'
}) => {
	// const { setIsOpen } = useTour()
	const [closed, setClosed] = useState(false)

	if (!closed) {
		return (
			<div>
				<div className='rounded-lg bg-applicationsBg'>
					<div className='row'>
						<div className='flex p-10 col place-content-center'>
							<img
								src={`${baseUrl}/applications-tour.png`}
								alt='Welcome Image'
								className='object-contain'
							/>
						</div>
						<div className='col'>
							<div className='p-3'>
								<a
									onClick={() => {
										setClosed(true)
									}}
								>
									{/* <div className="float-right w-6 h-6 cursor-pointer ">
                    <CloseIcon />
                  </div> */}
								</a>
							</div>
							<div className='pb-5 pr-3'>
								<div className='pt-3 font-bold leading-tight text-textColor text-4xl'>
									{header}
								</div>
								<div className='pt-2 pr-1 desktop:pr-6 laptop:pr-2 mobile:pr-1 '>
									<p className='leading-tight break-words text-textColor text-lg'>
										Start your career by searching and selecting the perfect
										qualification to land the job of your dreams
									</p>
								</div>
								<div className='pt-3'></div>
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
