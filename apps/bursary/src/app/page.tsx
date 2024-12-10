import React from "react";
import { GetServerSideProps } from "next";
import getGQLRequest from "@/snippets/getGQLRequest";

import BursaryWelcomeBanner from "../../../packages/ui/src/Bursaries/tour";
import DigilibCategories from "../../../packages/ui/src/Digilib/categories";

//TODO: fix links and add component needs
interface BursaryCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  iconSvg?: string;
}

interface BursariesProps {
  bursaryCategories: BursaryCategory[];
}

const Bursaries = ({ bursaryCategories }: BursariesProps) => {
  return (
    <div>
      <div className="card mobile:p-1 mobile:mb-5 bg-themeColorSecondary w-full p-4">
        <div className="space-y-6">
          <div className="mobile:mr-0 mobile:p-1 mobile:text-xl mr-24 pr-10 text-center text-4xl font-bold leading-tight text-white">
            <BursaryWelcomeBanner />
          </div>
        </div>
      </div>
      <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-5 laptop:grid-cols-3 mobile:grid-cols-1 grid place-items-stretch gap-3">
        {bursaryCategories?.map((bursary) => <DigilibCategories link={""} />)}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { bursaryCategories } = await getGQLRequest({
    endpoint: "bursaryCategories",
    fields: "id,name,description,color,icon,iconSvg",
  });

  return {
    props: {
      bursaryCategories,
    },
  };
};

export default Bursaries;
