import { useCallback, useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import { DiscardModal } from './DiscardModal'
import Alert from '@/components/Alert'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import AttachmentZone from '@/components/AttachmentZone'
import api from '@/api/api'
import getGQLRequest from '@/snippets/getGQLRequest'
import createTicket from '@/snippets/support/createTicket'
import delay from '@/snippets/delay'
import { baseUrl, profileId } from '@/context/constants'

interface FeedbackModalProps {
  closeModal: () => void
}

interface Attachment {
  id: string
  url: string
  name: string
  mime: string
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ closeModal }) => {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [attachmentPreviews, setAttachmentPreviews] = useState<Attachment[]>([])
  const [error, setErrorMessages] = useState<string>('')
  const [success, setSuccessMessage] = useState<string>('')

  const [topic, setTopic] = useState<any>(null)
  const [detail, setDetail] = useState<string>('')
  const [topics, setTopics] = useState<any[]>([])

  const [discard, setDiscard] = useState<boolean>(false)
  const handleDiscard = () => setDiscard(!discard)

  useEffect(() => {
    const fetchTopics = async () => {
      await getGQLRequest({ endpoint: 'supportTopics', stateSetter: setTopics })
    }
    fetchTopics()
  }, [])

  useEffect(() => {
    setAttachmentPreviews(
      attachments.map((file) => ({
        id: file.id,
        preview: file.url,
        name: file.name,
        mime: file.mime,
      }))
    )
  }, [attachments.length])

  const handleDocumentUpload = useCallback(async (acceptedFiles: File[]) => {
    setSuccessMessage('')
    setErrorMessages('')
    if (acceptedFiles[0]) {
      const formData = new FormData()
      formData.append('files', acceptedFiles[0])

      try {
        const uploadedFiles = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (!uploadedFiles.ok) {
          setErrorMessages(uploadedFiles.problem ?? 'Upload failed')
        } else {
          setAttachments((state) => [...state, ...uploadedFiles.data])
          setSuccessMessage('Upload successful 👍')
        }
      } catch (err) {
        setErrorMessages(String(err))
      }
    }
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setErrorMessages('')
    setSuccessMessage('')
    const response = await createTicket({
      title: 'Feedback submitted',
      description: detail,
      attachments: attachments,
      supportTopic: topic,
      createdBy: profileId,
    })
    if (!response.status.toString().startsWith('2') && response.data?.message) {
      setErrorMessages(response.data.message)
    } else {
      setSuccessMessage('Submit Successful 👍, Auto closing in 3s')
      await delay(2000) // Saying 3 seconds, but set to 2 seconds
      closeModal()
    }
  }

  return (
    <div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center w-full overflow-hidden main-modal animated fadeIn faster"
        style={{ background: 'rgb(0,0,0,.5)' }}
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="LogTicket"
        aria-hidden="true"
      >
        <div className="w-1/3 mx-auto overflow-y-auto rounded-lg shadow-lg bg-compBg modal-container md:max-w-11/12">
          <div className="px-3 py-3 text-left modal-content">
            <div className="flex items-center justify-between pb-2">
              <p className="ml-1 text-lg font-bold text-textColor">Give us feedback</p>
              <div className="flex">
                <div
                  className="cursor-pointer modal-close"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  <img
                    className="w-7 h-7"
                    src={`${baseUrl}/modal_arrow.svg`}
                    alt="Modal Close"
                  />
                </div>
                <div
                  className="cursor-pointer modal-close"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  <img
                    className="w-7 h-7"
                    src={`${baseUrl}/modal_close.svg`}
                    alt="Modal Close"
                  />
                </div>
              </div>
            </div>
            <div className="ml-1 mr-1">
              <hr className="bg-compBg" />
            </div>

            <div className="mt-3 ml-1 mr-1">
              <form className="w-full">
                <div className="">
                  <div className="">
                    <label
                      htmlFor="names"
                      className="mb-2 font-bold text-textColor text-md"
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
                      className="mb-2 font-bold text-textColor text-md"
                    >
                      Details
                    </label>
                  </div>
                  <div className="">
                    <textarea
                      className="block w-full pt-3 pl-3 mt-1 border-2 border-gray-300 border-solid rounded-lg resize-none form-textarea focus:outline-none"
                      rows={5}
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
              <div className="px-3 py-2 mt-3 bg-gray-200 rounded-lg text-textColor">
                Let us know if you have ideas that can help make our products better. If you
                need help solving a specific problem, please visit the{' '}
                <a href="#" className="text-modalAnchor hover:text-modalAnchor">
                  Support Centre
                </a>
              </div>
            </div>

            <div className="flex w-full pt-2 mt-2">
              <div>
                <Alert success={success} error={error} />
              </div>
              <div>
                <button
                  className="w-40 p-3 px-4 ml-1 font-bold rounded-full text-textColor bg-modalButton"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
              <div>
                <button
                  className="w-40 p-3 pl-2 font-bold text-left rounded-full bg-compBg text-modalButton"
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
  )
}
