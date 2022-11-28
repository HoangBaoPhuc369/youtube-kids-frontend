import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "./style.css";
import LockIcon from "../../svgs/LockIcon";
import useClickOutside from "../../utils/clickOutside";
import Button from "react-bootstrap/Button";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useClickOutside(sidebarRef, () => {
    setMenuOpen(false);
  });

  return (
    <div ref={sidebarRef}>
      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => handleStateChange(state)}
        right
        customBurgerIcon={<LockIcon />}
        width={456}
      >
        <div className="sidebar-container">
          <div className="sidebar-title">Chỉ dành cho cha mẹ</div>
          <div className="sidebar-subtitle">
            Vui lòng nhập câu trả lời chính xác để tiếp tục
          </div>
          <div className="sidebar-calculate">3 X 4 = ?</div>
          <div className="sidebar-input">
            <input type="text" placeholder="#" />
            <input type="text" placeholder="#" />
          </div>
          <div className="sidebar-button">
            <Button variant="primary" onClick={() => closeMenu()}>
              Gửi
            </Button>
          </div>
        </div>
      </Menu>
    </div>
  );
}
