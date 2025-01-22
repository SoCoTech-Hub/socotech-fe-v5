import React, { useState } from "react";
import { GetServerSideProps } from "next";
import GetKBSearchResults from "graphql/queries/GetKBSearchResults"; // TODO: Create query

import { SearchBar } from "@acme/ui";

import client from "./api/apolloClient"; // TODO: Replace Apollo Client with a custom implementation if needed

interface SearchResult {
  id: string;
  title: string;
  description?: string;
}

interface SearchProps {
  initialResults: SearchResult[] | null;
}

const Search = ({ initialResults }: SearchProps) => {
  const [results, setResults] = useState<SearchResult[] | null>(initialResults);

  const handleSearch = async (query: string) => {
    try {
      const { data } = await client.query({
        query: GetKBSearchResults,
        variables: {
          searchTerm: query,
        },
      });

      setResults(data?.knowledgeBases?.length ? data.knowledgeBases : null);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults(null);
    }
  };

  return (
    <div className="w-full shadow-md">
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search knowledge bases..."
      />
      <div className="mt-4">
        {results?.length ? (
          <ul>
            {results.map((result) => (
              <li key={result.id} className="mb-2">
                <h3 className="font-bold">{result.title}</h3>
                {result.description && <p>{result.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, name_contains } = context.query;
  const grades =
    context.req.cookies["Grades"]?.split(",").filter((x: string) => x !== "") ||
    [];

  const { data } = await client.query({
    query: GetKBSearchResults,
    variables: {
      searchTerm: `${name_contains || ""}`,
      categoryID: category ? [category] : [],
      gradesID: grades,
    },
  });

  return {
    props: {
      initialResults: data?.knowledgeBases?.length ? data.knowledgeBases : null,
    },
  };
};

export default Search;
