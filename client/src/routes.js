import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Login, Register, Publications, ProductPage, Profile } from "./pages";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact />
        <Route exact path='/profile/me'>
          <Profile value='me' />
        </Route>
        <Route exact path='/profile/settings'>
          <Profile value='settings' />
        </Route>
        <Route path='/add-publication' />
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
      <Redirect to='/' />
    </Switch>
  );
};
