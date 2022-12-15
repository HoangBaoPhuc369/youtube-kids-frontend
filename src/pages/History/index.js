import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import "./style.css";
import { getVideoList } from "../../redux/feature/videolistSlice";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VideoHistory from "../../component/video/videoHistory";
import { MdModeEdit } from "react-icons/md";

export default function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVideoList());
  }, []);

  const { childrenActive, user } = useSelector(
    (state) => state.auth
  );

  const handleSettings = () => {
    navigate("/profile-settings");
  };

  console.log();

  return (
    <div className="home-wrapper background-history">
      <Header />
      <div className="">
        <Container>
          <div className="mb-3">
            <div className="d-flex justify-content-center align-items-end flex-column pt-3">
              <div className="d-flex">
                {user?.childrens?.map((listChildren, index) => (
                  <img
                    key={index}
                    className="avatar-resize"
                    alt="avatar-user-history"
                    src={listChildren?.picture}
                  />
                ))}
              </div>
              <div className="text-white fw-bold history-list-profile-text">
                Bạn không phải {childrenActive?.name}?
              </div>
            </div>
            <div className="d-flex align-items-center">
              <img
                className="avatar-resize-history"
                alt="avatar-user-history"
                src={childrenActive?.picture}
              />
              <div className="profile-child-history-wrapper">
                <h2 className="text-white font-bold fw-bold">Xem lại</h2>
                <Button
                  className="profile-child-history-btn"
                  variant="primary"
                  onClick={handleSettings}
                  size="lg"
                >
                  <MdModeEdit />
                  Chỉnh sửa hồ sơ
                </Button>
              </div>
            </div>
          </div>
        </Container>
        {childrenActive.historyWatchVideo.length > 0 ? (
          <VideoHistory videos={childrenActive.historyWatchVideo} />
        ) : (
          <div className="profile-child-history-no-history">
            <div className="profile-child-history-img"></div>
            <div className="profile-child-history-text">
              Bạn chưa xem bất kỳ video nào
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
