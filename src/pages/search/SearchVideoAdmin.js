import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import { useSelector } from "react-redux";

import "./style.css";
import HeaderSearchAdmin from "./HeaderSearchAdmin";
import { searchVideosForAdmin } from "../../redux/feature/videolistSlice";
import ContentSettingsToast from "../../component/toast/ContentSettingsToast";

export default function Search() {
  const { key } = useParams();
  const { videos, loading, error } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchVideosForAdmin({ key: key }));
  }, [key, dispatch]);
  return (
    <>
      <div className="search-wrapper">
        <HeaderSearchAdmin />
        <div className="search-content">
          <div className="search-background-left"></div>
          {videos?.length > 0 ? (
            <Video
              videos={videos}
              error={error}
              loading={loading}
              role="admin"
              type="search"
            />
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

        <ContentSettingsToast />
      </div>
    </>
  );
}
