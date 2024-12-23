import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FetchFaqCategory } from "@acme/snippets/functions/faq/faqCategory";
import Accordion from "@acme/ui/Accordion";
import { Button } from "@acme/ui/button";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  name: string;
  faqs: Faq[];
}

const FaqDisplay = () => {
  const router = useRouter();
  const [category, setCategory] = useState<FaqCategory | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const faqCategory = await FetchFaqCategory(router.query.id as string);
      setCategory(faqCategory);
    };
  }, []);

  const seo = {
    title: category?.name || "FAQ",
    description: category?.name || "FAQ",
  };

  return (
    <div className="col row">
      <div className="gx-5 gy-4 space-y-10">
        <div className="text-textColor text-4xl">{category?.name}</div>
        <Button //TODO: @Garreth replace with the correct button component
          onClickFunction={() => router.back()}
          label="Back"
          color="bg-themeColorMain"
          padding="px-3 py-2"
          width="w-28"
        />
        {/* <div className=''>
          <DigilibHelp />
        </div> */}
        <div className="pl-3 pr-3">
          <Accordion faqs={category?.faqs || []} />
        </div>
        <div className="mobile:h-16"></div>
      </div>
    </div>
  );
};

export default FaqDisplay;
