import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./style.css";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

export default function ActivityOptions({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
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
                      <img
                        src="https://res.cloudinary.com/same-cloud/image/upload/v1660639364/faceclone/picture/1_vkf6n4.jpg"
                        alt="alt"
                      />
                    </div>
                    <div className="option-activity-title-name">
                      <div>Luan hehe</div>
                      <div>Luan hehe dang xem video</div>
                    </div>
                  </div>
                  <div className="option-activity-detail">
                    {/* <iframe
                      width="100%"
                      height="100%"
                      id="video-play"
                      // ref={videoRef}
                      src={`https://www.youtube.com/embed/-hI2TA8uqyI`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      rel="0"
                    ></iframe> */}
                    <div className="option-activity-detail-profile">
                      <div className="option-activity-detail-profile-img">
                        <img
                          src="https://res.cloudinary.com/same-cloud/image/upload/v1660639365/faceclone/picture/pexels-andrea-piacquadio-845457_wrixfv.jpg"
                          alt="alt"
                        />
                      </div>
                      <div>Luan Minh</div>
                    </div>
                  </div>
                </div>
                <div className="option-activity-left-bottom">
                  <input type="text" placeholder="Normal text" />
                  <input type="button" value="Gui" />
                </div>
              </div>
              <div className="option-activity-right">
                {/* <Button variant="primary">Primary</Button> */}
                {/* <Button variant="primary">Primary</Button> */}
                <div>Primary</div>
                <div>Primary</div>
              </div>
            </div>
          </div>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
