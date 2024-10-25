import { useEffect, useState } from "react";
import LessonSubjectButton from "@/components/MainMenuLink";
import {
  AccSubjIcon,
  BusStudSubjIcon,
  EconSubjIcon,
  EngFALSubjIcon,
  EngHLSubjIcon,
  GeoSubjIcon,
  LifeSciSubjIcon,
  MathLitSubjIcon,
  MathSubjIcon,
  PhySciSubjIcon,
  TourismSubjIcon,
} from "@/components/SvgIcons";
import { useAppContext } from "@/context/AppContext";
import { mainUrl, Text } from "@/context/constants";
import getUpcomingLiveLessonList from "@/snippets/lms/getUpcomingLiveLessonList";

const UpcomingLiveLessonList = () => {
  const { state } = useAppContext();
  const icons = [
    { name: "Mathematics", icon: <MathSubjIcon /> },
    { name: "Physical Science", icon: <PhySciSubjIcon /> },
    { name: "Mathematical Literacy", icon: <MathLitSubjIcon /> },
    { name: "English HL", icon: <EngHLSubjIcon /> },
    { name: "English FAL", icon: <EngFALSubjIcon /> },
    { name: "Life Science", icon: <LifeSciSubjIcon /> },
    { name: "Geography", icon: <GeoSubjIcon /> },
    { name: "Business Studies", icon: <BusStudSubjIcon /> },
    { name: "Accounting", icon: <AccSubjIcon /> },
    { name: "Tourism", icon: <TourismSubjIcon /> },
    { name: "Economics", icon: <EconSubjIcon /> },
  ];
  const [data, setData] = useState([]);
  useEffect(async () => {
    setData(await getUpcomingLiveLessonList());
  }, []);

  if (data?.length) {
    return data.map((lesson) => (
      <LessonSubjectButton
        title={lesson?.subject?.name}
        textColor={Text}
        color="menuLiveLesson"
        icon={
          icons[icons.findIndex((item) => item.name == lesson?.subject?.name)]
            .icon
        }
        iconColor="red"
        description={lesson?.name}
        link={`${mainUrl}/lms/${lesson.id}`}
        key={lesson.id}
      />
    ));
  } else {
    return <div className="no-item-text">No Live Lessons</div>;
  }
};

export default UpcomingLiveLessonList;
