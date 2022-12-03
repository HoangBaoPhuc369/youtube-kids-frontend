import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const OptionsVideosByAges = [
  {
    id: 1,
    picture:
      "https://www.gstatic.com/ytkids/onboarding/content_card_broadway/content_level_age_preschool_normal_363_321.png",
    name: "Tự phê duyệt",
  },
  {
    id: 2,
    picture:
      "https://www.gstatic.com/ytkids/onboarding/content_card_broadway/content_level_age_school_age_normal_363_321.png",
    name: "Trẻ nhỏ tuổi",
    about: "3 - 10 tuổi",
  },
  {
    id: 3,
    picture:
      "https://www.gstatic.com/ytkids/onboarding/content_card_broadway/content_level_age_older_activated_363_321.png",
    name: "Trẻ lớn tuổi",
    about: "11 - 14 tuổi",
  },
];

export default function ChooseVideosByAges({ nextStep }) {
  return (
    <>
      <Card className="text-center choose-age-wrapper">
        <Card.Body className="login-form-body">
          <Form className="choose-age-form">
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
                    <Card className="choose-age-btn-item">
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
            <div className="group-login-btn pad-10">
              <div className="group-login-btn-left">
                <Button variant="primary">Quay lại</Button>
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
    </>
  );
}
