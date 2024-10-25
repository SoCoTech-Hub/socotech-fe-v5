import { baseUrl } from "@/context/constants";

export const DiscardModal = ({ discardModal, closeModal }) => (
  <div
    className="main-modal animated fadeIn faster fixed inset-0 z-50 flex w-full items-center justify-center overflow-hidden"
    style={{ background: "rgb(0,0,0,.5)" }}
    id="exampleModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="LogTicket"
    aria-hidden="true"
  >
    <div className="bg-compBg modal-container md:max-w-11/12 mx-auto w-1/6 overflow-y-auto rounded-lg shadow-lg">
      <div className="modal-content px-3 py-3 text-left">
        <div className="flex items-center justify-between pb-2">
          <p className="text-textColor ml-1 text-lg font-bold">
            Discard feedback?
          </p>
          <div className="flex">
            <div
              className="modal-close cursor-pointer"
              data-dismiss="modal"
              onClick={discardModal}
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
              onClick={discardModal}
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
          <hr className="bg-gray-400" />
        </div>

        <div className="text-textColor ml-1 mr-1 mt-3">
          If you discard, you wont share any feedbackwith us.
        </div>

        <div className="mt-3 flex w-full pt-2">
          <div>
            <button
              className="text-textColor bg-modalButton ml-1 w-40 rounded-full p-3 px-4 font-bold"
              onClick={closeModal}
            >
              Discard
            </button>
          </div>
          <div>
            <button
              className="bg-compBg text-modalButton w-40 rounded-full p-3 pl-2 text-left font-bold"
              onClick={discardModal}
            >
              Continue Editing
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
