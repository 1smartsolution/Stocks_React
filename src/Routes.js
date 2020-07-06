import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  SectorList as SectorListView,
  CompanyCA as CompanyCAView,
  CompanyUS as CompanyUSView,
  CryptoUS as CryptoUSView,
  DividendsUS as DividendsUSView,
  SignIn as SignInView
} from './views';


let needLogin = true;
const loginInfo = localStorage.getItem('loginFormState');
if (loginInfo !== null)
{
  const loginInfo = JSON.parse(localStorage.getItem('loginFormState'));
  if (loginInfo.isValid)
  {
    needLogin = false;
  }
}

const Routes = () => {
  return (
    <Switch>
      {needLogin &&
        <>
          <RouteWithLayout
            component={SignInView}
            exact
            layout={MinimalLayout}
            path="/sign-in"
          />
          <Redirect
            to="/sign-in"
          />
        </>
      }
      <Redirect
        exact
        from="/"
        to="/sectors"
      />
      <RouteWithLayout
        component={SectorListView}
        exact
        layout={MainLayout}
        path="/sectors"
      />
      <RouteWithLayout
        component={CompanyCAView}
        exact
        layout={MainLayout}
        path="/CompanyCA"
      />
      <RouteWithLayout
        component={CompanyUSView}
        exact
        layout={MainLayout}
        path="/CompanyUS"
      />
      <RouteWithLayout
        component={CryptoUSView}
        exact
        layout={MainLayout}
        path="/CryptoUS"
      />
      <RouteWithLayout
        component={DividendsUSView}
        exact
        layout={MainLayout}
        path="/DividendsUS"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
