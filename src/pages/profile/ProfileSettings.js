import React, { useState, useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../component/header";
import { BiKey } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import ChooseProfilePictureSettings from "../../component/modals/ChooseProfilePictureSettings";
import { listProfilePicture } from "./../../data/listProfilePicture";
import validator from "validator";

import DeleteModal from "./../../component/modals/DeleteModal";
import { useNavigate } from "react-router-dom";
import {
  clearHistoryVideo,
  deleteSecretPasswordChildren,
  updateChildrenProfileForChildren,
} from "../../redux/feature/authSlice";

export default function ProfileSettings() {
  const { user, childrenActive } = useSelector((state) => state.auth);
  const [modalShow, setModalShow] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [typeBtn, setTypeBtn] = useState("");

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleClear = (type) => {
    if (type === "history") {
      dispatch(
        clearHistoryVideo({
          childrenID: childrenActive?._id,
          userId: user?.google_id,
        })
      );
      handleClose();
    } else if (type === "secretKey") {
      dispatch(
        deleteSecretPasswordChildren({
          childrenID: childrenActive?._id,
          userId: user?.google_id,
          secretPassword: "",
        })
      );
      handleClose();
    }
  };

  const handleShowDeleteHistory = () => {
    setTitle("Xóa nhật ký hoạt động");
    setSubtitle("Bạn có chắc chắn muốn xóa toàn bộ lịch sử của mình không?");
    setTypeBtn("history");
    setShow(true);
  };

  const handleShowDeleteSecretKey = () => {
    setTitle("Bạn có chắc không?");
    setSubtitle("Thao tác này sẽ xóa mã bí mật của bạn.");
    setTypeBtn("secretKey");
    setShow(true);
  };

  const [name, setName] = useState(childrenActive ? childrenActive.name : "");
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
          childId: childrenActive._id,
          userId: user?.google_id,
          name: name,
          picture: pictureActive,
        })
      );
      setDisableBtn(false);
    }
  };

  const navigate = useNavigate();
  const handleCreateKey = () => {
    navigate("/profile-settings/secret-key");
  };

  return (
    <>
      <div className="login-wrapper">
        <Header />

        <div className="bg-profile-setting">
          <div className="loading-background-left"></div>
          <Container className="profile-settings-container">
            <Row>
              <Col style={{ height: "100%" }}>
                <div className="d-flex flex-column align-items-center profile-setting-wrap">
                  <div className="text-center mg-bot-90 mg-t-50">
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
                        className="btn-profile-setting"
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
                          {childrenActive?.secret_password ? (
                            <>
                              <Button
                                variant="info"
                                className="btn-profile-setting"
                                onClick={() => handleCreateKey()}
                              >
                                Thay đổi
                              </Button>

                              <Button
                                variant="info"
                                className="btn-profile-setting-delete"
                                onClick={handleShowDeleteSecretKey}
                              >
                                Xóa
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="info"
                              className="btn-profile-setting"
                              onClick={() => handleCreateKey()}
                            >
                              Tạo
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <br />

                  <Card
                    className="profile-settings-card settings-card"
                    style={{ width: "38rem" }}
                  >
                    <Card.Body>
                      <div className="profile-settings-card-left trash-icon">
                        <FaTrash />
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
                          <Button
                            variant="info"
                            className="btn-profile-setting"
                            onClick={handleShowDeleteHistory}
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <br />
                </div>
              </Col>
            </Row>
          </Container>
          <div className="loading-background-right"></div>
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
        handleClear={handleClear}
        title={title}
        subtitle={subtitle}
        typeBtn={typeBtn}
      />
    </>
  );
}
