import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setVideo } from "../../redux/feature/videolistSlice";
import { useContext } from "react";
import SocketContext from "../../wssConnection/socketContext";

export default function VideoCardHistory({ video, role}) {
  const { childrenActive, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const socketRef = useContext(SocketContext);

  const hanldeLinkTo = () => {
    dispatch(
      setVideo({
        videoId: video.videoId,
        channelId: video.channelId,
        title: video.title,
        channelTitle: video.channelTitle,
      })
    );

    if (role === "parent") {
      navigate(`/admin/video-details/${video.videoId}`);
    } else {
      navigate(`/video-detail/${video.videoId}`);
    }

    const data = {
      name: childrenActive?.name,
      picture: childrenActive?.picture,
      type: "video",
      activity: {
        content: `${childrenActive?.name} vừa xem video ${video.title}`,
        videoId: video.videoId,
        channelId: video.channelId,
        new_name: "",
        new_picture: "",
      },
    };
    const date = Date.now();

    socketRef?.emit("watch_video", {
      data: data,
      date: date,
      room: user?.google_id,
    });
  };

  return (
    <>
      <Col>
        <div className="video-link" onClick={() => hanldeLinkTo()}>
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
        </div>
      </Col>
    </>
  );
}
