import { useSelector } from "react-redux";
import "./style.css";

export default function Footer() {
  const { childrenSelected } = useSelector((state) => state.auth);

  return (
    <>
      <div className="footer">
        {childrenSelected?.content_settings === "self-approval" ? null : (
          <>
            <div className="footer-background"></div>
            <div className="footer-bottom"></div>
          </>
        )}
      </div>
    </>
  );
}
