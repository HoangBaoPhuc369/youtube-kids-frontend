import { Button, Card, Container } from "react-bootstrap";
import Header from "../../component/header";
import "./style.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteChildByParent,
  deleteSecretPasswordChildren,
  deleteSecretPasswordChildrenForParent,
  Logout,
  setChildrenSelect,
} from "../../redux/feature/authSlice";

export default function ParentProfile({ page }) {
  const navigate = useNavigate();
  const { user, childrenSelected } = useSelector((state) => state.auth);
  const { _id } = user;
  const dispatch = useDispatch();
  const { id } = useParams();

  // const [childrenActive, setChildrenActive] = useState(null);

  useEffect(() => {
    dispatch(setChildrenSelect(id));
  }, [id]);

  const handleParentProfileSettings = (_id) => {
    navigate(`/admin/parentprofilesettings/${_id}`);
  };

  const handleParentSettings = (_id) => {
    navigate(`/admin/setting-profile/${_id}`);
  };
  const handleParentSettingAge = (_id) => {
    navigate("/admin/content-settings/");
  };

  const handleApproveContentForChild = (_id) => {
    navigate(`/admin/approve-content/`);
  };

  const handleAddProfile = () => {
    const admin = true;
    navigate(`/admin/add-profile/${admin}`);
  };

  const handleDeleteKey = () => {
    dispatch(
      deleteSecretPasswordChildrenForParent({
        childrenID: childrenSelected?._id,
        userId: user?.google_id,
        secretPassword: "",
      })
    );
  };

  const handleDelChild = () => {
    if (user?.childrens.length > 1) {
      dispatch(
        deleteChildByParent({
          childId: childrenSelected?._id,
          userId: user?.google_id,
          enough: true,
          navigate,
        })
      );
    } else {
      dispatch(
        deleteChildByParent({
          childId: childrenSelected?._id,
          userId: user?.google_id,
          enough: false,
          navigate,
        })
      );
      window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
      dispatch(Logout());
    }
  };

  return (
    <>
      <div className="admin-wrapper">
        <Header page={page} />
        <div className="parent-profile-wrapper">
          <div className="background-layer-left"></div>
          <Container className="container-center container-admin">
            <div className="d-flex flex-column align-items-center">
              <div className="text-center">
                <h3 className="header-admin">
                  Chỉnh sửa các tùy chọn cài đặt cho {childrenSelected?.name}
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
                          src={childrenSelected?.picture}
                        />
                      </div>
                      <div>
                        <Card.Title className="parent-setting-child-name">
                          {childrenSelected?.name}
                        </Card.Title>
                        <Card.Text>{childrenSelected?.year} tuổi</Card.Text>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="light"
                        onClick={() =>
                          handleParentSettings(childrenSelected?._id)
                        }
                        className="text-end text-color-edit"
                      >
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="my-2 w-50">
                <Card.Header>Cài đặt nội dung</Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      Trẻ nhỏ tuổi
                      <br />
                      <span className="font-size-accordion">
                        {childrenSelected?.content_settings === "kiddie"
                          ? "Nội dung đề xuất cho trẻ từ 3 - 10 tuổi"
                          : childrenSelected?.content_settings === "teen"
                          ? "Nội dung đề xuất cho trẻ từ 11 - 14 tuổi"
                          : "Nội dung được bạn phê duyệt cho trẻ"}
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
                </Card.Body>
              </Card>
              <Card className="my-2 w-50">
                <Card.Header>Cài đặt riêng tư</Card.Header>
                <Card.Body>
                  {childrenSelected?.content_settings === "self-approval" ? (
                    <>
                      <div className="d-flex justify-content-between">
                        <div>
                          Phê duyệt nội dung cho trẻ
                          <br />
                          <span className="font-size-accordion">
                            Hãy tự chọn lọc nội dung cho con của bạn
                          </span>
                        </div>
                        <Button
                          variant="light"
                          onClick={() => handleApproveContentForChild(_id)}
                          className="text-end text-color-edit"
                        >
                          Phê duyệt
                        </Button>
                      </div>
                      <hr />
                    </>
                  ) : null}
                  <div className="d-flex justify-content-between">
                    <div>Xóa hồ sơ này</div>
                    <Button
                      variant="light"
                      onClick={() => handleDelChild()}
                      className="text-end text-color-edit"
                    >
                      Xóa
                    </Button>
                  </div>

                  {childrenSelected?.secret_password ? (
                    <>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <div>Xóa mã bí mật</div>
                        <Button
                          variant="light"
                          onClick={() => handleDeleteKey()}
                          className="text-end text-color-edit"
                        >
                          Xóa
                        </Button>
                      </div>
                    </>
                  ) : null}
                </Card.Body>
              </Card>
              <Card className="my-2 w-50">
                <Card.Header>Hồ sơ</Card.Header>
                {user?.childrens?.map((children, index) => {
                  if (children?._id !== childrenSelected?._id) {
                    return (
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
                    );
                  } else {
                    return null;
                  }
                })}
                <div
                  className="mt-2 d-flex ml-2 justify-content-between align-items-center admin-add-profile-btn-wrap"
                  onClick={handleAddProfile}
                >
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
              </Card>
            </div>
          </Container>
          <div className="background-layer-right"></div>
        </div>
      </div>
    </>
  );
}
