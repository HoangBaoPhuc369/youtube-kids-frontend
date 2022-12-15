import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Col } from "react-bootstrap";
import Placeholder from "react-bootstrap/Placeholder";

export default function Video({ videos, loading }) {
  // const { videos } = useSelector((state) => state.video);
  return (
    <>
      <div className="video-wrapper">
        <Container>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 video-row">
            {!loading ? videos?.map((video, idx) => (
              <VideoCard video={video} key={idx} />
            )) : null}
            {loading ? Array.from({ length: 8 }).map((ske, idx) => (
              <Col key={idx}>
                <Card className="video-card">
                  <Skeleton
                    height="172.13px"
                    containerClassName="avatar-skeleton"
                    style={{ borderRadius: "4px", paddingTop: "10px" }}
                  />
                  <Card.Body>
                    <Skeleton
                      height="18px"
                      width="239px"
                      containerClassName="avatar-skeleton"
                      style={{ borderRadius: "4px", paddingTop: "10px" }}
                    />
                    <Skeleton
                      height="18px"
                      width="139px"
                      containerClassName="avatar-skeleton"
                      style={{ borderRadius: "4px", paddingTop: "10px" }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            )) : null}
          </Row>
        </Container>
      </div>
    </>
  );
}
