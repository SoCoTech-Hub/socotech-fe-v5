import { useState } from 'react'
import AccordionSection from './AccordionSection'

const Accordion = ({ faqs }) => {
	const [faqId, setFaqId] = useState(null)
	return (
		<>
			{faqs.map((faq, i) => (
				<div key={i}>
					<AccordionSection
						id={faq?.id}
						question={faq?.question}
						answer={faq?.answer}
						setFaqId={setFaqId}
						faqId={faqId}
					/>
				</div>
			))}
		</>
	)
}
export default Accordion