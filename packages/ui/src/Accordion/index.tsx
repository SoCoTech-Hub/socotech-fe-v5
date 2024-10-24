import AccordionSection from './AccordionSection';

interface Faq {
  id: string | number; // Adjust the type depending on what `id` is in your data
  question: string;
  answer: string;
}

interface AccordionProps {
  faqs: Faq[];
}

const Accordion: React.FC<AccordionProps> = ({ faqs }) => (
  <>
    {faqs.map((faq) => (
      <div key={faq.id}>
        <AccordionSection question={faq.question} answer={faq.answer} />
      </div>
    ))}
  </>
);

export default Accordion;
