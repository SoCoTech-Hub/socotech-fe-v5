import React, { useEffect, useState } from "react";

import { organizationId } from "@acme/snippets/context/constants";
import { FetchKnowledgeBases } from "@acme/snippets/functions/knowledgeBase/knowledgeBase";
import { FetchKnowledgeBaseCategory } from "@acme/snippets/functions/knowledgeBase/knowledgeBaseCategory";
import { ArticleFilter, DigilibCategories } from "@acme/ui";

interface Category {
  //TODO:replace with exported interfaces
  id: string;
  name: string;
}

interface Article {
  //TODO:replace with exported interfaces
  id: string;
  link: string;
  name: string;
  categories: Category[];
  language: string;
  releaseYear: number;
  subject: { id: string; name: string };
  grades: { id: string; name: string }[];
}

interface Filters {
  //TODO:replace with exported interfaces
  grades: { id: string; name: string }[];
  subjects: { id: string; name: string }[];
  languages: { id: string; name: string }[];
  releaseYears: { id: string; name: string }[];
}

const CategoryDisplay: React.FC = () => {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | undefined>();
  const [filters, setFilters] = useState<Filters>({
    grades: [],
    subjects: [],
    languages: [],
    releaseYears: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch articles
        const res = await FetchKnowledgeBases(
          category?.id as string,
          organizationId,
        );

        // Transform data to match Article[]
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

        // Set filters
        const grades = Array.from(
          new Set(transformedArticles.flatMap((article) => article.grades)),
        );
        const subjects = Array.from(
          new Set(transformedArticles.map((article) => article.subject)),
        );
        const languages = Array.from(
          new Set(
            transformedArticles.map((article) => ({
              id: article.language,
              name: article.language,
            })),
          ),
        );
        const releaseYears = Array.from(
          new Set(
            transformedArticles.map((article) => ({
              id: article.releaseYear.toString(),
              name: article.releaseYear.toString(),
            })),
          ),
        );

        setFilters({ grades, subjects, languages, releaseYears });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category?.id]);

  return (
    <div className="col row">
      <div className="gx-5 gy-4 mobile:px-1 space-y-10">
        {articleList.length > 0 && (
          <div>
            <ArticleFilter
              articleList={articleList}
              setArticleList={setArticleList}
              filters={filters}
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articleList.map((article) => (
            <DigilibCategories
              key={article.id}
              img="default_image.jpg" // Use a default or dynamic image URL
              imgAlt={`Image for ${article.name}`}
              title={article.name}
              description={`Subject: ${article.subject.name}`}
              link={article.link}
              badge={`Year: ${article.releaseYear}`}
            />
          ))}
        </div>
        <div className="mobile:h-16" />
      </div>
    </div>
  );
};

export default CategoryDisplay;
