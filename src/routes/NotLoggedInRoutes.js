import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { childrenActive } = useSelector((state) => state.children);
  return user && childrenActive ? <Navigate to="/" /> : <Outlet />;
}
