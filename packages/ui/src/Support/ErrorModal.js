import { useCallback, useEffect, useState } from "react";
import api from "@/api/api";
import Alert from "@/components/Alert";
import AttachmentZone from "@/components/AttachmentZone";
import DefaultSelectNew from "@/components/DefaultSelectNew";
import { baseUrl } from "@/context/constants";
import delay from "@/snippets/delay";
import getGQLRequest from "@/snippets/getGQLRequest";
import createTicket from "@/snippets/support/createTicket";
import Modal from "@mui/material/Modal";

import { DiscardModal } from "./DiscardModal";

export const ErrorModal = ({ closeModal }) => {
  const [attachments, setAttachments] = useState([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState([]);
  const [error, setErrorMessages] = useState("");
  const [success, setSuccessMessage] = useState("");

  const [topic, setTopic] = useState(null);
  const [detail, setDetail] = useState("");
  const [topics, setTopics] = useState([]);

  const [discard, setDiscard] = useState(false);
  const handleDiscard = () => setDiscard(!discard);

  useEffect(async () => {
    await getGQLRequest({ endpoint: `supportTopics`, stateSetter: setTopics });
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

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages("");
    setSuccessMessage("");
    const response = await createTicket({
      title: "Something went wrong",
      description: detail,
      attachments: attachments,
      supportTopic: topic,
      createdBy: profileId,
    });
    if (!response.status.toString().startsWith(2) && response.data.message) {
      setErrorMessages(response);
    } else {
      setSuccessMessage("Ticket sent Successfully! 🚀 Auto closing in 3s");
      await delay(2000); //saying 3 seconds, but set to 2 seconds
      closeModal();
    }
  };

  return (
    <div>
      <div
        className="main-modal animated fadeIn faster fixed inset-0 z-50 flex w-full items-center justify-center overflow-hidden"
        style={{ background: "rgb(0,0,0,.5)" }}
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="LogTicket"
        aria-hidden="true"
      >
        <div className="bg-compBg modal-container md:max-w-11/12 mx-auto w-1/3 overflow-y-auto rounded-lg shadow-lg">
          <div className="modal-content px-3 py-3 text-left">
            <div className="flex items-center justify-between pb-2">
              <p className="text-textColor ml-1 text-lg font-bold">
                Something went wrong
              </p>
              <div className="flex">
                <div
                  className="modal-close cursor-pointer"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  <img
                    className="h-7 w-7"
                    src={`${baseUrl}/modal_arrow.svg`}
                    alt="Modal Close"
                  />
                </div>
                <div
                  className="modal-close cursor-pointer"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  <img
                    className="h-7 w-7"
                    src={`${baseUrl}/modal_close.svg`}
                    alt="Modal Close"
                  />
                </div>
              </div>
            </div>
            <div className="ml-1 mr-1">
              <hr className="bg-comp-Bg" />
            </div>

            <div className="ml-1 mr-1 mt-3">
              <form className="w-full">
                <div className="">
                  <div className="">
                    <label
                      htmlFor="names"
                      className="text-textColor text-md mb-2 font-bold"
                    >
                      How can we improve
                    </label>
                  </div>
                  <DefaultSelectNew
                    options={topics}
                    id="feedbackTopic"
                    name="feedbackTopic"
                    placeholder="Choose a topic"
                    value={topic}
                    valueSetter={setTopic}
                    required
                  />

                  <div className="mt-2">
                    <label
                      htmlFor="phone"
                      className="text-textColor text-md mb-2 font-bold"
                    >
                      Details
                    </label>
                  </div>
                  <div className="">
                    <textarea
                      className="form-textarea mt-1 block w-full resize-none rounded-lg border-2 border-solid border-gray-300 pl-3 pt-3 focus:outline-none"
                      rows="5"
                      placeholder="Please include as much info as possible..."
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </form>
              <AttachmentZone
                files={attachments}
                filesSetter={setAttachments}
                filesPreviews={attachmentPreviews}
                onDrop={handleDocumentUpload}
                acceptFileTypes=""
                dropzonePlaceholder="Add a screenshot or video (recommended)"
              />

              <div className="text-textColor mt-3 rounded-lg bg-gray-200 px-3 py-2">
                Let us know if you have ideas that can help make our products
                better. If you need help solving a specific problem, please
                visit the{" "}
                <a href="#" className="text-modalAnchor hover:text-modalAnchor">
                  Support Centre
                </a>
              </div>
            </div>
            <Alert success={success} error={error} />
            <div className="mt-2 flex w-full pt-2">
              <div>
                <button
                  className="text-textColor bg-modalButton ml-1 w-40 rounded-full p-3 px-4 font-bold"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
              <div>
                <button
                  className="bg-compBg text-modalButton w-40 rounded-full p-3 pl-2 text-left font-bold"
                  onClick={handleDiscard}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={discard}
        onClose={handleDiscard}
        aria-labelledby="modal-discard"
        aria-describedby="modal-discard"
      >
        <DiscardModal discardModal={handleDiscard} closeModal={closeModal} />
      </Modal>
    </div>
  );
};
