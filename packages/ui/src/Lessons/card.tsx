import { Card } from "../card";

export interface Lesson {
  id: number;
  title: string;
  imageUrl: string;
}

export interface Subject {
  id: number;
  name: string;
  imageUrl: string;
  lessons: Lesson[];
}

export interface LessonCardProps {
  item: Lesson | Subject;
  type: "lesson" | "subject";
}

export const LessonCard: React.FC<LessonCardProps> = ({ item, type }) => {
  const isLesson = type === "lesson";
  const linkUrl = isLesson ? `/lessons/${item.id}` : `/subjects/${item.id}`;
  const title = isLesson ? (item as Lesson).title : (item as Subject).name;
  const imageUrl = isLesson
    ? (item as Lesson).imageUrl
    : (item as Subject).imageUrl;

  return (
    <Card className="overflow-hidden">
      <a href={linkUrl}>
        <div className="relative aspect-video">
          <img
            src={imageUrl}
            alt={`Cover for ${title}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="line-clamp-2 text-lg font-semibold text-white">
              {title}
            </h3>
          </div>
        </div>
      </a>
    </Card>
  );
};
