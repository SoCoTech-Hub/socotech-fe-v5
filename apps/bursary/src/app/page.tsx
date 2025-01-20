"use client";

import React, { useEffect, useState } from "react";

import { FetchDistrictsByProvince } from "@acme/snippets/functions/bursary/bursaryCategory";
import { BursaryListing, BursaryWelcomeBanner } from "@acme/ui";

// Define the type for a bursary category
type BursaryCategory = {
  id?: string;
  name?: string;
  description?: string;
  color?: string;
  icon?: { url: string };
};

const Bursaries = () => {
  // Explicitly set the type for state
  const [bursaryCategories, setBursaryCategories] = useState<BursaryCategory[]>(
    [],
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const { bursaryCategories } = await FetchDistrictsByProvince();
        setBursaryCategories(bursaryCategories || []);
      } catch (error) {
        console.error("Error fetching bursary categories:", error);
      }
    };
    fetch();
  }, []);

  const handleSelection = (id: string) => {
    console.log(`Selected Bursary ID: ${id}`);
  };

  return (
    <div>
      <div className="card mobile:p-1 mobile:mb-5 bg-themeColorSecondary w-full p-4">
        <div className="space-y-6">
          <div className="mobile:mr-0 mobile:p-1 mobile:text-xl mr-24 pr-10 text-center text-4xl font-bold leading-tight text-white">
            <BursaryWelcomeBanner
              header="Your Future Is Bright, Bright Like A Diamond."
              subHeader="Discover Scholarships and Bursaries That Are Looking For Students Like You."
              img="/bursaries_banner.gif"
            />
          </div>
        </div>
      </div>
      <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-5 laptop:grid-cols-3 mobile:grid-cols-1 grid place-items-stretch gap-3">
        {bursaryCategories.map((bursary) => (
          <BursaryListing
            key={bursary.id || ""}
            id={bursary.id || ""}
            applicationFeatureImage={bursary.icon?.url || ""}
            courseTitle={bursary.name || "Untitled Bursary"}
            courseCompanyName="Scholarship Provider" // Adjust as needed
            courseDescription={
              bursary.description || "No description available."
            }
            setSelection={handleSelection}
            bgColor={bursary.color || "bg-gray-200"}
            iconSvg={
              bursary.icon?.url ? `<img src="${bursary.icon.url}" />` : ""
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Bursaries;
