import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import LockIcon from "../../svgs/LockIcon";
import useClickOutside from "../../utils/clickOutside";
import Button from "react-bootstrap/Button";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);
  const [disableBtn, setDisableBtn] = useState(true);

  const sidebarRef = useRef(null);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
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
  };

  useClickOutside(sidebarRef, () => {
    setMenuOpen(false);
    setTimeout(() => {
      randomQuestion();
      resetInput();
    }, 1000);
  });

  const handleTypeInput = (e, ref) => {
    const re = /^[0-9\b]+$/;
    const checkInput = ref === "number1";
    if (e.target.value === "" || re.test(e.target.value)) {
      setDisableBtn(false);
      checkInput ? setValue(e.target.value) : setValue1(e.target.value);
      input2Ref.current.focus();
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
    const userResult = value + value1;
    if (userResult === result.toString()) {
      alert("Correct!");
      closeMenu();
    } else {
      console.log("kết quả chính xác", result);
      console.log("kết quả user", value + value1);
      textRef.current.innerHTML =
        "Câu trả lời chưa chính xác, vui lòng thử lại";
      randomQuestion();
    }
  };

  return (
    <div ref={sidebarRef}>
      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => handleStateChange(state)}
        right
        customBurgerIcon={<LockIcon />}
        width={456}
      >
        <div className="sidebar-container">
          <div className="sidebar-title">Chỉ dành cho cha mẹ</div>
          <div className="sidebar-subtitle" ref={textRef}>
            Vui lòng nhập câu trả lời chính xác để tiếp tục
          </div>
          <div className="sidebar-calculate">
            {num1} X {num2} = ?
          </div>
          <div className="sidebar-input">
            <input
              value={value}
              name="number1"
              onChange={(e) => handleTypeInput(e, input1Ref.current.name)}
              placeholder="#"
              maxLength="1"
              ref={input1Ref}
            />
            <input
              value={value1}
              name="number2"
              onChange={(e) => handleTypeInput(e, input2Ref.current.name)}
              placeholder="#"
              maxLength="1"
              ref={input2Ref}
              onKeyDown={handleDelNumber}
            />
          </div>
          <div className="sidebar-button">
            <Button
              variant="primary"
              className={
                disableBtn ? "sidebar-button-disable" : "sidebar-button-active"
              }
              onClick={handleCheckResult}
              disabled={disableBtn}
            >
              Gửi
            </Button>
          </div>
        </div>
      </Menu>
    </div>
  );
}
