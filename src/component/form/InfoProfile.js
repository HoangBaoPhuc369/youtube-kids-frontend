import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { listChildrensUser } from "../../redux/feature/childrenSlice";

export default function InfoProfile({ nextStep }) {
  const { user } = useSelector((state) => state.auth);
  const { children } = useSelector((state) => state.children);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(listChildrensUser({ userOauthId: user.google_id, nextStep }));
  };

  return (
    <>
      <div className="loading-background-left"></div>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body">
          <Form onSubmit={handleSubmit}>
            <Form.Label className="login-form-title">Đã tạo hồ sơ!</Form.Label>
            <Form.Label className="login-form-text">
              Hãy chuyển đến phần "Chỉnh sửa hồ sơ" để thiết lập mã bí mật cho
              {children?.name}. Mã này sẽ ngăn những trẻ khác trên thiết bị này
              truy cập vào hồ sơ đó. Bạn có thể đặt lại mã này bất cứ lúc nào.
            </Form.Label>

            <div className="login-form-wrapper">
              <div className="login-form-profile-img">
                <img src={children?.picture} alt="" />
              </div>
              <div className="login-form-info">
                <Form.Label className="login-form-profile-name">
                  {children?.name}
                </Form.Label>
                <Form.Label className="login-form-profile-age">
                  {children?.year} tuổi
                </Form.Label>
              </div>
              <MdModeEdit className="edit-icon-md" />
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
      <div className="loading-background-right"></div>
    </>
  );
}
