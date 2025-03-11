import React, { useState } from 'react';

const Setting = ({ modalOpen, setModalOpen }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    useType: '',
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

  // const [companyWebsite, setCompanyWebsite] = useState('');

  const saveKey = async (e) => {
    e.preventDefault();
    // console.log('Clicked!!');
    setErrorMsg('');

    localStorage.setItem('userData', JSON.stringify(formData));

    if (localStorage.getItem('userData')) {
      setModalOpen(false);
    }
  };

  return (
    <form onSubmit={saveKey} className="flex flex-col items-center justify-center gap-2">
      <input
        value={formData.name}
        name="name"
        placeholder="Name"
        onChange={changeHandler}
        type="text"
        required
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
      />

      <input
        value={formData.email}
        name="email"
        placeholder="Email"
        onChange={changeHandler}
        type="email"
        required
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
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
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
      />

      <h2 className="text-lg mt-2">Use Type</h2>
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
      </div>

      {formData.useType === 'business' ? (
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <input
            value={formData.companyName}
            placeholder="Company Name"
            onChange={changeHandler}
            type="text"
            required
            name="companyName"
            className="w-full max-w-xs input input-bordered bg-white text-slate-700"
          />
          <input
            value={formData.companyWebsite}
            placeholder="Company Website"
            onChange={changeHandler}
            type="url"
            required
            name="companyWebsite"
            className="w-full max-w-xs input input-bordered bg-white text-slate-700"
          />
        </div>
      ) : (
        <div />
      )}
      <button className="w-full max-w-xs btn bg-orange-500 text-white border-none hover:bg-orange-400">
        save
      </button>

      <p>{errorMsg}</p>
    </form>
  );
};

export default Setting;
