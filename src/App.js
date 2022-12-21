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
import ProfileSettings from "./pages/profile/ProfileSettings";
import { useSelector } from "react-redux";
import ParentProfile from "./pages/ParentProfile";
import Search from "./pages/search";
import SettingProfile from "./pages/SettingProfile";
import SettingAge from "./pages/SettingAge";
import Ability from "./pages/ability";
import Education from "./pages/education";
import ProfileOptions from "./component/profile-options";
import ProfileSecretKey from "./pages/SecretKey/ProfileSecretKey";
import RequiredAuth from "./routes/RequiredAuth";
import ChooseContentSettings from "./pages/Admin/ChooseContentSettings";
import SecretKeyChild from "./pages/profile/SecretKeyChild";
import { useEffect, useState } from "react";
import VideoPlayer from "./component/video player";
import VideoDetailsForAdmin from "./pages/Details/VideoDetailsForAdmin";
import HomeApproveContent from "./component/approveContent/HomeApproveContent";
import ListProfileChildren from "./component/form/ListProfileChildren";
import SearchVideoAdmin from "./pages/search/SearchVideoAdmin";
import ChannelVideoAdmin from "./pages/Channel/ChannelVideoAdmin";

function App() {
  // const { user } = useSelector((state) => state.auth);
  // const { childrenActive } = useSelector((state) => state.children);

  return (
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route path="/" element={<Home page="home" />} exact />
        <Route path="/ability" element={<Ability />} exact />
        <Route path="/education" element={<Education />} exact />
        <Route path="/parent" element={<Parent />} exact />
        <Route
          path="/video-detail/:id"
          element={<Details page="details" />}
          exact
        />
        <Route path="/channel/:id" element={<Channel />} exact />
        <Route path="/history" element={<History />} exact />
        <Route path="/profile-settings" element={<ProfileSettings />} exact />
        <Route path="/search/:key" element={<Search />} exact />
        <Route path="/secret-key-child" element={<SecretKeyChild />} exact />
        <Route
          path="/profile-settings/secret-key"
          element={<ProfileSecretKey />}
          exact
        />
      </Route>

      <Route path="/login" element={<Login />} exact />
      <Route path="/login/success" element={<LoginSuccess />} exact />
      <Route path="*" element={<div>Not found</div>} exact />

      <Route element={<RequiredAuth />}>
        <Route path="/profile-account" element={<ProfileAccount />} exact />
        <Route path="/profile-created" element={<ProfileCreated />} exact />
        <Route path="/profile-options" element={<ProfileOptions />} exact />
        <Route path="/list-profile" element={<ListProfileChildren />} exact />

        {/* Admin route */}
        <Route path="/admin" element={<Admin page="admin" />} exact />
        <Route
          path="/admin/profile-settings/:id"
          element={<ProfileSettings />}
          exact
        />
        <Route
          path="/admin/parentprofilesettings/:id"
          element={<ParentProfile page="admin" />}
          exact
        />

        <Route
          path="/admin/setting-profile/:id"
          element={<SettingProfile />}
          exact
        />
        <Route path="/admin/setting-age/:id" element={<SettingAge />} exact />

        <Route
          path="/admin/approve-content/"
          element={<HomeApproveContent />}
          exact
        />
        <Route
          path="/admin/content-settings/"
          element={<ChooseContentSettings />}
          exact
        />

        <Route
          path="/admin/add-profile/:admin"
          element={<ProfileAccount />}
          exact
        />

        <Route
          path="/admin/video-details/:id"
          element={<VideoDetailsForAdmin page="details" />}
          exact
        />

        <Route path="/admin/search/:key" element={<SearchVideoAdmin />} exact />

        <Route path="/admin/channel/:id" element={<ChannelVideoAdmin />} exact />
      </Route>
      <Route path="/video-player-test/" element={<VideoPlayer />} exact />
    </Routes>
  );
}

export default App;
