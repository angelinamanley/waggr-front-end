import React from "react";
import { Redirect, Route } from "react-router-dom";


export const PrivateRoute = ({ component: Component, logout, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} logout={logout} user={user}/>
      ) : (
        <Redirect
          to={{ pathname: "/login" }}
        />
      )
    }
  />
);
