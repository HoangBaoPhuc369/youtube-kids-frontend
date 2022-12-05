import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import { listProfilePicture } from "../../data/listProfilePicture";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


export default function ListProfileChildren({ nextStep }) {
  const { user } = useSelector((state) => state.auth);
  const { listChildrens } = useSelector((state) => state.children);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleClickCard = () => {
    cardRef.current.classList.add("active-card-profile");
    navigate('/');
  }

  return (
    <>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body list-profile-form">
          <Form className="list-profile-wrapper">
            <Form.Label className="list-profile-form-title">
              Bạn đã hoàn tất! Chúc mừng {user?.name}!
            </Form.Label>
            <Form.Label className="login-form-text mgbt-20">
              Ai đang dùng YouTube Kids?
            </Form.Label>

            <Row
              xs={1}
              md={2}
              lg={4}
              className={listChildrens.length < 4 ? "g-4 flex-center" : "g-4"}
            >
              {listChildrens.map((children, idx) => (
                <Col key={children?._id} onClick={handleClickCard}>
                  <Card className="list-profile-form-card" ref={cardRef}>
                    <Card.Img
                      variant="top"
                      className="list-profile-form-card-img"
                      src={children.picture}
                    />
                    <Card.Body>
                      <Card.Title className="list-profile-form-card-text">
                        {children.name}
                      </Card.Title>
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
