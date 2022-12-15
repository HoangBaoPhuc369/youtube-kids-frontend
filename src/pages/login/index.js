import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import StepOne from "../../component/form/StepOne";
import StepTwo from "../../component/form/StepTwo";
import { useState } from "react";
import ChildrenForm from "../../component/form/ChildrenForm";
import StepCheck from "../../component/form/StepCheck";
import LoginOauth2 from "../../component/form/LoginOauth2";

function Login() {
  //state for steps
  const [step, setstep] = useState(2);

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  const jump2Step = () => {
    setstep(step + 2);
  };

  switch (step) {
    case 1:
      return (
        <div className="login-wrapper">
          <ChildrenForm nextStep={nextStep} prevStep={prevStep} />
        </div>
      );
    case 2:
      return (
        <div className="login-wrapper">
          <Container className="h-100">
            <Row>
              <Col>
                <StepOne nextStep={nextStep} prevStep={prevStep} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 3:
      return (
        <div className="login-wrapper">
          <Container>
            <Row>
              <Col>
                <StepTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  jump2Step={jump2Step}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 4:
      return (
        <div className="login-wrapper">
          <Container>
            <Row>
              <Col>
                <StepCheck nextStep={nextStep} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 5:
      return (
        <div className="login-wrapper">
          <Container>
            <Row>
              <Col>
                <LoginOauth2 nextStep={nextStep} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    default:
      return <div className="login-wrapper"></div>;
  }
}

export default Login;
