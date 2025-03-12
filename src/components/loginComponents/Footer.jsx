import React from "react";

const Footer = () => {
  return (
    <div className="text-center text-base tracking-[0.32px]">
      <span className="text-[#D8DADE]">
        By signing up, I agree to aeonxiq's{" "}
      </span>
      <a
        href="#"
        className="text-[#9692F3] underline hover:text-[#b4b1f8] transition-colors"
      >
        Terms
      </a>
      <span className="text-[#D8DADE]"> and </span>
      <a
        href="#"
        className="text-[#9692F3] underline hover:text-[#b4b1f8] transition-colors"
      >
        Privacy Policy
      </a>
    </div>
  );
};

export default Footer;
