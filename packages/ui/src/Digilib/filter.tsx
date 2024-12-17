// TODO:fix imports
"use client";

import { useCallback, useEffect, useState } from "react";
import getFilterLists from "@/snippets/getFilterLists";
import getGQLRequest from "@/snippets/getGQLRequest";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface FilterOption {
  id: string;
  name: string;
}

interface ArticleFilterProps {
  articleList: any[];
  setArticleList: React.Dispatch<React.SetStateAction<any[]>>;
  organizationId: string;
  categoryId: string;
}

export const ArticleFilter: React.FC<ArticleFilterProps> = ({
  articleList,
  setArticleList,
  organizationId,
  categoryId,
}) => {
  const [grades, setGrades] = useState<FilterOption[]>([]);
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<FilterOption[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [languages, setLanguages] = useState<FilterOption[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [releaseYears, setReleaseYears] = useState<FilterOption[]>([]);
  const [releaseYearFilter, setReleaseYearFilter] = useState<string | null>(
    null,
  );
  const [initialArticles] = useState(articleList);

  // Fetch filter options based on the initial articles
  useEffect(() => {
    const fetchFilterLists = async () => {
      const result = await getFilterLists({ initialArticles });
      setGrades(result.grades);
      setSubjects(result.subjects);
      setLanguages(result.languages);
      setReleaseYears(result.releaseYears);
    };
    fetchFilterLists();
  }, [initialArticles]);

  // Apply filters to fetch the filtered articles
  const applyFilters = useCallback(async () => {
    let customWhere = "";
    if (subjectFilter) {
      customWhere += `, subject:{id:${subjectFilter}}`;
    }
    if (gradeFilter) {
      customWhere += `, grades:{id:${gradeFilter}}`;
    }
    if (releaseYearFilter) {
      const releaseYear = releaseYears.find(
        (year) => year.id === releaseYearFilter,
      );
      if (releaseYear) {
        customWhere += `, releaseYear_contains:"${releaseYear.name}"`;
      }
    }
    if (languageFilter) {
      const language = languages.find((lang) => lang.id === languageFilter);
      if (language) {
        customWhere += `, language:"${language.name}"`;
      }
    }
    const { knowledgeBases } = await getGQLRequest({
      endpoint: `knowledgeBases`,
      where: `categories:{id:[${categoryId}]},organization:{id:[${parseInt(organizationId)}]}${customWhere}`,
      fields: `id,link,name`,
    });
    setArticleList(knowledgeBases);
  }, [
    subjectFilter,
    gradeFilter,
    releaseYearFilter,
    languageFilter,
    releaseYears,
    languages,
    categoryId,
    organizationId,
    setArticleList,
  ]);

  // Clear all filters and reset the article list
  const clearFilters = useCallback(() => {
    setArticleList(initialArticles);
    setLanguageFilter(null);
    setReleaseYearFilter(null);
    setSubjectFilter(null);
    setGradeFilter(null);
  }, [initialArticles, setArticleList]);

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid gap-4">
          {grades.length > 0 && (
            <Select
              value={gradeFilter ?? undefined}
              onValueChange={setGradeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade.id} value={grade.id}>
                    {grade.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {subjects.length > 0 && (
            <Select
              value={subjectFilter ?? undefined}
              onValueChange={setSubjectFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {languages.length > 0 && (
            <Select
              value={languageFilter ?? undefined}
              onValueChange={setLanguageFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.id} value={language.id}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {releaseYears.length > 0 && (
            <Select
              value={releaseYearFilter ?? undefined}
              onValueChange={setReleaseYearFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Release Year" />
              </SelectTrigger>
              <SelectContent>
                {releaseYears.map((year) => (
                  <SelectItem key={year.id} value={year.id}>
                    {year.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleFilter;
