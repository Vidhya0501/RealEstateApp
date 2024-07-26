import React, { createContext, useState } from 'react';

export const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    type: ''
  });

  return (
    <PropertyContext.Provider value={{ properties, setProperties, filters, setFilters }}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyProvider;
