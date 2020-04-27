import React, { Fragment } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Login, Register, Publications, ProductPage } from "../../pages";

const NoAuthRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/restore-password' />
        <Route exact path='/publications'>
          <Publications value='publications' />
        </Route>
        <Route path='/publications/:id' component={ProductPage} />
        <Route exact path='/sale'>
          <Publications value='sale' />
        </Route>
        <Route path='/sale/:id' component={ProductPage} />
        <Route exact path='/rent'>
          <Publications value='rent' />
        </Route>
        <Route path='/rent/:id' component={ProductPage} />
        <Redirect to='/publications' />
      </Switch>
    </Fragment>
  );
};

export default NoAuthRoutes;
