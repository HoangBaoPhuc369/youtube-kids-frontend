import "./style.css";
import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";
import BackgroundLogin from "../../svgs/BackgroundLogin";
import StepOne from "../../component/form/StepOne";
import StepTwo from "../../component/form/StepTwo";
import Final from "../../component/form/Final";
import { useState } from "react";
import ChildrenForm from "../../component/form/ChildrenForm";

function Login() {
  // return (
  // <div className="login-wrapper">
  //   <Card className="text-center login-form">
  //     <Card.Body className="login-form-body">
  //       <Card.Title className="login-form-img">
  //         <BackgroundLogin />
  //       </Card.Title>
  //       <Card.Text className="login-form-text">
  //         Hãy nhờ cha mẹ thiết lập YouTube Kids
  //       </Card.Text>
  //       <div className="login-form-btn-group">
  //         <Button variant="primary">Tôi là trẻ em</Button>
  //         <Button variant="primary">Tôi là cha mẹ</Button>
  //       </div>
  //     </Card.Body>
  //   </Card>
  // </div>
  // );

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

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input) => (e) => {
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  // javascript switch case to show different form in each step
  switch (step) {
    case 1:
      return (
        <div className="login-wrapper">
          <ChildrenForm nextStep={nextStep} prevStep={prevStep} />
        </div>
      );
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="login-wrapper">
          {/* <Container>
            <Row>
              <Col>
                <StepOne
                  nextStep={nextStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container> */}

          <StepOne nextStep={nextStep} prevStep={prevStep} />
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 3:
      return (
        <div className="login-wrapper">
          <Container>
            <Row>
              <Col>
                <StepTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // Only formData is passed as prop to show the final value at form submit
    case 4:
      return (
        <div className="login-wrapper">
          <Container>
            <Row>
              <Col>
                <Final values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // default case to show nothing
    default:
      return <div className="login-wrapper"></div>;
  }
}

export default Login;
