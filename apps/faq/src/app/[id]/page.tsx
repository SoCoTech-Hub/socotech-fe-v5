import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
// import DigilibHelp from '@/components/DigilibHelp';
import getGQLRequest from "@/snippets/getGQLRequest";

// import Faq from '@/components/Faq';
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

interface FaqDisplayProps {
  category: FaqCategory | null;
}

const FaqDisplay: React.FC<FaqDisplayProps> = ({ category }) => {
  const router = useRouter();

  const seo = {
    title: category?.name || "FAQ",
    description: category?.name || "FAQ",
  };

  return (
    <div className="col row">
      <div className="gx-5 gy-4 space-y-10">
        <div className="text-textColor text-4xl">{category?.name}</div>
        <Button
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

export const getServerSideProps: GetServerSideProps<FaqDisplayProps> = async (
  context,
) => {
  const { id } = context.query;
  const { faqCategory } = await getGQLRequest({
    endpoint: "faqCategory",
    fields: "id,name,faqs{id,question,answer}",
    findOne: true,
    id: id as string, // Explicitly cast `id` as string
  });

  return {
    props: {
      category: faqCategory || null,
    },
  };
};

export default FaqDisplay;
