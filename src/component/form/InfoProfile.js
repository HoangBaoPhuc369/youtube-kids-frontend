import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import { listProfilePicture } from "../../data/listProfilePicture";
import validator from "validator";

export default function InfoProfile({ nextStep }) {
  const [modalShow, setModalShow] = useState(false);
  const [profilePictures, setProfilePictures] = useState(listProfilePicture);
  const [pictureActive, setpictureActive] = useState("");
  const [error, setError] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const [formData, setFormData] = useState({
    kid_name: "",
    age: null,
    picture:
      "https://www.gstatic.com/ytkids/avatars/bck_avatar_kids_optimisticgiraffe_800_20170929.png",
    bMonth: "",
  });

  useEffect(() => {
    const activePicture = profilePictures.find(
      (picture) => picture.active === true
    );
    setpictureActive(activePicture.src);

    setFormData((prevState) => ({
      ...prevState,
      picture: activePicture.src,
    }));
  }, [profilePictures]);

  useEffect(() => {
    if (
      formData.kid_name === "" ||
      formData.age === null ||
      formData.age === ""
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [formData]);

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(formData.kid_name) ||
      validator.isEmpty(formData.age)
    ) {
      setDisableBtn(true);
    } else if (formData.age > 100 || formData.age <= 0) {
      setError(true);
    } else {
      nextStep();
      setDisableBtn(false);
    }
  };
  return (
    <>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body">
          <Form onSubmit={submitFormData}>
            <Form.Label className="login-form-title">Đã tạo hồ sơ!</Form.Label>
            <Form.Label className="login-form-text">
              Hãy chuyển đến phần "Chỉnh sửa hồ sơ" để thiết lập mã bí mật cho
              qweqsdeas. Mã này sẽ ngăn những trẻ khác trên thiết bị này truy
              cập vào hồ sơ đó. Bạn có thể đặt lại mã này bất cứ lúc nào.
            </Form.Label>

            <div className="login-form-wrapper">
              <div className="login-form-profile-img">
                <img src={pictureActive} alt="" />
              </div>
              <div className="login-form-info">
                <Form.Label className="login-form-profile-name">
                    phuc hoang
                </Form.Label>
                <Form.Label className="login-form-profile-age">
                    21 tuổi
                </Form.Label>
              </div>
              <MdModeEdit className="edit-icon-md" />
            </div>

            <div className="group-login-btn pad-10">
              <div className="group-login-btn-left">
                <Button variant="primary">Quay lại</Button>
              </div>
              <div className="btn-right">
                <Button variant="primary" className="btn-next" type="submit">
                  Next
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
