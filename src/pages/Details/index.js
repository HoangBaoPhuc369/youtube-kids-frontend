import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./../../component/header/index";
import { useSelector } from "react-redux";
import VideoCard from "../../component/video/VideoCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideoList } from "../../redux/feature/videolistSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Message from "../../component/video/Message";
import { IoSendSharp } from "react-icons/io5";
import { BiSmile } from "react-icons/bi";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";

export default function Details() {
  const param = useParams();
  const { videos } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoList());
  }, []);

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
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Col>
            <Col lg={4} className="video-play">
              <div className="video-chat-live">
                <div className="video-chat-header">
                  <h5>Live chat</h5>
                  <HiOutlineArrowRightCircle />
                </div>
                <div className="video-chat-body">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <Message />
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
                          placeholder="Birth month"
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
          </Row>
          <Row>
            <Col sm={12} className="video-info">
              <img
                className="video-info-avatar"
                src="https://res.cloudinary.com/da2c2nw4m/image/upload/v1667266412/facebook-clone/PhucHoang_Ns8BbJoJo/profile_pictures/hkutn8wxbqdhh47nsg2c.jpg"
                alt=""
              />
              <div className="video-info-title">
                <span>Video Title</span>
                <p className="video-info-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
