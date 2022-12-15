import { Accordion, Button, Card, Container, Dropdown } from "react-bootstrap";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Video from "../../component/video";
import "./style.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createSecretPassword, Logout } from "../../redux/feature/authSlice";
import { resetChildren } from "../../redux/feature/childrenSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { picture } = user;
  const dispatch = useDispatch();

  const [childrens, setChildrens] = useState(user?.childrens);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleLogout = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
    dispatch(Logout());
    dispatch(resetChildren());
  };
  const handleParentProfileSettings = (_id) => {
    navigate(`/admin/parentprofilesettings/${_id}`);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (password !== "" || password2 !== "") {
      if (password === password2) {
        dispatch(
          createSecretPassword({ userId: user?.google_id, secretPassword: password2 })
        );
        setPassword("");
        setPassword2("");
      }
    }
  };

  const handleTypeInput = (e, ref) => {
    console.log(ref);
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (ref === "password") {
        setPassword(e.target.value);
      } else if (ref === "confirmPassword") {
        setPassword2(e.target.value);
      }
    }
  };

  return (
    <>
      <div className="admin-wrapper">
        <Header />
        <div className="parent-profile-wrapper">
          <div className="background-layer-left"></div>
          <Container className="container-center container-admin">
            <div className="d-flex flex-column align-items-center">
              <div className="text-center">
                <h3 className="header-admin">Cài đặt dành cho cha mẹ</h3>
              </div>
              <Card className="my-2 w-50">
                <Card.Header>Tài khoản</Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div>
                        <img
                          className="avatar-resize"
                          alt="avatar-user"
                          src={picture}
                        />
                      </div>
                      <div className="admin-account-wrapper">
                        <Card.Title>{user?.name}</Card.Title>
                        <Card.Text>{user?.email}</Card.Text>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="primary"
                        onClick={handleLogout}
                        className="text-end admin-btn-logout"
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="my-2 w-50">
                <Card.Header>Con của tôi</Card.Header>
                <Card.Body>
                  {childrens?.map((children, index) => (
                    <div
                      key={children._id}
                      className="d-flex justify-content-between align-items-center admin-children-item"
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            className="avatar-resize"
                            alt="avatar-user"
                            src={children.picture}
                          />
                        </div>
                        <div>
                          <Card.Title>{children.name}</Card.Title>
                        </div>
                      </div>
                      <div>
                        <Button
                          variant="light"
                          className="text-end"
                          onClick={() =>
                            handleParentProfileSettings(children._id)
                          }
                        >
                          <AiOutlineArrowRight />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 d-flex ml-2 justify-content-between align-items-center">
                    <div className="mt-2 d-flex align-items-center">
                      <div className="card-divider">
                        <BsPlus className="text-white text-center text-size-plus" />
                      </div>
                      <Card.Text className="mx-2">Thêm hồ sơ khác</Card.Text>
                    </div>
                    <div>
                      <Button variant="light" className="text-end">
                        <AiOutlineArrowRight />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="my-2 w-50">
                <Card.Header>Bước xác minh dành cho cha mẹ</Card.Header>
                <Card.Body>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div>
                          Tạo mật mã tùy chỉnh
                          <br />
                          <span className="font-size-accordion">
                            Mật mã này dùng để truy cập vào phần cài đặt dành
                            cho cha mẹ
                          </span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="">
                        <form className="mb-3" onSubmit={handlePassword}>
                          <div className="d-flex">
                            <div className="w-100 me-5">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Nhập mật mã
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={password}
                                onChange={(e) => handleTypeInput(e, "password")}
                                id="exampleFormControlInput1"
                                placeholder="Nhập mật mã"
                                maxLength={4}
                              />
                            </div>
                            <div className="w-100 me-5">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Nhập lại mật mã
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                value={password2}
                                onChange={(e) =>
                                  handleTypeInput(e, "confirmPassword")
                                }
                                rows="3"
                                placeholder="Nhập lại mật mã"
                                maxLength={4}
                              />
                            </div>
                          </div>
                          {user?.secret_password ? (
                            <>
                              <button
                                type="submit"
                                className="mt-2 color-button-submit"
                              >
                                Thay đổi mật mã
                              </button>
                              <button
                                type="submit"
                                className="mt-2 color-button-submit"
                              >
                                Xóa
                              </button>
                            </>
                          ) : (
                            <button
                              type="submit"
                              className="mt-2 color-button-submit"
                            >
                              Gửi
                            </button>
                          )}
                        </form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </div>
          </Container>
          <div className="background-layer-right"></div>
        </div>
      </div>
    </>
  );
}
