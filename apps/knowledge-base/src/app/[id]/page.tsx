import React, { useState } from "react";

import TimeTracks from "@acme/snippets/functions/timeTracks";
import DigilibHeader from "@acme/ui/Digilib/header";
import { IFrame } from "@acme/ui/IFrame/index";

interface Article {
  id: string;
  name: string;
  attachment?: {
    url: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
  subject?: {
    name: string;
  };
  download?: boolean;
}

interface ArticleProps {
  article: Article | null;
}

export default function Article({ article }: ArticleProps) {
  if (!article?.attachment) {
    return (
      <div>
        <div>Resource not found</div>
      </div>
    );
  }

  const [loading, _setLoading] = useState(true);

  return (
    <>
      <div className="col row">
        <div className="desktop:gx-5 laptop:gx-5 gy-4 mobile:gx-4 space-y-10">
          <div className="">
            <DigilibHeader
              name={article.name}
              loading={loading}
              category={article.categories[0]?.name || "Uncategorized"}
              subject={article.subject?.name || "No Subject"}
              backOnClick={() => console.log("Back button clicked")}
            />
          </div>
          <div className="pl-3 pr-3"></div>
        </div>
      </div>
      {/* //TODO:replace with non statc values */}
      <div className="bg-compBg rounded-lg p-4">
        <IFrame
          src={article.attachment.url}
          title={`Document Viewer - ${article.name}`}
          width="100%"
          height="600px"
          className="rounded-lg shadow-md"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin"
        />
        <TimeTracks knowledgeBase={article.id} userId="" />
      </div>
    </>
  );
}
