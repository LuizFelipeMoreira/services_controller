import React from 'react';
import { ServiceContext } from '../context/ServiceContext';

export const useService = () => React.useContext(ServiceContext);
