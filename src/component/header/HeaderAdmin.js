import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import BopcornIcon from "../../svgs/BopcornIcon";
import Discovery from "../../svgs/Discovery";
import HeartIcon from "../../svgs/HeartIcon";
import LockIcon from "../../svgs/LockIcon";
import LightIcon from "../../svgs/LightIcon";
import SearchIcon from "../../svgs/SearchIcon";
import Sidebar from "../sidebar";
import "./style.css";
import ArrowLeftIcon from "../../svgs/ArrowLeftIcon";
import useClickOutside from "../../utils/clickOutside";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAdmin } from "../../redux/feature/videolistSlice";
import MusicIconDisable from "./../../svgs/MusicIconDisable";
import MusicIcon from "../../svgs/MusicIcon";
import BopcornIconDisable from "../../svgs/BopcornIconDisable";
import LightIconDisable from "../../svgs/LightIconDisable";
import DiscoverDisableIcon from "../../svgs/DiscoverDisableIcon";
import GamingIcon from "./../../svgs/GamingIcon";
import GamingDisableIcon from "../../svgs/GamingDisableIcon";
import OrangeIcon from "../../svgs/OrangeIcon";
import OrangeDisableIcon from "../../svgs/OrangeDisableIcon";

export default function HeaderAdmin() {
  const [navbar, setNavbar] = useState(false);
  const [search, setSearch] = useState(false);

  const { childrenSelected } = useSelector((state) => state.auth);
  const { categoryAdmin } = useSelector((state) => state.video);

  const searchRef = useRef(null);
  const inputSearchRef = useRef(null);

  const dispatch = useDispatch();

  useClickOutside(searchRef, () => {
    setSearch(false);
  });

  const changeBackground = () => {
    if (window.scrollY >= 150) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  const navigate = useNavigate();
  const handleHistory = () => {
    navigate("/history");
  };

  const handleShowSearch = () => {
    setSearch(true);
    inputSearchRef.current?.focus();
  };

  const handleSearch = () => {
    navigate(`/admin/search/${inputSearchRef.current.value}`);
  };

  const handleChangeCategory = (cate) => {
    dispatch(setCategoryAdmin(cate));
  };

  return (
    <>
      <div className="header-detail">
        <div className="header-detail-wrap">
          <div className="header-wrap">
            <div className="header-left">
              <div className="header-left-icon">
                <Link to={"/"} className="header-left-icon-wrap">
                  <ArrowLeftIcon />
                </Link>
              </div>
            </div>

            <div className="header-right">
              <div className="header-right-icon">
                <div className="header-right-lock-icon-wrap">
                  <Sidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
