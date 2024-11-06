import { useAppContext } from "@/context/AppContext";

import LessonProgress from "./LessonProgressView";

const LessonProgressMenu = () => {
  const { state } = useAppContext();
  return (
    <div>
      <div className="mobile:p-1 mobile:bg-navbarBg bg-compBg mobile:font-bold mobile:w-full rounded-lg p-3 text-xs shadow-md">
        <div className="text-textColor mobile:mb-2 mobile:text-xl">
          Lessons in progress
        </div>
        <div>
          <LessonProgress />
        </div>
      </div>
    </div>
  );
};

export default LessonProgressMenu;
