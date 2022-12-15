import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";

export default function Video({ videos}) {
  // const { videos } = useSelector((state) => state.video);
  return (
    <>
      <div className="video-wrapper">
        <Container>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 video-row">
            {videos?.map((video, idx) => (
              <VideoCard video={video} key={idx}  />
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
