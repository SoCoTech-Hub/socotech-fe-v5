"use client";

import React, { useEffect, useState } from "react";

// import getGQLRequest from "@acme/snippets/getGQLRequest";
import BursaryWelcomeBanner from "@acme/ui/Bursaries/tour";
import DigilibCategories from "@acme/ui/Digilib/categories";

//TODO: fix links and add component needs
interface BursaryCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  iconSvg?: string;
}

const Bursaries = () => {
  const [bursaryCategories, setBursaryCategories] = useState<
    BursaryCategory[] | undefined
  >();
  useEffect(() => {
    const fetch = async () => {
      //TODO: Fix fetch
      // const bursaryCategories = await getGQLRequest({
      //   endpoint: "bursaryCategories",
      //   fields: "id,name,description,color,icon,iconSvg",
      // });
      // setBursaryCategories(bursaryCategories.bursaryCategories);
    };
    fetch();
  }, []);
  return (
    <div>
      <div className="card mobile:p-1 mobile:mb-5 bg-themeColorSecondary w-full p-4">
        <div className="space-y-6">
          <div className="mobile:mr-0 mobile:p-1 mobile:text-xl mr-24 pr-10 text-center text-4xl font-bold leading-tight text-white">
            <BursaryWelcomeBanner
              header="Explore bursaries currently available in SA"
              subHeader="Start your journey by exploring and applying for bursaries that can help fund your education and future career."
              img="/applications-tour.png"
            />
          </div>
        </div>
      </div>
      <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-5 laptop:grid-cols-3 mobile:grid-cols-1 grid place-items-stretch gap-3">
        {bursaryCategories?.map((bursary) => <DigilibCategories link={""} />)}
      </div>
    </div>
  );
};

export default Bursaries;
