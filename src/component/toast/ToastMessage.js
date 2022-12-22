import { ToastContainer, toast, cssTransition } from "react-toastify";

export const Msg = ({ msg }) => (
  <>
    <div className="notification-box_header">
      <span>{msg}</span>
    </div>
    <div className="notification-box_container">
      <div className="notification-picture">
      </div>
      <div className="notification-information">
        <div className="notification-text">
        </div>
      </div>
    </div>
  </>
);

export const bounce = cssTransition({
  enter: "animate__animated animate__bounceInUp",
  exit: "animate__animated animate__bounceOutDown",
});

export const CloseButton = ({ closeToast }) => (
  <div className="small_circle" onClick={closeToast}>
    <i className="exit_icon"></i>
  </div>
);
