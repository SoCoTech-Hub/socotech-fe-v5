// import React from 'react';
// import { baseUrl } from '@/context/constants';
// import { Close } from '@/components/SvgIcons';

// interface ModalProps {
//   open?: boolean;
//   setOpen: (open: boolean) => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ open = true, setOpen, children }) => {
//   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     // Check if the click target is the overlay (background) itself, not the modal content
//     if (e.currentTarget.id === 'overlay') {
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       {open ? (
//         <div
//           id='overlay'
//           onClick={handleOverlayClick}
//           className='fixed inset-0 flex items-center justify-center w-full h-full animated fadeIn faster'
//           style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 300 }}
//           tabIndex={-1}
//           role='dialog'
//           aria-labelledby='LogTicket'
//           aria-hidden='true'
//         >
//           <div
//             className='relative w-full max-w-3xl rounded-lg shadow-lg bg-compBg'
//             style={{
//               position: 'relative',
//               overflow: 'hidden',
//               maxHeight: '80vh', // Ensure it fits within the viewport with some margin
//               width: '90%', // Responsive width
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center'
//             }}
//             onClick={(e) => e.stopPropagation()} // Prevents clicks inside the modal from closing it
//           >
//             {/* Close Button */}
//             <div className='absolute z-50 top-2 right-2'>
//               <button
//                 onClick={() => setOpen(false)}
//                 className='cursor-pointer'
//               >
//                 <Close className='w-7 h-7' />
//               </button>
//             </div>

//             {/* Content (e.g., Video) */}
//             <div
//               style={{
//                 position: 'relative',
//                 paddingTop: '56.25%', // 16:9 aspect ratio
//                 width: '100%',
//                 flex: '1 1 auto'
//               }}
//             >
//               <div
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%'
//                 }}
//               >
//                 {children}
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default Modal;

"use client";

import React from "react";
import { X } from "lucide-react";

import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export default function Modal({
  trigger,
  title,
  description,
  children,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => onOpenChange?.(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// USE:
// 'use client'

// import { useState } from 'react'
// import Modal from './path-to/modal'
// import { Button } from "@acme/ui/button"

// export default function ModalExample() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <div className="p-4">
//       <Modal
//         trigger={<Button>Open Modal</Button>}
//         title="Example Modal"
//         description="This is an example of our reusable modal component."
//         onOpenChange={setIsOpen}
//       >
//         <div className="py-4">
//           <p>This is the main content of the modal. You can put any React components or HTML here.</p>
//         </div>
//         <div className="flex justify-end">
//           <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
//         </div>
//       </Modal>
//       <p className="mt-4">Modal is {isOpen ? 'open' : 'closed'}</p>
//     </div>
//   )
// }
