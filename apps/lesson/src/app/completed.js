import React, { useEffect, useState } from "react";
import Head from "next/head";
import LessonCard from "@/components/LessonCard";
import LessonList from "@/components/LessonList";
import LessonSelector from "@/components/LessonSelector";
import UserCover from "@/components/UserCover";
import { profileId } from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";

import { FetchLessonProgresses } from "@acme/snippets/functions/lessons/progress";
import { FetchSubjectCategories } from "@acme/snippets/functions/lessons/subjectCategories";

const Home = () => {
  const [subjectCategories, setSubjectCategories] = useState(subjectCategories);
  const [subjectCategory, setSubjectCategory] = useState(1);
  const [completedProgress, setCompletedProgress] = useState([]);
  const [subjectId, setSubject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchSubjectCategories(organizationId); //TODO: get Organization ID
      setSubjectCategories(res);
    };
    fetchData();
  }, []);

  useEffect(async () => {
    setCompletedProgress([]);

    if (profileId && subjectId && subjectCategory) {
      const res = await FetchLessonProgresses(
        subjectId,
        subjectCategory,
        profileId,
      );
      setCompletedProgress(res);
    }
  }, [subjectId, subjectCategory]);

  const seo = {
    title: "Topic - LMS Home Page",
    description: "Lesson has been completed!",
    image: "https://lms.topic.co.za/lms/logo.png",
    url: "https://topic.co.za",
  };

  return (
    <div className="col row mb-3">
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

      <div className="w-full px-3 pt-2">
        <div className="bg-compBg shadow-menu mb-4 rounded-lg pl-3 pr-3 pt-3">
          <UserCover />
          <LessonSelector
            subjectCategories={subjectCategories}
            setSubjectCategory={setSubjectCategory}
            subjectCategory={subjectCategory}
          />
        </div>
        <div className="row flex flex-row">
          <div className="desktop:w-4/12 laptop:w-4/12 mobile:w-full">
            {subjectCategory && (
              <div className="row">
                <div className="w-full">
                  <LessonList
                    subjectCategory={subjectCategories[subjectCategory - 1]}
                    setSubject={setSubject}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="desktop:w-8/12 laptop:w-8/12 mobile:w-full mobile:mt-6 desktop:mt-0">
            {completedProgress.length ? (
              <div className="desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1 grid place-items-stretch gap-2">
                {completedProgress.map((progress) => {
                  return (
                    <div key={progress.id}>
                      <LessonCard
                        imageUrl={progress.lesson?.featuredImage?.url}
                        subject={progress.lesson?.subject?.name}
                        lessonTitle={progress.lesson?.name}
                        duration={progress.lesson?.duration}
                        link={`/${parseInt(progress.lesson.id)}`}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <LessonCard
                lessonTitle="Choose a subject on the left"
                subject="to view the completed lessons"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
