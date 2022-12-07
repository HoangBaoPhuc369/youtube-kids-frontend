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
import { useSelector } from "react-redux";

export default function Header({ page }) {
  const [navbar, setNavbar] = useState(false);
  const [search, setSearch] = useState(false);

  const { childrenActive, loadingChildren } = useSelector(
    (state) => state.children
  );

  const searchRef = useRef(null);
  const inputSearchRef = useRef(null);

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
    inputSearchRef.current.focus();
  };

  return (
    <>
      {page === "video-detail" ? (
        <div className="header-detail">
          <div className="header-detail-wrap">
            <div className="header-wrap">
              <div className="header-left">
                <div className="header-left-icon">
                  <Link to={"/"} className="header-left-icon-wrap">
                    <ArrowLeftIcon />
                  </Link>
                </div>
                {!loadingChildren ? (
                  <img
                    src={childrenActive?.picture}
                    alt=""
                    onClick={handleHistory}
                  />
                ) : null}
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
                    <button>
                      <SearchIcon />
                    </button>
                  </div>
                ) : null}
                {!search ? (
                  <div className="header-center-category-wrapper">
                    <div className="header-center-category-item">
                      <BopcornIcon className="category-item-icon" />
                      {/* <span>Sáng tạo</span> */}
                    </div>
                    <div className="header-center-category-item">
                      <HeartIcon className="category-item-icon" />
                      {/* <span></span> */}
                    </div>
                    <div className="header-center-category-item">
                      <LightIcon className="category-item-icon" />
                      {/* <span></span> */}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="header-right-search w-210"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-detail">
          <div className="header-detail-wrap">
            <div className="header-wrap">
              <div className="header-left">
                {!loadingChildren ? (
                  <img
                    src={childrenActive?.picture}
                    alt=""
                    onClick={handleHistory}
                  />
                ) : null}
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
                    <button>
                      <SearchIcon />
                    </button>
                  </div>
                ) : null}
                {!search ? (
                  <div className="header-center-category-wrapper">
                    <Link to={"/"} className="header-center-category-item">
                      <BopcornIcon className="category-item-icon" />
                      <span>Sáng tạo</span>
                    </Link>
                    <div className="header-center-category-item">
                      <HeartIcon className="category-item-icon" />
                      <span></span>
                    </div>
                    <div className="header-center-category-item">
                      <LightIcon className="category-item-icon" />
                      <span></span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="header-right-search w-210"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
