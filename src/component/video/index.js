import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import VideoCard from "./VideoCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Col } from "react-bootstrap";

export default function Video({ videos, loading, role, error }) {
  return (
    <>
      <div className="video-wrapper">
        <Container>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 video-row">
            {!loading && !error
              ? videos?.map((video, idx) => (
                  <VideoCard video={video} key={idx} role={role} />
                ))
              : null}
            {loading ? (
              Array.from({ length: 8 }).map((ske, idx) => (
                <Col key={idx}>
                  <Card className="video-skeleton-card">
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
              ))
            ) : (
              <>
                <div className="video-error">
                  <div className="video-not-found"></div>
                  <h3 style={{ textAlign: "center" }}>{error}</h3>
                </div>
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}
