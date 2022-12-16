import { Button, Card, Container, Form } from "react-bootstrap";
import Header from "../../component/header";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChooseProfilePicture from "../../component/modals/ChooseProfilePicture";
import { MdModeEdit } from "react-icons/md";
import { listProfilePicture } from "../../data/listProfilePicture";
import validator from "validator";
import { updateChildrenProfileForParent } from "../../redux/feature/authSlice";

function SettingProfile() {
  const navigate = useNavigate();
  const { user, childrenSelected } = useSelector((state) => state.auth);
  const { picture, _id } = user;
  const dispatch = useDispatch();
  const { id } = useParams();

  const [modalShow, setModalShow] = useState(false);
  const [profilePictures, setProfilePictures] = useState(listProfilePicture);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [formData, setFormData] = useState({
    name: childrenSelected?.name,
    picture: childrenSelected?.picture,
    year: childrenSelected?.year,
    month: childrenSelected?.month,
  });

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

  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (validator.isEmpty(formData.name) || validator.isEmpty(formData.year)) {
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
      setDisableBtn(false);
      dispatch(
        updateChildrenProfileForParent({
          childId: childrenSelected?._id,
          userId: user?.google_id,
          formData: formData,
          navigate,
        })
      );
    }
  };

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  return (
    <>
      <div className="admin-wrapper">
        <Header />
        <div className="parent-profile-wrapper">
          <div className="background-layer-left"></div>
          <Container className="container-center container-admin default-height">
            <Card className="text-center login-form">
              <Card.Body className="">
                <Form onSubmit={submitFormData}>
                  <Form.Label className="login-form-title">
                    Chỉnh sửa hồ sơ của
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
                          className={
                            error2 ? "effect-2 error-input" : "effect-2"
                          }
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
                          className={
                            error ? "effect-2 error-input" : "effect-2"
                          }
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
          </Container>
          <div className="background-layer-right"></div>
        </div>
      </div>
    </>
  );
}

export default SettingProfile;
