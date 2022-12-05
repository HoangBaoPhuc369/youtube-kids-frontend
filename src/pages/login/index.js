import "./style.css";
import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";
import BackgroundLogin from "../../svgs/BackgroundLogin";
import StepOne from "../../component/form/StepOne";
import StepTwo from "../../component/form/StepTwo";
import Final from "../../component/form/StepCheck";
import { useState } from "react";
import ChildrenForm from "../../component/form/ChildrenForm";
import StepCheck from "../../component/form/StepCheck";
import LoginOauth2 from "../../component/form/LoginOauth2";
import CreateProfile from "../../component/form/CreateProfile";
import ChooseVideosByAges from "../../component/form/ChooseVideosByAges";
import InfoProfile from "../../component/form/InfoProfile";
import ListProfileChildren from "../../component/form/ListProfileChildren";

function Login() {
  //state for steps
  const [step, setstep] = useState(2);

  //state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

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

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  console.log(step);

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
          <Container>
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
                  handleFormData={handleInputData}
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
    // case 6:
    //   return (
    //     <div className="login-wrapper">
    //       <Container>
    //         <Row>
    //           <Col>
    //             <CreateProfile nextStep={nextStep} />
    //           </Col>
    //         </Row>
    //       </Container>
    //     </div>
    //   );

    // case 7:
    //   return (
    //     <div className="login-wrapper">
    //       <Container className="h-100">
    //         <Row>
    //           <Col>
    //             <ChooseVideosByAges nextStep={nextStep} />
    //           </Col>
    //         </Row>
    //       </Container>
    //     </div>
    //   );

    // case 8:
    //   return (
    //     <div className="login-wrapper">
    //       <Container className="h-100">
    //         <Row>
    //           <Col>
    //             <InfoProfile nextStep={nextStep} />
    //           </Col>
    //         </Row>
    //       </Container>
    //     </div>
    //   );

    // case 9:
    //   return (
    //     <div className="login-wrapper">
    //       <Container className="h-100">
    //         <Row>
    //           <Col>
    //             <ListProfileChildren nextStep={nextStep} />
    //           </Col>
    //         </Row>
    //       </Container>
    //     </div>
    //   );
    default:
      return <div className="login-wrapper"></div>;
  }
}

export default Login;
