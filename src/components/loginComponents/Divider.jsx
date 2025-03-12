import React from "react";

const Divider = () => {
  return (
    <div className="flex items-center gap-5 w-full">
      <div className="h-px flex-1 bg-[#D8DADE]" />
      <div className="text-[#D8DADE] text-base leading-6 tracking-[-0.32px]">
        or
      </div>
      <div className="h-px flex-1 bg-[#D8DADE]" />
    </div>
  );
};

export default Divider;
