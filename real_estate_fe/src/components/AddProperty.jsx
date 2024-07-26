import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../main";

const AddProperty = () => {
  const [property, setProperty] = useState({
    type: "",
    location: "",
    price: "",
    description: "",
    status: "",
    image: null,
  });

  const types = ["Plots", "Residential Apartments", "Independent Villa", "Commercial Property"];
  const navigate = useNavigate();

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
      formData.append(key, property[key]);
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(`${server}/property`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/my-properties");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center centered">
     
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 w-96 p-5  shadow mt-3 rounded ">
      <h3>Add Property</h3>
      <select name="type" value={property.type} onChange={handleChange} required className="p-1 rounded">
      {types.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>))}
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
      <input type="file" name="image" onChange={handleFileChange} required />
      <button type="submit" className="btn btn-success">Add Property</button>
    </form>
    </div>
  );
};

export default AddProperty;
