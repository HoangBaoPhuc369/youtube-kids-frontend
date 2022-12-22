import { Card } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import OffCanvas from "../sidebar/offcanva";
import { useNavigate } from "react-router-dom";
import { setChildrenActive } from "../../redux/feature/authSlice";

export default function ProfileOptions({ socketRef }) {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // socketRef?.emit("addUser", { userId: user?.google_id });
    socketRef?.emit("join_room", user?.google_id);
  }, []);

  const handleChooseProfile = (childId) => {
    const findChildren = user.childrens.find((child) => child?._id === childId);
    if (findChildren) {
      dispatch(setChildrenActive(findChildren));
      if (findChildren?.secret_password !== "") {
        navigate("/secret-key-child");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="profile-options-wrapper">
        <div className="loading-background-left"></div>
        <div className="profile-options-header">
          <OffCanvas />
        </div>
        <div className="profile-options-body">
          <div className="profile-options-body-title">Chọn hồ sơ</div>
          <div className="profile-options-body--sub-title">
            Ai hiện đang sử dụng YouTube Kids?
          </div>

          <div className="profile-options-body-item-wrapper">
            <Container>
              <Row
                xs={1}
                md={2}
                lg={4}
                className={user?.childrens?.length < 4 ? " flex-center" : ""}
              >
                {user?.childrens?.map((children, idx) => (
                  <Col key={children?._id}>
                    <Card
                      className="list-profile-form-card profile-options"
                      onClick={() => handleChooseProfile(children?._id)}
                    >
                      <Card.Img
                        variant="top"
                        className="list-profile-form-card-img"
                        src={children.picture}
                      />
                      <Card.Body className="list-profile-form-body">
                        <Card.Title className="list-profile-form-card-text">
                          {children.name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
        <div className="loading-background-right"></div>
      </div>
    </>
  );
}
