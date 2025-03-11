import axios from 'axios';
import React, { useState } from 'react';
import { apiURl } from '../config';

function FileDelete({ setModalOpen, deleteFile, getFileList }) {
  const [fileDeleteLoading, setFileDeleteLoading] = useState(false);

  const handleDeleteFile = async (fileName) => {
    setFileDeleteLoading(true);
    const fileData = {
      file_key: fileName,
    };

    await axios
      .delete(apiURl + `/delete_file`, { data: fileData })
      .then((res) => {
        res.data.status;
      })
      .catch((error) => {
        console.log(error);
      }),
      getFileList();
    setFileDeleteLoading(false);
    setModalOpen(false);
  };

  const discard = () => {
    setModalOpen(false);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-full m-2 p-4 bg-transparent rounded-xl">
        <h2 className="text-xl text-center m-2">Are You Sure to delete</h2>
        <h2 className="text-xl text-center m-2">{deleteFile} ?</h2>
        <div className="flex gap-2 w-full items-center justify-around mt-8">
          <button
            onClick={() => {
              !fileDeleteLoading && handleDeleteFile(deleteFile);
            }}
            className="btn btn-outline min-w-[7rem] btn-primary bg-white !text-slate-800 border-none border-slate-100 
            hover:!bg-base-200 hover:!text-white"
            // className="flex justify-center items-center gap-2 min-w-[7rem] btn bg-orange-500 text-white border-none hover:bg-orange-400"
          >
            {fileDeleteLoading ? (
              <div className="flex justify-center items-center gap-2">
                Deleting
                <div className="loading-spinner" />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2"> Yes</div>
            )}
          </button>
          <button
            onClick={discard}
            className={`btn btn-primary min-w-[7rem] ${fileDeleteLoading && 'btn-disabled'}`}
            // className="flex justify-center items-center gap-2 min-w-[7rem] btn bg-white text-slate-800 border-2 border-slate-100 hover:bg-slate-400 hover:text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileDelete;
