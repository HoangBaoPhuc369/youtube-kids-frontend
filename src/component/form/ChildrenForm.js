import React, { useState, useRef, useEffect } from "react";
import lottie from "lottie-web";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import BackgroundLogin from "../../svgs/BackgroundLogin";

const ChildrenForm = ({ nextStep, prevStep }) => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../.././animation/46472-lurking-cat.json"),
    });
  }, []);
  const submitFormData = () => {
    nextStep();
  };

  return (
    <div>
      <div className="loading-background-left"></div>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body">
          <Card.Title className="login-form-img">
            <div
              className="login-form-img-item"
              ref={container}
              style={{ height: "340px" }}
            ></div>
          </Card.Title>
          <Card.Text className="login-form-title">
            Hãy nhờ cha mẹ thiết lập YouTube Kids
          </Card.Text>
          <div className="login-form-btn-group">
            <Button variant="primary" onClick={submitFormData}>
              Tôi hiểu rồi
            </Button>
          </div>
        </Card.Body>
      </Card>
      <div className="loading-background-right"></div>
    </div>
  );
};

export default ChildrenForm;
