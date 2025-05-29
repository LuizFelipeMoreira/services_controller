import { BrowserRouter, Route, Routes } from 'react-router';
import { Header } from './components/Header';
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
              path="home"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </ServiceProvider>
    </AuthContextProvider>
  );
}

export default App;
