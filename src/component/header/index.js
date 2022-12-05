import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import BopcornIcon from "../../svgs/BopcornIcon";
import Discovery from "../../svgs/Discovery";
import HeartIcon from "../../svgs/HeartIcon";
import LockIcon from "../../svgs/LockIcon";
import LightIcon from "../../svgs/LightIcon";
import SearchIcon from "../../svgs/SearchIcon";
import Sidebar from "../sidebar";
import "./style.css";

export default function Header({ page }) {
  const [navbar, setNavbar] = useState(false);

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

  return (
    <>
      <div className={page === "video-detail" ? "header-detail" : "header"}>
        <div className="header-wrap">
          <div className="header-left">
            <img
              src="https://res.cloudinary.com/da2c2nw4m/image/upload/v1667266412/facebook-clone/PhucHoang_Ns8BbJoJo/profile_pictures/hkutn8wxbqdhh47nsg2c.jpg"
              alt=""
              onClick={handleHistory}
            />
          </div>
          <div className="header-center">
            {page === "video-detail" ? (
              <>
                {/* <div className="header-center-search">
                  <input type="text" placeholder="Tìm kiếm trên Youtube Kids" />
                  <button>
                    <SearchIcon />
                  </button>
                </div> */}
                <div className="header-center-category-video-detail">
                  <div className="header-center-category-item">
                    <BopcornIcon className="category-item-icon" />
                  </div>
                  <div className="header-center-category-item">
                    <HeartIcon className="category-item-icon" />
                  </div>
                  <div className="header-center-category-item">
                    <LightIcon className="category-item-icon" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="header-center-search">
                  <input type="text" placeholder="Tìm kiếm trên Youtube Kids" />
                  <button>
                    <SearchIcon />
                  </button>
                </div>
                <div
                  className={
                    navbar
                      ? "header-center-category-fix"
                      : "header-center-category"
                  }
                >
                  <div className="header-center-category-item">
                    <BopcornIcon className="category-item-icon" />
                    <span>Sáng tạo</span>
                  </div>
                  <div className="header-center-category-item">
                    <HeartIcon className="category-item-icon" />
                    <span></span>
                  </div>
                  <div className="header-center-category-item">
                    <LightIcon className="category-item-icon" />
                    <span></span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="header-right">
            <div className="header-right-icon">
              {/* <LockIcon /> */}
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
