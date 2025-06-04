"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"; // Ensure this import is correct

const url =
  "https://1276-103-48-70-119.ngrok-free.app/quotes//1717607876247-66609dc3036ccd1b6cf58fde.pdf";

// Set the worker source to the locally available worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PdfViewer() {
  const canvasRef = useRef();
  const [pdfRef, setPdfRef] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //console.log("Worker source path:", pdfjsLib.GlobalWorkerOptions.workerSrc);

  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      if (!pdf) return;
      pdf
        .getPage(pageNum)
        .then((page) => {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          if (!canvas) return;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: canvas.getContext("2d"),
            viewport,
          };
          page.render(renderContext).promise.then(() => {
            //console.log(`Page ${pageNum} rendered`);
          });
        })
        .catch((error) => {
          console.error("Error rendering page:", error);
        });
    },
    [pdfRef]
  );

  useEffect(() => {
    //console.log("PDF.js version:", pdfjsLib.version);
  }, []);

  useEffect(() => {
    if (pdfRef) {
      renderPage(currentPage, pdfRef);
    }
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(
      (loadedPdf) => {
        //console.log("PDF loaded");
        setPdfRef(loadedPdf);
      },
      (reason) => {
        console.error("Error loading PDF:", reason);
      }
    );
  }, [url]);

  const nextPage = () => {
    if (pdfRef && currentPage < pdfRef.numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <canvas className="w-full" ref={canvasRef} />
      <div>
        <button onClick={prevPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={pdfRef && currentPage >= pdfRef.numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
