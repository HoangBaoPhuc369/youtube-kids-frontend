import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./style.css";
import { ImCheckmark } from "react-icons/im";

export default function ChooseProfilePictureSettings({
  show,
  onHide,
  listProfilePicture,
  setpictureActive,
}) {
  const handleChooseProfilePicture = (id) => {
    const newProfilePictures = listProfilePicture.map((picture) => {
        if (picture.id === id) {
            setpictureActive(picture.src);
            return picture.src;
        } else {
            return "";
        }
    });

    
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pick a profile picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row xs={1} md={4} className="g-4">
          {listProfilePicture.map((p, idx) => (
            <Col key={p.id}>
              <Card
                className="profile-picture-wrapper"
                onClick={() => handleChooseProfilePicture(p.id)}
              >
                <Card.Img className="profile-picture-img" src={p.src} />
                {p.active && (
                  <div className="profile-picture-overplay">
                    <ImCheckmark className="profile-picture-check" />
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
}
