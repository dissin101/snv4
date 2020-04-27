import React, { Fragment } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import {
  Publications,
  ProductPage,
  Profile,
  AddPublication,
} from "../../pages";

const IsAuthRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/profile/me'>
          <Profile value='me' />
        </Route>
        <Route exact path='/profile/settings'>
          <Profile value='settings' />
        </Route>
        <Route path='/add-publication' component={AddPublication} />
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

export default IsAuthRoutes;
