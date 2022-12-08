import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { searchVideos } from "./../../redux/feature/searchSlice";
import { useSelector } from "react-redux";

export default function Search() {
  const { key } = useParams();
  const { videosSearch } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchVideos({ key: key }));
  }, []);
  return (
    <>
      <div className="search-wrapper">
        <Header />
        <div className="search-content">
          <Video videos={videosSearch} />
        </div>
        <Footer />
      </div>
    </>
  );
}
