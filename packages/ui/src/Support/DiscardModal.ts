import { baseUrl } from '@/context/constants'

interface DiscardModalProps {
  discardModal: () => void
  closeModal: () => void
}

export const DiscardModal: React.FC<DiscardModalProps> = ({ discardModal, closeModal }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center w-full overflow-hidden main-modal animated fadeIn faster"
    style={{ background: 'rgb(0,0,0,.5)' }}
    id="exampleModal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="LogTicket"
    aria-hidden="true"
  >
    <div className="w-1/6 mx-auto overflow-y-auto rounded-lg shadow-lg bg-compBg modal-container md:max-w-11/12">
      <div className="px-3 py-3 text-left modal-content">
        <div className="flex items-center justify-between pb-2">
          <p className="ml-1 text-lg font-bold text-textColor">
            Discard feedback?
          </p>
          <div className="flex">
            <div
              className="cursor-pointer modal-close"
              data-dismiss="modal"
              onClick={discardModal}
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
              onClick={discardModal}
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
          <hr className="bg-gray-400" />
        </div>

        <div className="mt-3 ml-1 mr-1 text-textColor">
          If you discard, you won't share any feedback with us.
        </div>

        <div className="flex w-full pt-2 mt-3">
          <div>
            <button
              className="w-40 p-3 px-4 ml-1 font-bold rounded-full text-textColor bg-modalButton"
              onClick={closeModal}
            >
              Discard
            </button>
          </div>
          <div>
            <button
              className="w-40 p-3 pl-2 font-bold text-left rounded-full bg-compBg text-modalButton"
              onClick={discardModal}
            >
              Continue Editing
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
