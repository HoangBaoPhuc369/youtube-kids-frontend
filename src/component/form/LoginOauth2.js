import React, { useState, useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import lottie from "lottie-web";
import "./style.css";
import { FaAngleRight, FaUserCircle } from "react-icons/fa";

export default function LoginOauth2() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../.././animation/127286-hello-world.json"),
    });
  }, []);

  return (
    <>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body">
          <div
            className="login-form-img-item"
            style={{ height: "200px" }}
            ref={container}
          ></div>
          <Card.Title className="login-form-title">
            Đăng nhập bằng một tài khoản của cha mẹ
          </Card.Title>
          <Card.Text className="login-form-text">
            Đăng nhập bằng tài khoản của riêng bạn để thiết lập hồ sơ và có
            nhiều quyền kiểm soát dành cho cha mẹ hơn. Nếu không muốn đăng nhập,
            bạn có thể bỏ qua bước này.
          </Card.Text>

          <div className="login-account-google">
            <Button variant="primary" size="lg" active>
              <FaUserCircle className="login-account-google-avatar" />
              <div className="login-account-google-wraptext">
                <span>Add a new account</span>
                {/* <span>Primary button</span> */}
              </div>
              <FaAngleRight className="login-account-google-arrow" />
            </Button>
          </div>

          <div className="group-login-btn">
            <div className="group-login-btn-left">
              <Button variant="primary">Quay lại</Button>
            </div>
            <div className="group-login-btn-right">
              <Button variant="primary">Bỏ qua</Button>
              <Button variant="primary">Đăng Nhập</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
