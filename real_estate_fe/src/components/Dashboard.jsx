import React, { useContext, useEffect } from "react";
import axios from "axios";

import { PropertyContext } from "../context/PropertyContext";
import { server } from "../main";

const Dashboard = () => {
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

  return (
    <div className="mt-5">
      
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
        {properties.map((property) => (
          <div className="col d-flex justify-content-between m-2 p-2" key={property._id}>
            <div className="card rounded shadow m-2 p-2" style={{ width: "20rem", height: "25rem" }}>
              <img src={`${server}/${property.image}`} className="card-img-top" alt="..." style={{ width: "19rem", height: "15rem" }}/>
              <div className="card-body">
                <h5 className="card-title">{property.type}</h5>
                <p className="card-text">{property.location}</p>
                <p className="card-text">Rs. {property.price}</p>
                <p className="card-text">{property.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
