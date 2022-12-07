import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import "./style.css";
import { getVideoList } from "../../redux/feature/videolistSlice";
import { Button, Container } from "react-bootstrap";
import HeartIcon from "../../svgs/HeartIcon";
import { useNavigate } from 'react-router-dom';


export default function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVideoList());
  }, []);

  const { childrenActive, listChildrens } = useSelector(
    (state) => state.children
  );

  const handleSettings = () => {
    navigate('/profile-settings');
  };

  return (
    <div className="home-wrapper background-history">
      <Header />
      <div className="home-container">
        <Container>
          <div className="mb-3">
            <div className="d-flex justify-content-center align-items-end flex-column pt-3">
              <div className="d-flex">
                {listChildrens.map((listChildren, index) => (
                  <img
                    key={index}
                    className="avatar-resize"
                    alt="avatar-user-history"
                    src={listChildren?.picture}
                  />
                ))}
              </div>
              <div className="text-white fw-bold">
                Bạn có phải là {childrenActive?.name}?
              </div>
            </div>
            <div className="d-flex align-items-center">
              <img
                className="avatar-resize-history"
                alt="avatar-user-history"
                src={childrenActive?.picture}
              />
              <div className="profile-child-history-wrapper">
                <h2 className="text-white font-bold fw-bold">
                  Lịch sử vừa xem
                </h2>
                <Button variant="primary" onClick={handleSettings} size="lg">
                  Chỉnh sửa hồ sơ
                </Button>
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
