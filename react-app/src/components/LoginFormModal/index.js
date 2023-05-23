import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push('/home')
    }
  };

  const demoUser = async (e) => {
    e.preventDefault()
    await dispatch(login('demo@aa.io', 'password'))
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
    <div className="login-modal">
      <h1 className="login-top-text">Log In to Dweebdom 🤓</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            className="login-form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            className="login-form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='login-button' type="submit">Log In</button>
      </form>
      <h3 style={{marginLeft: '165px'}}> or </h3>
      <button className="DemoUser" onClick={(e) => demoUser(e)}>Try A Demo User</button>
    </div>
  );
}

export default LoginFormModal;
