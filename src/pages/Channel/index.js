import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import "./style.css";
import { getVideoList } from "../../redux/feature/videolistSlice";
import { Container } from "react-bootstrap";
import RubyIcon from "../../svgs/RubyIcon";
import { SlOptionsVertical } from "react-icons/sl";

export default function Channel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoList());
  }, []);

  const { childrenActive, listChildrens } = useSelector(
    (state) => state.children
  );

  return (
    <div className="home-wrapper background-history">
      <Header />
      <div className="home-container">
        <Container>
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  className="avatar-resize-channel"
                  alt="avatar-user-history"
                  src={childrenActive?.picture}
                />
                <div className="profile-child-history-wrapper">
                  <h2 className="text-white font-bold fw-bold">
                    Winx Club Việt Nam
                  </h2>
                  <div className="text-white">976 N người đăng ký</div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <button className="text-white bg-btn-sub d-flex align-items-center">
                  <RubyIcon />
                  <span>Đăng ký</span>
                </button>
                <SlOptionsVertical className="text-white fs-3 ms-4" />
              </div>
            </div>
          </div>
        </Container>
        <Video />
      </div>
      <Footer />
    </div>
  );
}
