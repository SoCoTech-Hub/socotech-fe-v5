import { useState } from 'react'

const AccordionSection = ({ topic, criteria, remarks, score }) => {
	const [active, setActive] = useState(false)

	return (
		<div
			id='accordion-collapse'
			data-accordion='collapse'
			className='pb-2'
		>
			<h2 id='accordion-collapse-heading-1'>
				<button
					type='button'
					className='flex items-center justify-between w-full p-3 text-lg bg-compBg border border-b-0 border-gray-200 rounded-full text-textColor      hover:bg-compBg  '
					data-accordion-target='#accordion-collapse-body-1'
					aria-expanded='true'
					aria-controls='accordion-collapse-body-1'
					onClick={() => setActive(!active)}
				>
					<span className='pl-8'>{topic}</span>
					<svg
						data-accordion-icon
						className='w-6 h-6 ml-auto rotate-180  shrink-0'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
							clip-rule='evenodd'
						></path>
					</svg>
					<p className='px-2 mx-2 text-sm rounded-full text-textColor bg-primary'>
						{score}
					</p>
				</button>
			</h2>
			<div
				id='accordion-collapse-body-1'
				className={active ? '' : 'hidden'}
				aria-labelledby='accordion-collapse-heading-1'
			>
				<div className='px-12 py-4'>
					<p className='mb-3'>
						{criteria ? (
							<>
								<div className='text-lg'>Criteria</div>
								<div
									className=''
									dangerouslySetInnerHTML={{ __html: criteria }}
								/>
							</>
						) : (
							<></>
						)}
					</p>
					<p className='mb-3'>
						{remarks ? (
							<>
								<div className='text-lg'>Remarks</div>
								<div
									className=''
									dangerouslySetInnerHTML={{ __html: remarks }}
								/>
							</>
						) : (
							<></>
						)}
					</p>
				</div>
			</div>
		</div>
	)
}

export default AccordionSection
