import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import "./style.css";
import { getVideoList } from "../../redux/feature/videolistSlice";
import { Container } from "react-bootstrap";
import HeartIcon from "../../svgs/HeartIcon";

export default function History() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoList());
  }, []);
  return (
    <div className="home-wrapper background-history">
      <Header />
      <div className="home-container">
        <Container>
          <div className="mb-3">
            <div className="d-flex justify-content-center align-items-end flex-column pt-3">
              <div className="d-flex">
                <img
                  className="avatar-resize"
                  alt="avatar-user-history"
                  src="https://yt3.ggpht.com/ytc/AMLnZu9tKOrTGMgeYTGqcjBguuQF5Ed405syDL-FXjUtjl6mh4SiXxmlvYOEbJzo9Zc7=s108-c-k-c0x00ffffff-no-rj"
                />
                <img
                  className="avatar-resize"
                  alt="avatar-user-history"
                  src="https://yt3.ggpht.com/ytc/AMLnZu9tKOrTGMgeYTGqcjBguuQF5Ed405syDL-FXjUtjl6mh4SiXxmlvYOEbJzo9Zc7=s108-c-k-c0x00ffffff-no-rj"
                />
                <img
                  className="avatar-resize"
                  alt="avatar-user-history"
                  src="https://yt3.ggpht.com/ytc/AMLnZu9tKOrTGMgeYTGqcjBguuQF5Ed405syDL-FXjUtjl6mh4SiXxmlvYOEbJzo9Zc7=s108-c-k-c0x00ffffff-no-rj"
                />
                <img
                  className="avatar-resize"
                  alt="avatar-user-history"
                  src="https://yt3.ggpht.com/ytc/AMLnZu9tKOrTGMgeYTGqcjBguuQF5Ed405syDL-FXjUtjl6mh4SiXxmlvYOEbJzo9Zc7=s108-c-k-c0x00ffffff-no-rj"
                />
              </div>
              <div className="text-white fw-bold">Bạn có phải là Huy?</div>
            </div>
            <div className="d-flex align-items-center">
              <img
                className="avatar-resize-history"
                alt="avatar-user-history"
                src="https://yt3.ggpht.com/ytc/AMLnZu9tKOrTGMgeYTGqcjBguuQF5Ed405syDL-FXjUtjl6mh4SiXxmlvYOEbJzo9Zc7=s108-c-k-c0x00ffffff-no-rj"
              />
              <h2 className="text-white font-bold fw-bold">Lịch sử vừa xem</h2>
            </div>
          </div>
        </Container>
        <Video />
      </div>
      <Footer />
    </div>
  );
}
