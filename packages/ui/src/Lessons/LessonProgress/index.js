import lessonProgressCalc from "@/snippets/lms/lessonProgressCalc";

import { BorderLinearProgress, StyledRating } from "./style";

export default function LessonProgress({
  progresses = [],
  lesson = [],
  rating = [],
  hasRating = false,
}) {
  return (
    <>
      <div className="">
        <div className="text-lessonFontColor flex text-5xl font-semibold">
          {lesson?.subject?.name}
        </div>
        <div className="mb-4 flex justify-between">
          <div className="text-textColor text-base">{lesson?.name}</div>
          {hasRating ? (
            <div className="item self-center">
              <StyledRating
                name="average rating"
                value={rating?.starRating}
                size="medium"
                precision={0.1}
                readOnly
              />
            </div>
          ) : (
            <></>
          )}
          {/* <div className="self-center item">
            <StyledRating
              name="average rating"
              value={rating?.starRating}
              size="medium"
              precision={0.1}
              readOnly
            />
          </div> */}
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg bg-gray-100 py-0.5 pr-0.5 align-middle">
          <div className="flex-grow p-1">
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
