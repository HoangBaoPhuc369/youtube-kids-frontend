import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { useSelector } from "react-redux";
import { searchVideos } from "./../../redux/feature/videolistSlice";
import "./style.css";
import { ToastContainer } from "react-toastify";
import { bounce } from "../../component/toast/ToastMessage";

export default function Search() {
  const { key } = useParams();
  const { videos, loading } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchVideos({ key: key }));
  }, [key]);
  return (
    <>
      <div className="search-wrapper">
        <Header />
        <div className="search-content">
          <div className="search-background-left"></div>
          {videos?.length > 0 ? (
            <Video videos={videos} loading={loading} />
          ) : (
            <>
              <div className="search-not-found"></div>
              <h3 style={{ textAlign: "center" }}>
                Hãy thử tìm kiếm nội dung khác!
              </h3>
            </>
          )}
          <div className="search-background-right"></div>
        </div>
      </div>
      <ToastContainer transition={bounce} limit={2} />
    </>
  );
}
