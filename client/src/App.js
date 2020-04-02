import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components";
import { Register, Login } from "./pages";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className='container mt-4 mb-4'>
          <Switch>
            <Route exact path='/' />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
