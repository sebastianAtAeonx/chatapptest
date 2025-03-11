import React from 'react';

const Modal = ({ title, children, modalOpen = false, setModalOpen, className = '' }) => {
  return (
    <div className={className}>
      <input
        value={modalOpen}
        type="checkbox"
        checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}
        className="modal-toggle"
      />
      <div className="modal backdrop-blur-sm">
        <div className="modal-box overflow-clip p-4 relative max-h-[98%] text-white  bg-slate-800 shadow-lg shadow-slate-900">
          {/* <label
            onClick={() => setModalOpen(!modalOpen)}
            className="absolute cursor-pointer right-4 top-4"
          >
            ✕
          </label> */}
          <h3 className="text-lg font-bold m-2">{title}</h3>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
