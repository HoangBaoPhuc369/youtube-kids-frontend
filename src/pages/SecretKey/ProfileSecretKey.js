import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../component/header";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../utils/clickOutside";

export default function ProfileSecretKey() {
  const { user } = useSelector((state) => state.auth);
  const { childrenActive } = useSelector((state) => state.children);
  const [show, setShow] = useState(false);
  const [pictureActive, setpictureActive] = useState(childrenActive?.picture);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  const sidebarRef = useRef(null);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const textRef = useRef(null);

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const resetInput = () => {
    setValue("");
    setValue1("");
  };

  const handleTypeInput = (e, ref) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (ref === "number1") {
        setValue(e.target.value);
        input2Ref.current.focus();
      } else if (ref === "number2") {
        setValue1(e.target.value);
        input3Ref.current.focus();
      } else if (ref === "number3") {
        setValue2(e.target.value);
        input4Ref.current.focus();
      } else if (ref === "number4") {
        setValue3(e.target.value);
        setDisableBtn(false);
      }
    }
  };

  const handleDelNumber2 = (e) => {
    const key = e.keyCode || e.charCode;
    const checkKey = key === 8 || key === 46;
    if (checkKey && e.target.value === "") {
      setValue("");
      input1Ref.current.focus();
    }
  };

  const handleDelNumber3 = (e) => {
    const key = e.keyCode || e.charCode;
    const checkKey = key === 8 || key === 46;
    if (checkKey && e.target.value === "") {
      setValue1("");
      input2Ref.current.focus();
    }
  };

  const handleDelNumber4 = (e) => {
    const key = e.keyCode || e.charCode;
    const checkKey = key === 8 || key === 46;
    if (checkKey && e.target.value !== "") {
      setValue3("");
      setDisableBtn(true);
    } else if (checkKey && e.target.value === "") {
      setValue2("");
      input3Ref.current.focus();
    }
  };

  const handleDelNumber = (e) => {
    var key = e.keyCode || e.charCode;

    if ((key === 8 || key === 46) && e.target.value === "") {
      setValue("");
      input1Ref.current.focus();
    }
  };

  const handleCheckResult = () => {
    console.log(value + value1 + value2 + value3);
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
                  <div className="text-center mg-bot-90 mg-t-50"></div>
                  <Card
                    border="primary"
                    className="profile-settings-card settings-card-first d-flex align-items-center justify-content-center"
                    style={{ width: "38rem", height: "426px" }}
                  >
                    <div className="profile-setting-img">
                      <img src={pictureActive} alt="" />
                    </div>

                    <div className="sidebar-container">
                      <div className="sidebar-title title-profile-secret">
                        {childrenActive?.name} ơi, hãy tạo mã bí mật của bạn đi
                      </div>
                      <div className="sidebar-input profile-secret-key">
                        <input
                          value={value}
                          type="password"
                          name="number1"
                          onChange={(e) =>
                            handleTypeInput(e, input1Ref.current.name)
                          }
                          placeholder="#"
                          maxLength="1"
                          ref={input1Ref}
                        />
                        <input
                          value={value1}
                          type="password"
                          name="number2"
                          onChange={(e) =>
                            handleTypeInput(e, input2Ref.current.name)
                          }
                          placeholder="#"
                          maxLength="1"
                          ref={input2Ref}
                          onKeyDown={handleDelNumber2}
                        />
                        <input
                          value={value2}
                          type="password"
                          name="number3"
                          onChange={(e) =>
                            handleTypeInput(e, input3Ref.current.name)
                          }
                          placeholder="#"
                          maxLength="1"
                          ref={input3Ref}
                          onKeyDown={handleDelNumber3}
                        />
                        <input
                          value={value3}
                          type="password"
                          name="number4"
                          onChange={(e) =>
                            handleTypeInput(e, input4Ref.current.name)
                          }
                          placeholder="#"
                          maxLength="1"
                          ref={input4Ref}
                          onKeyDown={handleDelNumber4}
                        />
                      </div>
                      <div className="sidebar-button">
                        <Button
                          variant="primary"
                          className={
                            disableBtn
                              ? "sidebar-button-disable"
                              : "sidebar-button-active"
                          }
                          onClick={handleCheckResult}
                          disabled={disableBtn}
                        >
                          Tiếp
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <br />
                </div>
              </Col>
            </Row>
          </Container>
          <div className="loading-background-right"></div>
        </div>
      </div>
    </>
  );
}
