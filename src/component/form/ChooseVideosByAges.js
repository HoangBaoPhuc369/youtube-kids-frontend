import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import lottie from "lottie-web";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createChildren,
  updateChildrenProfileForParent,
} from "../../redux/feature/authSlice";

const OptionsVideosByAges = [
  {
    id: 1,
    picture:
      "https://www.gstatic.com/ytkids/onboarding/content_card_broadway/content_level_age_preschool_normal_363_321.png",
    name: "Tự phê duyệt",
    content_settings: "self-approval",
  },
  {
    id: 2,
    picture:
      "https://www.gstatic.com/ytkids/onboarding/content_card_broadway/content_level_age_school_age_normal_363_321.png",
    name: "Trẻ nhỏ tuổi",
    about: "3 - 10 tuổi",
    content_settings: "kiddie",
  },
  {
    id: 3,
    picture:
      "https://www.gstatic.com/ytkids/onboarding/content_card_broadway/content_level_age_older_activated_363_321.png",
    name: "Trẻ lớn tuổi",
    about: "11 - 14 tuổi",
    content_settings: "teen",
  },
];

export default function ChooseVideosByAges({
  nextStep,
  prevStep,
  formData,
  setFormData,
  admin,
}) {
  const [setting, setSetting] = useState("kiddie");
  const container = useRef(null);
  const { childrenCreated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  // const { loading } = useSelector((state) => state.children);

  const dispatch = useDispatch();

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      content_settings: setting,
    }));
  }, [setting]);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../.././animation/127014-rocket.json"),
    });
  }, []);

  const handleChooseSetting = (content) => {
    setSetting(content);
  };

  const submitFormData = (e) => {
    e.preventDefault();
    if (childrenCreated) {
      dispatch(
        updateChildrenProfileForParent({
          childId: childrenCreated?._id,
          userId: user?.google_id,
          formData: formData,
          navigate,
          defauth: true,
        })
      );
    } else {
      dispatch(
        createChildren({
          formData,
          userOauthId: user.google_id,
          navigate,
          admin,
        })
      );
    }
  };

  return (
    <>
      <div className="loading-background-left"></div>
      {/* {loading && <div className="loading-animation" ref={container}></div>} */}
      {/* {!loading && (
        
      )} */}
      <Card className="text-center choose-age-wrapper">
        <Card.Body className="login-form-body">
          <Form className="choose-age-form" onSubmit={submitFormData}>
            <Form.Label className="login-form-title">
              Tùy chọn cài đặt về nội dung đề xuất cho ???
            </Form.Label>
            <Form.Label className="login-form-text">
              Sự lựa chọn của bạn sẽ tác động đến các loại video có trong
              YouTube Kids
            </Form.Label>
            <div className="choose-age-btn-wrapper">
              <Row xs={1} md={2} lg={3} className="g-4">
                {OptionsVideosByAges.map((opt, idx) => (
                  <Col key={opt.id}>
                    <Card
                      className={
                        setting === opt.content_settings
                          ? "choose-age-btn-item active-setting"
                          : "choose-age-btn-item"
                      }
                      onClick={() => handleChooseSetting(opt.content_settings)}
                    >
                      <Card.Img variant="top" src={opt.picture} />
                      <Card.Body>
                        <Card.Title>{opt.name}</Card.Title>
                        <Card.Text>{opt.about}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="group-login-btn pad-10 h-130">
              <div className="group-login-btn-left">
                <Button variant="primary" onClick={prevStep}>
                  Quay lại
                </Button>
              </div>
              <div className="btn-right">
                <Button variant="primary" className="btn-next" type="submit">
                  Next
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="loading-background-right"></div>
    </>
  );
}
