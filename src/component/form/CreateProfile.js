import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import ChooseProfilePicture from "../modals/ChooseProfilePicture";
import { listProfilePicture } from "../../data/listProfilePicture";
import validator from "validator";

export default function CreateProfile({
  nextStep,
  handleInputData,
  formData,
  setFormData,
  namePage,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [profilePictures, setProfilePictures] = useState(listProfilePicture);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);


  useEffect(() => {
    if (
      formData.name === "" ||
      formData.year === null ||
      formData.year === ""
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [formData]);

  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(formData.name) ||
      validator.isEmpty(formData.year)
    ) {
      setDisableBtn(true);
    } else if (
      (formData.year > 100 || formData.year <= 0) &&
      !validator.matches(formData.name, /^[a-zA-Z ]+$/)
    ) {
      setError(true);
      setError2(true);
    } else if (
      (formData.year > 100 || formData.year <= 0) &&
      validator.matches(formData.name, /^[a-zA-Z ]+$/)
    ) {
      setError(true);
      setError2(false);
    } else if (
      (formData.year <= 100 || formData.year > 0) &&
      !validator.matches(formData.name, /^[a-zA-Z ]+$/)
    ) {
      setError(false);
      setError2(true);
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
            {/* <Form.Label className="login-form-title">Tạo hồ sơ</Form.Label> */}
            <Form.Label className="login-form-title">{namePage}</Form.Label>
            <Form.Label className="login-form-text">
              Chúng tôi sẽ cố gắng điều chỉnh YouTube Kids cho phù hợp với độ
              tuổi của con bạn. Chỉ bạn và con bạn mới có thể nhìn thấy thông
              tin này.
            </Form.Label>

            <div className="login-form-wrapper">
              <div
                className="login-form-profile-img"
                onClick={() => setModalShow(true)}
              >
                <img src={formData.picture} alt="" />
                <span className="login-form-profile-img-edit">
                  <MdModeEdit />
                </span>
              </div>
              <div className="login-form-profile-info">
                <div className="input-effect">
                  <input
                    className={error2 ? "effect-2 error-input" : "effect-2"}
                    type="text"
                    value={formData.name}
                    placeholder="Kid's firstname*"
                    onChange={handleInputData("name")}
                  />
                  <span className="focus-border"></span>
                  {error2 && (
                    <span className="input-effect-error">
                      Enter a valid name
                    </span>
                  )}
                </div>

                <div className="input-effect">
                  <input
                    className={error ? "effect-2 error-input" : "effect-2"}
                    type="text"
                    value={formData.year}
                    onChange={handleInputData("year")}
                    placeholder="Age*"
                  />
                  <span className="focus-border"></span>
                  {error && (
                    <span className="input-effect-error">
                      Enter a valid age
                    </span>
                  )}
                </div>

                <div className="input-effect">
                  <input
                    className="effect-2"
                    type="text"
                    value={formData.month}
                    placeholder="Birth month"
                    onChange={handleInputData("month")}
                  />
                  <span className="focus-border"></span>
                </div>
              </div>
            </div>

            <div className="group-login-btn pad-10">
              <div className="group-login-btn-left"></div>
              <div className="btn-right">
                <Button
                  variant="primary"
                  disabled={disableBtn}
                  className="btn-next"
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <ChooseProfilePicture
        show={modalShow}
        onHide={() => setModalShow(false)}
        profilePictures={profilePictures}
        setFormData={setFormData}
      />
    </>
  );
}
