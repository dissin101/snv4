import React from "react";
import { Switch, Router, Redirect, Route } from "react-router-dom";
import { Login, Register, AllPublications } from "./pages";

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
      <Route path='/publications' component={AllPublications} />
      <Route path='/publications/sale' />
      <Route path='/publications/sale/:id' />
      <Route path='/publications/rent' />
      <Route path='/publications/rent/:id' />
      <Redirect to='/' />
    </Switch>
  );
};
