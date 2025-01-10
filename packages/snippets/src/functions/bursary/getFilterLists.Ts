interface Qualification {
  subjects: { name: string; id?: string }[];
  degree?: string;
}

interface FilterLists {
  subjects: { name: string; id?: string }[];
  degrees: { id: number; name: string }[];
}

export const getFilterLists = async ({
  initialQualifications,
}: {
  initialQualifications: Qualification[];
}): Promise<FilterLists> => {
  // Extract unique subjects
  const subjectSet = new Map<string, { name: string; id?: string }>();
  initialQualifications.forEach((qualification) => {
    qualification.subjects.forEach((subject) => {
      subjectSet.set(subject.name, subject);
    });
  });

  // Extract unique degrees
  const degreeSet = new Map<string, { id: number; name: string }>();
  initialQualifications.forEach((qualification, index) => {
    if (qualification.degree) {
      degreeSet.set(qualification.degree, { id: index, name: qualification.degree });
    }
  });

  return {
    subjects: Array.from(subjectSet.values()),
    degrees: Array.from(degreeSet.values()),
  };
};

export default getFilterLists;
