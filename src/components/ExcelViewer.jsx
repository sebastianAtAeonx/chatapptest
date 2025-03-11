import React, { useState, useEffect } from 'react';

const ExcelViewer = ({ base64String }) => {
  const [objectURL, setObjectURL] = useState(null);

  useEffect(() => {
    // Decode base64
    const decodedData = atob(base64String);

    // Convert to Blob
    const byteNumbers = new Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteNumbers[i] = decodedData.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Create Object URL
    const url = URL.createObjectURL(blob);
    setObjectURL(url);

    // Cleanup on component unmount
    return () => URL.revokeObjectURL(url);
  }, [base64String]);

  return (
    <div>
      {objectURL ? (
        <iframe
          src={objectURL}
          style={{ display: 'none' }}
          width="100%"
          height="600px"
          title="Excel Viewer"
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExcelViewer;
