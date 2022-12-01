import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./style.css";
import { MdModeEdit } from "react-icons/md";
import ChooseProfilePicture from "../modals/ChooseProfilePicture";
import { listProfilePicture } from "../../data/listProfilePicture";
import validator from "validator";

export default function ChooseVideosByAges({nextStep}) {
    const [profilePictures, setProfilePictures] = useState(listProfilePicture);
    const [pictureActive, setpictureActive] = useState("");
    const [error, setError] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);
  
    return (
      <>
        <Card className="text-center login-form">
          <Card.Body className="login-form-body">
            <Form>
              <Form.Label className="login-form-title">Tạo hồ sơ</Form.Label>
              <Form.Label className="login-form-text">
                Chúng tôi sẽ cố gắng điều chỉnh YouTube Kids cho phù hợp với độ
                tuổi của con bạn. Chỉ bạn và con bạn mới có thể nhìn thấy thông
                tin này.
              </Form.Label>
  
              <div className="login-form-wrapper">
                <div
                  className="login-form-profile-img"
                >
                  <img src={pictureActive} alt="" />
                  <span className="login-form-profile-img-edit">
                    <MdModeEdit />
                  </span>
                </div>
                <div className="login-form-profile-info">
                  <div className="input-effect">
                    <input
                      className="effect-2"
                      type="text"
                      placeholder="Kid's firstname*"
                    />
                    <span className="focus-border"></span>
                  </div>
  
                  <div className="input-effect">
                    <input
                      className={error ? "effect-2 error-input" : "effect-2"}
                      type="number"
                      placeholder="Age*"
                    />
                    <span className="focus-border"></span>
                    {error && <span className="input-effect-error">Enter a valid age</span>}
                    
                  </div>
  
                  <div className="input-effect">
                    <input
                      className="effect-2"
                      type="text"
                      placeholder="Birth month"
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
      </>
    )
 
}
