import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ProfileOptions from "../component/profile-options";
import Login from "../pages/login";

export default function LoggedInRoutes() {
  const { user, childrenActive, guess } = useSelector((state) => ({
    ...state.auth,
  }));

  return !user && !guess ? (
    <Login />
  ) : (!user && guess) || (user && !guess && childrenActive) ? (
    <Outlet />
  ) : user && !guess && !childrenActive ? (
    <ProfileOptions />
  ) : (
    <Login />
  );
}
