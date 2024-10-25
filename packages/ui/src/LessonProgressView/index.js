import React, { useEffect, useState } from "react";
import LessonProgressButton from "@/components/LessonProgressButton";
import getInProgressLessonsList from "@/snippets/lms/getInProgressLessonsList";

const LessonProgressView = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    setData(await getInProgressLessonsList({ userId }));
  }, []);

  if (data.length !== 0) {
    return (
      <div>
        {data.map((item) => (
          <LessonProgressButton key={item.id} lessonProgress={item} />
        ))}
      </div>
    );
  }
  return <div className="text-textColor">No lesson in progress</div>;
};
export default LessonProgressView;
