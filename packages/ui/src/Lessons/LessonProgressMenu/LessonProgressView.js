import { useEffect, useState } from "react";
import { userId } from "@/context/constants";
import getInProgressLessonsList from "@/snippets/lms/getInProgressLessonsList";

import LessonProgressButton from "./LessonProgressButton";

const LessonProgressView = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (userId) {
      setData(await getInProgressLessonsList({ userId }));
    }
  }, [userId]);

  if (data.length) {
    return (
      <div className="mobile:px-4 mobile:bg-compBg no-scrolly max-h-80 divide-y divide-gray-200 overflow-scroll rounded-lg">
        {data.map((item) => (
          <div className="py-1" key={item.id}>
            <LessonProgressButton lessonProgress={item} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="text-textColor font-bold">No lesson in progress</div>
    </>
  );
};
export default LessonProgressView;
