import React from 'react';
import { Card } from 'react-bootstrap';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

function ViewPdf({ fileContent, selectedFile, setShowPdf, setFileContent, handleExpandClick }) {
  const renderPdfContent = () => {
    return (
      <div className="w-full h-full relative">
        <object
          data={`data:application/pdf;base64,${fileContent}`}
          type="application/pdf"
          width="96%"
          height="96%"
          //   style={{ border: '1px solid #888' }}
          className="absolute right-0"
        ></object>
      </div>
    );
  };
  return (
    <>
      <div>
        {selectedFile && (
          <div className="nav mt-1">
            <div
              onClick={() => {
                setShowPdf(false);
                setFileContent(null);
                handleExpandClick();
              }}
              className="ml-4 cursor-pointer hover:brightness-90"
            >
              <IoArrowBackCircleOutline size={26} />
            </div>
            <h3 className="font-bold text-orange-400" style={{ padding: '10px' }}>
              Selected File: {selectedFile}
            </h3>
          </div>
        )}
        <Card className="h-[70vh] pb-1">
          {/* <div className="w-full flex justify-end items-center">
            <button
              className="m-1 p-2 bg-gray-500 text-white"
              onClick={() => {
                setShowPdf(false);
                setFileContent(null);
              }}
            >
              Close
            </button>
          </div> */}
          {fileContent && renderPdfContent()}
        </Card>
      </div>
    </>
  );
}

export default ViewPdf;
