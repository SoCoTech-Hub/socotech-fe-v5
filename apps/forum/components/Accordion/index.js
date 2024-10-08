import AccordionSection from './AccordionSection'

const Accordion = ({ faqs }) => (
  <>
    {faqs.map((faq) => (
      <div key={faq.id}>
        <AccordionSection question={faq?.question} answer={faq?.answer} />
      </div>
    ))}
  </>
)
export default Accordion
