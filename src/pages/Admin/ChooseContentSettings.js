import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button, Container } from "react-bootstrap";
import "./style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateContentChidlrenSettings } from "../../redux/feature/authSlice";

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

export default function ChooseContentSettings() {
  const [setting, setSetting] = useState("kiddie");

  const navigate = useNavigate();

  const { childrenSelected, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleChooseSetting = (content) => {
    setSetting(content);
  };

  const handleBack = () => {
    navigate(`/admin/parentprofilesettings/${childrenSelected?._id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateContentChidlrenSettings({
        childrenID: childrenSelected?._id,
        userId: user?.google_id,
        contentSetting: setting,
        navigate,
      })
    );
  };

  return (
    <div className="login-wrapper">
      <Container className="h-100">
        <Row>
          <Col>
            <div className="loading-background-left"></div>
            <Card className="text-center choose-age-wrapper">
              <Card.Body className="login-form-body">
                <Form className="choose-age-form" onSubmit={handleSubmit}>
                  <Form.Label className="login-form-title">
                    Tùy chọn cài đặt về nội dung đề xuất cho{" "}
                    {childrenSelected?.name}
                  </Form.Label>
                  <Form.Label className="login-form-text">
                    Sự lựa chọn của bạn sẽ tác động đến các loại video có trong
                    YouKids
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
                            onClick={() =>
                              handleChooseSetting(opt.content_settings)
                            }
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
                      <Button variant="primary" onClick={handleBack}>
                        Quay lại
                      </Button>
                    </div>
                    <div className="btn-right">
                      <Button
                        variant="primary"
                        className="btn-next"
                        type="submit"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <div className="loading-background-right"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
