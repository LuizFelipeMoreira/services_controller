import React from 'react';
import { ServiceContext } from '../context/ServiceContext';

export const useService = () => {
  const context = React.useContext(ServiceContext);

  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }

  return context;
};
