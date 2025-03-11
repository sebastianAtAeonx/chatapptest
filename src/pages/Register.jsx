import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom/dist';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    purpose: '',
    // useType: '',
    companyName: '',
    companyWebsite: '',
  });

  function changeHandler(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  const submitHandler = () => {
    navigate('/login');
  };

  return (
    <div className=" overflow-hidden">
      <h4 className="login-heading text-2xl text-center font-bold">Register</h4>
      <div className="py-4 h-full flex flex-col items-stretch justify-around">
        <form onSubmit={submitHandler} className="flex flex-col items-center justify-center gap-3">
          <input
            value={formData.name}
            name="name"
            placeholder="Name"
            onChange={changeHandler}
            type="text"
            required
            className="form-input"
          />

          <input
            value={formData.email}
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            type="email"
            required
            className="form-input"
          />

          <input
            value={formData.phoneNumber}
            name="phoneNumber"
            maxLength={10}
            minLength={10}
            placeholder="Phone Number"
            onChange={changeHandler}
            type="tel"
            required
            className="form-input"
          />
          <input
            value={formData.purpose}
            name="purpose"
            placeholder="Purpose"
            onChange={changeHandler}
            type="tel"
            required
            className="form-input"
          />

          {/* <h2 className="text-lg mt-2">Use Type</h2>
              <div className="flex justify-around items-center gap-12 my-2">
                <div className="flex justify-center items-center gap-2">
                  <label id="useType" htmlFor="useType" className="text-md">
                    Personal
                  </label>
                  <input
                    type="radio"
                    id="useType"
                    name="useType"
                    value="personal"
                    required
                    onClick={changeHandler}
                    className=" w-6 h-6 bg-white text-slate-700 cursor-pointer"
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <label id="useType" htmlFor="useType" className="text-md">
                    Business
                  </label>
                  <input
                    type="radio"
                    id="useType"
                    name="useType"
                    value="business"
                    required
                    onClick={changeHandler}
                    className=" w-6 h-6 border-0 bg-white text-slate-700 cursor-pointer"
                  />
                </div>
              </div> */}

          {/* {formData.useType === 'business' && ( */}
          <div className="flex flex-col items-center justify-center gap-3 w-full">
            <input
              value={formData.companyName}
              placeholder="Company Name"
              onChange={changeHandler}
              type="text"
              required
              name="companyName"
              className="form-input"
            />
            <input
              value={formData.companyWebsite}
              placeholder="Company Website"
              onChange={changeHandler}
              type="url"
              required
              name="companyWebsite"
              className="form-input"
            />
          </div>
          {/* )} */}
          <div>
            <button className="form-btn">Register</button>
          </div>
        </form>
        <div className="w-full mt-3 flex justify-center chatui-fontColor/90">
          <p>
            Already have an Account?{' '}
            <Link to="/login" className="underline italic">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
