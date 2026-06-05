import "./Button.css";

type ButtonProps = {
    btn_label: string;
    btn_classes: string;
    isDisabled?: boolean;
    onClickFunc: () => void;
};

function Button({
    btn_label,
    btn_classes,
    isDisabled,
    onClickFunc
}: ButtonProps) {
    return (
        <button
            onClick={onClickFunc}
            disabled={isDisabled}
            className={btn_classes}
        >
            {btn_label}
        </button>
    )
}

export default Button
