import { useState } from 'react'

const AccordionSection = ({ question, answer }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className='my-2'>
			<div
				onClick={() => setOpen(!open)}
				style={{ cursor: 'pointer' }}
				className='p-2 text-base rounded-lg text-textColor bg-themeColorMain'
			>
				{question}
				<div style={{ float: 'right' }}>
					{!open && <span>&#9650;</span>}
					{open && <span>&#9660;</span>}
				</div>
			</div>
			{open && (
				<div className='p-2 border-2 rounded-lg border-themeColorMain body-text'>
					<div label={question}>
						<div
							className=''
							dangerouslySetInnerHTML={{ __html: answer }}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default AccordionSection
