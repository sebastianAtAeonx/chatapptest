import React, { useContext, useEffect, useState } from 'react';
import useResizable from '../hooks/useResizable';
import { PiEquals } from 'react-icons/pi';
import { CreateFileContext } from '../context/fileContext';
import axios from 'axios';
import { apiURl } from '../config';
// import { ToastContainer, toast } from 'react-toastify';
import { MdDelete, MdOutlineCancel } from 'react-icons/md';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { VscEye } from 'react-icons/vsc';
import ViewPdf from './ViewPdf';
import { HiOutlineDownload } from 'react-icons/hi';
import Modal from './Modal';
import FileDelete from './FileDelete';
import { FaFile } from 'react-icons/fa';

// Mui components
import { PictureAsPdf } from '@mui/icons-material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';

function ListFiles() {
  const { width, isResizing, handleMouseDown } = useResizable(500);
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteFile, setDeleteFile] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [fileHovered, setFileHovered] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { getData, fileListUpdated, refreshFileExtInLocalStorage } = useContext(CreateFileContext);

  // Load the list of files
  const getFileList = () => {
    axios
      .post(apiURl + `/list`)
      .then((res) => {
        if (res.data.error) {
          return console.log(res.data.message);
        } else {
          // console.log(res.data[0]['file_names']);
          setApiResponse(res.data[0]['file_names']);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  // React.useMemo(() => {
  //   getFileList();
  // }, []);

  /* OLD CODE */

  useEffect(() => {
    getFileList();
    setSelectedFile(localStorage.getItem('fileName'));
  }, [fileListUpdated]);

  const setFile = (value) => {
    getData(value);
    const isPDF = value.toLowerCase().endsWith('.pdf');
    if (isPDF) {
      // toast.success('PDF Selected');
      localStorage.setItem('fileName', value);
      setSelectedFileType('PDF');
      localStorage.setItem('fileType', 'PDF');
    } else {
      // toast.success('File Selected');
      localStorage.setItem('fileName', value);
      setSelectedFileType('Excel');
      localStorage.setItem('fileType', 'Excel');
    }
    getFile(value);
    setSelectedFile(value);
    refreshFileExtInLocalStorage();
  };
  const getFile = (file) => {
    axios
      .get(apiURl + `/get-file/` + file)
      .then((res) => {
        if (res.data.error) {
          return console.log(res.data.message);
        } else {
          setFileContent(res.data.pdf_content);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const viewPDF = (file) => {
    setFile(file);
    setShowPdf(true);
  };

  const deselectFile = () => {
    localStorage.removeItem('fileName');
    localStorage.removeItem('fileType');
    setSelectedFileType(null);
    setSelectedFile(null);
  };

  const handleDownloadClick = async (fileName) => {
    let base64String;
    await axios
      .get(apiURl + `/get-file/` + fileName)
      .then((res) => {
        if (res.data.error) {
          return console.log(res.data.message);
        } else {
          base64String = res.data.pdf_content;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    const downloadLink = document.createElement('a');
    downloadLink.href = `data:application/pdf;base64,${base64String}`;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const sapOperations = ['HR Operations', 'Supply Chain', 'CRM'];
  // const sapOperations = [
  //   'Data Analysis and Reporting from SAP',
  //   'Predictive Maintenance',
  //   'Supply Chain Optimization',
  //   'AI-Enhanced Quality Control',
  //   'Comprehensive Inventory Tracking',
  //   'Dynamic Production Planning',
  //   'Intuitive Workflow Automation',
  //   'Smart Calendar Management',
  //   'HR Practices and Policy Guidance',
  // ];

  return (
    <div
      className="w-screen h-full overflow-hidden relative lg:w-[50%] rounded-xl rounded-l-none bg-primary bg-opacity-10"
      style={{ width: `${width}px` }}
    >
      <div className="flex justify-between chatui-fontColor items-center p-4 pt-6 border-b-0 border-l-0 rounded-xl rounded-tl-none rounded-b-none font-semibold text-xl">
        {/* <p className="select-none flex justify-start w-full">List of Files</p> */}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className={`hidden md:flex hover:bg-neutral/70 active:bg-neutral/80 items-center z-40 absolute bottom-0 cursor-col-resize h-full w-[15px] overflow-hidden bg-transparent ${
          isResizing ? 'pointer-events-none' : ''
        }`}
      >
        <PiEquals className="chatui-fontColor rotate-90" />
      </div>
      <div className="px-3 pt-2 h-[85vh] overflow-y-scroll w-screen md:w-full">
        {showPdf ? (
          <ViewPdf
            fileContent={fileContent}
            selectedFile={selectedFile}
            setShowPdf={setShowPdf}
            setFileContent={setFileContent}
          />
        ) : (
          <SimpleTreeView>
            <TreeItem
              itemId={101}
              label={<div className="chatui-fontColor text-lg">Uploaded Files</div>}
            >
              <TreeItem key="asdfg12345" />
              {apiResponse?.map((file, index) => {
                // Extracting file extension
                const fileExtension = apiResponse[index].split('.').pop();
                const icon =
                  fileExtension === 'pdf' ? (
                    <PictureAsPdf
                      sx={{ fontSize: '14px' }}
                      className={`text-[14px] ${
                        selectedFile === file ? 'text-white' : 'text-orange-500'
                      } `}
                    />
                  ) : fileExtension === 'xlsx' || fileExtension === 'xls' ? (
                    <RiFileExcel2Fill
                      className={`text-[14px] ${
                        selectedFile === file ? 'text-white' : 'text-green-700'
                      }`}
                    />
                  ) : (
                    <FaFile
                      sx={{ fontSize: '14px' }}
                      className={`text-[14px] ${
                        selectedFile === file ? 'text-white' : 'text-orange-500'
                      } `}
                    />
                  );
                return (
                  <TreeItem
                    key={index}
                    itemId={index * Math.random()}
                    className={`rounded-md ${selectedFile === file && 'bg-[#fa7224]'}`}
                    onClick={() => {
                      if (selectedFile !== file) {
                        setFile(apiResponse[index]);
                      }
                    }}
                    label={
                      <span
                        onMouseLeave={() => setFileHovered(null)}
                        onMouseEnter={() => setFileHovered(index)}
                        className={`w-full h-full select-none overflow-hidden flex gap-2 place-items-center py-[0.15rem] my-1`}
                      >
                        <div onClick={() => setFile(apiResponse[index])}>{icon}</div>
                        <div className="relative flex w-full justify-between overflow-hidden">
                          <h1
                            onClick={() => setFile(apiResponse[index])}
                            className="chatui-fontColor"
                          >
                            {apiResponse[index]}
                          </h1>
                          {selectedFile === file && (
                            <div className=" min-w-fit flex items-center justify-end gap-1 h-full absolute right-0">
                              <MdOutlineCancel
                                size={16}
                                onClick={deselectFile}
                                className="cursor-pointer z-30 hover:brightness-90 options-selected"
                              />
                              {fileExtension === 'pdf' ? (
                                <VscEye
                                  size={16}
                                  onClick={() => viewPDF(apiResponse[index])}
                                  className="cursor-pointer hover:brightness-90 options-selected"
                                />
                              ) : (
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDownloadClick(apiResponse[index]);
                                  }}
                                >
                                  <HiOutlineDownload
                                    size={16}
                                    className="cursor-pointer hover:brightness-90 options-selected"
                                  />
                                </a>
                              )}
                              <MdDelete
                                onClick={() => {
                                  setModalOpen(true);
                                  setDeleteFile(apiResponse[fileHovered]);
                                }}
                                size={16}
                                className="cursor-pointer hover:brightness-90 options-selected"
                              />
                            </div>
                          )}
                        </div>
                      </span>
                    }
                  />
                );
              })}
            </TreeItem>
            <TreeItem
              itemId={102}
              label={<div className="chatui-fontColor text-lg">Business Agents</div>}
            >
              {sapOperations.map((item, index) => (
                <TreeItem
                  key={index}
                  itemId={index + Math.random()}
                  label={
                    <span className="w-full h-full select-none overflow-hidden flex gap-2 place-items-center py-[0.15rem] my-1">
                      <div className="relative flex w-full justify-between overflow-clip">
                        <h1 className="chatui-fontColor">{item}</h1>
                      </div>
                    </span>
                  }
                />
              ))}
            </TreeItem>
          </SimpleTreeView>

          // <div>
          //   {/* <div className="h-[80vh] w-full flex justify-center items-center">
          //     <span className="loading-spinner h-12 w-12"></span>
          //   </div> */}
          //   <ul>
          //     {apiResponse?.map((file, index) => {
          //       // Extracting file extension
          //       const fileExtension = apiResponse[index].split('.').pop();

          //       // Conditional rendering based on file extension
          //       const icon =
          //         fileExtension === 'pdf' ? (
          //           <PictureAsPdf
          //             sx={{ fontSize: '14px' }}
          //             className={`text-[14px] ${
          //               selectedFile === file ? 'text-white' : 'text-orange-500'
          //             } `}
          //           />
          //         ) : fileExtension === 'xlsx' || fileExtension === 'xls' ? (
          //           <RiFileExcel2Fill
          //             className={`text-[14px] ${
          //               selectedFile === file ? 'text-white' : 'text-green-700'
          //             }`}
          //           />
          //         ) : (
          //           <FaFile
          //             sx={{ fontSize: '14px' }}
          //             className={`text-[14px] ${
          //               selectedFile === file ? 'text-white' : 'text-orange-500'
          //             } `}
          //           />
          //         );

          //       return (
          //         <li key={index} className="mt-1">
          //           <div className="nav flex justify-between items-center">
          //             <span
          //               onMouseLeave={() => setFileHovered(null)}
          //               onMouseEnter={() => setFileHovered(index)}
          //               className={`${
          //                 selectedFile === file ? 'nav__item-selected' : 'nav__item'
          //               }  select-none overflow-visible`}
          //             >
          //               <div onClick={() => setFile(apiResponse[index])}>{icon}</div>
          //               <div className="relative flex w-full justify-between overflow-clip">
          //                 <h1
          //                   onClick={() => setFile(apiResponse[index])}
          //                   className="chatui-fontColor"
          //                 >
          //                   {apiResponse[index]}
          //                 </h1>
          //                 {selectedFile === file && (
          //                   <div className="options-selected w-20 flex items-center justify-end gap-1 h-full absolute right-0">
          //                     <MdOutlineCancel
          //                       size={16}
          //                       onClick={deselectFile}
          //                       className="cursor-pointer z-30 text-white hover:brightness-90"
          //                     />
          //                     {fileExtension === 'pdf' ? (
          //                       <VscEye
          //                         size={16}
          //                         onClick={() => viewPDF(apiResponse[index])}
          //                         className="cursor-pointer text-white hover:brightness-90"
          //                       />
          //                     ) : (
          //                       <a
          //                         href="#"
          //                         onClick={(e) => {
          //                           e.preventDefault();
          //                           handleDownloadClick(apiResponse[index]);
          //                         }}
          //                       >
          //                         <HiOutlineDownload
          //                           size={16}
          //                           className="cursor-pointer text-white hover:brightness-90"
          //                         />
          //                       </a>
          //                     )}
          //                     <MdDelete
          //                       onClick={() => setModalOpen(true)}
          //                       size={16}
          //                       className="cursor-pointer text-white hover:brightness-90"
          //                     />
          //                   </div>
          //                 )}
          //                 {fileHovered === index && (
          //                   <div
          //                     className={`${
          //                       selectedFile === file ? '' : 'options-hovered text-orange-500'
          //                     }  w-16 flex items-center
          //                   justify-end gap-1 h-full absolute right-0`}
          //                   >
          //                     {fileExtension === 'pdf' ? (
          //                       <VscEye
          //                         size={16}
          //                         onClick={() => viewPDF(apiResponse[index])}
          //                         className="cursor-pointer hover:brightness-90"
          //                       />
          //                     ) : (
          //                       <a
          //                         href="#"
          //                         onClick={(e) => {
          //                           e.preventDefault();
          //                           handleDownloadClick(apiResponse[index]);
          //                         }}
          //                       >
          //                         <HiOutlineDownload
          //                           size={16}
          //                           className="cursor-pointer hover:brightness-90"
          //                         />
          //                       </a>
          //                     )}
          //                     <MdDelete
          //                       onClick={() => {
          //                         setModalOpen(true);
          //                         // handleDelete(apiResponse[fileHovered]);
          //                         setDeleteFile(apiResponse[fileHovered]);
          //                       }}
          //                       size={16}
          //                       className="cursor-pointer hover:brightness-90"
          //                     />
          //                   </div>
          //                 )}
          //               </div>
          //             </span>
          //           </div>
          //         </li>
          //       );
          //     })}
          //   </ul>
          // </div>
        )}
      </div>

      <Modal title="File Delete" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <FileDelete
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          deleteFile={deleteFile}
          getFileList={getFileList}
        />
      </Modal>

      {/* <ToastContainer
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
      /> */}
    </div>
  );
}

export default ListFiles;
