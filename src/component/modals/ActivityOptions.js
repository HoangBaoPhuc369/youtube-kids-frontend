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
                    Phuc Hoang vua xem video
                  </div>
                  <div className="option-activity-detail"></div>
                </div>
                <div className="option-activity-left-bottom">
                  <Form.Control type="text" placeholder="Normal text" />
                  <Button variant="primary">Primary</Button>
                </div>
              </div>
              <div className="option-activity-right">
                <Button variant="primary">Primary</Button>
                <Button variant="primary">Primary</Button>
              </div>
            </div>
          </div>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
