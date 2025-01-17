import React, { useEffect, useState } from "react";

import { orgName } from "@acme/snippets/context/constants";
import { ApplicationsListing, WelcomeBanner } from "@acme/ui";

interface Faculty {
  id: string;
  name: string;
  svgIcon?: string;
  about?: string;
  color?: string;
  icon?: { id: string; url: string };
  background?: { id: string; url: string };
}

//TODO: snippets
const [faculties, setFaculties] = useState<Faculty[] | null>(null);

useEffect(() => {
  const fetchData = async () => {
    const facultyList = await getFaculties(); //TODO:Create snippets
    setFaculties(facultyList);
  };
  fetchData();
}, []);
export default function Home({ faculties, university }: HomeProps) {
  const handleSelection = (id: string) => {
    console.log(`Selected Faculty ID: ${id}`);
  };
  return (
    <div>
      <div>
        <div className="desktop:p-4 laptop:p-4 mobile:p-1 card bg-themeColorMain w-full">
          <WelcomeBanner
            title={`Welcome to ${orgName}`}
            subheading="Discover all the opportunities our university offers."
            backgroundClass="bg-gradient-to-r from-green-500 to-blue-600"
            buttonText="Learn More"
            onClick={() => console.log("Learn More clicked")}
            gifSrc="/images/welcome-banner.gif"
            gifAlt="University animation"
          />
          {/* //TODO:add correct image */}
        </div>

        <div className="mobile:grid-cols-2 my-4 grid grid-cols-5 place-items-stretch gap-3">
          {/* //TODO:fix */}
          {faculties?.map((faculty) => (
            <ApplicationsListing
              key={faculty.id}
              id={faculty.id}
              applicationFeatureImage={faculty.background?.url}
              courseTitle={faculty.name}
              courseCompanyName={university.name}
              courseDescription={faculty.about}
              setSelection={handleSelection}
              bgColor={faculty.color}
              svgIcon={faculty.svgIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
