import React from "react";

import { baseUrl } from "@acme/snippets/context/constants";
import { DigilibCategories, DigilibHelp, Welcome } from "@acme/ui";

// TODO: Replace interface with exported interface
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
  const onSearch = (query: string) => {
    console.log("Search query:", query);
    //TODO: Implement search logic
  };

  return (
    <div className="col row mobile:mb-20">
      <div className="desktop:gap-y-5 laptop:gap-y-5 mobile:gap-y-3 flex flex-col">
        <div className="desktop:block">
          <Welcome
            imageUrl="/welcome_image.png" // Provide a custom image URL or remove to use default
            title="Welcome to Digilib"
            subtitle="Find resources, FAQs, and more with ease."
            digilibHelp={{
              categories: helpCategories.map((category) => ({
                id: category.id.toString(),
                name: category.name,
              })),
              onSearch,
            }}
            loading={false} // Adjust as needed to handle loading states
          />
        </div>
        <div className="mobile:hidden">
          <DigilibHelp
            categories={helpCategories.map((category) => ({
              id: category.id.toString(),
              name: category.name,
            }))}
            onSearch={onSearch}
          />
        </div>

        <div className="desktop:gap-6 laptop:gap-6 mobile:gap-1 mobile:overflow-x-scroll mobile:overflow-y-none my-2 grid grid-cols-3">
          {categories?.map((category) => (
            <DigilibCategories
              img={category?.image?.url || "coming_soon.jpg"}
              imgAlt={`Image for ${category.name}`}
              title={category.name}
              description={category.description || "No description available"}
              link={`/category/${category.id}`}
              key={category.id}
              badge={
                category.bgColor ? `Color: ${category.bgColor}` : undefined
              }
            />
          ))}
          <DigilibCategories
            img={`${baseUrl}/FAQIcon.png`}
            imgAlt="FAQs"
            title="FAQ's"
            description="The wonderful world of FAQ's"
            link={`/faqcategory`}
            badge="General"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
