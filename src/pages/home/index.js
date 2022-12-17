import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { searchVideos } from "../../redux/feature/videolistSlice";
import "./style.css";

export default function Home() {
  const { videos, loading, category } = useSelector((state) => state.video);

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
    dispatch(searchVideos({ key: keyword(category) }));
  }, [category]);

  return (
    <div className="home-wrapper">
      <Header page="home" />

      <div className="home-container">
        <div className="home-background-left"></div>
        <Video videos={videos} loading={loading} />
        <div className="home-background-right"></div>
      </div>

      <Footer />
    </div>
  );
}
