import { useRef, useEffect } from "react";
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

    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) {
                dialog.showModal();

                setTimeout(() => {
                    dialog.classList.add(
                        "open-create-dialog-class"
                    );
                }, 0);
            }
        }
        else {
            if (dialog.open) {
                dialog.classList.remove(
                    "open-create-dialog-class"
                );

                setTimeout(() => {
                    if (dialog.open) {
                        dialog.close();
                    }
                }, 300);
            }
        }
    }, [isOpen]);

    return (
        <dialog className="create-dialog-class" id="confirmation-dialog" ref={dialogRef}>
            <div className="model-div">
                <h3>Are you sure you want to <span>{message}</span></h3>
                <div className='confirmationDialog-div'>
                    <Button
                        btn_classes='confirmation-dialog-btn'
                        btn_label='No'
                        onClickFunc={onCancel}
                    />
                    <Button
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
