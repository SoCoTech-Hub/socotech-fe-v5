import React from "react";
import { FileText, Play } from "lucide-react";

import { Card, CardContent } from "../card";

export interface LessonContentProps {
  subject: string;
  title: string;
  hasQuiz: boolean;
}
//TODO:fix content items
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}
//TODO:fix onclick
const LessonContent: React.FC<LessonContentProps> = ({
  subject,
  title,
  hasQuiz,
}) => {
  const contentItems: ContentItem[] = [
    {
      id: "video",
      title: `${subject} - Video`,
      description: title,
      icon: <Play className="h-5 w-5" />,
      url: "/lesson-video",
    },
    ...(hasQuiz
      ? [
          {
            id: "quiz",
            title: `${subject} - Quiz`,
            description: "Test your knowledge",
            icon: <FileText className="h-5 w-5" />,
            url: "/lesson-quiz",
          },
        ]
      : []),
  ];

  const handleCardClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Lesson Content</h3>
      <div className="space-y-4">
        {contentItems.map((item) => (
          <Card key={item.id} onClick={() => handleCardClick(item.url)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {item.icon}
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LessonContent;
