interface Article {
  subject?: { id: number; name: string };
  grades?: { id: number; name: string }[];
  language?: string;
  releaseYear?: number;
}

interface FilterListResult {
  subjects: { id: number; name: string }[];
  grades: { id: number; name: string }[];
  languages: { id: number; name: string }[];
  releaseYears: { id: number; name: string }[];
}

const getFilterLists = async ({
  initialArticles,
}: {
  initialArticles: Article[];
}): Promise<FilterListResult> => {
  // Extract unique subjects
  const subjectArr = initialArticles
    .filter((article) => article.subject)
    .map((article) => article.subject as { id: number; name: string });
  const subjects = Array.from(
    new Map(subjectArr.map((item) => [item.name, item])).values(),
  );

  // Extract unique grades
  const gradeArr = initialArticles
    .filter((article) => article.grades)
    .flatMap((article) => article.grades as { id: number; name: string }[]);
  const grades = Array.from(
    new Map(gradeArr.map((item) => [item.name, item])).values(),
  );

  // Extract unique languages
  const languageArr = initialArticles
    .filter((article) => article.language)
    .map((article, index) => ({
      id: index,
      name: article.language as string,
    }));
  const languages = Array.from(
    new Map(languageArr.map((item) => [item.name, item])).values(),
  );

  // Extract unique release years
  const yearsArr = initialArticles
    .filter((article) => article.releaseYear)
    .map((article, index) => ({
      id: index,
      name: article.releaseYear!.toString(),
    }));
  const releaseYears = Array.from(
    new Map(yearsArr.map((item) => [item.name, item])).values(),
  );
  releaseYears.sort((a, b) => parseInt(a.name) - parseInt(b.name));

  return {
    subjects,
    grades,
    languages,
    releaseYears,
  };
};

export default getFilterLists;
