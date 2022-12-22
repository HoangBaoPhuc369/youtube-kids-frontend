import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import VideoPlayer from "../../component/video player";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import Message from "../../component/video/Message";
import { BiSmile } from "react-icons/bi";
import { IoSendSharp } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import VideoCard from "./../../component/video/VideoCard";
import { useSelector } from "react-redux";

export default function VideoDetailsWrap({
  childrenActive,
  chatShow,
  param,
  handleStoreVideo,
  handleOffChat,
  chatVideo,
  scrollRef,
  valueMessage,
  setValueMessage,
  handleSend,
  handleChannel,
  videoPlay,
  videoSelected,
  loading,
  relateVideos,
}) {
  const { channelVideo } = useSelector((state) => state.video);
  return (
    <>
      <Row className="video-play-wrapper">
        <Col
          xl={childrenActive.content_settings !== "self-approval" ? 9 : 12}
          className="video-play-wrap"
        >
          <div className="video-play-row">
            <div
              className={
                chatShow ? "video-play-left" : "video-play-left transform-video"
              }
            >
              <VideoPlayer id={param.id} handleStoreVideo={handleStoreVideo} />
            </div>
            {childrenActive.content_settings === "teen" ? (
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
            ) : null}
          </div>
          <Row className="video-play-bottom">
            <Col sm={12} className="video-info">
              <img
                className="video-info-avatar"
                src={
                  channelVideo !== null &&
                  channelVideo[0]?.snippet?.thumbnails?.default?.url
                }
                alt=""
                onClick={() =>
                  handleChannel(channelVideo !== null && channelVideo[0]?.id)
                }
              />
              <div className="video-info-title">
                <span
                  onClick={() =>
                    handleChannel(channelVideo !== null && channelVideo[0]?.id)
                  }
                >
                  {videoPlay?.snippet.title || videoSelected.title}
                </span>
                <p
                  className="video-info-description"
                  onClick={() =>
                    handleChannel(channelVideo !== null && channelVideo[0]?.id)
                  }
                >
                  {videoPlay?.snippet.channelTitle ||
                    (channelVideo !== null && channelVideo[0]?.snippet?.title)}
                </p>
              </div>

              <div className="video-info-btn-wrap"></div>
            </Col>
          </Row>
        </Col>
        {childrenActive.content_settings !== "self-approval" ? (
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
                            style={{
                              borderRadius: "4px",
                              paddingTop: "10px",
                            }}
                          />
                          <Skeleton
                            height="18px"
                            width="139px"
                            containerClassName="avatar-skeleton"
                            style={{
                              borderRadius: "4px",
                              paddingTop: "10px",
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                : relateVideos?.map((video, idx) => (
                    <VideoCard video={video} key={video.id} />
                  ))}
            </Row>
          </Col>
        ) : null}
      </Row>
    </>
  );
}
