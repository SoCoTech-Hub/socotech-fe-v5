import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { api } from "@acme/snippets/api/api";
import { grades, userId } from "@acme/snippets/context/constants";
import { FetchAssignmentReplies } from "@acme/snippets/functions/assignment/assignmentReplies";
import { FetchUserProfilesByGrades } from "@acme/snippets/functions/assignment/user";
import getReadableDate from "@acme/snippets/functions/getReadableDate";
import getNextButtonHref from "@acme/snippets/utils/index";
import {AccordionSection} from "@acme/ui";
import { Button } from "@acme/ui";
import {FileUploader} from "@acme/ui";
import { MultiSelect } from "@acme/ui";
import { PopupAlert } from "@acme/ui";
import { Textarea } from "@acme/ui";
import {UploadThumbnail} from "@acme/ui";

//TODO:fix components
interface AssignmentProps {
  lessonId: string;
  assignment: {
    id: string;
    title: string;
    question?: string;
    dueDate: string;
    attachment?: Array<{
      id: string;
      name: string;
      mime: string;
      url: string;
    }>;
    isGrouped: boolean;
  };
}

interface Attachment {
  id: string;
  mime: string;
  name: string;
  url: string;
}

interface User {
  id: string;
  profile: {
    firstName: string;
    lastName: string;
    uniqueId: string;
  };
}

