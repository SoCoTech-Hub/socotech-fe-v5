import { useEffect, useState } from "react";
import Accordion from "@/components/Accordion";
import getGQLRequest from "@/snippets/getGQLRequest";

const index = ({ categoryId = 0 }) => {
  const [faqData, setFaqData] = useState([]);

  useEffect(async () => {
    const { faqs } = await getGQLRequest({
      endpoint: `faqs`,
      where: `categories: { id : ${categoryId} }`,
      fields: `id,question,answer`,
    });
    setFaqData(faqs);
  }, []);

  return (
    <div className="">
      <Accordion faqs={faqData} />
    </div>
  );
};

export default index;
