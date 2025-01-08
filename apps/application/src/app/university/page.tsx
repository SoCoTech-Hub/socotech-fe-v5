import React from "react";
import Link from "next/link";

import WelcomeBanner from "@acme/ui/applications/tour";
import { Button } from "@acme/ui/button";
import DigilibCategories from "@acme/ui/Digilib/categories";

interface Faculty {
  id: string;
  name: string;
  svgIcon?: string;
  about?: string;
  color?: string;
  icon?: { id: string; url: string };
  background?: { id: string; url: string };
}

interface University {
  id: string;
  name: string;
}

interface ApplicationsProps {
  faculties: Faculty[];
  university: University;
}

const Applications: React.FC<ApplicationsProps> = ({
  faculties,
  university,
}) => {
  return (
    <div>
      <div className="mb-5 w-full">
        <WelcomeBanner />
        <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 flex justify-end font-bold">
          <Link href={`/applications`}>
            <Button className="bg-primary">Back</Button>
          </Link>
        </div>
        <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-3 laptop:grid-cols-3 mobile:grid-cols-1 grid place-items-stretch gap-3">
          {faculties?.map((faculty) => (
            <DigilibCategories
              background={faculty?.background?.url}
              bgColor={faculty?.color}
              svgIcon={faculty?.svgIcon}
              icon={faculty?.icon}
              title={faculty?.name}
              description={faculty?.about}
              id={faculty?.id}
              key={faculty?.id}
              link={`applications/${university?.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
