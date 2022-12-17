import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { HiDotsVertical } from "react-icons/hi";

export default function VideoCard({ video, loading }) {
  function formatDuration(x) {
    if (x && !x.includes("DT") && !x.includes("P0")) {
      const toSecond = eval(
        x
          .replace("PT", "")
          .replace("H", "*3600+")
          .replace("M", "*60+")
          .replace("S", "+")
          .slice(0, -1)
      );
      const date = new Date(toSecond * 1000);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const seconds = date.getSeconds();

      var timeString;
      if (hours > 0) {
        timeString =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
      } else {
        timeString =
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
      }
      // const timeStr = date.toISOString().substring(11, 19);
      return timeString;
    }
  }

  return (
    <>
      <Col>
        <Link className="video-link" to={`/video-detail/${video.id}`}>
          <Card className="video-card">
            <Card.Img variant="top" src={video.snippet.thumbnails.medium.url} />
            {video.contentDetails?.duration ? (
              <Badge bg="dark" className="video-duration">
                {formatDuration(video.contentDetails?.duration)}
              </Badge>
            ) : null}

            <Card.Body className="video-body">
              <Card.Text className="video-title">
                {video.snippet.title}
              </Card.Text>
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
