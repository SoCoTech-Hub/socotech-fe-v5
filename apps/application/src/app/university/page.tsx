import React from "react";
import Link from "next/link";

import { Button, DigilibCategories, WelcomeBanner } from "@acme/ui";

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
        <WelcomeBanner
          title={`Welcome to ${university.name}`}
          subheading="Explore our faculties and learn more about what we offer."
          backgroundClass="bg-gradient-to-r from-blue-500 to-indigo-600"
          buttonText="Take a Tour"
          onClick={() => console.log("Tour button clicked")}
          gifSrc="/images/welcome-animation.gif"
          gifAlt="A welcoming animation"
        />
        {/* //TODO: add image */}
        <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 flex justify-end font-bold">
          <Link href={`/applications`}>
            <Button className="bg-primary">Back</Button>
          </Link>
        </div>
        <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-3 laptop:grid-cols-3 mobile:grid-cols-1 grid place-items-stretch gap-3">
          {faculties?.map((faculty) => (
            <DigilibCategories
              img={faculty?.svgIcon}
              imgAlt={faculty?.icon?.url ? faculty?.icon?.url : ""}
              title={faculty?.name}
              description={faculty?.about}
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
