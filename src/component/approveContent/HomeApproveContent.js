import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import ContentSettingsToast from "../../component/toast/ContentSettingsToast";
import Video from "../../component/video";
import { searchVideos } from "../../redux/feature/videolistSlice";
import HeaderHomeAPC from "../header/HeaderHomeAPC";
import HeaderVideoDetailAdmin from "../header/HeaderVideoDetailAdmin";
import "./style.css";

export default function HomeApproveContent() {
  const { videos, loading, categoryAdmin, error } = useSelector(
    (state) => state.video
  );

  const { childrenSelected } = useSelector((state) => state.auth);

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
    dispatch(searchVideos({ key: keyword(categoryAdmin) }));
  }, [categoryAdmin]);

  return (
    <div className="home-wrapper">
      <HeaderHomeAPC />

      <div className="home-container">
        <div className="home-background-left"></div>
        <Video videos={videos} loading={loading} role="admin" error={error} />
        <div className="home-background-right"></div>
      </div>

      <ContentSettingsToast />

      <div className="footer"></div>
    </div>
  );
}
