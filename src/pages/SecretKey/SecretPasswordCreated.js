import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../component/header";
import { useNavigate } from "react-router-dom";

export default function SecretPasswordCreated({ nextStep, prevStep }) {
  const { childrenActive } = useSelector((state) => state.auth);
  const [pictureActive, setpictureActive] = useState(childrenActive?.picture);

  const navigate = useNavigate();
  const handleCheckResult = () => navigate("/profile-settings");

  return (
    <>
      <div className="login-wrapper">
        <Header />

        <div className="bg-profile-setting">
          <div className="loading-background-left"></div>
          <Container className="profile-settings-container">
            <Row>
              <Col style={{ height: "100%" }}>
                <div className="d-flex flex-column align-items-center profile-setting-wrap">
                  <div className="text-center mg-bot-90 mg-t-50"></div>
                  <Card
                    border="primary"
                    className="profile-settings-card settings-card-first d-flex align-items-center justify-content-center"
                    style={{ width: "38rem", height: "426px" }}
                  >
                    <div className="profile-setting-img">
                      <img src={pictureActive} alt="" />
                    </div>

                    <div className="sidebar-container">
                      <div className="sidebar-title title-check-key-secret">
                        Đã xong! Hãy nhớ mã bí mật của bạn là
                      </div>
                      <div className="sidebar-input secret-key-created">
                        {childrenActive?.secret_password}
                      </div>
                      <div className="sidebar-button">
                        <Button
                          variant="primary"
                          className="sidebar-button-active"
                          onClick={handleCheckResult}
                        >
                          Đã rõ
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <br />
                </div>
              </Col>
            </Row>
          </Container>
          <div className="loading-background-right"></div>
        </div>
      </div>
    </>
  );
}
