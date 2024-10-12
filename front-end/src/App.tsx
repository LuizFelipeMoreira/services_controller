import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { ServiceProvider } from './context/ServiceContext';

function App() {
  return (
    <ServiceProvider>
      <Header />
      <Main />
    </ServiceProvider>
  );
}

export default App;
