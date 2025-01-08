import React from "react";

import { baseUrl } from "@acme/snippets/context/constants";
import DigilibCategories from "@acme/ui/Digilib/Categories";
import DigilibHelp from "@acme/ui/Digilib/Help";
import Welcome from "@acme/ui/Digilib/Welcome";

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: {
    url: string;
  };
  background?: {
    url: string;
  };
  bgColor?: string;
}

interface HelpCategory {
  id: number;
  name: string;
}

interface IndexProps {
  categories: Category[];
  helpCategories: HelpCategory[];
}

const Index = ({ categories, helpCategories }: IndexProps) => {
  return (
    <div className="col row mobile:mb-20">
      <div className="desktop:gap-y-5 laptop:gap-y-5 mobile:gap-y-3 flex flex-col">
        <div className="desktop:block">
          <Welcome categories={helpCategories} />
        </div>
        <div className="mobile:hidden">
          <DigilibHelp categories={helpCategories} />
        </div>

        <div className="desktop:gap-6 laptop:gap-6 mobile:gap-1 mobile:overflow-x-scroll mobile:overflow-y-none my-2 grid grid-cols-3">
          {categories?.map((category) => (
            <DigilibCategories
              img={category?.image?.url}
              background={category?.background?.url}
              title={category.name}
              description={category.description}
              link={`/category/${category.id}`}
              key={category.id}
              bgColor={category.bgColor}
            />
          ))}
          <DigilibCategories
            img={`${baseUrl}/FAQIcon.png`}
            background={`${baseUrl}/FAQBG.png`}
            title="FAQ's"
            description="The wonderful world of FAQ's"
            link={`/faqcategory`}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
