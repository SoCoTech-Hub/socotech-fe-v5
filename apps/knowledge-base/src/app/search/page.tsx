import React from "react";
import { GetServerSideProps } from "next";
import GetKBSearchResults from "graphql/queries/GetKBSearchResults"; //TODO:make query

import MainSearchResults from "@acme/ui/MainSearchResults/index";

import client from "./api/apolloClient";//TODO:make snippet

//TODO:fix component
interface SearchResult {
  id: string;
  title: string;
  description?: string;
}

interface SearchProps {
  results: SearchResult[] | null;
}

const Search = ({ results }: SearchProps) => {
  return (
    <>
      <div className="w-full shadow-md">
        <MainSearchResults results={results} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, name_contains } = context.query;
  const grades = context.req.cookies["Grades"]
    .split(",")
    .filter((x: string) => x !== "");

  const { data } = await client.query({
    query: GetKBSearchResults,
    variables: {
      searchTerm: `${name_contains}`,
      categoryID: category ? [category] : [],
      gradesID: grades,
    },
  });

  return {
    props: {
      results: data?.knowledgeBases?.length ? data.knowledgeBases : null,
    },
  };
};

export default Search;
