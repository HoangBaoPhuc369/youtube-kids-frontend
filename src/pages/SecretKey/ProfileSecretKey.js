import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../component/header";
import CreateSecretKey from "./CreateSecretKey";

export default function ProfileSecretKey() {
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState("");

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <CreateSecretKey
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setFormData}
        />
      );
    case 2:
      return (
        <CreateSecretKey
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
        />
      );
    default:
      return <div></div>;
  }
}
