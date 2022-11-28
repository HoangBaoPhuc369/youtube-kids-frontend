import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { getVideoList } from "../../redux/feature/videolistSlice";
import "./style.css";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoList());
  }, [])

  return (
    <div className="home-wrapper">
      <Header />

      <div className="home-container">
        <Video />
      </div>

      <Footer />
    </div>
  );
}
