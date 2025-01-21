import React, { useEffect, useState } from "react";

import { organizationId } from "@acme/snippets/context/constants";
import { FetchKnowledgeBases } from "@acme/snippets/functions/knowledgeBase/knowledgeBase";
import { FetchKnowledgeBaseCategory } from "@acme/snippets/functions/knowledgeBase/knowledgeBaseCategory";
import { ArticleFilter, DigilibCategories } from "@acme/ui";

interface Category {
  //TODO: import interface
  id: string;
  name: string;
}

interface Article {
  //TODO: import interface
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
      try {
        // Fetch articles
        const res = await FetchKnowledgeBases(
          category?.id as string,
          organizationId,
        );

        // Transform data to match Article[] if needed
        const transformedArticles: Article[] = res.knowledgeBases.map(
          (kb: any) => ({
            id: kb.id,
            link: kb.link,
            name: kb.name,
            categories: Array.isArray(kb.categories)
              ? kb.categories.map((cat: any) => ({
                  id: cat.id,
                  name: cat.name,
                }))
              : [],
            language: kb.language,
            releaseYear: Number(kb.releaseYear), // Convert releaseYear to number
            subject: kb.subject,
            grades: Array.isArray(kb.grades)
              ? kb.grades.map((grade: any) => ({
                  id: grade.id,
                  name: grade.name,
                }))
              : [],
          }),
        );

        setArticleList(transformedArticles);

        // Fetch category details
        if (category?.id) {
          const fetchedCategory = await FetchKnowledgeBaseCategory(category.id);
          setCategory(fetchedCategory);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category?.id]); // Re-run the effect when the category ID changes

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
