import React from 'react'

const index = ({ label, value = false, onChange }) => {
	return (
		<div>
			{/* {!value ? ( */}
			<div className='flex justify-center'>
				<div className='form-check form-switch'>
					<input
						className='float-left h-5 -ml-10 align-top bg-no-repeat bg-contain rounded-full shadow-md appearance-none cursor-pointer bg-compBg form-check-input w-9 focus:outline-none'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
						onChange={() => onChange(!value)}
						value={value}
					/>
					<label
						className='inline-block form-check-label text-textColor'
						htmlFor='flexSwitchCheckDefault'
					>{` ${label}`}</label>
				</div>
			</div>
			{/* ) : (
            <div className="flex justify-center">
                <div className="form-check form-switch">
                    <input 
                        className="float-left h-5 -ml-10 align-top bg-compBg bg-compBg bg-no-repeat bg-contain rounded-full shadow-md appearance-none cursor-pointer form-check-input w-9 focus:outline-none" 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckChecked"
                        onChange={() => onChange(!value)}
                        // value={value}
                        checked
                    />
                    <label className="inline-block text-gray-800 form-check-label" htmlFor="flexSwitchCheckChecked">{` ${label}`}</label>
                </div>
            </div>
        )} */}
		</div>
	)
}

export default index
