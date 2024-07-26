import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../main';

const EditProperty = () => {
  const [property, setProperty] = useState({
    type: '',
    location: '',
    price: '',
    description: '',
    status: '',
    image: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
  
    const fetchProperty = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${server}/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperty(response.data);
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProperty((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in property) {
      if (key !== 'currentOwner') { // Exclude currentOwner from the form data
        formData.append(key, property[key]);
      }
    }
console.log(formData)
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${server}/property/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/my-properties');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        console.error("Server error message:", error.response.data);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center centered">
     
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 w-96 p-5  shadow mt-3 rounded ">
      <h3>Edit Property</h3>
      <select name="type" value={property.type} onChange={handleChange} required className="p-1 rounded">
        <option value="" disabled>Select Type</option>
        <option value="Plots">Plots</option>
        <option value="Residential Apartments">Residential Apartments</option>
        <option value="Independent Villa">Independent Villa</option>
        <option value="Commercial Property">Commercial Property</option>
      </select>
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={property.location}
        onChange={handleChange}
        required className="p-1 rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={property.price}
        onChange={handleChange}
        required className="p-1 rounded"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={property.description}
        onChange={handleChange}
        required className="p-1 rounded"
      />
      <select name="status" value={property.status} onChange={handleChange} required className="p-1 rounded">
        <option value="" disabled>Select Status</option>
        <option value="Sold">Sold</option>
        <option value="Not Sold">Not Sold</option>
      </select>
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit" className="btn btn-warning">Update Property</button>
    </form>
    </div>
  );
};

export default EditProperty;
