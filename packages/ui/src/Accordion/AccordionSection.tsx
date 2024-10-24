import { useState } from 'react';

interface AccordionSectionProps {
  question: string;
  answer: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='my-2'>
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer' }}
        className='p-2 text-base rounded-lg text-textColor bg-themeColorMain'
      >
        {question}
        <div style={{ float: 'right' }}>
          {!open ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
      </div>
      {open && (
        <div className='p-2 border-2 rounded-lg border-themeColorMain body-text'>
          <div>
            <div dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
