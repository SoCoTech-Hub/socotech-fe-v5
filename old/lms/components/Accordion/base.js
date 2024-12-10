import { useState } from 'react'
import { ChevDown, ChevUp } from '../SvgIcons'

const AccordionBase = ({ title, data }) => {
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
					<span className='pl-8'>{title}</span>
					{active ? (
						<ChevUp className='w-6 h-6 ml-auto rotate-180 shrink-0' />
					) : (
						<ChevDown className='w-6 h-6 ml-auto rotate-180 shrink-0' />
					)}
				</button>
			</h2>
			<div
				id='accordion-collapse-body-1'
				className={active ? '' : 'hidden'}
				aria-labelledby='accordion-collapse-heading-1'
			>
				{data}
			</div>
		</div>
	)
}

export default AccordionBase
