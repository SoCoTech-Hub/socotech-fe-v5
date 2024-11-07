// import UpcomingLiveLessonList from '@/components/UpcomingLiveLessonList'
// import { useAppContext } from '@/context/AppContext'
// import { baseUrl } from '@/context/constants'

// const LiveLessonMenu: React.FC = () => {
//   const { state } = useAppContext()

//   return (
//     <div>
//       <div className="p-3 rounded-lg shadow-md bg-compBg">
//         <div className="row">
//           <div className="flex">
//             <img
//               src={`${baseUrl}/red_dot.svg`}
//               alt="Live Lessons"
//               className="self-center float-left w-3 pb-3 mr-2"
//             />
//             <div className="menu-title pb-3 text-textColor">
//               Upcoming Live Lessons
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col max-h-80 overflow-scroll no-scrolly">
//           {UpcomingLiveLessonList()}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LiveLessonMenu
import React from "react";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

import { cn } from "@acme/ui";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { ScrollArea } from "../scroll-area";

interface LiveLesson {
  id: string;
  title: string;
  instructor: string;
  date: Date;
  duration: number; // in minutes
}

interface LiveLessonMenuProps {
  lessons: LiveLesson[];
  className?: string;
}

export function LiveLessonMenu({ lessons, className }: LiveLessonMenuProps) {
  return (
    <Card className={cn("w-[350px]", className)}>
      <CardHeader>
        <CardTitle>Upcoming Live Lessons</CardTitle>
        <CardDescription>Join our interactive live sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {lessons.length === 0 ? (
            <p className="text-center text-gray-500">No upcoming lessons</p>
          ) : (
            <ul className="space-y-4">
              {lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <CardDescription>{lesson.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="mb-2 flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{format(lesson.date, "MMMM d, yyyy")}</span>
                      </div>
                      <div className="mb-4 flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(lesson.date, "h:mm a")} ({lesson.duration}{" "}
                          min)
                        </span>
                      </div>
                      <Button className="w-full">Join Lesson</Button>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
