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
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/success" element={<LoginSuccess />} />
      <Route path="/parent" element={<Parent />} />
      <Route path="/profile-account" element={<ProfileAccount />} />
      <Route path="/video-detail/:id" element={<Details />} />
      <Route path="/channel/:id" element={<Channel />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile-created" element={<ProfileCreated />} />
    </Routes>
  );
}

export default App;
