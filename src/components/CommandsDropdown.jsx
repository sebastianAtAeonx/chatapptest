import React from 'react';
import { Link } from 'react-router-dom';

function CommandsDropdown({ dataArray, handleSelectMessage, isCommand, handleModeChange }) {
  function handleFunctions(data) {
    if (isCommand) {
      handleModeChange(data);
    } else {
      handleSelectMessage(data);
    }
  }
  return (
    <div className="m-4 p-2 mt-1 min-h-[100px] max-h-72 chatui-fontColor border border-gray-300 rounded-xl shadow-md overflow-y-auto">
      {dataArray.length > 0 ? (
        dataArray.map((data, index) => (
          <Link key={index}>
            <div
              className="p-2 cursor-pointer hover:bg-base-300/50 rounded-lg"
              onClick={() => handleFunctions(data)}
            >
              {data}
            </div>
          </Link>
        ))
      ) : (
        <div className="p-2 text-gray-500">No messages found</div>
      )}
    </div>
  );
}

export default CommandsDropdown;
