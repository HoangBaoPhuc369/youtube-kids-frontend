import { useSelector } from "react-redux";
import "./style.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";
import PreviewVideo from "../modals/PreviewVideo";
import { useNavigate } from "react-router-dom";

export default function ContentSettingsToast() {
  const { childrenSelected } = useSelector((state) => state.auth);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleDone = () => {
    navigate(`/admin/parentprofilesettings/${childrenSelected?._id}`);
  };

  return (
    <>
      <div className="content-setting-toast-wrap">
        <div className="content-setting-toast">
          <div className="content-setting-toast-left">
            <div className="content-setting-toast-text">
              Nhấn vào <AiFillPlusCircle /> để phê duyệt nội dung
            </div>
          </div>

          <div className="content-setting-toast-right">
            <div
              className="content-setting-toast-btn"
              onClick={() => setModalShow(true)}
            >
              Xem trước
            </div>
            <div
              className="content-setting-toast-btn"
              onClick={() => handleDone()}
            >
              Xong
            </div>
          </div>
        </div>
      </div>

      <PreviewVideo
        show={modalShow}
        videos={childrenSelected?.approvedContent}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
