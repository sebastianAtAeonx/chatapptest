import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import PdfList from './PdfList';
import useResizable from '../hooks/useResizable';
import { PiEquals } from 'react-icons/pi';

const PDFViewer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  // Set a default PDF file when the component mounts

  const { width, isResizing, handleMouseDown } = useResizable(600);

  return (
    <div
      className="w-full relative overflow-hidden h-full lg:w-[50%] bg-[#f7f7f7] rounded-xl rounded-l-none"
      style={{ width: `${width}px` }}
    >
      <div className="flex justify-between text-slate-700 items-center bg-[#fdfdfd] p-4 pt-6 border-b-2 border-l-2 rounded-xl rounded-tl-none rounded-b-none font-semibold text-xl">
        <p className="select-none flex justify-start w-full ">List of Files</p>
      </div>
      <div
        onMouseDown={handleMouseDown}
        className={`hover:bg-[#fafafa] active:bg-[#fafafa] flex items-center z-40 absolute bottom-0 cursor-col-resize h-full w-[15px] overflow-hidden bg-transparent ${
          isResizing ? 'pointer-events-none' : ''
        }`}
      >
        <PiEquals className="text-black rotate-90" />
      </div>
      <div className="overflow-y-scroll h-screen bg-[#f7f7f7] text-orange-400">
        <div className="py-2 px-3">
          <PdfList />
        </div>
        {pdfFile && (
          <div
            style={{
              height: '50vh',
              paddingTop: '5%',
              marginBottom: '0%',
            }}
          >
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
            >
              <Viewer
                fileUrl={URL.createObjectURL(pdfFile)}
                scrollMode={'vertical'}
                zoom={'auto'}
              />
            </Worker>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
