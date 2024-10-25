import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/api";
import Alert from "@/components/Alert";
import DefaultSelectNew from "@/components/DefaultSelectNew";
import FilesDropzone from "@/components/FilesDropzone";
import { useAppContext } from "@/context/AppContext";
import {
  baseName,
  baseUrl,
  device,
  profileId,
  SecondaryColor,
} from "@/context/constants";
import delay from "@/snippets/delay";
// import Loader from "@/components/Loader"
import getGQLRequest from "@/snippets/getGQLRequest";
import createTicket from "@/snippets/support/createTicket";

export const Support = ({ setShowModal, showModal }) => {
  const { state } = useAppContext();
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState(null);

  const [attachments, setAttachments] = useState([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState([]);
  const [error, setErrorMessages] = useState("");
  const [success, setSuccessMessage] = useState("");

  useEffect(async () => {
    await getGQLRequest({
      endpoint: `supportTopics`,
      stateSetter: setTopics,
      sort: `name:asc`,
      fields: `id,name`,
    });
    const { supportTopics } = await getGQLRequest({
      endpoint: `supportTopics`,
      where: `name_contains: "${baseName}"`,
      fields: `id,name`,
    });
    setTopic(supportTopics[0]?.id);
  }, []);

  useEffect(() => {
    setAttachmentPreviews(
      attachments.map((file) => ({
        id: file.id,
        preview: file.url,
        name: file.name,
        mime: file.mime,
      })),
    );
  }, [attachments.length]);

  // if (loading) {return (<><Loader /></>)}

  const handleDocumentUpload = useCallback(async (acceptedFiles) => {
    setSuccessMessage("");
    setErrorMessages("");
    if (acceptedFiles[0]) {
      const formData = new FormData();
      formData.append("files", acceptedFiles[0]);

      try {
        const uploadedFiles = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (!uploadedFiles.ok) {
          setErrorMessages(uploadedFiles.problem);
        }
        setAttachments((state) => {
          setAttachments([...state, ...uploadedFiles.data]);
        });
        setSuccessMessage("Upload successful 👍");
      } catch (err) {
        setErrorMessages(err);
      }
    }
  }, []);
  const submit = async () => {
    setErrorMessages("");
    setSuccessMessage("");
    const response = await createTicket({
      title: title,
      description: message,
      attachments: attachments,
      supportTopicId: topic,
      createdBy: profileId,
      path: `${baseUrl}${router.asPath}`,
      device: decodeURIComponent(device),
    });
    if (!response.ok) {
      setErrorMessages(response.data.message);
      await delay(2000);
      setShowModal(!showModal);
    } else {
      setSuccessMessage("Ticket created Successfully 👍");
      await delay(2000);
      setShowModal(!showModal);
    }
  };
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={router.back}
          className="bg-themeColorMain rounded-full px-1.5 text-black"
        >
          x
        </button>
      </div>
      <div className="flex h-full items-center justify-between py-2 pl-2 align-middle">
        <p className="text-themeColorMain bg-compBg ml-1 text-2xl font-bold">
          Log Ticket
        </p>
      </div>
      <div className="ml-1 mr-1 mt-2">
        <hr className="bg-compBg" />
      </div>
      <form className="w-full pl-2">
        <div className="desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1 grid gap-2">
          <div className="mt-2">
            <div className="w-full pl-2">
              <label
                htmlFor="names"
                className="text-textColor text-md mb-2 font-bold"
              >
                Ticket Title
              </label>
            </div>
            <div className="w-full pl-2">
              <input
                type="text"
                id="names"
                autoComplete="off"
                name="names"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="desktop:mb-4 laptop:mb-4 mobile:mt-1 bg-compBg text-textColor w-full rounded-lg border-2 border-gray-300 px-2 py-3 focus:outline-none"
                placeholder={"Start typing here"}
              />
            </div>
          </div>
          <div className="desktop:mt-2 laptop:mt-2">
            <div className="w-full pl-2">
              <label className="text-textColor text-md font-bold">
                Select Tag
              </label>
            </div>
            <div className="w-full pl-2">
              <DefaultSelectNew
                options={topics}
                id="topics"
                name="topics"
                valueSetter={setTopic}
                value={topic}
                className="text-grey-900 bg-compBg text-textColor rounded-lg border-2 border-gray-300 p-2 font-bold"
              />
            </div>
          </div>
        </div>

        <div className="w-full pl-2">
          <div className="w-full">
            <label
              htmlFor="phone"
              className="text-md text-textColor mb-2 font-bold"
            >
              Ticket Message
            </label>
          </div>
          <div className="w-full">
            <textarea
              className="form-textarea bg-compBg text-textColor block w-full resize-none rounded-lg border-2 border-solid border-gray-300 p-2 focus:outline-none"
              rows="4"
              placeholder="Start typing here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="text-textColor w-full pl-2">
          <div className="text-textColor mt-2 rounded-lg">
            <FilesDropzone
              files={attachments}
              filesSetter={setAttachments}
              filesPreviews={attachmentPreviews}
              onDrop={handleDocumentUpload}
              acceptFileTypes=""
              dropzonePlaceholder="Attachments"
            />
          </div>
        </div>
        <div className="w-full pl-2">
          <div className="">
            <Alert error={error} success={success} />
            {title && message && topic && profileId && (
              <button
                className="text-md bg-themeColorMain w-full rounded-full p-3 px-4 font-bold text-black"
                onClick={submit}
              >
                Log Ticket Now
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
