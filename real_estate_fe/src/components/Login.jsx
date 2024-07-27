import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { server } from '../main';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/auth/login`, { email, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid row">
     <div
      className="col-lg-6 col-md-6 col-sm-12 mt-5">
    <div className="d-flex align-items-center justify-content-center centered">
      <div >
        <h1 className="fs-3 fst-italic fw-bold text-orange">
          Welcome Back To <span className='text-danger'>Your Properties</span>
        </h1>
        <form onSubmit={handleLogin} className="d-flex flex-column gap-4 w-96 p-5  shadow mt-4 rounded ">
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        className="p-2 rounded"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        className="p-2 rounded"
      />
    
      <button type="submit"   className="border rounded bg-primary p-2 fw-bold text-white">Login</button>
      <Link to="/register" className="text-secondary underline">
          Not yet Registered ? Click Here To Signup
        </Link>
    </form>
        
        
      </div>
    </div>
    </div>
    <div
      className="col-lg-6 col-md-6 col-sm-12 mt-5"
      
    >
    <img
      src="https://st.depositphotos.com/1194063/2151/i/450/depositphotos_21515189-stock-photo-agent-with-house-model-and.jpg"
      alt="img"
      style={{ width: "100%" }}
    />
  </div>
  </div>
   
  );
};

export default Login;
