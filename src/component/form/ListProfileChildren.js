import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { setChildrenActive } from "../../redux/feature/authSlice";

export default function ListProfileChildren() {
  const { user } = useSelector((state) => state.auth);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const handleClickCard = (childId) => {
    // cardRef.current.classList.add("active-card-profile");
    const findChildren = user.childrens.find(child => child?._id === childId);
    if (findChildren) {
      dispatch(setChildrenActive(findChildren));
      navigate("/")
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <Container className="h-100">
          <Row>
            <Col>
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
                      className={
                        user?.childrens?.length < 4 ? "g-4 flex-center" : "g-4"
                      }
                    >
                      {user?.childrens?.map((children, idx) => (
                        <Col
                          key={children?._id}
                          onClick={() => handleClickCard(children?._id)}
                        >
                          <Card
                            className="list-profile-form-card"
                            ref={cardRef}
                          >
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
