"use client";

import { useCallback, useEffect, useState } from "react";

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
  articleList: {}[];
  setArticleList: React.Dispatch<React.SetStateAction<any[]>>;
  filters: {
    grades: { id: string; name: string }[];
    subjects: { id: string; name: string }[];
    languages: { id: string; name: string }[];
    releaseYears: { id: string; name: string }[];
  };
}

export const ArticleFilter: React.FC<ArticleFilterProps> = ({
  articleList,
  setArticleList,
  filters,
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
      setGrades(filters.grades);
      setSubjects(filters.subjects);
      setLanguages(filters.languages);
      setReleaseYears(filters.releaseYears);
    };
    fetchFilterLists();
  }, [initialArticles]);

  // TODO: Apply filters to fetch the filtered articles
  const applyFilters = useCallback(async () => {
    // setArticleList();
  }, []);

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
