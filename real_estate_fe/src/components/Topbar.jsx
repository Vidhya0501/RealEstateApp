import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Topbar = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // Redirect manually
  };

  return (
  

<Navbar expand="lg" className="bg-dark fs-5 pe-5 d-flex justify-content-between fixed-top" variant="dark">
<Container fluid>
  <div className="logo">
  <Navbar.Brand href="#" className='text-danger fw-bold fst-italic ps-2 fs-4'>Your Properties</Navbar.Brand>
  </div>
  
  <div className="menu">
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="me-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Link to="/dashboard" className='nav-link gap-2 fs-6'>Dashboard</Link>
        <Link to="/profile" className='nav-link gap-2 fs-6'>My Profile</Link>
        <Link to="/my-properties" className='nav-link gap-2 fs-6'>My Properties</Link>
        <button onClick={handleLogout} className='rounded fs-6 p-1 bg-danger nav-link gap-2 text-white'>Logout</button>
   
    </Nav>
    
  </Navbar.Collapse>
  </div>
</Container>
</Navbar>
  );
};

export default Topbar;
