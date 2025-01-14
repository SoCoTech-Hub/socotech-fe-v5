import React from "react";

import { baseUrl } from "@acme/snippets/context/constants";
import { ShowsPage } from "@acme/ui";
import { ShowsWelcome } from "@acme/ui";//TODO: find component

//TODO: fix components
interface Category {
  id: string;
  name: string;
  image?: {
    url: string;
  };
}

interface IndexProps {
  categories: Category[];
}

const Index = ({ categories }: IndexProps) => {
  return (
    <div className="col row mobile:mb-20">
      <div className="desktop:space-y-5 laptop:space-y-5 mobile:space-y-3">
        <div className="desktop:block">
          <ShowsWelcome
            title="Topic's Spotlight!"
            description="Our Captivating Shows and Original Content"
            image={
              <img
                src={`${baseUrl}/shows.gif`}
                alt="Shows Welcome Image"
                className="object-contain"
                height={150}
                width={150}
              />
            }
          />
        </div>

        <div className="desktop:gap-6 laptop:gap-6 mobile:gap-1 mobile:grid-cols-3 mobile:overflow-x-scroll mobile:overflow-y-none grid grid-cols-3">
          {categories?.map((category) => (
            <ShowsPage
              img={category?.image?.url}
              title={category.name}
              link={`/shows/category/${category.id}`}
              key={category.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
