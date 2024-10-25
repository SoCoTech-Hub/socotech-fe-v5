import { useState } from "react";

const AccordionSection = ({ question, answer }) => {
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
          {!open && <span>&#9650;</span>}
          {open && <span>&#9660;</span>}
        </div>
      </div>
      {open && (
        <div className="border-themeColorMain body-text rounded-lg border-2 p-2">
          <div label={question}>
            <div className="" dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
