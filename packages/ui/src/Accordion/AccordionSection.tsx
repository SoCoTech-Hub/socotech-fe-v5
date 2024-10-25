import { useState } from "react";

interface AccordionSectionProps {
  question: string;
  answer: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  question,
  answer,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-2">
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
        className="text-textColor bg-themeColorMain rounded-lg p-2 text-base"
      >
        {question}
        <div style={{ float: "right" }}>
          {!open ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
      </div>
      {open && (
        <div className="border-themeColorMain body-text rounded-lg border-2 p-2">
          <div>
            <div dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
