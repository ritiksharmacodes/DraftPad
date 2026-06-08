import { useState } from "react";
import "./Header.css";
import Button from "../../button/Button.tsx";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog/ConfirmationDialog.tsx";
import { useWorkspaceStore } from "../../../store/workspaceStore.ts";
import { useAuthStore } from "../../../store/authStore.ts";


function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigationPath = useWorkspaceStore(state => state.navigationPath);
  const goBack = useWorkspaceStore(state => state.actions.goBack);
  const logout = useAuthStore(state => state.actions.logout);

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
      <Button
        btn_label="LOGOUT"
        btn_classes="logout-btn"
        onClickFunc={() => setIsDialogOpen(true)}
      />

      <ConfirmationDialog
        isOpen={isDialogOpen}
        message={`logout?`}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={logout}
      />
    </div>
  )
}


export default Header
