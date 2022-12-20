import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./../../component/header/index";
import { useSelector } from "react-redux";
import VideoCard from "../../component/video/VideoCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearMessageSuccess,
  createOrGetChatVideo,
  getChannelVideo,
  getMessageChat,
  getVideoList,
  relatedToVideos,
  sendMessage,
} from "../../redux/feature/videolistSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Message from "../../component/video/Message";
import { IoSendSharp } from "react-icons/io5";
import { BiSmile } from "react-icons/bi";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import "animate.css/animate.min.css";
import { useRef } from "react";
import { addVideoHistory } from "../../redux/feature/authSlice";
import Skeleton from "react-loading-skeleton";
import { io } from "socket.io-client";

const socketRef = io.connect("http://localhost:8900");

export default function Details() {
  const navigate = useNavigate();
  const param = useParams();
  const { videos, channelVideo, chatVideo, loading } = useSelector(
    (state) => state.video
  );
  const { childrenActive, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [videoPlay, setVideoPlay] = useState(null);
  const [chatShow, setChatShow] = useState(false);
  const [valueMessage, setValueMessage] = useState("");

  const chatRef = useRef(null);
  const videoRef = useRef(null);
  const playRef = useRef(null);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatVideo?.messages]);

  useEffect(() => {
    dispatch(createOrGetChatVideo({ videoId: param.id }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socketRef.emit("join_room", param.id);
    dispatch(createOrGetChatVideo({ videoId: param.id }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (videos) {
      const findVideo = videos.find((v) => v.id === param.id);
      if (findVideo) {
        setVideoPlay(findVideo);
        dispatch(getChannelVideo({ idChannel: findVideo.snippet.channelId }));
        dispatch(relatedToVideos({ videoId: param.id }));
      }
    }
  }, [param]);

  const handleOffChat = () => {
    setChatShow((prev) => !prev);
  };

  const handleStoreVideo = () => {
    const findVideo = videos.find((v) => v.id === param.id);
    if (findVideo) {
      dispatch(
        addVideoHistory({
          childrenID: childrenActive?._id,
          userId: user?.google_id,
          videoId: param.id,
          thumbnail: findVideo.snippet.thumbnails.medium.url,
          title: videoPlay?.snippet.title,
        })
      );
    }
  };

  const handleSend = async () => {
    const messageChat = {
      chatId: chatVideo?._id,
      name: childrenActive?.name,
      picture: childrenActive?.picture,
      text: valueMessage,
    };
    dispatch(sendMessage(messageChat));
    const messageData = {
      room: param.id,
      message: valueMessage,
    };
    await socketRef.emit("send_message", messageData);
    setValueMessage("");
  };

  useEffect(() => {
    socketRef.on("receive_message", (data) => {
      dispatch(getMessageChat({ videoId: data.room }));
    });
  }, []);

  const handleChannel = (id) => {
    navigate(`/channel/${id}`);
  };

  return (
    <div className="video-detail-wrapper">
      <Header page="video-detail" />

      <Row className="video-play-wrapper">
        <Col xl={9} className="video-play-wrap">
          <div className="video-play-row">
            <div
              className={
                chatShow ? "video-play-left" : "video-play-left transform-video"
              }
            >
              <iframe
                width="100%"
                height="475"
                id="video-play"
                ref={videoRef}
                // onClick={handleStoreVideo}
                src={`https://www.youtube.com/embed/${param.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div
              className={
                chatShow ? "video-play-right" : "video-play-right show-chat"
              }
            >
              <div className="video-chat-live">
                <div className="video-chat-header">
                  <h5>Live chat</h5>
                  <div
                    className="video-chat-header-icon"
                    onClick={handleOffChat}
                  >
                    <HiOutlineArrowRightCircle />
                  </div>
                </div>
                <div className="video-chat-body">
                  {chatVideo?.messages?.map((m, index) => (
                    <Message
                      key={index}
                      picture={m.picture}
                      name={m.name}
                      text={m.text}
                      scrollRef={scrollRef}
                    />
                  ))}
                  
                </div>
                <div className="video-chat-footer">
                  <div className="video-chat-input-wrap">
                    <img
                      src={childrenActive?.picture}
                      className="message-img"
                      alt=""
                    />
                    <div className="video-chat-input">
                      <div className="message-user-name">
                        {childrenActive.name}
                      </div>
                      <div className="video-chat-input-effect">
                        <input
                          className="effect-2"
                          value={valueMessage}
                          onChange={(e) => setValueMessage(e.target.value)}
                          type="text"
                          placeholder="Nói gì đó..."
                        />
                        <span className="focus-border"></span>
                      </div>
                    </div>
                  </div>
                  <div className="video-chat-btn-wrap">
                    <div className="video-chat-btn-react">
                      <BiSmile />
                    </div>
                    <div className="video-chat-btn-send" onClick={handleSend}>
                      <IoSendSharp />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row className="video-play-bottom">
            <Col sm={12} className="video-info">
              <img
                className="video-info-avatar"
                src={
                  channelVideo &&
                  channelVideo[0]?.snippet?.thumbnails?.default?.url
                }
                alt=""
              />
              <div className="video-info-title">
                <span>{videoPlay?.snippet.title}</span>
                <p
                  className="video-info-description"
                  onClick={() => handleChannel(channelVideo[0]?.id)}
                >
                  {videoPlay?.snippet.channelTitle}
                </p>
              </div>

              <div className="video-info-btn-wrap">
                <Button variant="primary" onClick={handleStoreVideo}>
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xl={3} className="video-list-suggest scroll-bar">
          <Row xs={1} md={1} lg={1} className="g-4 video-list-suggest-row">
            {loading
              ? Array.from({ length: 8 }).map((ske, idx) => (
                  <Col key={idx}>
                    <Card className="video-skeleton-card">
                      <Skeleton
                        height="172.13px"
                        containerClassName="avatar-skeleton"
                        style={{ borderRadius: "4px", paddingTop: "10px" }}
                      />
                      <Card.Body>
                        <Skeleton
                          height="18px"
                          width="239px"
                          containerClassName="avatar-skeleton"
                          style={{ borderRadius: "4px", paddingTop: "10px" }}
                        />
                        <Skeleton
                          height="18px"
                          width="139px"
                          containerClassName="avatar-skeleton"
                          style={{ borderRadius: "4px", paddingTop: "10px" }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : videos?.map((video, idx) => (
                  <VideoCard video={video} key={video.id} />
                ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
