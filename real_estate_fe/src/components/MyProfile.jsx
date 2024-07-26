import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { server } from '../main';

const MyProfile = () => {
  const [profile, setProfile] = useState({});
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${server}/auth/profile/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div class="d-flex justify-content-center align-items-center min-vh-100">
  <div class="card p-3">
      <h4>My Profile</h4>
      <hr/>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
    </div>
  );
};

export default MyProfile;
