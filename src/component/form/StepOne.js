import React, { useState, useRef } from "react";
import lottie from "lottie-web";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import BackgroundChildrenForm from "../../svgs/BackgroundChildrenForm";
import BackgroundLogin from "../../svgs/BackgroundLogin";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, prevStep }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  //   const submitFormData = (e) => {
  //     e.preventDefault();

  //     // checking if value of first name and last name is empty show error else take to step 2
  //     if (
  //       validator.isEmpty(values.firstName) ||
  //       validator.isEmpty(values.lastName)
  //     ) {
  //       setError(true);
  //     } else {
  //       nextStep();
  //     }
  //   };

  const submitFormData = () => {
    prevStep();
  };

  return (
    <div>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body">
          <Card.Title className="login-form-img">
            <BackgroundLogin />
          </Card.Title>
          <Card.Text className="login-form-text">
            Hãy nhờ cha mẹ thiết lập YouTube Kids
          </Card.Text>
          <div className="login-form-btn-group">
            <Button variant="primary" onClick={() => prevStep()}>Tôi là trẻ em</Button>
            <Button variant="primary" onClick={() => nextStep()}>Tôi là cha mẹ</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StepOne;
