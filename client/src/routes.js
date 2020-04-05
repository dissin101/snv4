import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Login, Register, AllPublications, Sale, ProductPage } from "./pages";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/personal-panel' />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/' exact />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/restore-password' />
      <Route path='/add-publication' />
      <Route path='/publications' exact component={AllPublications} />
      <Route path='/publications/:id' component={ProductPage} />
      <Route path='/sale' exact component={Sale} />
      <Route path='/sale/:id' component={ProductPage} />
      <Route path='/rent' exact />
      <Route path='/rent/:id' component={ProductPage} />
      <Redirect to='/' />
    </Switch>
  );
};
