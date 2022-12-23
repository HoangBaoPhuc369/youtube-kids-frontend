import React, { useState, useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import lottie from "lottie-web";
import "./style.css";

const StepTwo = ({ nextStep, prevStep, jump2Step }) => {
  const container = useRef(null);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../.././animation/68687-cute-astronaut-in-space-mug-cartoon.json"),
    });
  }, []);

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

  const handleCheckResult = () => {
    const userYear = value + value1 + value2 + value3;
    const currentYear = new Date().getFullYear();
    const userAge = currentYear - userYear;
    if (userAge >= 18) {
      jump2Step();
    } else {
      nextStep();
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
          <Card.Title className="login-form-title">Xin chào cha mẹ!</Card.Title>
          <Card.Text className="login-form-text">
            Nhập năm sinh của bạn. Chúng tôi chỉ xác minh chứ không lưu trữ tuổi
            của bạn.
          </Card.Text>

          <div className="year-input-group">
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
              onKeyDown={handleDelNumber2}
            />
            <input
              value={value2}
              name="number3"
              onChange={(e) => handleTypeInput(e, input3Ref.current.name)}
              placeholder="#"
              maxLength="1"
              ref={input3Ref}
              onKeyDown={handleDelNumber3}
            />
            <input
              value={value3}
              name="number4"
              onChange={(e) => handleTypeInput(e, input4Ref.current.name)}
              placeholder="#"
              maxLength="1"
              ref={input4Ref}
              onKeyDown={handleDelNumber4}
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

export default StepTwo;
