import { Form, Card, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { MdLock } from "react-icons/md";
import Sidebar from "../sidebar";
import OffCanvas from "../sidebar/offcanva";

export default function ProfileOptions() {
  const { user } = useSelector((state) => state.auth);
  const { listChildrens } = useSelector((state) => state.children);

  const fakeChildrens = [
    {
      _id: "6390a342cd6bf463770a0a96",
      parentId: "109149295921202997282",
      name: "phuc",
      year: "20",
      month: "",
      content_settings: "teen",
      picture:
        "https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_gumi_800_20170929.png",
      videos: [],
      historyWatchVideo: [
        {
          videoId: "R2-S9DuBjvU",
          thumbnail:
            "https://yt3.ggpht.com/fN3aYz4vod1C-HfCzR4oV0UfG46jDdxWAUwIrhqLSaOScSpP-rPNjMFtcLBxteMgF0CsKG8g-g=s88-c-k-c0x00ffffff-no-rj",
          title:
            "Trận Bán kết 2: Họa mi, TLK Dragon và Sáng tạo 1 | Cuộc thi Sơ đồ Tư duy VN 2022",
          _id: "63918bb07c3f816ca0a023cb",
        },
      ],
      __v: 0,
    },
    {
      _id: "6390a342cd6bf463770a0a96",
      parentId: "109149295921202997282",
      name: "phuc",
      year: "20",
      month: "",
      content_settings: "teen",
      picture:
        "https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_gumi_800_20170929.png",
      videos: [],
      historyWatchVideo: [
        {
          videoId: "R2-S9DuBjvU",
          thumbnail:
            "https://yt3.ggpht.com/fN3aYz4vod1C-HfCzR4oV0UfG46jDdxWAUwIrhqLSaOScSpP-rPNjMFtcLBxteMgF0CsKG8g-g=s88-c-k-c0x00ffffff-no-rj",
          title:
            "Trận Bán kết 2: Họa mi, TLK Dragon và Sáng tạo 1 | Cuộc thi Sơ đồ Tư duy VN 2022",
          _id: "63918bb07c3f816ca0a023cb",
        },
      ],
      __v: 0,
    },
    {
      _id: "6390a342cd6bf463770a0a96",
      parentId: "109149295921202997282",
      name: "phuc",
      year: "20",
      month: "",
      content_settings: "teen",
      picture:
        "https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_gumi_800_20170929.png",
      videos: [],
      historyWatchVideo: [
        {
          videoId: "R2-S9DuBjvU",
          thumbnail:
            "https://yt3.ggpht.com/fN3aYz4vod1C-HfCzR4oV0UfG46jDdxWAUwIrhqLSaOScSpP-rPNjMFtcLBxteMgF0CsKG8g-g=s88-c-k-c0x00ffffff-no-rj",
          title:
            "Trận Bán kết 2: Họa mi, TLK Dragon và Sáng tạo 1 | Cuộc thi Sơ đồ Tư duy VN 2022",
          _id: "63918bb07c3f816ca0a023cb",
        },
      ],
      __v: 0,
    },
    {
      _id: "6390a342cd6bf463770a0a96",
      parentId: "109149295921202997282",
      name: "phuc",
      year: "20",
      month: "",
      content_settings: "teen",
      picture:
        "https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_gumi_800_20170929.png",
      videos: [],
      historyWatchVideo: [
        {
          videoId: "R2-S9DuBjvU",
          thumbnail:
            "https://yt3.ggpht.com/fN3aYz4vod1C-HfCzR4oV0UfG46jDdxWAUwIrhqLSaOScSpP-rPNjMFtcLBxteMgF0CsKG8g-g=s88-c-k-c0x00ffffff-no-rj",
          title:
            "Trận Bán kết 2: Họa mi, TLK Dragon và Sáng tạo 1 | Cuộc thi Sơ đồ Tư duy VN 2022",
          _id: "63918bb07c3f816ca0a023cb",
        },
      ],
      __v: 0,
    },
    {
      _id: "6390a342cd6bf463770a0a96",
      parentId: "109149295921202997282",
      name: "phuc",
      year: "20",
      month: "",
      content_settings: "teen",
      picture:
        "https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_gumi_800_20170929.png",
      videos: [],
      historyWatchVideo: [
        {
          videoId: "R2-S9DuBjvU",
          thumbnail:
            "https://yt3.ggpht.com/fN3aYz4vod1C-HfCzR4oV0UfG46jDdxWAUwIrhqLSaOScSpP-rPNjMFtcLBxteMgF0CsKG8g-g=s88-c-k-c0x00ffffff-no-rj",
          title:
            "Trận Bán kết 2: Họa mi, TLK Dragon và Sáng tạo 1 | Cuộc thi Sơ đồ Tư duy VN 2022",
          _id: "63918bb07c3f816ca0a023cb",
        },
      ],
      __v: 0,
    },
  ];

  return (
    <>
      <div className="profile-options-wrapper">
        <div className="loading-background-left"></div>
        <div className="profile-options-header">
          <OffCanvas />
        </div>
        <div className="profile-options-body">
          <div className="profile-options-body-title">Chọn hồ sơ</div>
          <div className="profile-options-body--sub-title">
            Ai hiện đang sử dụng YouTube Kids?
          </div>

          <div className="profile-options-body-item-wrapper">
            <Container>
              <Row
                xs={1}
                md={2}
                lg={4}
                className={fakeChildrens?.length < 4 ? " flex-center" : ""}
              >
                {fakeChildrens?.map((children, idx) => (
                  <Col key={children?._id}>
                    <Card className="list-profile-form-card profile-options">
                      <Card.Img
                        variant="top"
                        className="list-profile-form-card-img"
                        src={children.picture}
                      />
                      <Card.Body className="list-profile-form-body">
                        <Card.Title className="list-profile-form-card-text">
                          {children.name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
        <div className="loading-background-right"></div>
      </div>
    </>
  );
}
