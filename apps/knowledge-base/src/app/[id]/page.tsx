import React, { useState } from "react";

import TimeTracks from "@acme/snippets/hooks/useTimeTracker";
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
  const startTime = new Date();

  if (!article?.attachment) {
    return (
      <div>
        <div>Resource not found</div>
      </div>
    );
  }

  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="col row">
        <div className="desktop:gx-5 laptop:gx-5 gy-4 mobile:gx-4 space-y-10">
          <div className="">
            <DigilibHeader
              name={article?.name}
              loading={loading}
              category={article?.categories[0]?.name}
              subject={article?.subject?.name}
              downloadLink={article?.attachment?.url}
              download={article?.download ? article.download : false}
            />
          </div>
          <div className="pl-3 pr-3"></div>
        </div>
      </div>
      <div className="bg-compBg rounded-lg p-4">
        <IFrame src={article?.attachment?.url} setLoading={setLoading} />
        <TimeTracks knowledgeBase={article?.id} />
      </div>
    </>
  );
}
