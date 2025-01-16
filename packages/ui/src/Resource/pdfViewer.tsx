"use client";

import { useEffect, useRef, useState } from "react";

// import dynamic from "next/dynamic";

import { Alert, AlertDescription, AlertTitle } from "../alert";
import { PDFControls } from "./pdfControls";
import { Spinner } from "./spinner";

// const PDFControls = dynamic(() => import("./pdfControls"), {
//   ssr: false,
//   loading: () => <Spinner />,
// });
export interface PDFViewerProps {
  url: string;
  allowDownload?: boolean;
}

export function PDFViewer({ url, allowDownload = false }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfjs, setPdfjs] = useState<typeof import("pdfjs-dist")>();

  useEffect(() => {
    import("pdfjs-dist").then((pdfjs) => {
      setPdfjs(pdfjs);
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    });
  }, []);

  useEffect(() => {
    if (!pdfjs) return;

    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
        renderPage(pdf, 1);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF. Please check the URL and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [url, pdfjs]);

  const renderPage = async (
    pdf: import("pdfjs-dist").PDFDocumentProxy,
    pageNum: number,
  ) => {
    if (!canvasRef.current || !pdfjs) return;

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context!,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
  };

  const handlePageChange = async (newPage: number) => {
    if (!pdfjs) return;

    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
      setLoading(true);
      try {
        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;
        await renderPage(pdf, newPage);
      } catch (err) {
        console.error("Error rendering page:", err);
        setError("Failed to render page. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = () => {
    if (allowDownload) {
      window.open(url, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <canvas ref={canvasRef} />
      </div>
      <PDFControls
        currentPage={pageNumber}
        totalPages={numPages}
        onPageChange={handlePageChange}
        allowDownload={allowDownload}
        onDownload={handleDownload}
      />
    </div>
  );
}
