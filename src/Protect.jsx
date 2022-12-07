import React from "react";
import { Navigate, Route } from "react-router-dom";

const isAuthenticated = localStorage.getItem("user");
console.log("this", isAuthenticated);
function ProtectedRoute({ component: Component, ...restOfProps }) {
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" replace />
      }
    />
  );
}

export default ProtectedRoute;