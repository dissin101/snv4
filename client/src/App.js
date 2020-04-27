import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { Navbar, Footer } from "./components";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import "./index.scss";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router>
        <Navbar value={{ isAuthenticated }} />
        <div className='container app-container'>{routes}</div>
        <Footer value={{ isAuthenticated }} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
