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

export default function HeaderHomeAPC() {
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
    navigate(`/search/${inputSearchRef.current.value}`);
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
              <img
                src={childrenSelected?.picture}
                alt=""
                onClick={handleHistory}
              />
            </div>

            <div className="header-right">
              <div className="header-right-icon">
                {!search ? (
                  <div className="header-right-search-icon-wrap">
                    <div
                      className="header-right-search-icon"
                      onClick={handleShowSearch}
                    >
                      <SearchIcon />
                    </div>
                  </div>
                ) : null}

                <div className="header-right-lock-icon-wrap">
                  <Sidebar />
                </div>
              </div>
            </div>
          </div>

          <div className="header-center">
            <div className="header-left-search w-210"></div>
            <div className="header-center-search-wrap">
              {search ? (
                <div className="header-center-search active" ref={searchRef}>
                  <input
                    type="text"
                    ref={inputSearchRef}
                    placeholder="Tìm kiếm trên Youtube Kids"
                  />
                  <button onClick={handleSearch}>
                    <SearchIcon />
                  </button>
                </div>
              ) : null}
              {!search ? (
                <div className="header-center-category-wrapper">
                  <div
                    className="header-center-category-item"
                    onClick={() => handleChangeCategory("Chương trình")}
                  >
                    {categoryAdmin === "Chương trình" ? (
                      <>
                        <BopcornIcon className="category-item-icon" />
                        <span>Chương trình</span>
                      </>
                    ) : (
                      <>
                        <BopcornIconDisable className="category-item-icon" />
                        <span></span>
                      </>
                    )}
                  </div>
                  <div
                    className="header-center-category-item"
                    onClick={() => handleChangeCategory("Âm nhạc")}
                  >
                    {categoryAdmin === "Âm nhạc" ? (
                      <>
                        <MusicIcon className="category-item-icon" />
                        <span>Âm nhạc</span>
                      </>
                    ) : (
                      <>
                        <MusicIconDisable className="category-item-icon" />
                        <span></span>
                      </>
                    )}
                  </div>
                  <div
                    className="header-center-category-item"
                    onClick={() => handleChangeCategory("Học tập")}
                  >
                    {categoryAdmin === "Học tập" ? (
                      <>
                        <LightIcon className="category-item-icon" />
                        <span>Học tập</span>
                      </>
                    ) : (
                      <>
                        <LightIconDisable className="category-item-icon" />
                        <span></span>
                      </>
                    )}
                  </div>
                  <div
                    className="header-center-category-item"
                    onClick={() => handleChangeCategory("Khám phá")}
                  >
                    {categoryAdmin === "Khám phá" ? (
                      <>
                        <Discovery className="category-item-icon" />
                        <span>Khám phá</span>
                      </>
                    ) : (
                      <>
                        <DiscoverDisableIcon className="category-item-icon" />
                        <span></span>
                      </>
                    )}
                  </div>
                  <div
                    className="header-center-category-item"
                    onClick={() => handleChangeCategory("Trò chơi")}
                  >
                    {categoryAdmin === "Trò chơi" ? (
                      <>
                        <GamingIcon className="category-item-icon" />
                        <span>Trò chơi</span>
                      </>
                    ) : (
                      <>
                        <GamingDisableIcon className="category-item-icon" />
                        <span></span>
                      </>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="header-right-search w-210"></div>
          </div>
        </div>
      </div>
    </>
  );
}
