import React from 'react'

const CssStepper = ({ step = 1 }) => {
	return (
		<div>
			<div className='stepperContainer'>
				<div
					className={`step  ${
						step === 1 ? 'active' : step > 1 ? 'completed' : ''
					}`}
				>
					<div className='v-stepper'>
						<div className='circle'></div>
						<div className='line'></div>
					</div>
					<div className='content'>
						<div className='text-2xl font-bold text-textColor'>Step 1</div>
						<div className='text-textColor heading'>General Info</div>
					</div>
				</div>
				<div
					className={`step  ${
						step == 2
							? 'active'
							: step < 2
							? 'opacity-50'
							: step > 2
							? 'completed'
							: ''
					}`}
				>
					<div className='v-stepper'>
						<div className='circle'></div>
						<div className='line'></div>
					</div>
					<div className='content'>
						<div className='text-2xl font-bold text-textColor'>Step 2</div>
						<div className='text-textColor heading'>School Info</div>
					</div>
				</div>
				<div
					className={`step  ${
						step == 3
							? 'active'
							: step < 3
							? 'opacity-50'
							: step > 3
							? 'completed'
							: ''
					}`}
				>
					<div className='v-stepper'>
						<div className='circle'></div>
						<div className='line'></div>
					</div>
					<div className='flex content'>
						<div className='text-2xl font-bold text-textColor'>Step 3</div>
						<div className='text-textColor heading'>Next of kin Info</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CssStepper
