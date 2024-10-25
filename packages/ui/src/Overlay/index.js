import { useRef, useState } from "react";
import { InfoIcon } from "@/components/SvgIcons/InfoIcon";

const Overlay = ({
  isOpen,
  onClose,
  title,
  content,
  confirmText,
  cancelText,
}) => {
  const cancelButtonRef = useRef();

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 overflow-y-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {isOpen && (
          <div>
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={() => onClose()}
            ></div>
            <div className="mobile:w-3/4 mobile:h-1/2 mx-auto my-24 flex items-center justify-center overflow-y-hidden">
              <div className="relative z-50 mx-auto max-w-md rounded-lg bg-white p-4">
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <InfoIcon
                      className="mr-3 h-6 w-6"
                      aria-hidden="true"
                      fill="#000"
                    />
                    <span className="text-center text-lg font-semibold text-gray-900">
                      {title}
                    </span>
                  </div>
                  <p className="mobile:text-xs mt-2 text-justify text-sm leading-tight text-gray-500">
                    {content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overlay;
