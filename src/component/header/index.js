import { useContext, useRef, useState } from "react";
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
import { setCategory } from "../../redux/feature/videolistSlice";
import MusicIconDisable from "./../../svgs/MusicIconDisable";
import MusicIcon from "../../svgs/MusicIcon";
import BopcornIconDisable from "../../svgs/BopcornIconDisable";
import LightIconDisable from "../../svgs/LightIconDisable";
import DiscoverDisableIcon from "../../svgs/DiscoverDisableIcon";
import GamingIcon from "./../../svgs/GamingIcon";
import GamingDisableIcon from "../../svgs/GamingDisableIcon";
import OrangeIcon from "../../svgs/OrangeIcon";
import OrangeDisableIcon from "../../svgs/OrangeDisableIcon";
import SocketContext from "../../wssConnection/socketContext";
import { updateKidActivity } from "../../redux/feature/authSlice";

export default function Header({ page }) {
  const checkAdminPage = page === "admin" ? true : false;
  const socketRef = useContext(SocketContext);
  const [navbar, setNavbar] = useState(false);
  const [search, setSearch] = useState(false);

  const { childrenActive, childrenSelected, user } = useSelector(
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
    const data = {
      childrenId: childrenActive?._id,
      name: childrenActive?.name,
      picture: childrenActive?.picture,
      type: "search",
      activity: {
        content: `${childrenActive?.name} vừa tìm kiếm video bằng từ khóa ${inputSearchRef.current.value}`,
        videoId: "",
        channelId: "",
        new_name: "",
        new_picture: "",
      },
    };
    const date = Date.now();

    socketRef?.emit("search_activity", {
      data: data,
      date: date,
      room: user?.google_id,
    });

    dispatch(
      updateKidActivity({
        userId: user?.google_id,
        activity: {
          childrenId: childrenActive?._id,
          name: childrenActive?.name,
          picture: childrenActive?.picture,
          type: "search",
          activity: {
            content: `${childrenActive?.name} vừa tìm kiếm video bằng từ khóa ${inputSearchRef.current.value}`,
            videoId: "",
            channelId: "",
            new_name: "",
            new_picture: "",
          },
        },
      })
    );

    navigate(`/search/${inputSearchRef.current.value}`);
  };

  const handleChangeCategory = (cate) => {
    dispatch(setCategory(cate));
  };

  return (
    <>
      {page !== "home" ? (
        <div className="header-detail">
          <div className="header-detail-wrap">
            <div className="header-wrap">
              <div className="header-left">
                <div className="header-left-icon">
                  <Link to={"/"} className="header-left-icon-wrap">
                    <ArrowLeftIcon />
                  </Link>
                </div>
                <img
                  src={childrenActive?.picture || childrenSelected?.picture}
                  alt=""
                  onClick={handleHistory}
                />
              </div>

              <div className="header-right">
                <div className="header-right-icon">
                  {!search &&
                  !checkAdminPage &&
                  childrenActive?.content_settings !== "self-approval" ? (
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
                      placeholder="Tìm kiếm trên YouKids"
                    />
                    <button onClick={handleSearch}>
                      <SearchIcon />
                    </button>
                  </div>
                ) : null}
                {!search ? (
                  <div className="header-center-category-wrapper">
                    {childrenActive?.content_settings === "kiddie" ? (
                      <>
                        <Link
                          to={"/"}
                          onClick={() => handleChangeCategory("Chương trình")}
                          className="header-center-category-item"
                        >
                          <BopcornIconDisable className="category-item-icon" />
                        </Link>
                        <Link
                          to={"/"}
                          onClick={() => handleChangeCategory("Âm nhạc")}
                          className="header-center-category-item"
                        >
                          <MusicIconDisable className="category-item-icon" />
                        </Link>
                        <Link
                          to={"/"}
                          onClick={() => handleChangeCategory("Học tập")}
                          className="header-center-category-item"
                        >
                          <LightIconDisable className="category-item-icon" />
                        </Link>
                      </>
                    ) : childrenActive?.content_settings === "teen" ? (
                      <>
                        <Link
                          to={"/"}
                          onClick={() => handleChangeCategory("Chương trình")}
                          className="header-center-category-item"
                        >
                          <BopcornIconDisable className="category-item-icon" />
                        </Link>
                        <Link
                          to={"/"}
                          onClick={() => handleChangeCategory("Âm nhạc")}
                          className="header-center-category-item"
                        >
                          <MusicIconDisable className="category-item-icon" />
                        </Link>
                        <Link
                          to={"/"}
                          onClick={() => handleChangeCategory("Học tập")}
                          className="header-center-category-item"
                        >
                          <LightIconDisable className="category-item-icon" />
                        </Link>
                        <Link
                          to={"/"}
                          onClick={() => handleChangeCategory("Khám phá")}
                          className="header-center-category-item"
                        >
                          <DiscoverDisableIcon className="category-item-icon" />
                        </Link>
                        <Link
                          to={"/"}
                          onClick={() => handleChangeCategory("Trò chơi")}
                          className="header-center-category-item"
                        >
                          <GamingDisableIcon className="category-item-icon" />
                        </Link>
                      </>
                    ) : childrenActive?.content_settings === "self-approval" &&
                      !checkAdminPage ? (
                      <Link
                        to={"/"}
                        // onClick={() => handleChangeCategory("Chương trình")}
                        className="header-center-category-item"
                      >
                        <OrangeDisableIcon className="category-item-icon" />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="header-right-search w-210"></div>
            </div>
          </div>
        </div>
      ) : page === "home" ? (
        <div className="header-detail">
          <div className="header-detail-wrap">
            <div className="header-wrap">
              <div className="header-left">
                <img
                  src={childrenActive?.picture || childrenSelected?.picture}
                  alt=""
                  onClick={handleHistory}
                />
              </div>

              <div className="header-right">
                <div className="header-right-icon">
                  {(!search && checkAdminPage) ||
                  (!search &&
                    childrenActive?.content_settings !== "self-approval") ? (
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
                      placeholder="Tìm kiếm trên YouKids"
                    />
                    <button onClick={handleSearch}>
                      <SearchIcon />
                    </button>
                  </div>
                ) : null}
                {!search ? (
                  <div className="header-center-category-wrapper">
                    {childrenActive?.content_settings === "kiddie" ? (
                      <>
                        <div
                          className="header-center-category-item"
                          onClick={() => handleChangeCategory("Chương trình")}
                        >
                          {category === "Chương trình" ? (
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
                          {category === "Âm nhạc" ? (
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
                          {category === "Học tập" ? (
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
                      </>
                    ) : childrenActive?.content_settings === "teen" ? (
                      <>
                        <div
                          className="header-center-category-item"
                          onClick={() => handleChangeCategory("Chương trình")}
                        >
                          {category === "Chương trình" ? (
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
                          {category === "Âm nhạc" ? (
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
                          {category === "Học tập" ? (
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
                          {category === "Khám phá" ? (
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
                          {category === "Trò chơi" ? (
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
                      </>
                    ) : childrenActive?.content_settings === "self-approval" ? (
                      <div
                        className="header-center-category-item"
                        // onClick={() => handleChangeCategory("Học tập")}
                      >
                        <OrangeIcon className="category-item-icon" />
                        <span>Đã phê duyệt cho bạn</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="header-right-search w-210"></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
