import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FetchFaqCategory } from "@acme/snippets/functions/faq/faqCategory";
import AccordionSection from "@acme/ui/accordion/index";
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

    fetchData();
  }, [router.query.id]);

  // Transform FAQ data to match AccordionSection props
  const accordionItems =
    category?.faqs.map((faq) => ({
      key: faq.question,
      value: faq.answer,
    })) || [];

  return (
    <div className="col row">
      <div className="gx-5 gy-4 space-y-10">
        <div className="text-textColor text-4xl">{category?.name}</div>
        <Button
          onClick={() => router.back()}
          className="w-28 bg-primary px-3 py-2"
        >
          Back
        </Button>
        <div className="pl-3 pr-3">
          <AccordionSection items={accordionItems} />
        </div>
        <div className="mobile:h-16"></div>
      </div>
    </div>
  );
};

export default FaqDisplay;
