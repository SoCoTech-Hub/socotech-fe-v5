import { useState } from "react";
import Head from "next/head";
import ResourceHeader from "@/components/ResourceHeader";
import ResourceIframe from "@/components/ResourceIframe";

import { FetchLessonResources } from "@acme/snippets/functions/lesson/lesson";

export default function Article() {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const lessons = await FetchLessonResources(lesson.id); //TODO: get Lesson Id
      if (lessons.length) {
        setDocuments(
          lessons
            ?.map((lesson) =>
              lesson.resources.map((resource) => `/document/${resource.id}`),
            )
            .flat() || [],
        );
      }
    };
    fetchData();
  }, []);

  if (!documents.length) {
    return (
      <div>
        <Head>
          <title>Document Home Page</title>
          <meta name="description" content="Document Home Page" key="title" />
        </Head>
        <div>Resource not found</div>
      </div>
    );
  }
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="col row">
        <Head>
          <title>
            {lesson.name ? `Document: ${lesson.name}` : "Document Home Page"}
          </title>
          <meta
            name="description"
            content={
              lesson.name ? `Document: ${lesson.name}` : "Document Home Page"
            }
            key="title"
          />
        </Head>
        <div className="desktop:space-y-10 laptop:space-y-10 mobile:space-y-4">
          <div className="">
            <ResourceHeader
              name={lesson?.name}
              loading={loading}
              downloadLink={lesson?.url}
              downloadable={lesson?.related[0]?.materialsDownload}
            />
          </div>
          <div className="pl-3 pr-3"></div>
          <div className=""></div>
        </div>
      </div>
      <div className="shadow-outline bg-compBg rounded-lg p-6">
        <ResourceIframe src={lesson.url} setLoading={setLoading} />
      </div>
    </>
  );
}
