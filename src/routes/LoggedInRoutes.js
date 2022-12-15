import { useSelector } from "react-redux";
import { Outlet} from "react-router-dom";
import ProfileOptions from "../component/profile-options";
import Login from "../pages/login";

export default function LoggedInRoutes() {
  const { user, childrenActive, guess } = useSelector((state) => ({
    ...state.auth,
  }));

  return !user && !guess ? (
    // <Navigate to="/login" />
    <Login />
  ) : (!user && guess) || (user && !guess && childrenActive) ? (
    <Outlet />
  ) : user && !guess && !childrenActive ? (
    // <Navigate to="/profile-options" />
    <ProfileOptions />
  ) : (
    // <Navigate to="/login" />
    <Login />
  );
}
