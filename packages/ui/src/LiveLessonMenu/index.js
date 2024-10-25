import UpcomingLiveLessonList from "@/components/UpcomingLiveLessonList";
import { useAppContext } from "@/context/AppContext";
import { baseUrl } from "@/context/constants";

const LiveLessonMenu = () => {
  const { state } = useAppContext();
  return (
    <div>
      <div className="bg-compBg rounded-lg p-3 shadow-md">
        {/* <div
          className={`text-xxs ${
           Text
          }`}
        >
          Live Lessons
        </div> */}
        <div className="row">
          <div className="flex">
            <img
              src={`${baseUrl}/red_dot.svg`}
              alt="Live Lessons"
              className="float-left mr-2 w-3 self-center pb-3"
            />
            <div className={`menu-title text-textColor pb-3`}>
              Upcoming Live Lessons
            </div>
          </div>
        </div>
        <div
          className={`no-scrolly flex max-h-80 flex-col overflow-scroll ${Text}`}
        >
          {UpcomingLiveLessonList()}
        </div>
      </div>
    </div>
  );
};

export default LiveLessonMenu;
