import lessonProgressCalc from "@/snippets/lms/lessonProgressCalc";

import { BorderLinearProgress } from "./style";

export default function LessonProgressBar({ progresses = [], lesson = [] }) {
  return (
    <>
      <div className="shadow-menu mb-3 rounded-lg bg-white p-3">
        <div className="text-lessonFontColor flex text-5xl font-semibold">
          {lesson?.subject?.name}
        </div>
        <div className="mb-4 flex justify-between">
          <div className="text-base text-gray-500">{lesson?.name}</div>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg bg-gray-100 px-1 py-0.5 pr-0.5 align-middle">
          <div className="flex-grow p-2">
            <BorderLinearProgress
              variant="determinate"
              value={lessonProgressCalc({
                totalSteps: progresses?.totalSteps,
                completedSteps: progresses?.completedSteps,
              })}
            />
          </div>

          <div
            className="percentageText ml-3 mr-2 text-xs font-bold"
            style={{ paddingTop: "3px" }}
          >
            {lessonProgressCalc({
              totalSteps: progresses?.totalSteps,
              completedSteps: progresses?.completedSteps,
            })}
            % Completed
          </div>
        </div>
      </div>
    </>
  );
}
