import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { searchVideos } from "../../redux/feature/videolistSlice";
import "./style.css";

export default function Education() {
  const { videos } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchVideos({ key: "học tập cho trẻ" }));
  }, []);

  return (
    <div className="home-wrapper">
      <Header category="Học tập" />

      <div className="home-container">
        <Video videos={videos}  />
      </div>

      <Footer />
    </div>
  );
}
