import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import client from "@/api/apolloClient";
import { SEO } from "@/components/SeoHead";
import GetFAQCategories from "graphql/queries/GetFAQCategories";

import { Button } from "@acme/ui/button";
import DigilibCategories from "@acme/ui/Digilib/Categories";

interface FaqCategoryProps {
  categories: Array<{
    id: string;
    name: string;
    description: string;
    image?: { url: string };
    background?: { url: string };
  }> | null;
}

const FaqCategory: React.FC<FaqCategoryProps> = ({ categories }) => {
  const router = useRouter();


  return (
    <div className="col row">
      <div className="gx-5 desktop:gy-4 space-y-10">
        <div className="text-textColor text-4xl font-bold">
          Frequently Asked Questions
        </div>
        <Button
          onClickFunction={() => router.back()}
          label="Back"
          color="bg-themeColorMain"
          padding="px-3 py-2"
          width="w-28"
        />
        {/* <div className='mobile:hidden desktop:block'>
          <DigilibWelcome />
        </div> */}
        {/* <div className='desktop:hidden laptop:hidden mobile:block'>
          <DigilibHelp />
        </div> */}
        <div className="desktop:grid-cols-3 laptop:grid-cols-2 mobile:grid-cols-2 mb-5 grid place-items-stretch gap-2">
          {categories?.map((category) => (
            <DigilibCategories
              img={category?.image?.url}
              background={category?.background?.url}
              title={category.name}
              description={category.description}
              link={`/faqcategory/${category.id}`}
              key={category.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default FaqCategory;
