import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const IFrame = ({ src, setLoading }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(0);
  const div_ref = React.createRef();
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  let encodedEmbedURL = encodeURI(`${src}#view=fitH`);
  const navigate = async (direction) => {
    if (direction == "back") {
      setPageNumber(pageNumber - 1);
    } else if (direction == "next") {
      setPageNumber(pageNumber + 1);
    }
  };
  function handleResize() {
    if (div_ref.current) {
      setWidth(div_ref.current.getBoundingClientRect().width);
    }
  }
  window.addEventListener("resize", handleResize);

  useEffect(() => {
    if (div_ref.current) {
      setWidth(div_ref.current.getBoundingClientRect().width);
    }
    document.addEventListener("keyup", (e) => {
      if (e.key == "PrintScreen") {
        navigator.clipboard.writeText("");
        alert("Screenshots disabled!");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key == "p") {
        alert("This section is not allowed to print or export to PDF");
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
  }, []);

  return (
    <div
      ref={div_ref}
      className="overflow-y height:900px"
      style={{ textAlign: "center" }}
    >
      <Document
        file={encodedEmbedURL}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => e.preventDefault()}
        className="pdf-container"
      >
        <Page height={800} width={width} pageNumber={pageNumber} />
      </Document>
      <br></br>
      {numPages && (
        <p>
          {pageNumber > 1 && (
            <button className="mr-5" onClick={() => navigate("back")}>
              Previous
            </button>
          )}
          Page {pageNumber} of {numPages}
          {pageNumber < numPages && (
            <button className="ml-5" onClick={() => navigate("next")}>
              Next
            </button>
          )}
        </p>
      )}
      <br></br>
    </div>
  );
};
export default IFrame;
