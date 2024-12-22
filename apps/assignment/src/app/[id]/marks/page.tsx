import React from "react";
import { useRouter } from "next/router";

import AccordionSection from "../../../../../../packages/ui/src/Accordion";
import UploadThumbnail from "../../../../../../packages/ui/src/UploadThumbnail";

//TODO:fix uploadThumbnail
interface RubiconMark {
  topic: string;
  criteria: string;
  remarks: string;
  score: number;
}

interface Reply {
  isCompleted: boolean;
  assignment: {
    updated_at: string;
    title: string;
    question: string;
    attachment?: boolean;
  };
  grade: number;
  RubiconMark: RubiconMark[];
  feedback: string;
  attachmentReply?: string[];
}

interface MarksProps {
  reply: Reply | null;
}

const Marks: React.FC<MarksProps> = ({ reply }) => {
  const router = useRouter();

  if (!reply?.grade) {
    return (
      <>
        <div className="col row">
          <div className="gx-5 gy-4 space-y-10">
            <div className="grid justify-items-center">
              <div className="text-themeColorMain error-font font-bold">
                404
              </div>
              <div className="text-textColor text-center font-bold">
                Oops! This Assignment is not completed yet.
              </div>
              <div className="mb-3 mt-3">
                <a
                  onClick={() => router.back()}
                  className="d-inline-block bg-themeColorMain w-64 cursor-pointer rounded-full py-2 text-center font-bold text-black"
                >
                  Back to Home
                </a>
              </div>
              <div className="flex w-full justify-center">
                <img src="/lms/page404.png" alt="Error 404" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const { isCompleted, assignment, grade, RubiconMark } = reply;
  const date = new Date(assignment.updated_at);
  const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${date.getHours()}:${date.getMinutes()}`;

  return (
    <>
      {isCompleted || grade ? (
        grade ? (
          <>
            <div className="card rounded-lg border-none p-3">
              <div className="text-textColor px-8 text-2xl font-bold">
                {assignment.title}
              </div>
              <div className="text-textColor px-8 text-sm">{dateString}</div>
              <hr className="border-8 border-white" />
              <div className="text-normal mobile:text-base px-8 pb-2">
                {assignment.question}
              </div>
            </div>
            <div className="pt-4">
              {RubiconMark.map((mark, i) => (
                <div key={i}>
                  <AccordionSection
                    topic={mark.topic}
                    criteria={mark.criteria}
                    remarks={mark.remarks}
                    score={mark.score}
                  />
                </div>
              ))}
              <div
                className="card rounded-lg border-none p-3"
                dangerouslySetInnerHTML={{ __html: reply.feedback }}
              />
              <div className="card mt-2 rounded-lg border-none p-3">
                {assignment?.attachment && (
                  <>
                    <b>Marked Assignment:</b>
                    <UploadThumbnail files={reply.attachmentReply} />
                  </>
                )}
              </div>
              <div className="pl-12 pt-4 text-lg font-semibold" id="grade">
                Total score: {grade}%
              </div>
            </div>
          </>
        ) : (
          <div>Assignment Not Marked Yet</div>
        )
      ) : (
        <div>Assignment Not Found</div>
      )}
    </>
  );
};

export default Marks;
