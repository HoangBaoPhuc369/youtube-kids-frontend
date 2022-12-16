import "./style.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import CreateProfile from "../../component/form/CreateProfile";
import ChooseVideosByAges from "../../component/form/ChooseVideosByAges";
import InfoProfile from "../../component/form/InfoProfile";
import ListProfileChildren from "../../component/form/ListProfileChildren";
import { useParams } from "react-router-dom";

function ProfileAccount() {
  const { admin} = useParams();
  const [step, setstep] = useState(6);
  const namePage = "Tạo hồ sơ";
  const [formData, setFormData] = useState({
    kid_name: "",
    age: "",
    picture:
      "https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_optimisticgiraffe_800_20170929.png",
    bMonth: "",
    content_settings: "",
  });

  const nextStep = () => {
    setstep(step + 1);
  };

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

  switch (step) {
    case 6:
      return (
        <div className="login-wrapper">
          <Container>
            <Row>
              <Col>
                <CreateProfile
                  formData={formData}
                  setFormData={setFormData}
                  nextStep={nextStep}
                  handleInputData={handleInputData}
                  namePage={namePage}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );

    case 7:
      return (
        <div className="login-wrapper">
          <Container className="h-100">
            <Row>
              <Col>
                <ChooseVideosByAges
                  formData={formData}
                  setFormData={setFormData}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  admin={admin}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    default:
      return <div className="login-wrapper"></div>;
  }
}

export default ProfileAccount;
