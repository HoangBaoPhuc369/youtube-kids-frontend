import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import Parent from "./pages/Parent/index";
import Details from "./pages/Details/index";
import Channel from "./pages/Channel/index";
import Home from "./pages/home/index";
import Login from "./pages/login";
import ProfileAccount from "./component/profileAcount";
import LoginSuccess from "./pages/login/LoginSuccess";
import Admin from "./pages/Admin";
import History from "./pages/History";
import ProfileCreated from "./component/profileAcount/ProfileCreated";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import ListProfileChildren from "./component/form/ListProfileChildren";
import ProfileSettings from "./pages/profile/ProfileSettings";
import { useSelector } from "react-redux";
function App() {
  const { user } = useSelector((state) => state.auth);
  const { childrenActive } = useSelector((state) => state.children);

  return (
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/profile-account" element={<ProfileAccount />} />
        <Route path="/video-detail/:id" element={<Details />} />
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile-created" element={<ProfileCreated />} />
        <Route path="/list-profile/:id" element={<ListProfileChildren />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route
          path="/admin/profile-settings/:id"
          element={<ProfileSettings />}
        />
      </Route>

      <Route element={<NotLoggedInRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/success" element={<LoginSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;
