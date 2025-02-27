const AccordionSection = ({ id, question, answer, faqId, setFaqId }) => {
	const Clicker = () => {
		if (faqId == id) {
			setFaqId(null)
		} else {
			setFaqId(id)
		}
	}

	return (
		<div className='my-2'>
			<div
				onClick={Clicker}
				style={{ cursor: 'pointer' }}
				className='p-2 text-base text-white rounded-lg bg-themeColorSecondary'
			>
				{question}
				<div style={{ float: 'right' }}>
					{faqId == id ? <span>&#9650;</span> : <span>&#9660;</span>}
				</div>
			</div>
			{faqId == id && (
				<div className='p-2 border-2 rounded-lg border-themeColorSecondary text-textColor'>
					<div label={question}>
						<div dangerouslySetInnerHTML={{ __html: answer }} />
					</div>
				</div>
			)}
		</div>
	)
}

export default AccordionSection
