import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("someone@gmail.com");
  const [password, setPassword] = useState("************************");
  const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle login logic here
  //   console.log("Login attempt with:", { email, password });

  // };

  const submitHandler = (event) => {
    event.preventDefault();
    // if (!event.target.checkValidity()) {
    //   return;
    // }
    window.localStorage.setItem(
      "UserData",
      JSON.stringify({
        id: email,
        password: password,
      })
    );

    navigate("/chat");
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="email"
            className="text-[#D8DADE] text-sm leading-5 tracking-[-0.28px]"
          >
            Email
          </label>
          <div className="flex h-12 items-center w-full border px-4 rounded-lg border-[#6D727D]">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-[#D8DADE] text-base leading-6 tracking-[-0.32px] outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="password"
            className="text-[#D8DADE] text-sm leading-5 tracking-[-0.28px]"
          >
            Password
          </label>
          <div className="flex h-12 items-center w-full border relative px-4 rounded-lg border-[#6D727D]">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-[#D8DADE] text-base leading-6 tracking-[-0.32px] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[16px]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[24px] h-[24px]"
              >
                <path
                  d="M11.9999 16.8299C9.60992 16.8299 7.66992 14.8899 7.66992 12.4999C7.66992 10.1099 9.60992 8.16992 11.9999 8.16992C14.3899 8.16992 16.3299 10.1099 16.3299 12.4999C16.3299 14.8899 14.3899 16.8299 11.9999 16.8299ZM11.9999 9.66992C10.4399 9.66992 9.16992 10.9399 9.16992 12.4999C9.16992 14.0599 10.4399 15.3299 11.9999 15.3299C13.5599 15.3299 14.8299 14.0599 14.8299 12.4999C14.8299 10.9399 13.5599 9.66992 11.9999 9.66992Z"
                  fill="#D8DADE"
                />
                <path
                  d="M12.0001 21.5205C8.24008 21.5205 4.69008 19.3205 2.25008 15.5005C1.19008 13.8505 1.19008 11.1605 2.25008 9.50047C4.70008 5.68047 8.25008 3.48047 12.0001 3.48047C15.7501 3.48047 19.3001 5.68047 21.7401 9.50047C22.8001 11.1505 22.8001 13.8405 21.7401 15.5005C19.3001 19.3205 15.7501 21.5205 12.0001 21.5205ZM12.0001 4.98047C8.77008 4.98047 5.68008 6.92047 3.52008 10.3105C2.77008 11.4805 2.77008 13.5205 3.52008 14.6905C5.68008 18.0805 8.77008 20.0205 12.0001 20.0205C15.2301 20.0205 18.3201 18.0805 20.4801 14.6905C21.2301 13.5205 21.2301 11.4805 20.4801 10.3105C18.3201 6.92047 15.2301 4.98047 12.0001 4.98047Z"
                  fill="#D8DADE"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#5E46E1] text-white text-base leading-6 tracking-[-0.32px] px-6 py-4 rounded-2xl hover:bg-[#4935c8] transition-colors"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
