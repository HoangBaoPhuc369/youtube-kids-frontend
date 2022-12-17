import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import "./style.css";
import {
  getPlaylistChannelVideos,
  getVideoList,
} from "../../redux/feature/videolistSlice";
import { Container } from "react-bootstrap";
import RubyIcon from "../../svgs/RubyIcon";
import { SlOptionsVertical } from "react-icons/sl";

export default function Channel() {
  const dispatch = useDispatch();

  const { childrenActive } = useSelector((state) => state.auth);

  const { videos, channelVideo, loading } = useSelector((state) => state.video);

  const handleNumberFormat = (number) => {
    return new Intl.NumberFormat("vi-VN", { notation: "compact" }).format(
      number
    );
  };

  useEffect(() => {
    dispatch(
      getPlaylistChannelVideos({
        key: channelVideo[0]?.contentDetails.relatedPlaylists.uploads,
      })
    );
  }, []);

  return (
    <div className="home-wrapper background-channel">
      <Header page={"channel"} />
      <div className="home-container">
        <div
          className="background-channel-wrapper"
          style={{
            backgroundImage: `url('${channelVideo[0]?.brandingSettings.image.bannerExternalUrl}')`,
          }}
        >
          <Container className="channel-container">
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    className="avatar-resize-channel"
                    alt="avatar-user-history"
                    src={channelVideo[0]?.snippet.thumbnails.medium.url}
                  />
                  <div className="profile-child-history-wrapper">
                    <h2 className="text-white font-bold fw-bold channel-title">
                      {channelVideo[0]?.snippet.title}
                    </h2>
                    <div className="text-white">
                      {handleNumberFormat(
                        channelVideo[0]?.statistics.subscriberCount
                      )}{" "}
                      người đăng ký
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="text-white bg-btn-sub d-flex align-items-center">
                    <RubyIcon />
                    <span>Đăng ký</span>
                  </button>
                  <SlOptionsVertical className="text-white fs-3 ms-4" />
                </div>
              </div>
            </div>
          </Container>
          <div className="background-overlay-channel"></div>
        </div>
        <Video videos={videos} loading={loading} />
      </div>
      <Footer />
    </div>
  );
}