const Assignment: React.FC<AssignmentProps> = ({ lessonId, assignment }) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [nextButtonHref, setNextButtonHref] = useState("/");
  const [responseId, setResponseId] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [success, setSuccessMessage] = useState<string>("");
  const [error, setErrorMessages] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<
    { id: string; preview: string; name: string; mime: string }[]
  >([]);
  const dueDate = new Date(assignment.dueDate);
  const currentDate = new Date();

  useEffect(() => {
    const fetchAssignmentReplies = async () => {
      const res = await FetchAssignmentReplies({
        lessonId,
        userId: userId as string,
        assignmentId: assignment.id,
      });

      if (res) {
        const reply = res?.assignmentReplies[0];
        setResponseId(reply?.id || null);
        setAnswer(reply?.answer || null);
        setAttachments(reply?.attachments || []);
        setUserList(reply?.students || []);
        setIsCompleted(reply?.isCompleted || false);
      }

      if (currentDate >= dueDate) {
        setErrorMessages("Due date has passed");
      }
    };

    fetchAssignmentReplies();
  }, [lessonId, assignment.id, currentDate, dueDate]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await FetchUserProfilesByGrades(grades);
      setUsers(res?.users || []);
    };

    fetchUsers();
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
  }, [attachments]);

  useEffect(() => {
    const fetchNextButtonHref = async () => {
      const href = await getNextButtonHref(
        lessonId,
        "assignment",
        assignment.id,
      );
      setNextButtonHref(href);
    };

    fetchNextButtonHref();
  }, [lessonId, assignment.id]);

  const handleDocumentUpload = useCallback(async (acceptedFiles: File[]) => {
    setSuccessMessage("");
    setErrorMessages("");

    if (acceptedFiles[0]) {
      const formData = new FormData();
      formData.append("files", acceptedFiles[0]);

      try {
        const uploadedFiles = await api.POST("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (!uploadedFiles.ok) {
          setErrorMessages(uploadedFiles.problem || "File upload failed");
          return;
        }

        setAttachments((state) =>
          state ? [...state, ...uploadedFiles.data] : [...uploadedFiles.data],
        );
        setSuccessMessage("Upload successful 👍");
      } catch (err) {
        setErrorMessages(err.message || "Error uploading file");
      }
    }
  }, []);

  const markComplete = async () => {
    if (isCompleted) return;

    await api.PUT(`/assignment-replies/${responseId}`, { isCompleted: true });
    setIsCompleted(true);
    router.push(nextButtonHref);
  };

  const saveAssignment = async () => {
    const newCurrentDate = new Date();
    setSuccessMessage("");
    setErrorMessages("");

    if (newCurrentDate >= dueDate) {
      setErrorMessages("The Due date has already passed");
      return;
    }
    if (isCompleted) {
      setErrorMessages("The assignment has already been completed");
      return;
    }

    const userListMap = assignment.isGrouped
      ? userList.map((user) => parseInt(user.id))
      : [];
    userListMap.push(parseInt(userId));

    const payload = {
      students: userListMap,
      lesson: { id: lessonId },
      assignment: { id: assignment.id },
      answer,
      attachments,
      isGrouped: assignment.isGrouped,
      isCompleted,
    };

    const res = responseId
      ? await api.PUT(`/assignment-replies/${responseId}`, payload)
      : await api.POST(`/assignment-replies`, payload);

    if (res.ok) {
      setResponseId(res.data?.id || null);
      setSuccessMessage("Save Successful");
    } else {
      setErrorMessages("Something went wrong");
    }
  };

  return (
    <>
      <div className="laptop:flex desktop:flex mobile:px-1 mobile:space-y-2 laptop:justify-between desktop:justify-between items-center">
        <div className="laptop:flex-1 desktop:flex-1 min-w-0">
          <h2 className="mobile:text-xl text-textColor text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
            {assignment?.title}
          </h2>
        </div>
        <div className="flex md:mr-2 md:mt-0">
          <div className="text-textColor inline-flex items-center rounded-lg text-sm">
            Due date: {getReadableDate(dueDate)}
          </div>
        </div>
      </div>

      {assignment ? (
        <div className="text-textColor rounded-lg py-2">
          <div className="bg-compBg rounded-lg p-4 shadow-md">
            {assignment?.question ? (
              <div dangerouslySetInnerHTML={{ __html: assignment.question }} />
            ) : (
              <div className="text-textColor text-md align-middle">
                Assignment Question not found
              </div>
            )}
          </div>
          <div className="bg-compBg mt-2 rounded-lg p-4 shadow-md">
            {assignment?.attachment ? (
              <>
                <UploadThumbnail files={assignment.attachment} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="text-textColor text-md">Assignment not found</div>
        </div>
      )}
      {/*Answering area */}
      <div className="hidden">
        <AccordionSection
          items={[
            {
              key: "Answer",
              value: (
                <Textarea
                  rows={8}
                  value={answer || ""}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Give your Answer here..."
                  className="w-full rounded-lg border-2 border-gray-200 p-3 text-lg"
                />
              ),
            },
          ]}
        />
      </div>
      {assignment.isGrouped ? (
        <div className="pb-3 pt-3">
          {/* //TODO:fix props */}
          <MultiSelect
            options={users} // Available options
            selected={userList} // Currently selected options
            onChange={setUserList} // Update selected options
            placeholder="Choose your group members"
          />
        </div>
      ) : (
        <></>
      )}

      <div className="flex w-full flex-row justify-end pt-4">
        {/* //TODO:fix props */}
        {isCompleted || currentDate >= dueDate ? (
          <UploadThumbnail files={attachments} />
        ) : (
          <FileUploader
            files={attachments} // Attachments to display
            onDrop={handleDocumentUpload} // Handle file uploads
            dropzonePlaceholder="Drag and drop your files here or click to upload"
            maxFileSize={10 * 1024 * 1024} // 10MB file size limit
            multiple // Allow multiple file uploads
            filePreviews={attachmentPreviews.map((file) => ({
              id: file.id,
              preview: file.preview,
              name: file.name,
              mime: file.mime,
            }))}
            onRemove={(fileId: string) => {
              setAttachments((prevAttachments) =>
                prevAttachments.filter((file) => file.id !== fileId),
              );
              setAttachmentPreviews((prevPreviews) =>
                prevPreviews.filter((file) => file.id !== fileId),
              );
            }}
            error={error}
            success={success}
            onError={(errorMessage: string) => setErrorMessages(errorMessage)}
            onSuccess={(successMessage: string) =>
              setSuccessMessage(successMessage)
            }
          />
        )}
      </div>
      {/* NextButton */}
      <div className="pt-3">
        <PopupAlert
          message={error ? error : success}
          variant={error ? "destructive" : "success"}
          visible={!!(error || success)}
        />
      </div>

      <div className="flex flex-row justify-end">
        {isCompleted ? (
          <></>
        ) : (
          <div className="mr-6 mt-3">
            <Button className="bg-primary" onClick={() => saveAssignment()}>
              Save
            </Button>
          </div>
        )}
        {isCompleted ? (
          <div className="mr-6 mt-3">
            <Button
              className="bg-primary"
              onClick={() => router.push(nextButtonHref)}
            >
              Next
            </Button>
          </div>
        ) : (
          responseId && (
            <div className="mr-6 mt-3">
              <Button className="bg-primary" onClick={() => markComplete()}>
                Complete
              </Button>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Assignment;
