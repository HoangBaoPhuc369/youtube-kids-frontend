import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./style.css";
import VideoHistory from "../video/videoHistory";
import { useSelector } from "react-redux";

export default function PreviewVideo({ show, onHide }) {
  const { childrenSelected } = useSelector((state) => state.auth);

  const fakeVideos = [
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
    {
      videoId: "mV-uhZIYr8g",
      thumbnail: "https://i.ytimg.com/vi/mV-uhZIYr8g/mqdefault.jpg",
      title:
        "abVIDEO CHƯƠNG TRÌNH NÂNG CAO NHẬN THỨC NHẰM HẠN CHẾ LAO ĐỘNG TRẺ EM TRONG NGÀNH HÀNG CÀ PHÊ VIỆT NAMc",
    },
  ];

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Video đã phê duyệt
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row xs={1} md={4} className="g-4">
          <div className="preview-video-wrapper">
            <VideoHistory videos={fakeVideos} role="parent" />
          </div>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
