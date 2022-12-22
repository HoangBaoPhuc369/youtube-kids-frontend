import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import ContentSettingsToast from "../../component/toast/ContentSettingsToast";
import Video from "../../component/video";
import VideoHistory from "../../component/video/videoHistory";
import { searchVideos } from "../../redux/feature/videolistSlice";
import "./style.css";

export default function Home({ page, socketRef }) {
  const { videos, loading, category, error } = useSelector(
    (state) => state.video
  );

  const { childrenActive } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const keyword = (state) => {
    switch (state) {
      case "Chương trình":
        return "chương trình trẻ em";
      case "Âm nhạc":
        return "video âm nhạc trẻ em";
      case "Học tập":
        return "video học tập cho trẻ em";
      case "Khám phá":
        return "video khám phá cho trẻ em";
      case "Trò chơi":
        return "video game cho trẻ em";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (childrenActive.content_settings !== "self-approval") {
      dispatch(searchVideos({ key: keyword(category) }));
    }
  }, [category, dispatch]);

  return (
    <div className="home-wrapper">
      <Header page={page} />

      <div className="home-container">
        <div className="home-background-left"></div>
        {childrenActive.content_settings !== "self-approval" ? (
          <Video socketRef={socketRef} videos={videos} loading={loading} error={error} />
        ) : (
          <VideoHistory socketRef={socketRef} videos={childrenActive.approvedContent} />
        )}
        <div className="home-background-right"></div>
      </div>

      <Footer />
    </div>
  );
}
