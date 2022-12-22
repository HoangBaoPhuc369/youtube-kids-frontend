import "./style.css";
import { Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderAdmin from "../../component/header/HeaderAdmin";

import { HiDotsHorizontal } from "react-icons/hi";
import ActivityOptions from "../../component/modals/ActivityOptions";
import SocketContext from "../../wssConnection/socketContext";
import {
  allowChat,
  allowSearch,
  blockChat,
  blockSearch,
  getKidActivity,
  setActivityChildren,
  updateKidActivity,
} from "../../redux/feature/authSlice";
import { setTracking } from "../../redux/feature/trackingSlice";
import { VscSearchStop, VscSearch } from "react-icons/vsc";
import { RiChatCheckLine, RiChatDeleteFill } from "react-icons/ri";

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
      dispatch(getKidActivity({ userId: user?.google_id }));
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
      dispatch(getKidActivity({ userId: user?.google_id }));
    });
  }, [socketRef]);

  const handleTracking = (k) => {
    dispatch(setTracking(k));

    setModalShow(true);
  };

  const checkBlockSearch = (id) => {
    const findChildren = user?.childrens.find((x) => x._id === id);
    if (findChildren && findChildren.allow_search) {
      return true;
    } else {
      return false;
    }
  };

  const checkBlockChat = (id) => {
    const findChildren = user?.childrens.find((x) => x._id === id);
    if (findChildren && findChildren.allow_chat) {
      return true;
    } else {
      return false;
    }
  };

  const handleBlockSeach = (data) => {
    dispatch(
      blockSearch({
        childId: data.childrenId,
        userId: user?.google_id,
      })
    );
  };

  const handleAllowSeach = (data) => {
    dispatch(
      allowSearch({
        childId: data.childrenId,
        userId: user?.google_id,
      })
    );
  };

  const handleBlockChat = (data) => {
    dispatch(
      blockChat({
        childId: data.childrenId,
        userId: user?.google_id,
      })
    );
  };

  const handleAllowChat = (data) => {
    dispatch(
      allowChat({
        childId: data.childrenId,
        userId: user?.google_id,
      })
    );
  };

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
                    Hoạt động của con tôi
                  </Form.Label>

                  <div className="tracking-form-wrapper">
                    {user?.kids_activity.map((k, idx) => (
                      <div className="tracking-notification">
                        <div className="d-flex align-items-center tracking-notification-left">
                          <div className="tracking-notification-img">
                            <img src={k.picture} alt="" />
                          </div>
                          <div className="tracking-notification-text-wrap">
                            <span>{k.name}</span>
                            <span>{k.activity.content}</span>
                          </div>
                        </div>
                        {k.type === "search" ? (
                          <>
                            <div
                              className="tracking-options"
                              onClick={() => {
                                if (checkBlockSearch(k.childrenId)) {
                                  handleBlockSeach(k);
                                } else {
                                  handleAllowSeach(k);
                                }
                              }}
                            >
                              {checkBlockSearch(k.childrenId) ? (
                                <VscSearchStop />
                              ) : (
                                <VscSearch />
                              )}
                            </div>
                          </>
                        ) : k.type === "chat" ? (
                          <div
                            className="tracking-options"
                            onClick={() => {
                              if (checkBlockChat(k.childrenId)) {
                                handleBlockChat(k);
                              } else {
                                handleAllowChat(k);
                              }
                            }}
                          >
                            {checkBlockChat(k.childrenId) ? (
                              <RiChatDeleteFill />
                            ) : (
                              <RiChatCheckLine />
                            )}
                          </div>
                        ) : (
                          <div
                            className="tracking-options"
                            onClick={() => handleTracking(k)}
                          >
                            <HiDotsHorizontal />
                          </div>
                        )}
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
