import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Login from "../pages/login";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { childrenActive } = useSelector((state) => state.children);
  return user ? <Outlet /> : <Login />; //<Navigate to="/login" />
}
