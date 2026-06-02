import "./Header.css";
import Button from "../../button/Button.tsx";

function Header() {
  return (
    <div className="header">
      <div className="navigation-buttons">
        <Button btn_label="Back" btn_classes="navigation-buttons-back-button" />
      </div>
      <Button btn_label="LOGOUT" btn_classes="logout-btn" />
    </div>
  )
}


export default Header
