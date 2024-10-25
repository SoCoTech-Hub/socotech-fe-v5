import { LessonBullet } from "@/components/SvgIcons";
// import { useAppContext } from "@/context/AppContext"
import {
  // baseUrl,
  mainUrl,
} from "@/context/constants";
import lessonProgressCalc from "@/snippets/lms/lessonProgressCalc";
import { NoSsr } from "@mui/material";
import Clamp from "react-multiline-clamp";

import { BorderLinearProgressView } from "./styles";

const LessonProgressButton = ({ lessonProgress }) => {
  const subjectName = lessonProgress.subject.name;

  return (
    <div className="my-3 ml-3">
      <a href={`${mainUrl}/lms/${lessonProgress.lesson.id}`}>
        <div className="flex flex-wrap place-content-center align-middle">
          <div className="w-full">
            <div className="flex align-middle text-sm font-bold">
              <div className="text-themeColorMain mr-1 mt-1.5 h-2 w-2">
                <LessonBullet />
              </div>
              <div className="text-textColor text-sm font-bold">
                {subjectName}
              </div>
            </div>
            {/* <LessonBullet className='w-2 mr-1 ' /> */}
          </div>
          <div className="w-10/12">
            <div className="text-textColor line-clamp-1 text-xs">
              <Clamp lines={1}>{lessonProgress.lesson.name}</Clamp>
            </div>
          </div>
          <div className="w-2/12">
            <div className="item text-themeColorMain flex w-full justify-end align-middle text-xs font-semibold">
              {lessonProgressCalc({
                totalSteps: lessonProgress?.totalSteps,
                completedSteps: lessonProgress?.completedSteps,
              })}
              %
            </div>
          </div>
        </div>

        <div className="item mr-2 w-full rounded-md pt-1 shadow-md">
          <NoSsr>
            <BorderLinearProgressView
              variant="determinate"
              value={lessonProgressCalc({
                totalSteps: lessonProgress?.totalSteps,
                completedSteps: lessonProgress?.completedSteps,
              })}
            />
          </NoSsr>
        </div>
      </a>
    </div>
  );
};

export default LessonProgressButton;
