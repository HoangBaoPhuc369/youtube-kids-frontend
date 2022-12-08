import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { getVideoList } from "../../redux/feature/videolistSlice";
import "./style.css";

export default function Home() {
  const { videos } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoList());
  }, []);

  return (
    <div className="home-wrapper">
      <Header />

      <div className="home-container">
        <Video videos={videos} />
      </div>

      <Footer />
    </div>
  );
}
