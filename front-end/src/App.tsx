import React from 'react';
import { Header } from './components/Header';
import { Home } from './components/HomePage';
import { ServiceProvider } from './context/ServiceContext';

function App() {
  return (
    <ServiceProvider>
      <Header />
      <Home />
    </ServiceProvider>
  );
}

export default App;
