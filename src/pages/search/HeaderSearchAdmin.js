import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../../svgs/SearchIcon";
import "./style.css";
import ArrowLeftIcon from "../../svgs/ArrowLeftIcon";
import useClickOutside from "../../utils/clickOutside";
import { useDispatch, useSelector } from "react-redux";
import MusicIconDisable from "./../../svgs/MusicIconDisable";
import BopcornIconDisable from "../../svgs/BopcornIconDisable";
import LightIconDisable from "../../svgs/LightIconDisable";
import DiscoverDisableIcon from "../../svgs/DiscoverDisableIcon";
import GamingDisableIcon from "../../svgs/GamingDisableIcon";
import Sidebar from "../../component/sidebar";

export default function HeaderSearchAdmin({setKeyword}) {
  const [navbar, setNavbar] = useState(false);
  const [search, setSearch] = useState(false);

  const { childrenActive, childrenSelected } = useSelector(
    (state) => state.auth
  );
  const { category } = useSelector((state) => state.video);

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

  return (
    <>
      <div className="header-detail">
        <div className="header-detail-wrap">
          <div className="header-wrap">
            <div className="header-left">
              <div className="header-left-icon">
                <Link
                  to={"/admin/approve-content/"}
                  className="header-left-icon-wrap"
                >
                  <ArrowLeftIcon />
                </Link>
              </div>
              <img
                src={childrenSelected?.picture}
                alt=""
                onClick={handleHistory}
              />
            </div>

            <div className="header-right">
              <div className="header-right-icon">
                <div className="header-right-lock-icon-wrap">
                  <Sidebar />
                </div>
              </div>
            </div>
          </div>

          <div className="header-center">
            <div className="header-left-search w-210"></div>
            <div className="header-center-search-wrap">
              <div className="header-center-search active" ref={searchRef}>
                <input
                  type="text"
                  ref={inputSearchRef}
                  placeholder="Tìm kiếm trên YouKids"
                />
                <button onClick={() => handleSearch()}>
                  <SearchIcon />
                </button>
              </div>
            </div>
            <div className="header-right-search w-210"></div>
          </div>
        </div>
      </div>
    </>
  );
}
