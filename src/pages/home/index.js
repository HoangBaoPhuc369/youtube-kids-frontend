import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { searchVideos } from "../../redux/feature/videolistSlice";
import "./style.css";

export default function Home() {
  const { videos, loading } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchVideos({ key: "chương trình trẻ em" }));
  }, []);

  return (
    <div className="home-wrapper">
      <Header category="Sáng tạo" page="home" />

      <div className="home-container">
        <div className="home-background-left"></div>
        <Video videos={videos} loading={loading} />
        <div className="home-background-right"></div>
      </div>

      <Footer />
    </div>
  );
}
