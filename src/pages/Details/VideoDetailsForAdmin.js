import "./style.css";
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
  createOrGetChatVideo,
  getChannelVideo,
  getMessageChat,
  relatedToVideos,
  sendMessage,
} from "../../redux/feature/videolistSlice";
import Button from "react-bootstrap/Button";
import Message from "../../component/video/Message";
import { IoSendSharp } from "react-icons/io5";
import { BiSmile } from "react-icons/bi";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import "animate.css/animate.min.css";
import { useRef } from "react";
import { addVideoHistory } from "../../redux/feature/authSlice";
import Skeleton from "react-loading-skeleton";
import { io } from "socket.io-client";
import VideoPlayer from "../../component/video player";
import { Container } from "react-bootstrap";
import HeaderVideoDetailAdmin from "../../component/header/HeaderVideoDetailAdmin";

export default function VideoDetailsForAdmin({ page }) {
  const navigate = useNavigate();
  const param = useParams();
  const { videos, channelVideo, chatVideo, loading, relateVideos } =
    useSelector((state) => state.video);
  const { childrenActive, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [videoPlay, setVideoPlay] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    // dispatch(getChannelVideo({ idChannel: findVideo.snippet.channelId }));
  }, [param]);

  //   const handleChannel = (id) => {
  //     navigate(`/channel/${id}`);
  //   };

  return (
    <div className="video-detail-wrapper">
      <HeaderVideoDetailAdmin />

      <Container>
        <Row className="video-play-wrapper">
          <Col xl={12} className="video-play-wrap">
            <div className="video-play-row">
              <div className="video-play-left transform-video">
                <iframe
                  width="100%"
                  height="475"
                  id="video-play"
                  ref={videoRef}
                  src={`https://www.youtube.com/embed/${param.id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  rel="0"
                ></iframe>
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
                    //   onClick={() => handleChannel(channelVideo[0]?.id)}
                  >
                    {videoPlay?.snippet.channelTitle}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
