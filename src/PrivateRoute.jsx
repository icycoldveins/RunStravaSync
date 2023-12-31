import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ isLoggedIn, redirectTo, children }) {
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
