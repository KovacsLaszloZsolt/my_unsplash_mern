import React, { useState } from 'react';
import './Login.scss';

const Login = (): JSX.Element => {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault;
  };

  return (
    <div className="">
      <form className="modalForm" onSubmit={handleFormSubmit}>
        <h3 className="modalTitle">Add a new photo</h3>
        <div className="inputCtn">
          <label className="inputLabel" htmlFor="email">
            Email
          </label>
          <input
            className="inputText"
            type="email"
            name="email"
            id="email"
            placeholder="exemple@exemple.com"
            value={inputValues.email}
          />
        </div>
        <div className="inputCtn">
          <label className="inputLabel" htmlFor="password">
            Password
          </label>
          <input
            className="inputPassword"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={inputValues.password}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
