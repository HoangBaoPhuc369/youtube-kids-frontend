import React, { useState, useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import lottie from "lottie-web";

const StepCheck = ({ nextStep }) => {
  const container = useRef(null);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const textRef = useRef(null);

  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../.././animation/53950-pet-lover.json"),
    });
  }, []);

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
      nextStep();
    } else {
      randomQuestion();
      textRef.current.innerHTML =
        "Câu trả lời chưa chính xác, vui lòng thử lại";
      setValue("");
      setValue1("");
    }
  };

  return (
    <>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body">
          <div
            className="login-form-img-item"
            ref={container}
            style={{ height: "200px" }}
          ></div>
          <Card.Title className="login-form-title">
            Chỉ dành cho cha mẹ
          </Card.Title>
          <Card.Text className="login-form-text" ref={textRef}>
            Vui lòng nhập câu trả chính xác lời để tiếp tục
          </Card.Text>

          <div className="sidebar-calculate">
            {num1} X {num2} = ?
          </div>

          <div className="calculate-input-group">
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
              disabled={disableBtn}
              onClick={() => handleCheckResult()}
              className={
                disableBtn ? "sidebar-button-disable" : "sidebar-button-active"
              }
            >
              Gửi
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepCheck;
