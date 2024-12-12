import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { SEO } from "@/components/SeoHead";
import { orgName } from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";

import ArticleFilter from "@acme/ui/ArticleFilter";
import DigilibCategories from "@acme/ui/DigilibCategories";

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

interface CategoryDisplayProps {
  filters: any[]; // Replace `any` with the specific type if available
  articles: Article[];
  category: Category | null;
  organizationId: string | null;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({
  filters,
  articles,
  category,
  organizationId,
}) => {
  const [articleList, setArticleList] = useState<Article[]>(articles);

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
          <DigilibCategories
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

export const getServerSideProps: GetServerSideProps<
  CategoryDisplayProps
> = async (context) => {
  const { id } = context.query;
  const { organizationId } = context.req.cookies;

  const { knowledgeBases } = await getGQLRequest({
    endpoint: "knowledgeBases",
    fields:
      "id,link,name,categories{id,name},language,releaseYear,subject{id,name},grades{id,name}",
    where: `categories: ${id},organization: { id: ${organizationId} }`,
  });

  const { kbCategory } = await getGQLRequest({
    endpoint: "kbCategory",
    fields: "id,name",
    findOne: true,
    id: id as string,
  });

  return {
    props: {
      articles: knowledgeBases || [],
      filters: [],
      category: kbCategory || null,
      organizationId: organizationId || null,
    },
  };
};

export default CategoryDisplay;
