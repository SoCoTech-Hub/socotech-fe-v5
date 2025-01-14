import React, { useEffect, useState } from "react";

import { organizationId } from "@acme/snippets/context/constants";
import { FetchKnowledgeBases } from "@acme/snippets/functions/knowledgeBase/knowledgeBase";
import { FetchKnowledgeBaseCategory } from "@acme/snippets/functions/knowledgeBase/knowledgeBaseCategory";
import { DigilibCategories } from "@acme/ui/Digilib/Categories";
import { ArticleFilter } from "@acme/ui/Digilib/Filter";

interface Category {
  id: string;
  name: string;
}

interface Article {
  id: string;
  link: string;
  name: string;
  categories: Category[];
  language: string;
  releaseYear: number;
  subject: { id: string; name: string };
  grades: { id: string; name: string }[];
}

const CategoryDisplay = () => {
  const [articleList, setArticleList] = useState<Article[]>();
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchKnowledgeBases(
        category?.id as string,
        organizationId,
      ); //TODO: get categoryId and organizationId
      setArticleList(res);
      const cat = await FetchKnowledgeBaseCategory(category?.id as string);
      setCategory(cat);
    };
    fetchData();
  }, []);

  return (
    <div className="col row">
      <div className="gx-5 gy-4 mobile:px-1 space-y-10">
        {articleList?.length > 0 && (
          <div>
            <ArticleFilter
              articleList={articleList}
              setArticleList={setArticleList}
              organizationId={organizationId}
              categoryId={category?.id}
            />
          </div>
        )}
        <div>
          <DigilibCategories //TODO: @Garreth, should use a different component for this
            articles={articleList}
            category={category}
            filters={filters}
          />
        </div>
        <div className="mobile:h-16" />
      </div>
    </div>
  );
};

export default CategoryDisplay;
