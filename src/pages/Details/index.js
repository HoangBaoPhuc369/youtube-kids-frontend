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
  getChannelVideo,
  getVideoList,
} from "../../redux/feature/videolistSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Message from "../../component/video/Message";
import { IoSendSharp } from "react-icons/io5";
import { BiSmile } from "react-icons/bi";
import {
  HiOutlineArrowRightCircle,
  HiOutlineArrowLeftCircle,
} from "react-icons/hi2";
import "animate.css/animate.min.css";
import { useRef } from "react";

export default function Details() {
  const param = useParams();
  const { videos } = useSelector((state) => state.video);
  const { channelVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const [videoPlay, setVideoPlay] = useState(null);
  const [chatShow, setChatShow] = useState(true);

  const chatRef = useRef(null);

  useEffect(() => {
    dispatch(getVideoList());
    dispatch(getChannelVideo());
  }, []);

  useEffect(() => {
    if (videos) {
      const findVideo = videos.find((v) => v.id === param.id);
      if (findVideo) {
        setVideoPlay(findVideo);
        dispatch(getChannelVideo({ idChannel: findVideo.snippet.channelId }));
      }
    }
  }, [videos]);

  const handleOffChat = () => {
    // chatRef.current.classList.add(
    //   "animate__animated",
    //   "animate__slideOutRight"
    // );
    chatRef.current.className = "video-play col-lg-4 animate__animated animate__slideOutRight"
    setChatShow(false);
  };

  const handleShowChat = () => {
    chatRef.current.className = "video-play col-lg-4 animate__animated animate__slideInRight"
    setChatShow(false);
  };

  return (
    <>
      <Header page="video-detail" />

      <Row className="video-wrapper">
        <Col sm={9} className="video-play-wrap">
          <Row className="video-play-row">
            <Col lg={8} className="video-play">
              <iframe
                width="100%"
                height="475"
                src={`https://www.youtube.com/embed/${param.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
            {/* animate__animated animate__fadeInRight */}
            <Col lg={4} className="video-play" ref={chatRef}>
              <div className="video-chat-live">
                <div className="video-chat-header">
                  <h5>Live chat</h5>
                  <div onClick={handleOffChat}>
                    <HiOutlineArrowRightCircle />
                  </div>
                </div>
                <div className="video-chat-body">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <Message key={index} />
                  ))}
                </div>
                <div className="video-chat-footer">
                  <div className="video-chat-input-wrap">
                    <img
                      src="https://res.cloudinary.com/da2c2nw4m/image/upload/v1667266412/facebook-clone/PhucHoang_Ns8BbJoJo/profile_pictures/hkutn8wxbqdhh47nsg2c.jpg"
                      className="message-img"
                      alt=""
                    />
                    <div className="video-chat-input">
                      <div className="message-user-name">Phuc Hoang</div>
                      <div className="video-chat-input-effect">
                        <input
                          className="effect-2"
                          type="text"
                          placeholder="Nói gì đó..."
                        />
                        <span className="focus-border"></span>
                      </div>
                    </div>
                  </div>
                  <div className="video-chat-btn-wrap">
                    <BiSmile />
                    <IoSendSharp />
                  </div>
                </div>
              </div>
            </Col>

            <div className="video-chat-zoom-out">
              <div onClick={handleShowChat}>
                <HiOutlineArrowLeftCircle />
              </div>
              <div className="video-chat-zoom-out-text">Live chat</div>
            </div>
          </Row>
          <Row>
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
                <p className="video-info-description">
                  {videoPlay?.snippet.channelTitle}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={3} className="video-list-suggest scroll-bar">
          <Row xs={1} md={1} lg={1} className="g-4 video-list-suggest-row">
            {videos?.map((video, idx) => (
              <VideoCard video={video} key={video.id} />
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}
