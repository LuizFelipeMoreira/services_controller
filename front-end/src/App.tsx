import { BrowserRouter, Route, Routes } from 'react-router';
import { Header } from './components/Header';
import { ProtectedLayout } from './components/ProtectedLayout';
import { AuthContextProvider } from './context/AuthContext';
import { ServiceProvider } from './context/ServiceContext';
import { Home } from './pages/HomePage';
import { Login } from './pages/Login';

function App() {
  return (
    <AuthContextProvider>
      <ServiceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedLayout
                  children={
                    <>
                      <Header />
                      <Home />
                    </>
                  }
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ServiceProvider>
    </AuthContextProvider>
  );
}

export default App;
