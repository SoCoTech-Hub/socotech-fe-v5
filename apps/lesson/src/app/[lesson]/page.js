import { useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/api/api";
import Btn from "@/components/Btn";
import LessonProgress from "@/components/LessonProgress";
import LessonRating from "@/components/LessonRating/LessonRating";
import LessonTabs from "@/components/LessonTabs";
import Load from "@/components/Load";
import { mainUrl, profileId, userId } from "@/context/constants";
import { useCountdown } from "@/hooks/useCountDown/useCountDown";
import { convertDateToDaysHoursMinSec } from "@/snippets/convertDateToDaysHoursMinSec";
import getDataRequest from "@/snippets/getDataRequest";
import getGQLRequest from "@/snippets/getGQLRequest";
import { parseCookies } from "@/snippets/parseCookies";
import { useMutation, useQuery } from "@apollo/client";
import { NoSsr } from "@mui/material";
import ZoomLessonCreate from "graphql/mutations/ZoomLessonCreate";
import ZoomLessonUpdate from "graphql/mutations/ZoomLessonUpdate";
import GetZoomLessonOccupancy from "graphql/queries/GetZoomLessonOccupancy";

import { FetchAssignmentReplyCheck } from "@acme/snippets/functions/lesson/assignmentReplies";
import { FetchLessonRequiredLessons } from "@acme/snippets/functions/lesson/lesson";
import { FetchLessonProgress } from "@acme/snippets/functions/lesson/progress";
import { FetchQuizResponseCheck } from "@acme/snippets/functions/lesson/quizResponse";
import { FetchSurveyResponseCheck } from "@acme/snippets/functions/lesson/surveyResponse";
import { FetchCheckLessonTimeTrack } from "@acme/snippets/functions/lesson/timeTrack";

const lesson = ({
  lesson,
  progress,
  // rating,
  required,
}) => {
  const router = useRouter();
  //FeatureImage
  const featureImageUrl = () => {
    return lesson.featuredImage
      ? lesson.featuredImage.url
      : "./featureimage.jpg";
  };

  const [countDownToLessonStart] = useCountdown(lesson.startDate);
  const [countDownToLessonEnd] = useCountdown(lesson.endDate);

  const { data, loading, error } = useQuery(GetZoomLessonOccupancy, {
    variables: { id: lesson.id, profileID: profileId },
  });

  const [createParticipant] = useMutation(ZoomLessonCreate);

  const [updateParticpant] = useMutation(ZoomLessonUpdate);

  const [days, hours, minutes, seconds] = convertDateToDaysHoursMinSec(
    countDownToLessonStart,
  );

  useEffect(async () => {
    if (userId && lesson?.id && !progress?.isComplete) {
      const res = await FetchLessonProgress(userId, lesson.id);
      progress = res?.length > 0 ? res[0] : [];

      let completeArray = [];
      if (lesson.lmsAssignments) {
        let assignmentReplies = await FetchAssignmentReplyCheck(
          lesson?.id, //lessonId
          lesson?.lmsAssignments?.map((assignment) => assignment.id), //lessonAssignments
          userId, //userId
        );
        if (assignmentReplies.length > 0) {
          completeArray.push(true);
        } else {
          completeArray.push(false);
          return;
        }
      }
      if (lesson.lmsQuizs?.length > 0) {
        await lesson.lmsQuizs?.map(async (x) => {
          let quizResponses = await FetchQuizResponseCheck(
            lesson.id, //lessonId
            x?.id, //quizIds
            userId, //userId
          );
          if (quizResponses.length > 0) {
            completeArray.push(true);
          } else {
            completeArray.push(false);
            return;
          }
        });
      }
      if (lesson.lmsSurveys?.length > 0) {
        await lesson.lmsSurveys?.map(async (x) => {
          let surveyResponses = await FetchSurveyResponseCheck(
            lesson.id, //lessonId
            x?.id, //surveyIds
            userId, //userId
          );
          if (surveyResponses.length > 0) {
            completeArray.push(true);
          } else {
            completeArray.push(false);
            return;
          }
        });
      }
      if (
        !completeArray.includes(false) &&
        progress?.id &&
        !progress?.isComplete
      ) {
        const response = await FetchCheckLessonTimeTrack(lesson?.id, userId);
        if (
          response.length &&
          response[0]?.timeSpent >= lesson?.modules[0]?.duration
        ) {
          await api.put(`/time-tracks/${response[0].id}`, {
            isComplete: 1,
          });
        }
        if (progress?.totalSteps === progress?.completedSteps) {
          await api
            .put(`/progresses/${progress?.id}`, {
              isComplete: 1,
            })
            .then(() => {
              router.reload();
            });
        }
      }
    }
  }, [lesson.id]);

  if (loading) {
    return (
      <>
        <Load />
      </>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  const handleLiveLessonClick = () => {
    if (data.lessonCurrent?.aggregate?.count >= data.lessonTotal[0]?.capacity) {
      router.push(`/livelessonfull`);
    } else if (lesson.link?.startsWith("http")) {
      window.location.href = lesson.link;
    } else {
      if (data?.lessonUser?.length > 0) {
        updateParticpant({
          variables: {
            id: data?.lessonUser[0]?.id,
            active: true,
          },
          onCompleted: () => {
            window.location.href = `${mainUrl}/zoom/webinar/${lesson.id}/${lesson.link}?participantID=${data?.lessonUser[0]?.id}`;
          },
        });
      } else {
        createParticipant({
          variables: {
            id: profileId,
            lessonID: lesson.id,
            active: true,
          },
          onCompleted: (zoomLessonData) => {
            window.location.href = `${mainUrl}/zoom/webinar/${lesson.id}/${lesson.link}?participantID=${zoomLessonData.createZoomLesson.zoomLesson.id}`;
          },
        });
      }
    }
  };

  const seo = {
    title: `Topic - ${lesson.name}`,
    description: lesson.name,
    image: "https://lms.topic.co.za/lms/logo.png",
    url: "https://topic.co.za",
  };

  return lesson ? (
    <NoSsr>
      <div className="">
        <img
          src={featureImageUrl()}
          alt="Lesson Image"
          className="mobile:h-28 h-60 w-full rounded-lg object-cover"
        />
        <div className="mobile:space-y-4 flex flex-col space-y-7">
          <div className="item w-full">
            <LessonProgress
              progresses={progress}
              lesson={lesson}
              // rating={rating}
              // hasRating={lesson.hasRating}
            />
          </div>
          {lesson.isLiveLesson && (
            <div className="item mb-3 w-full">
              {countDownToLessonStart > 0 ? (
                <p>
                  Starting in:{" "}
                  <span className="text-sm font-bold">
                    {`${
                      days > 0 ? `${days} day(s)` : ""
                    } ${hours}h ${minutes}min ${seconds}s`}
                  </span>
                </p>
              ) : (
                <>
                  {countDownToLessonEnd > 0 ? (
                    <Btn
                      label="Start Lesson"
                      color="bg-themeColorSecondary"
                      target={
                        lesson.link?.startsWith("http") ? "_blank" : "_self"
                      }
                      onClickFunction={() => handleLiveLessonClick()}
                    />
                  ) : lesson.modules.length ? (
                    <Btn
                      label="View Recording"
                      color="bg-themeColorSecondary"
                      link={`/${lesson.id}/module/${lesson.modules[0].id}`}
                    />
                  ) : (
                    <p className="text-sm font-bold">
                      This session has ended. Recording coming soon
                    </p>
                  )}
                </>
              )}
            </div>
          )}
          <div className="item w-full">
            <LessonTabs lesson={lesson} required={required} />
          </div>
          {lesson.hasRating ? (
            <div className="w-full">
              <LessonRating lesson={lesson} />
            </div>
          ) : (
            <div className="w-full" />
          )}
        </div>
      </div>
    </NoSsr>
  ) : (
    <>
      <Head>
        <title>Lesson Not Found</title>
        <meta name="description" content="Lesson Not Found" key="title" />
      </Head>
      <h>Oh no, Lesson not found</h>
    </>
  );
};

export async function getServerSideProps(context) {
  const { lesson } = context.query;
  const cookies = parseCookies(context.req);
  const userId = parseInt(cookies.userid);
  if (lesson == "[object Object]") {
    return {
      props: {
        lesson: [],
        progress: [],
        // rating: '',
        required: [],
      },
    };
  }
  const lessonObj = await FetchLessonRequiredLessons(lesson);
  const progresses = await FetchLessonProgress(userId, lesson.id); //TODO: get Lesson Id from page route
  //TODO: check ratings requirements before writing the fetch statement
  // const rating = await getDataRequest(
  //   `/lesson-ratings?user=${userId}&lesson=${lesson}`,
  //   () => {}
  // )
  let required = lessonObj.requiredLesson
    ? FetchLessonProgress(userId, lesson.requiredLesson.id)
    : 0;

  return {
    props: {
      lesson: lessonObj ? lessonObj : [],
      progress: progresses.length ? progresses[0] : [],
      // rating: rating ? rating[0] : "",
      required: required ? required.progresses : required,
    },
  };
}

export default lesson;
