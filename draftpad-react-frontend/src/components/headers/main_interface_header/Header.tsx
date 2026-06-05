import "./Header.css";
import Button from "../../button/Button.tsx";
import { useWorkspaceStore } from "../../../store/workspaceStore.ts";

const navigationPath = useWorkspaceStore( state => state.navigationPath );
const goBack = useWorkspaceStore( state=> state.actions.goBack );

function Header() {
  return (
    <div className="header">
      <div className="navigation-buttons">
        <Button
          btn_label="Back"
          btn_classes="navigation-buttons-back-button"
          isDisabled={navigationPath.length === 1 && navigationPath[0] === null}
          onClickFunc={goBack}
        />
      </div>
      <Button btn_label="LOGOUT" btn_classes="logout-btn" />
    </div>
  )
}


export default Header
