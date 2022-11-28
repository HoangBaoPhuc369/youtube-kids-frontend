import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";

export default function Video() {
  const { videos } = useSelector((state) => state.video);

  function formatDuration(x) {
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
  return (
    <>
      <div className="video-wrapper">
        <Container>
          <Row xs={1} md={2} lg={4} className="g-4">
            {videos?.map((video, idx) => (
              <Col key={video.id}>
                <Card className="video-card">
                  <Card.Img
                    variant="top"
                    src={video.snippet.thumbnails.medium.url}
                  />
                  <Badge bg="dark" className="video-duration">
                    {formatDuration(video.contentDetails.duration)}
                  </Badge>
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
                        <Dropdown.Item eventKey="1">
                          Chặn video này
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
