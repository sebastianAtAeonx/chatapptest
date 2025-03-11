import axios from 'axios';
import React, { useContext, useState } from 'react';
import { apiURl } from '../config';
import { IoCloudUploadOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { CreateFileContext } from '../context/fileContext';
import { VscDiscard } from 'react-icons/vsc';

const FileUpload = ({
  modalOpen,
  setModalOpen,
  selectedFile,
  setSelectedFile,
  inputKey,
  setInputKey,
}) => {
  const [fileuploadLoading, setfileuploadloading] = useState(false);
  const { setFileListUpdated } = useContext(CreateFileContext);

  if (selectedFile === undefined) {
    setModalOpen(false);
  }

  const deselectFile = () => {
    setModalOpen((prev) => !prev);
    setSelectedFile(null);

    // Increment the key to force React to treat the input as a new element
    setInputKey((prevKey) => prevKey + 1);
  };

  const uploadFile = () => {
    // console.log(selectedFile);
    setfileuploadloading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post(apiURl + '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message);
          setfileuploadloading(false);
        } else {
          toast.success(res.data.message);
          console.log('File uploaded successfully');
          setfileuploadloading(false);
          setFileListUpdated((prev) => !prev);
        }
        setInputKey((prevKey) => prevKey + 1);
        setModalOpen((prev) => !prev);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error('Error:', error);
        setfileuploadloading(false);
        setModalOpen((prev) => !prev);
        setInputKey((prevKey) => prevKey + 1);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-full m-2 p-4 bg-transparent rounded-xl">
        <h2 className="text-xl text-center m-2">{selectedFile?.name}</h2>
        <div className="flex gap-2 w-full items-center justify-around mt-8">
          <button
            onClick={() => {
              !fileuploadLoading && uploadFile();
            }}
            className="btn btn-outline min-w-[7rem] btn-primary bg-white !text-slate-800 border-none border-slate-100 
            hover:!bg-base-200 hover:!text-white"
            // className="flex justify-center items-center gap-2 max-w-xs btn bg-orange-500 text-white border-none hover:bg-orange-400"
          >
            {fileuploadLoading ? (
              <div className="flex justify-center items-center gap-2">
                Uploading
                <div className="loading-spinner" />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                {' '}
                Upload <IoCloudUploadOutline size={25} />{' '}
              </div>
            )}
          </button>
          <button
            onClick={deselectFile}
            className={`btn btn-primary min-w-[7rem] ${fileuploadLoading && 'btn-disabled'}`}
            // className="flex justify-center items-center gap-2 max-w-xs btn bg-white text-slate-800 border-none border-slate-100 hover:bg-slate-400 hover:text-white"
          >
            Discard <VscDiscard size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
