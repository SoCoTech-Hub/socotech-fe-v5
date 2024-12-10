// import { useEffect, useState } from 'react';
import Accordion from '@/components/Accordion';
// import getGQLRequest from '@/snippets/getGQLRequest';
// import { useQuery } from '@apollo/client';
// import GetFAQQuestions from 'graphql/queries/GetFAQQuestions';

// This component may be redundent - Chris

const index = ({ categoryData }) => {
  // const [faqData, setFaqData] = useState([]);
  // const { data, loading } = useQuery(GetFAQQuestions, {
  //   variables: { categoryID: categoryId }
  // });

  // useEffect(async () => {
  //   const { faqs } = await getGQLRequest({
  //     endpoint: `faqs`,
  //     where: `categories: { id : ${categoryId} }`,
  //     fields: `id,question,answer`
  //   });
  //   setFaqData(faqs);
  // }, []);

  return (
    <>
      <Accordion faqs={categoryData?.faqs} />
    </>
  );
};

export default index;
