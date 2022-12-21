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
import VideoDetailsWrap from "./VideoDetailsWrap";

const socketRef = io.connect("http://localhost:8900");

export default function Details({ page }) {
  const navigate = useNavigate();
  const param = useParams();
  const {
    videos,
    channelVideo,
    chatVideo,
    loading,
    relateVideos,
    videoSelected,
  } = useSelector((state) => state.video);
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
    const findVideo = videos?.find((v) => v.id === param.id);
    if (videos && findVideo) {
      setVideoPlay(findVideo);
    }
    if (childrenActive.content_settings !== "self-approval") {
      dispatch(relatedToVideos({ videoId: param.id }));
    }
    dispatch(
      getChannelVideo({
        idChannel: videoSelected?.channelId,
      })
    );
  }, [param]);

  const handleOffChat = () => {
    setChatShow((prev) => !prev);
  };

  const handleStoreVideo = () => {
    const findVideo = videos?.find((v) => v.id === param.id);
    const checkHistory = childrenActive.historyWatchVideo.find(
      (v) => v.videoId === param.id
    );
    if (findVideo && !checkHistory) {
      dispatch(
        addVideoHistory({
          childrenID: childrenActive?._id,
          userId: user?.google_id,
          videoId: param.id,
          channelId: channelVideo[0]?.id,
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
  console.log(childrenActive.content_settings);
  return (
    <div className="video-detail-wrapper">
      <Header page={page} />
      {childrenActive.content_settings !== "self-approval" ? (
        <VideoDetailsWrap
          childrenActive={childrenActive}
          chatShow={chatShow}
          param={param}
          handleStoreVideo={handleStoreVideo}
          handleOffChat={handleOffChat}
          chatVideo={chatVideo}
          scrollRef={scrollRef}
          valueMessage={valueMessage}
          setValueMessage={setValueMessage}
          handleSend={handleSend}
          channelVideo={channelVideo}
          handleChannel={handleChannel}
          videoPlay={videoPlay}
          videoSelected={videoSelected}
          loading={loading}
          relateVideos={relateVideos}
        />
      ) : (
        <Container>
          <VideoDetailsWrap
            childrenActive={childrenActive}
            chatShow={chatShow}
            param={param}
            handleStoreVideo={handleStoreVideo}
            handleOffChat={handleOffChat}
            chatVideo={chatVideo}
            scrollRef={scrollRef}
            valueMessage={valueMessage}
            setValueMessage={setValueMessage}
            handleSend={handleSend}
            channelVideo={channelVideo}
            handleChannel={handleChannel}
            videoPlay={videoPlay}
            videoSelected={videoSelected}
            loading={loading}
            relateVideos={relateVideos}
          />
        </Container>
      )}
    </div>
  );
}
