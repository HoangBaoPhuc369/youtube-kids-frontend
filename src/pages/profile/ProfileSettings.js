import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../component/header";
import ChooseProfilePicture from "../../component/modals/ChooseProfilePicture";
import { BiKey } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import ChooseProfilePictureSettings from "../../component/modals/ChooseProfilePictureSettings";
import { listProfilePicture } from "./../../data/listProfilePicture";
import { getChannelVideo } from "./../../redux/api";
import validator from "validator";
import {
  updateChildrenProfileForChildren,
  clearHistoryVideo,
} from "./../../redux/feature/childrenSlice";
import DeleteModal from "./../../component/modals/DeleteModal";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
  const { user } = useSelector((state) => state.auth);
  const { childrenActive } = useSelector((state) => state.children);
  const [modalShow, setModalShow] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleClearHistory();
  };
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [pictureActive, setpictureActive] = useState(childrenActive?.picture);

  useEffect(() => {
    if (name === "" || pictureActive === "") {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [name, pictureActive]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validator.isEmpty(name) || validator.isEmpty(pictureActive)) {
      setDisableBtn(true);
    } else if (!validator.matches(name, /^[a-zA-Z ]+$/)) {
      setDisableBtn(true);
    } else {
      console.log(name, pictureActive);
      dispatch(
        updateChildrenProfileForChildren({
          name: name,
          picture: pictureActive,
          id: childrenActive._id,
        })
      );
      setDisableBtn(false);
    }
  };

  const handleClearHistory = () => {
    dispatch(clearHistoryVideo({ id: childrenActive?._id }));
  };

  const navigate = useNavigate();
  const handleCreateKey = () => {
    navigate("/admin/secret-key");
  };

  return (
    <>
      <div className="login-wrapper">
        <Header />

        <div className="bg-profile-setting">
          <Container className="profile-settings-container">
            <Row>
              <Col style={{ height: "100%" }}>
                <div className="loading-background-left"></div>
                <div className="d-flex flex-column align-items-center profile-setting-wrap">
                  <div className="text-center mg-bot-90">
                    <h3 className="header-admin">Chỉnh sửa hồ sơ của tôi</h3>
                  </div>
                  <Card
                    border="primary"
                    className="profile-settings-card settings-card-first"
                    style={{ width: "38rem" }}
                  >
                    <Card.Body>
                      <div
                        className="profile-setting-img"
                        onClick={() => setModalShow(true)}
                      >
                        <img src={pictureActive} alt="" />
                        <span className="profile-setting-img-edit">
                          <MdModeEdit />
                        </span>
                      </div>

                      <div className="profile-setting-input-wrap">
                        <input
                          className="effect-2"
                          type="text"
                          placeholder="Tên"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <span className="focus-border"></span>
                      </div>
                    </Card.Body>
                    <div className="profile-setting-btn-save">
                      <Button
                        variant="info"
                        onClick={handleSubmit}
                        disabled={disableBtn}
                      >
                        Save
                      </Button>
                    </div>
                  </Card>
                  <br />

                  <Card
                    className="profile-settings-card settings-card"
                    border="secondary"
                    style={{ width: "38rem" }}
                  >
                    <Card.Body>
                      <div className="profile-settings-card-left">
                        <BiKey />
                      </div>
                      <div className="profile-settings-card-right">
                        <div className="settings-card-right-text">
                          <div>Mã bí mật</div>
                          <div>
                            Với mã bí mật, người khác sẽ không thể chuyển sang
                            dùng hồ sơ của bạn
                          </div>
                        </div>
                        <div className="settings-card-right-btn">
                          <Button
                            variant="info"
                            onClick={() => handleCreateKey()}
                          >
                            Tạo
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <br />

                  <Card
                    border="success"
                    className="profile-settings-card settings-card"
                    style={{ width: "38rem" }}
                  >
                    <Card.Body>
                      <div className="profile-settings-card-left">
                        <FaRegTrashAlt />
                      </div>
                      <div className="profile-settings-card-right">
                        <div className="settings-card-right-text">
                          <div>Xóa nhật ký hoạt động</div>
                          <div>
                            Xóa danh sách video đã xem, nội dung tìm kiếm và đề
                            xuất, và video đã lưu để xem khi không có mạng
                          </div>
                        </div>
                        <div className="settings-card-right-btn">
                          <Button variant="info" onClick={handleShow}>
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <br />
                </div>
                <div className="loading-background-right"></div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <ChooseProfilePictureSettings
        show={modalShow}
        onHide={() => setModalShow(false)}
        listProfilePicture={listProfilePicture}
        setpictureActive={setpictureActive}
      />

      <DeleteModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
}
