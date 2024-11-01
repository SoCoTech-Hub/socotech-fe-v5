// import React, { useEffect, useState } from "react"
// import { Document, Page, pdfjs } from "react-pdf"
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

// interface IFrameProps {
//   src: string
//   setLoading: (loading: boolean) => void
// }

// const IFrame: React.FC<IFrameProps> = ({ src, setLoading }) => {
//   const [numPages, setNumPages] = useState<number | null>(null)
//   const [pageNumber, setPageNumber] = useState<number>(1)
//   const [width, setWidth] = useState<number>(0)
//   const div_ref = React.createRef<HTMLDivElement>()

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages)
//     setLoading(false)
//   }

//   const encodedEmbedURL = encodeURI(`${src}#view=fitH`)

//   const navigate = (direction: string) => {
//     if (direction === "back" && pageNumber > 1) {
//       setPageNumber(pageNumber - 1)
//     } else if (direction === "next" && numPages && pageNumber < numPages) {
//       setPageNumber(pageNumber + 1)
//     }
//   }

//   function handleResize() {
//     if (div_ref.current) {
//       setWidth(div_ref.current.getBoundingClientRect().width)
//     }
//   }

//   useEffect(() => {
//     if (div_ref.current) {
//       setWidth(div_ref.current.getBoundingClientRect().width)
//     }

//     const handleKeyUp = (e: KeyboardEvent) => {
//       if (e.key === "PrintScreen") {
//         navigator.clipboard.writeText("")
//         alert("Screenshots disabled!")
//       }
//     }

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.ctrlKey && e.key === "p") {
//         alert("This section is not allowed to print or export to PDF")
//         e.preventDefault()
//         e.stopImmediatePropagation()
//       }
//     }

//     document.addEventListener("keyup", handleKeyUp)
//     document.addEventListener("keydown", handleKeyDown)
//     window.addEventListener("resize", handleResize)

//     return () => {
//       document.removeEventListener("keyup", handleKeyUp)
//       document.removeEventListener("keydown", handleKeyDown)
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [div_ref])

//   return (
//     <div
//       ref={div_ref}
//       className="overflow-y"
//       style={{ textAlign: "center", height: "900px" }}
//     >
//       <Document
//         file={encodedEmbedURL}
//         onLoadSuccess={onDocumentLoadSuccess}
//         onContextMenu={(e) => e.preventDefault()}
//         className="pdf-container"
//       >
//         <Page height={800} width={width} pageNumber={pageNumber} />
//       </Document>
//       <br />
//       {numPages && (
//         <p>
//           {pageNumber > 1 && (
//             <button className="mr-5" onClick={() => navigate("back")}>
//               Previous
//             </button>
//           )}
//           Page {pageNumber} of {numPages}
//           {pageNumber < numPages && (
//             <button className="ml-5" onClick={() => navigate("next")}>
//               Next
//             </button>
//           )}
//         </p>
//       )}
//       <br />
//     </div>
//   )
// }

// export default IFrame
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@acme/ui";

interface IFrameProps {
  src: string;
  title: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  allowFullScreen?: boolean;
  sandbox?: string;
}

export function IFrame({
  src,
  title,
  width = "100%",
  height = "400px",
  className,
  allowFullScreen = false,
  sandbox = "allow-scripts allow-same-origin",
}: IFrameProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      )}
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        className={cn("border-0", isLoading ? "invisible" : "visible")}
        allowFullScreen={allowFullScreen}
        sandbox={sandbox}
        onLoad={handleLoad}
      />
    </div>
  );
}
