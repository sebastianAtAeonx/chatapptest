import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom/dist';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function changeHandler(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    // if (!event.target.checkValidity()) {
    //   return;
    // }
    window.localStorage.setItem(
      'UserData',
      JSON.stringify({
        id: formData.email,
        password: formData.password,
      }),
    );

    navigate('/home');
  };

  return (
    <div className="h-full">
      <h4 className="login-heading text-2xl text-center font-bold mb-0">Login</h4>
      <div className="h-full pb-2 flex flex-col items-stretch justify-around">
        <form
          onSubmit={submitHandler}
          className="flex flex-col mt-8 items-center justify-center gap-8"
        >
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
            value={formData.password}
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            type="password"
            required
            className="form-input"
          />
          <div>
            <button className="form-btn">Login</button>
          </div>
        </form>
        <div className="w-full mt-4 flex justify-center chatui-fontColor/90">
          <p>
            Don&apos;t Have an Account?{' '}
            <Link to="/register" className="underline italic">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
