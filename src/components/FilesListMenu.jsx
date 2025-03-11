import React from 'react';
import { IoClose } from 'react-icons/io5';
import ListFiles from './ListFiles';

function FilesListMenu({ toggleFilesDrawer }) {
  return (
    <div className="Menu">
      <div className="w-[100vw]">
        <button className="absolute right-5 top-5 z-10">
          <IoClose className="chatui-fontColor" size={26} onClick={toggleFilesDrawer(false)} />
        </button>
        <div>
          <ListFiles />
        </div>
      </div>
    </div>
  );
}

export default FilesListMenu;
