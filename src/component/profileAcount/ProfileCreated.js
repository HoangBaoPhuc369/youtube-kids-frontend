import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import InfoProfile from "../../component/form/InfoProfile";
import ListProfileChildren from "../../component/form/ListProfileChildren";

function ProfileCreated() {
  const [step, setstep] = useState(8);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  switch (step) {
    case 8:
      return (
        <div className="login-wrapper">
          <Container className="h-100">
            <Row>
              <Col>
                <InfoProfile nextStep={nextStep} />
              </Col>
            </Row>
          </Container>
        </div>
      );

    case 9:
      return <ListProfileChildren nextStep={nextStep} />;
    default:
      return <div className="login-wrapper"></div>;
  }
}

export default ProfileCreated;
