import "../index.css";
import "./ConfirmationDialog.css";
import Button from '../../button/Button.tsx';

type ConfirmationDialogProps = {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

function ConfirmationDialog({
    isOpen,
    message,
    onConfirm,
    onCancel,
}: ConfirmationDialogProps) {
    return (
        <dialog className="create-dialog-class" id="confirmation-dialog">
            <div className="model-div">
                <h3>Are you sure you want to <span>{message}</span></h3>
                <div className='confirmationDialog-div'>
                    <Button
                        id="cancel-confirmation"
                        btn_classes='confirmation-dialog-btn'
                        btn_label='No'
                        onClickFunc={onCancel}
                    />
                    <Button
                        id="okay-confirmation"
                        btn_classes='confirmation-dialog-btn'
                        btn_label='Yes'
                        onClickFunc={onConfirm}
                    />
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmationDialog
