import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Login } from "feature/auth";
import Products from "feature/products";

import { AppRoute } from "./AppRoute.enum";
import AuthRoute from "./AuthRoute";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path={AppRoute.Home} exact component={Products} />
      <AuthRoute path={AppRoute.Login}>
        <Login />
      </AuthRoute>

      <Redirect to={AppRoute.Home} />
    </Switch>
  );
};
