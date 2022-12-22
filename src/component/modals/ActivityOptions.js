import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { blockVideo, clearBlockVideo } from "../../redux/feature/authSlice";

export default function ActivityOptions({ show, onHide }) {
  const { trackingSelected } = useSelector((state) => state.tracking);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleBlock = () => {
    if (trackingSelected?.type === "video") {
      dispatch(
        blockVideo({
          childId: trackingSelected?.childrenId,
          userId: user?.google_id,
          videoId: trackingSelected?.activity.videoId,
        })
      );
    }
  };

  const handleClearBlock = () => {
    if (trackingSelected?.type === "video") {
      dispatch(
        clearBlockVideo({
          childId: trackingSelected?.childrenId,
          userId: user?.google_id,
        })
      );
    }
  };

  const checkBlockVideo = (id) => {
    const findChildren = user?.childrens.find(
      (x) => x._id === trackingSelected?.childrenId
    );
    const findeVideo = findChildren.block_video.find((v) => v === id);

    console.log(findChildren, findeVideo);
    if (findeVideo) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row xs={1} md={4} className="g-4">
          <div className="option-activity-wrapper">
            <div className="option-activity-container">
              <div className="option-activity-left">
                <div className="option-activity-left-top">
                  <div className="option-activity-title">
                    <div className="option-activity-title-img">
                      <img src={trackingSelected?.picture} alt="alt" />
                    </div>
                    <div className="option-activity-title-name">
                      <div>{trackingSelected?.name}</div>
                      <div>{trackingSelected?.activity.content}</div>
                    </div>
                  </div>
                  <div className="option-activity-detail">
                    {trackingSelected?.type === "video" ? (
                      <iframe
                        width="100%"
                        height="100%"
                        id="video-play"
                        src={`https://www.youtube.com/embed/${trackingSelected?.activity.videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        rel="0"
                      ></iframe>
                    ) : (
                      <div className="option-activity-detail-profile">
                        <div className="option-activity-detail-profile-img">
                          <img
                            src={trackingSelected?.activity.new_picture}
                            alt="alt"
                          />
                        </div>
                        <div>{trackingSelected?.activity.new_name}</div>
                      </div>
                    )}

                    <div className="option-activity-detail-profile-btn">
                      {trackingSelected?.type === "video" ? (
                        <>
                          {checkBlockVideo(
                            trackingSelected?.activity.videoId
                          ) ? (
                            <div onClick={() => handleClearBlock()}>
                              Bỏ block video
                            </div>
                          ) : (
                            <div onClick={() => handleBlock()}>Block video</div>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                {trackingSelected?.type === "profile" ? (
                  <div className="option-activity-left-bottom">
                    <input type="text" placeholder="Normal text" />
                    <input type="button" value="Gui" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
