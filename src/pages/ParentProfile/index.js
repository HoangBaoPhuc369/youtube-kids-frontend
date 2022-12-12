import { Button, Card, Container } from "react-bootstrap";
import Header from "../../component/header";
import "./style.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ParentProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { picture, _id } = user;
  const { listChildrens } = useSelector((state) => state.children);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [childrens, setChildrens] = useState(listChildrens);
  const [childrenActive, setChildrenActive] = useState(null);

  useEffect(() => {
    const findChildren = listChildrens?.find((children) => children._id === id);
    if (findChildren) {
      console.log(findChildren);
      setChildrenActive(findChildren);
    }
  }, [id]);

  const handleParentProfileSettings = (_id) => {
    navigate(`/admin/parentprofilesettings/${_id}`);
  };

  const handleParentSettings = (_id) => {
    navigate(`/admin/setting-profile/${_id}`);
  };
  const handleParentSettingAge = (_id) => {
    navigate(`/admin/setting-age/${_id}`);
  };

  return (
    <>
      <div className="admin-wrapper">
        <Header />
        <div className="parent-profile-wrapper">
          <div className="background-layer-left"></div>
          <Container className="container-center container-admin">
            <div className="d-flex flex-column align-items-center">
              <div className="home-container text-center">
                <h3 className="header-admin">
                  Chỉnh sửa các tùy chọn cài đặt cho {childrenActive?.name}
                </h3>
              </div>
              <Card className="my-2 w-50">
                <Card.Header>Tài khoản</Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div>
                        <img
                          className="avatar-resize-setting-parent"
                          alt="avatar-user"
                          src={childrenActive?.picture}
                        />
                      </div>
                      <div>
                        <Card.Title className="parent-setting-child-name">
                          {childrenActive?.name}
                        </Card.Title>
                        <Card.Text>{childrenActive?.year} tuổi</Card.Text>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="light"
                        onClick={() => handleParentSettings(_id)}
                        className="text-end text-color-edit"
                      >
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="my-2 w-50">
                <Card.Header>Bước xác minh dành cho cha mẹ</Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      Trẻ nhỏ tuổi
                      <br />
                      <span className="font-size-accordion">
                        Nội dung đề xuất cho trẻ em từ 5 – 8 tuổi
                      </span>
                    </div>
                    <Button
                      variant="light"
                      onClick={() => handleParentSettingAge(_id)}
                      className="text-end text-color-edit"
                    >
                      Chỉnh sửa
                    </Button>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div>Xóa hồ sơ này</div>
                    <Button
                      variant="light"
                      // onClick={handleLogout}
                      className="text-end text-color-edit"
                    >
                      Xóa
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              <Card className="my-2 w-50">
                <Card.Header>Hồ sơ</Card.Header>
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
            </div>
          </Container>
          <div className="background-layer-right"></div>
        </div>
      </div>
    </>
  );
}
