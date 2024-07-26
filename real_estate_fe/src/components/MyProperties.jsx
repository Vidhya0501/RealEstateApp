import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropertyContext } from "../context/PropertyContext";
import { server } from '../main';

const MyProperties = () => {
  

  const { properties, setProperties, filters, setFilters } = useContext(PropertyContext);

  const fetchProperties = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const token = localStorage.getItem('token'); 
      const res = await axios.get(`${server}/property/getAll?${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProperties(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProperties(filters);
  };


  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${server}/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(properties.filter(property => property._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${server}/property/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(properties.map(property => 
        property._id === id ? { ...property, status: res.data.status } : property
      ));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>My Properties</h1>
      <Link to="/add-property" className='btn btn-success rounded p-2 m-2 mt-4'> Add Property</Link>
      <form onSubmit={handleSubmit} className="mb-4 pt-4">
        <div className="d-flex flex-column flex-md-row">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleInputChange}
            className="form-control mb-2 mb-md-0 me-md-2"
          />
          <input
            type="number"
            name="priceMin"
            placeholder="Min Price"
            value={filters.priceMin}
            onChange={handleInputChange}
            className="form-control mb-2 mb-md-0 me-md-2"
          />
          <input
            type="number"
            name="priceMax"
            placeholder="Max Price"
            value={filters.priceMax}
            onChange={handleInputChange}
            className="form-control mb-2 mb-md-0 me-md-2"
          />
          <input
            type="text"
            name="type"
            placeholder="Property Type"
            value={filters.type}
            onChange={handleInputChange}
            className="form-control mb-2 mb-md-0 me-md-2"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      <div className="row pt-3">
        {properties.map((property) => {
          return <div className="col d-flex justify-content-between m-2 p-2" key={property._id}>
            <div className="card rounded shadow m-3 p-3" style={{ width: "20rem", height: "30rem" }}>
              <img src={`${server}/${property.image}`} className="card-img-top" alt="..." style={{ width: "19rem", height: "15rem" }}/>
              <div className="card-body">
                <h5 className="card-title">{property.type}</h5>
                <p className="card-text">{property.location}</p>
                <p className="card-text">Rs. {property.price}</p>
            
                <p>
                    <select 
              value={property.status} 
              onChange={(e) => handleStatusChange(property._id, e.target.value)}
              className="p-1 rounded"
            >
              <option value="Not Sold">Not Sold</option>
              <option value="Sold">Sold</option>
            </select></p>
            <div className='d-flex justify-content-between'><button onClick={() => handleDelete(property._id)} className='btn btn-danger'>Delete</button>
            <Link to={`/edit-property/${property._id}`} className='btn btn-warning'>Edit</Link></div>
              </div>
            </div>
          </div>;
        })}
      </div>

      
    </div>
  );
};

export default MyProperties;
