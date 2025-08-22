import React, { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [serviceType, setServiceType] = useState('individual');
  const [expandedService, setExpandedService] = useState(null);

  const handleServiceTypeChange = (type) => {
    setServiceType(type);
    setExpandedService(null); // Reset expanded service when type changes
  };

  const handleToggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const value = {
    serviceType,
    expandedService,
    handleServiceTypeChange,
    handleToggleService
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};
