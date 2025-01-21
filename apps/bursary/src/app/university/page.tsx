import React from "react";
import Link from "next/link";

import { isPaying } from "@acme/snippets/context/constants";
import {
  BursaryWelcomeBanner,
  Button,
  ContentLock,
  DigilibCategories,
} from "@acme/ui";

//TODO: fix bursary
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
      <BursaryWelcomeBanner />
      <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 flex justify-end">
        <Link scroll={false} href="/bursaries">
          <Button className="bg-primary">Back</Button>
        </Link>
      </div>
      <ContentLock
        isPaying={!!isPaying}
        bgColor={"bg-themeColorMain"}
        children={
          <>
            <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-5 laptop:grid-cols-3 mobile:grid-cols-1 grid place-items-stretch gap-3">
              {bursaryCategories?.map((bursary) => (
                <DigilibCategories link={""} />
              ))}
            </div>
          </>
        }
      />
    </div>
  );
};

export default Bursaries;
