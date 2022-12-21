import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  addVideoByParent,
  removeVideoByParent,
} from "../../redux/feature/authSlice";
import { useEffect } from "react";
import { useState } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { setVideo } from "../../redux/feature/videolistSlice";

export default function VideoCard({ video, loading, role }) {
  const { childrenSelected, user } = useSelector((state) => state.auth);
  const [isApproved, setIsApproved] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  useEffect(() => {
    const findVideo = childrenSelected.approvedContent.find(
      (v) => v.videoId === video.id
    );
    if (findVideo) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [childrenSelected.approvedContent, video.id]);

  const linkTo = (id) => {
    dispatch(
      setVideo({
        videoId: id,
        channelId: video.snippet.channelId,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle
      })
    );

    navigate(`/admin/video-details/${id}`);
  };

  const handleSaveVideo = () => {
    const data = {
      childId: childrenSelected?._id,
      userId: user?.google_id,
      videoId: video.id,
      channelId: video.snippet.channelId,
      thumbnail: video.snippet.thumbnails.medium.url,
      title: video.snippet.title,
    };
    dispatch(addVideoByParent(data));
  };

  const handleRemoveVideo = () => {
    dispatch(
      removeVideoByParent({
        childId: childrenSelected?._id,
        userId: user?.google_id,
        videoId: video.id,
      })
    );
  };

  return (
    <>
      <Col>
        <Card className="video-card">
          <div className="video-link" onClick={() => linkTo(video.id)}>
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
          </div>

          {role === "admin" ? (
            <>
              {isApproved ? (
                <div
                  className="video-saved-content"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveVideo();
                  }}
                >
                  <Badge bg="success" className="video-saved-badge">
                    <RiCheckboxCircleLine />
                    Success
                  </Badge>
                </div>
              ) : (
                <div
                  className="video-add-content"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveVideo();
                  }}
                >
                  <AiOutlinePlusCircle />
                </div>
              )}
            </>
          ) : null}
        </Card>
      </Col>
    </>
  );
}
