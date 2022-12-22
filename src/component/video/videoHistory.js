import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import VideoCardHistory from "./VideoCardHistory";

export default function VideoHistory({ videos, role, socketRef }) {
  return (
    <>
      <div className="video-wrapper">
        <Container>
          <Row xs={1} md={2} lg={4} className="g-4 video-row">
            {videos.length > 0 ? (
              videos?.map((video, idx) => (
                <VideoCardHistory video={video} key={idx} role={role} />
              ))
            ) : (
              <div className="video-error">
                <div className="video-not-found"></div>
                <h3 style={{ textAlign: "center" }}>Chưa có video nào được phê duyệt cho bạn !</h3>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}
