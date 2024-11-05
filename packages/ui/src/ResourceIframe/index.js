import { createRef, useEffect, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
import Pagination from "@/components/Pagination"

const IFrame = ({ src, setLoading }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [width, setWidth] = useState(0)
  const div_ref = createRef()
  const [loader, setLoader] = useState(true)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setLoading(false)
  }

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
    setLoader(false)
  }, [])

  let encodedEmbedURL = encodeURI(`${src}#view=fitH`)

  function handleResize() {
    if (div_ref.current) {
      setWidth(div_ref.current.getBoundingClientRect().width)
    }
  }
  window.addEventListener("resize", handleResize)

  useEffect(() => {
    if (div_ref.current) {
      setWidth(div_ref.current.getBoundingClientRect().width)
    }
    document.addEventListener("keyup", (e) => {
      if (e.key == "PrintScreen") {
        navigator.clipboard.writeText("")
        alert("Screenshots disabled!")
      }
    })
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key == "p") {
        alert("This section is not allowed to print or export to PDF")
        e.cancelBubble = true
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    })
  }, [])

  return (
    <>
      <div
        ref={div_ref}
        className="overflow-y height:900px"
        style={{ textAlign: "center" }}
      >
        {loader ? (
          <>Loading PDF Reader</>
        ) : (
          <Document
            file={encodedEmbedURL}
            onLoadSuccess={onDocumentLoadSuccess}
            onContextMenu={(e) => e.preventDefault()}
            className="pdf-container"
          >
            <Page height={800} width={width} pageNumber={pageNumber} />
          </Document>
        )}
        <br></br>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            className="pagination-bar"
            currentPage={pageNumber}
            totalCount={numPages ? numPages : 0}
            pageSize={1}
            onPageChange={(page) => setPageNumber(page)}
          />
        </div>
        <br></br>
      </div>
    </>
  )
}
export default IFrame
