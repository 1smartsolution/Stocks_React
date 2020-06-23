import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  SectorList as SectorListView,
  CompanyCA as CompanyCAView,
  CompanyUS as CompanyUSView,
  CryptoUS as CryptoUSView,
  Forex as ForexView,
  DividendsUS as DividendsUSView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
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
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
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
        component={ForexView}
        exact
        layout={MainLayout}
        path="/Forex"
      />
      <RouteWithLayout
        component={DividendsUSView}
        exact
        layout={MainLayout}
        path="/DividendsUS"
      />
     <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
