import React from "react";

const Header = () => {
  return (
    <header className="flex sticky top-0 z-50 justify-between items-center bg-[rgba(18,5,57,0.54)] px-[100px] py-5 max-md:px-10 max-sm:px-5">
      <div className="flex items-center gap-[13px]">
        <div>
          <svg
            className="w-[34px] h-[35px]"
            viewBox="0 0 34 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 35C26.3888 35 34 27.165 34 17.5C34 7.83502 26.3888 0 17 0C7.61116 0 0 7.83502 0 17.5C0 27.165 7.61116 35 17 35Z"
              fill="#5E46E1"
            />
          </svg>
        </div>
        <div className="text-white text-[28px] tracking-[0.562px]">
          aeonxiq.ai
        </div>
      </div>
      <div className="flex items-center gap-5 max-sm:hidden">
        <div className="text-[#D8DADE] text-base leading-6 tracking-[-0.32px]">
          Don't have an account
        </div>
        <button className="text-[#D8DADE] text-base leading-6 tracking-[-0.32px] border px-5 py-3 rounded-xl border-[#ACB0BA] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
          Sign in
        </button>
      </div>
    </header>
  );
};

export default Header;
