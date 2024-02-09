import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const PrivateRoute = () => {
  const { authenticated } = useAuth();
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
