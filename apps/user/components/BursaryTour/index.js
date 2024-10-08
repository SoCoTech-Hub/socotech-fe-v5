import { useState } from 'react'
import { baseUrl } from '@/context/constants'

const index = ({ header = 'Explore bursaries currently available in SA' }) => {
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
								></a>
							</div>
							<div className='pb-5 pr-3'>
								<div className='pt-3 font-bold leading-tight text-textColor text-4xl'>
									{header}
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
