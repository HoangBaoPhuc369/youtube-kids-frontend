import { toast } from "react-toastify";
import { bounce, Msg } from "../component/toast/ToastMessage";
import {
  allowChatState,
  allowSearchState,
  blockChatState,
  blockSearchState,
  blockVideoState,
  clearVideoState,
} from "../redux/feature/authSlice";

export const parentMsg = (socket, childrenActive, dispatch) => {
  socket?.on("get-block-video", (data) => {
    if (childrenActive?._id === data.childrenId) {
      toast(<Msg msg="video bị lock" />, {
        className: "notification_form",
        toastClassName: "notification_toast",
        bodyClassName: "notification_body",
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 2000,
        transition: bounce,
      });

      dispatch(blockVideoState(data.videoId));
    }
  });

  socket?.on("get-clear-block-video", (data) => {
    if (childrenActive?._id === data.childrenId) {
      toast(<Msg msg="video đã được bỏ lock." />, {
        className: "notification_form",
        toastClassName: "notification_toast",
        bodyClassName: "notification_body",
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 2000,
        transition: bounce,
      });

      dispatch(clearVideoState());
    }
  });

  socket?.on("get-block-search", (data) => {
    if (childrenActive?._id === data.childrenId) {
      toast(<Msg msg="Bạn đã bị chặn tìm kiếm." />, {
        className: "notification_form",
        toastClassName: "notification_toast",
        bodyClassName: "notification_body",
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 2000,
        transition: bounce,
      });

      dispatch(blockSearchState());
    }
  });

  socket?.on("get-allow-search", (data) => {
    if (childrenActive?._id === data.childrenId) {
      toast(<Msg msg="Bạn đã được bật tìm kiếm." />, {
        className: "notification_form",
        toastClassName: "notification_toast",
        bodyClassName: "notification_body",
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 2000,
        transition: bounce,
      });

      dispatch(allowSearchState());
    }
  });

  socket?.on("get-block-chat", (data) => {
    if (childrenActive?._id === data.childrenId) {
      toast(<Msg msg="Bạn đã bị chặn chat." />, {
        className: "notification_form",
        toastClassName: "notification_toast",
        bodyClassName: "notification_body",
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 2000,
        transition: bounce,
      });

      dispatch(blockChatState());
    }
  });

  socket?.on("get-allow-chat", (data) => {
    if (childrenActive?._id === data.childrenId) {
      toast(<Msg msg="Bạn đã được bật chat." />, {
        className: "notification_form",
        toastClassName: "notification_toast",
        bodyClassName: "notification_body",
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 2000,
        transition: bounce,
      });

      dispatch(allowChatState());
    }
  });
};
