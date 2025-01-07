import { useEffect, useState } from "react";
import Head from "next/head";
import DigilibLoad from "@/components/DigilibLoad";
import LessonCard from "@/components/LessonCard";
import LessonList from "@/components/LessonList";
import LessonSelector from "@/components/LessonSelector";
import UserCover from "@/components/UserCover";

import { isPaying } from "@acme/snippets/context/constants";
import { FetchLessonsCardDetail } from "@acme/snippets/functions/lesson/lesson";
import { FetchSubjectCategories } from "@acme/snippets/functions/lesson/subjectCategories";

// import { FetchLessonSubjectAndCategory } from "@acme/snippets/functions/lesson/lesson";

const Home = () => {
  const [subjectCategories, setSubjectCategories] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState(5);
  const [subjectCategoryList, setSubjectCategoryList] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [subjectId, setSubject] = useState(null);
  const publishDate = new Date().toISOString(); // Get the current date to check for lessons before current date

  // useEffect(async () => {
  // 	if (subjectCategory) {
  // const res = await FetchLessonSubjectAndCategory(organizationId,publishDate,subjectCategory)
  // setLessons(res)
  // 		// Find the subject category in the response data
  // 		const EffectSubjectCategory = subjectCategories.find(
  // 			(category) => category.id == subjectCategory
  // 		)
  // 		if (EffectSubjectCategory) {
  // 			// Create a map of subject IDs to lesson counts
  // 			const subjectLessonCounts = lessons.reduce((countMap, lesson) => {
  // 				if (lesson.subject && lesson.subject.id) {
  // 					const subjectId = lesson.subject.id
  // 					countMap[subjectId] = (countMap[subjectId] || 0) + 1
  // 				}
  // 				return countMap
  // 			}, {})

  // 			// Map subjects with their lesson counts using the above map
  // 			const subjectsWithLessonCount = EffectSubjectCategory.subjects.map(
  // 				(subject) => ({
  // 					...subject,
  // 					lessonCount: subjectLessonCounts[subject.id] || 0
  // 				})
  // 			)
  // 			// Create a new subject category object with the updated subjects
  // 			const subjectCategoryWithLessonCount = {
  // 				...subjectCategory,
  // 				subjects: subjectsWithLessonCount
  // 			}
  // 			setSubjectCategoryList(subjectCategoryWithLessonCount)
  // 		}
  // 	}
  // }, [subjectCategory])

  useEffect(() => {
    const fetchData = async () => {
      const sub = await FetchSubjectCategories(organizationId);
      setSubjectCategories(sub);
    };
    if (!subjectCategories.length) {
      fetchData();
    }
    if (subjectCategory) {
      setSubjectCategoryList(
        subjectCategories.find((x) => x.id == subjectCategory),
      );
    }
  }, [subjectCategory]);

  useEffect(async () => {
    if (subjectId && subjectCategory) {
      const res = await FetchLessonsCardDetail(
        organizationId,
        subjectCategory,
        publishDate,
        subjectId,
      );
      setLessons(res);
    }
  }, [subjectId, subjectCategory]);

  const seo = {
    title: "Topic - LMS Home Page",
    description: "Choose from different lessons!",
    image: "https://lms.topic.co.za/lms/logo.png",
    url: "https://topic.co.za",
  };

  return (
    <div className="desktop:mb-3 laptop:mb-3 mobile:mb-0">
      <Head>
        <title>{seo.title}</title>
        <meta name="title" content={seo.title} />
        <meta name="description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.url} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seo.url} />
        <meta property="twitter:title" content={seo.title} />
        <meta property="twitter:description" content={seo.description} />
        <meta property="twitter:image" content={seo.image} />
      </Head>

      <div className="mobile:space-y-3 mobile:w-full mobile:mb-10 space-y-10">
        <div className="desktop:mb-4 laptop:mb-4 mobile:mb-0 bg-compBg shadow-menu rounded-lg px-3 pb-0 pt-3">
          <UserCover edit="true" />
          <div className="ml-2 mr-2 mt-4">
            <hr className="border-themeColorMain border-b-2 pb-2" />
          </div>

          <LessonSelector
            subjectCategories={subjectCategories}
            setSubjectCategory={setSubjectCategory}
            subjectCategory={subjectCategory}
            setSubject={setSubject}
          />
        </div>
        <div className="flex flex-row">
          {subjectCategory && !subjectId && (
            <div className="desktop:grid-col-5 laptop:grid-col-4 mobile:grid-col-2 grid w-full">
              <div className="w-full text-xs">
                <LessonList
                  subjectCategory={subjectCategoryList}
                  setSubject={setSubject}
                />
              </div>
            </div>
          )}
          {subjectCategory && subjectId && (
            <div className="desktop:grid-col-5 laptop:grid-col-4 mobile:grid-col-1 grid">
              {lessons.length ? (
                <div className="desktop:grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-2 grid place-items-stretch gap-2">
                  {lessons.map((lesson) => {
                    return (
                      <div key={lesson.id}>
                        <LessonCard
                          imageUrl={lesson?.featuredImage?.url}
                          subject={lesson?.subject?.name}
                          lessonTitle={lesson?.name}
                          duration={lesson?.duration}
                          link={`/${lesson.id}`}
                          disabled={isPaying ? "" : lesson.price}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="desktop:gap-2 mobile:gap-4 desktop:grid-cols-2 mobile:grid-cols-1 text-textColor grid place-items-stretch text-sm">
                  <DigilibLoad lessonTitle="Choose a subject to get started" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
