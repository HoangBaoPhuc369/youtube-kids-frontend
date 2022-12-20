import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { HiDotsVertical } from "react-icons/hi";

export default function VideoCardHistory({ video, role }) {

  const checkRole = role === "parent" ? `` : `/video-detail/${video.videoId}`

  return (
    <>
      <Col>
        <Link className="video-link" to={`/video-detail/${video.videoId}`}>
          <Card className="video-card">
            <Card.Img variant="top" src={video.thumbnail} />

            <Card.Body className="video-body">
              <Card.Text className="video-title">{video.title}</Card.Text>
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                  id="dropdown-custom-1"
                  className="video-btn-dropdown"
                >
                  <HiDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors">
                  <Dropdown.Item eventKey="1">Chặn video này</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
}
