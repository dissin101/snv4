import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components";
import { Register, Login } from "./pages";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  //const routes = Navbar(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router>
        <Fragment>
          <Navbar value={{ isAuthenticated }} />
          <div className='container mt-4 mb-4'>
            <Switch>
              <Route exact path='/' />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
