import React, { useContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Modal, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import ExcelViewer from './ExcelViewer';
import { MdDelete, MdInsertDriveFile } from 'react-icons/md';
import { apiURl } from '../config';
import { CreateFileContext } from '../context/fileContext';
import { PictureAsPdf, Source } from '@mui/icons-material';
import { RiFileExcel2Fill } from 'react-icons/ri';

const PdfList = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileHovered, setFileHovered] = useState(null);
  const { getData, fileListUpdated, setFileListUpdated } = useContext(CreateFileContext);
  const getFileList = () => {
    axios
      .post(apiURl + `/list`)
      .then((res) => {
        if (res.data.error) {
          return console.log(res.data.message);
        } else {
          console.log('Updated');
          setApiResponse(res.data[0]['file_names']);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getFileList();
  }, [fileListUpdated]);
  const setFile = (value) => {
    getData(value);
    const isPDF = value.toLowerCase().endsWith('.pdf');
    if (isPDF) {
      toast.success('PDF Selected');
      localStorage.setItem('fileName', value);
      setSelectedFileType('PDF');
      localStorage.setItem('fileType', 'PDF');
    } else {
      toast.success('File Selected');
      localStorage.setItem('fileName', value);
      setSelectedFileType('Excel');
      localStorage.setItem('fileType', 'Excel');
    }
    getFile(value);
    setSelectedFile(value);
  };
  const getFile = (file) => {
    axios
      .get(`https://0qcfq0a71h.execute-api.us-east-1.amazonaws.com/dev/get-file/` + file)
      .then((res) => {
        if (res.data.error) {
          return console.log(res.data.message);
        } else {
          setFileContent(res.data);
          openModal();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const renderPdfContent = () => {
    return (
      <object
        data={`data:application/pdf;base64,${fileContent}`}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: '1px solid #888' }}
      ></object>
    );
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      {modalIsOpen ? (
        ''
      ) : (
        <>
          <div>
            {/* <h3 className=" text-2xl font-semibold px-[10px] mb-2">List of Files</h3> */}
            <ul>
              {selectedFile && (
                <div className="bg-[#fa7224] rounded p-3">
                  <h3 className="text-[#f7f7f7]" style={{ padding: '10px' }}>
                    Selected File: {selectedFile}
                  </h3>
                </div>
              )}
              {apiResponse?.map((pdf, index) => {
                // Extracting file extension
                const fileExtension = apiResponse[index].split('.').pop();

                // Conditional rendering based on file extension
                const icon =
                  fileExtension === 'pdf' ? (
                    <PictureAsPdf
                      sx={{ fontSize: '14px' }}
                      className="text-[14px] text-orange-500"
                    />
                  ) : (
                    <RiFileExcel2Fill className="text-[14px] text-green-700" />
                  );

                return (
                  <li key={index}>
                    <div className="nav flex justify-between items-center">
                      <span
                        onMouseLeave={() => setFileHovered(null)}
                        onMouseEnter={() => setFileHovered(index)}
                        className="nav__item select-none"
                      >
                        <div>{icon}</div>
                        <div className="relative flex w-full justify-between overflow-clip">
                          <h1 onClick={() => setFile(apiResponse[index])} className="text-grey-900">
                            {apiResponse[index]}
                          </h1>
                          {fileHovered === index && (
                            <div className="options-hovered w-12 flex items-center justify-end h-full absolute right-0">
                              <MdDelete
                                size={16}
                                className="cursor-pointer text-orange-500 hover:brightness-90"
                              />
                            </div>
                          )}
                        </div>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}

      {modalIsOpen ? (
        <>
          {selectedFileType === 'PDF' ? (
            <>
              <div>
                {selectedFile && (
                  <div className="nav mt-1">
                    <h3 className=" font-bold text-orange-400" style={{ padding: '10px' }}>
                      Selected File: {selectedFile}
                    </h3>
                  </div>
                )}
                <Card className="h-[70vh] pb-1">
                  <Button className="mt-1 mb-1" variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                  {fileContent && renderPdfContent()}
                </Card>
              </div>
            </>
          ) : (
            <>
              {/* <ExcelViewer base64String={fileContent} /> */}
              {selectedFile && (
                <div className="nav mt-1">
                  {/* <div className="nav__icons"></div> */}
                  <h3 className=" font-bold text-orange-400" style={{ padding: '10px' }}>
                    Selected File: {selectedFile}
                  </h3>
                </div>
              )}
              <ul>
                {apiResponse?.map((pdf, index) => {
                  // Extracting file extension
                  const fileExtension = apiResponse[index].split('.').pop();

                  // Conditional rendering based on file extension
                  // const icon =
                  //   fileExtension === 'pdf' ? (
                  //     <PictureAsPdf className="text-[18px] text-orange-500" />
                  //   ) : (
                  //     <RiFileExcel2Fill className="text-[18px] text-orange-500" />
                  //   );

                  const icon =
                    fileExtension === 'pdf' ? (
                      <PictureAsPdf
                        sx={{ fontSize: '14px' }}
                        className="text-[14px] text-orange-500"
                      />
                    ) : (
                      <RiFileExcel2Fill className="text-[14px] text-green-700" />
                    );

                  return (
                    <li key={index}>
                      <div className="nav">
                        <span
                          onMouseLeave={() => setFileHovered(null)}
                          onMouseEnter={() => setFileHovered(index)}
                          className="nav__item select-none"
                        >
                          <div>{icon}</div>
                          <div className="relative flex w-full justify-between overflow-clip">
                            <h1
                              onClick={() => setFile(apiResponse[index])}
                              className="text-grey-900"
                            >
                              {apiResponse[index]}
                            </h1>
                            {fileHovered === index && (
                              <div className="options-hovered w-12 flex items-center justify-end h-full absolute right-0">
                                <MdDelete
                                  size={16}
                                  className="cursor-pointer text-orange-500 hover:brightness-90"
                                />
                              </div>
                            )}
                          </div>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default PdfList;
