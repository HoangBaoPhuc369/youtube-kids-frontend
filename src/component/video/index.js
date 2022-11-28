import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { HiDotsVertical } from "react-icons/hi";

export default function Video() {
  return (
    <>
      <div className="video-wrapper">
        <Row xs={1} md={2} lg={4} className="g-4">
          {Array.from({ length: 32 }).map((_, idx) => (
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://i.ytimg.com/vi/Swd_FIhkMB0/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCWps8eDIgHMlgvLGBxsPKr8rzAIA"
                />
                <Card.Body className="video-body">
                  <Card.Text className="video-title">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle id="dropdown-custom-1" className="video-btn-dropdown">
                      <HiDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                      <Dropdown.Item eventKey="1">Chặn video này</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
