import "./style.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
export default function Details() {
  const param = useParams();
  return (
    <div>
      {/* <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <h2>{param.id}</h2>
          </Col>
          <Col md="auto">Variable width content</Col>
          <Col xs lg="2">
            3 of 3
          </Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col md="auto">Variable width content</Col>
          <Col xs lg="2">
            3 of 3
          </Col>
        </Row>
      </Container> */}
      <h2>HUY</h2>
    </div>
  );
}
