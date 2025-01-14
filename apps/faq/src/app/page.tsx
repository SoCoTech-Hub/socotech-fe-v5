import React from "react";
import { useRouter } from "next/router";

import { Button } from "@acme/ui/button";
import {DigilibCategories} from "@acme/ui/Digilib/Categories";

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
          onClick={() => router.back()}
          className="w-28 bg-primary px-3 py-2"
        >
          Back
        </Button>
        <div className="desktop:grid-cols-3 laptop:grid-cols-2 mobile:grid-cols-2 mb-5 grid place-items-stretch gap-2">
          {categories?.map((category) => (
            <DigilibCategories
              img={category?.image?.url || "coming_soon.jpg"}
              imgAlt={category.name}
              title={category.name}
              description={category.description}
              link={`/faqcategory/${category.id}`}
              badge={"FAQ"}
              key={category.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqCategory;
