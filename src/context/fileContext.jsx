import { createContext, useState } from 'react';

export const CreateFileContext = createContext();

import React from 'react';

const FileContext = ({ children }) => {
  const [fileListUpdated, setFileListUpdated] = useState(false);
  const [dataName, setDataName] = useState();
  const getData = (value) => {
    // console.log(value, 'valur on context');
    // localStorage.setItem('fileName', value);
    setDataName(value);
  };
  const [isFileCSV, setIsFileCSV] = useState(() => {
    const fileName1 = localStorage?.getItem('fileName');
    const fileExtension = fileName1?.split('.').pop();

    return fileExtension === 'csv' ? true : false;
  });

  const refreshFileExtInLocalStorage = () => {
    setIsFileCSV(() => {
      const fileName1 = localStorage.getItem('fileName');
      const fileExtension = fileName1.split('.').pop();
      const isCSV = fileExtension === 'csv';
      localStorage.setItem('isFileCSV', isCSV ? 'true' : 'false');
      return isCSV;
    });
  };

  const value = {
    getData,
    dataName,
    fileListUpdated,
    setFileListUpdated,
    isFileCSV,
    refreshFileExtInLocalStorage,
  };

  return <CreateFileContext.Provider value={value}>{children}</CreateFileContext.Provider>;
};

const fileConsumer = CreateFileContext.Consumer;

export { FileContext, fileConsumer };
