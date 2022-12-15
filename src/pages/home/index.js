import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { getVideoList, searchVideos } from "../../redux/feature/videolistSlice";
import "./style.css";

export default function Home() {
  const { videos } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchVideos({ key: "tư duy sáng tạo" }));
  }, []);

  return (
    <div className="home-wrapper">
      <Header category="Sáng tạo" />

      {/* <div className="home-container">
        <Video videos={videos}  />
      </div> */}

      <div className="home-container">
        <div className="home-background-left"></div>
        <Video videos={videos} />
        <div className="home-background-right"></div>
      </div>

      <Footer />
    </div>
  );
}
