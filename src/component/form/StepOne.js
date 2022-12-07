import React, { useState, useRef } from "react";
import lottie from "lottie-web";
import { Form, Card, Button } from "react-bootstrap";
import BackgroundLogin from "../../svgs/BackgroundLogin";

const StepOne = ({ nextStep, prevStep }) => {
  return (
    <>
      {/* <div className="loading-background-left"></div> */}
      <Card className="text-center login-form">
        <Card.Body className="login-form-body">
          <Card.Title className="login-form-img">
            <BackgroundLogin />
          </Card.Title>
          <Card.Text className="login-form-title">
            Hãy nhờ cha mẹ thiết lập YouTube Kids
          </Card.Text>
          <div className="login-form-btn-group">
            <Button variant="primary" onClick={() => prevStep()}>
              Tôi là trẻ em
            </Button>
            <Button variant="primary" onClick={() => nextStep()}>
              Tôi là cha mẹ
            </Button>
          </div>
        </Card.Body>
      </Card>
      {/* <div className="loading-background-right"></div> */}
    </>
  );
};

export default StepOne;
