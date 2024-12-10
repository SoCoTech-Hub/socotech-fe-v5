import { useState } from 'react'

const index = ({ settingSelected }) => {
	const [selectedAllTime, setAllTime] = useState(true)

	const setSelected = async (bool) => {
		setAllTime(bool)
		settingSelected(bool)
	}
	return (
		<>
			{selectedAllTime ? (
				<>
					<div className='w-1/3 mobile:w-full'>
						<div onClick={() => setSelected(true)}>
							<div className='p-2 py-4 rounded-lg cursor-pointer bg-reportCard'>
								<div className='text-2xl font-bold text-center text-textColor raleway'>
									All-Time Report
								</div>
							</div>
						</div>
					</div>
					<div className='w-1/3 mobile:w-full'>
						<div onClick={() => setSelected(false)}>
							<div className={` p-2 py-4 bg-compBg rounded-lg cursor-pointer`}>
								<div className='text-2xl font-bold text-center text-reportCard raleway'>
									Weekly Report
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className='w-1/3'>
						<div onClick={() => setSelected(true)}>
							<div className={` p-2 py-4 bg-compBg rounded-lg cursor-pointer`}>
								<div className='text-2xl font-bold text-center text-reportCard raleway'>
									All-Time Report
								</div>
							</div>
						</div>
					</div>
					<div className='w-1/3'>
						<div onClick={() => setSelected(false)}>
							<div className='p-2 py-4 rounded-lg cursor-pointer bg-reportCard'>
								<div className='text-2xl font-bold text-center text-textColor raleway'>
									Weekly Report
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default index
