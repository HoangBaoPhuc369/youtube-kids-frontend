import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import { listProfilePicture } from "../../data/listProfilePicture";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ListProfileChildren({ nextStep }) {
  const [profilePictures, setProfilePictures] = useState(listProfilePicture);
  const [pictureActive, setpictureActive] = useState("");

  useEffect(() => {
    const activePicture = profilePictures.find(
      (picture) => picture.active === true
    );
    setpictureActive(activePicture.src);
  }, [profilePictures]);

  return (
    <>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body list-profile-form">
          <Form className="list-profile-wrapper">
            <Form.Label className="list-profile-form-title">
              Bạn đã hoàn tất! Chúc mừng 1377- Hoàng Bảo Phúc!
            </Form.Label>
            <Form.Label className="login-form-text mgbt-20">
              Ai đang dùng YouTube Kids?
            </Form.Label>

            <Row xs={1} md={2} lg={4} className="g-4">
              {Array.from({ length: 10 }).map((_, idx) => (
                <Col>
                  <Card className="list-profile-form-card">
                    <Card.Img
                      variant="top"
                      className="list-profile-form-card-img"
                      src="https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_optimisticgiraffe_800_20170929.png"
                    />
                    <Card.Body>
                      <Card.Title className="list-profile-form-card-text">Card title</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="group-login-btn-left list-profile-btn mgt-10">
              <Button variant="primary">Thêm hồ sơ khác</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
