import "./style.css";
import { Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderAdmin from "../../component/header/HeaderAdmin";

import { HiDotsHorizontal } from "react-icons/hi";
import ActivityOptions from "../../component/modals/ActivityOptions";
import SocketContext from "../../wssConnection/socketContext";

export default function Tracking() {
  const navigate = useNavigate();
  const { user, childrenSelected } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const socketRef = useContext(SocketContext);

  useEffect(() => {
    socketRef?.emit("join_room", user?.google_id);
  }, [socketRef]);

  useEffect(() => {
    socketRef?.on("get_watch_video_activity", (data) => {
      console.log(data);
    });
  }, [socketRef]);

  useEffect(() => {
    socketRef?.on("message_to_admin", (data) => {
      console.log(data);
    });
  }, [socketRef]);

  useEffect(() => {
    socketRef?.on("get_search_activity", (data) => {
      console.log(data);
    });
  }, [socketRef]);

  useEffect(() => {
    socketRef?.on("get_profile_activity", (data) => {
      console.log(data);
    });
  }, [socketRef]);

  return (
    <>
      <div className="admin-wrapper">
        <HeaderAdmin />
        <div className="parent-profile-wrapper">
          <div className="background-layer-left"></div>
          <Container className="container-center container-admin default-height">
            <Card className="text-center tracking-form min-heght-card">
              <Card.Body className="">
                <Form>
                  <Form.Label className="login-form-title text-white">
                    Hoạt động con của tôi
                  </Form.Label>

                  <div className="tracking-form-wrapper">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div className="tracking-notification">
                        <div className="d-flex align-items-center tracking-notification-left">
                          <div className="tracking-notification-img">
                            <img
                              src="https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_emohorse_800_20170929.png"
                              alt=""
                            />
                          </div>
                          <div className="tracking-notification-text-wrap">
                            <span>phuc hoang</span>
                            <span>Vừa xem video</span>
                          </div>
                        </div>
                        <div
                          className="tracking-options"
                          onClick={() => setModalShow(true)}
                        >
                          <HiDotsHorizontal />
                        </div>
                      </div>
                    ))}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Container>
          <div className="background-layer-right"></div>
        </div>
      </div>

      <ActivityOptions show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
