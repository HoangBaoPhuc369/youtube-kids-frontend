import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import VideoCardHistory from "./VideoCardHistory";

export default function VideoHistory({ videos }) {
  return (
    <>
      <div className="video-wrapper">
        <Container>
          <Row xs={1} md={2} lg={4} className="g-4">
            {videos?.map((video, idx) => (
              <VideoCardHistory video={video} key={idx} />
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
