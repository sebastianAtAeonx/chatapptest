import React from "react";

const AuthButton = ({ icon, provider, onClick }) => {
  return (
    <button
      className="flex justify-center items-center gap-2.5 w-full border px-6 py-4 rounded-xl border-[#6D727D] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
      onClick={onClick}
      type="button"
    >
      <div className="w-[24px] h-[24px]">{icon}</div>
      <div className="text-[#D8DADE] text-base leading-6 tracking-[-0.32px]">
        Continue with {provider}
      </div>
    </button>
  );
};

export default AuthButton;
