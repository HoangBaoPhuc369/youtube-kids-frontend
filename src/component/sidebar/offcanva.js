import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../utils/clickOutside";
import { MdLock } from "react-icons/md";
import { useSelector } from "react-redux";

export default function OffCanvas() {
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  const [result, setResult] = useState(0);
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

  const randomQuestion = () => {
    let random1;
    let random2;
    random1 = randomNumber(2, 9);
    if (random1 === 2) {
      random2 = randomNumber(5, 9);
    } else if (random1 === 3) {
      random2 = randomNumber(4, 9);
    } else if (random1 === 4) {
      random2 = randomNumber(3, 9);
    } else {
      random2 = randomNumber(2, 9);
    }
    setNum1(random1);
    setNum2(random2);
    setResult(random1 * random2);
  };

  useEffect(() => {
    randomQuestion();
  }, []);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const resetInput = () => {
    setValue("");
    setValue1("");
    setValue2("");
    setValue3("");
  };

  useClickOutside(sidebarRef, () => {
    setMenuOpen(false);
    setTimeout(() => {
      !user?.secret_password && randomQuestion();
      resetInput();
      setDisableBtn(true);
    }, 1000);
  });

  const handleTypeInput = (e, ref) => {
    const re = /^[0-9\b]+$/;
    if (user?.secret_password) {
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
    } else {
      if (e.target.value === "" || re.test(e.target.value)) {
        if (ref === "number1") {
          setValue(e.target.value);
          input2Ref.current.focus();
        } else if (ref === "number2") {
          setValue1(e.target.value);
          setDisableBtn(false);
        }
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

  const handleCheckResult = () => {
    const userResult = value + value1;
    const userResult2 = value + value1 + value2 + value3;
    if (!user?.secret_password) {
      if (userResult === result.toString()) {
        navigate("/admin");
        closeMenu();
      } else {
        textRef.current.innerHTML =
          "Câu trả lời chưa chính xác, vui lòng thử lại";
        randomQuestion();
      }
    } else {
      if (userResult2 === user?.secret_password) {
        navigate("/admin");
        closeMenu();
      } else {
        textRef.current.innerHTML = "Mật mã không chính xác, vui lòng thử lại";
      }
    }
  };

  return (
    <>
      <div className="profile-options-header-sidebar" onClick={handleShow}>
        <span>Thêm hồ sơ của trẻ trong phần cài đặt dành cho cha mẹ </span>
        <MdLock />
      </div>

      <div ref={sidebarRef}>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement={"end"}
          name={"end"}
        >
          <Offcanvas.Body>
            <div className="sidebar-container">
              <div className="sidebar-title">Chỉ dành cho cha mẹ</div>
              <div className="sidebar-subtitle" ref={textRef}>
                {user?.secret_password
                  ? "Vui lòng nhập mật mã để tiếp tục"
                  : "Vui lòng nhập câu trả lời chính xác để tiếp tục"}
              </div>
              {!user?.secret_password ? (
                <div className="sidebar-calculate">
                  {num1} X {num2} = ?
                </div>
              ) : null}
              <div className="sidebar-input">
                <input
                  value={value}
                  name="number1"
                  type="password"
                  onChange={(e) => handleTypeInput(e, input1Ref.current.name)}
                  placeholder="#"
                  maxLength="1"
                  ref={input1Ref}
                />
                <input
                  value={value1}
                  type="password"
                  name="number2"
                  onChange={(e) => handleTypeInput(e, input2Ref.current.name)}
                  placeholder="#"
                  maxLength="1"
                  ref={input2Ref}
                  onKeyDown={handleDelNumber2}
                />
                {user?.secret_password ? (
                  <>
                    <input
                      value={value2}
                      name="number3"
                      type="password"
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
                      name="number4"
                      type="password"
                      onChange={(e) =>
                        handleTypeInput(e, input4Ref.current.name)
                      }
                      placeholder="#"
                      maxLength="1"
                      ref={input4Ref}
                      onKeyDown={handleDelNumber4}
                    />
                  </>
                ) : null}
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
                  Gửi
                </Button>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}
