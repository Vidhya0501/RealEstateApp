import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../main';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/auth/register`, form);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid d-flex">
   
    <div className="d-flex align-items-center justify-content-center centered">
      <div >
        <h1 className="fs-3 fst-italic fw-bold text-orange">
          Welcome To <span className='text-danger'>Your Properties</span>
        </h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 w-96 p-5  shadow mt-5 rounded ">
        <input type="text" name="username" placeholder="Username" onChange={handleChange}  className="p-2 rounded"/>
      <input type="email" name="email" placeholder="Email" onChange={handleChange}  className="p-2 rounded"/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange}  className="p-2 rounded"/>
      <button type="submit" className="border rounded bg-primary p-2 fw-bold text-white">Register</button>

    </form>
        
    <Link to="/login" className="text-secondary underline">
            Already Registered ? Click Here To Login
          </Link>
      </div>
    </div>

    <img
      src="https://st.depositphotos.com/1194063/2151/i/450/depositphotos_21515189-stock-photo-agent-with-house-model-and.jpg"
      alt="img"
      style={{ width: "100%" }}
    />
  </div>
   
  );
};

export default Register;
