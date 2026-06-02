import "./Button.css";

type ButtonProps = {
    btn_label: string;
    btn_classes: string;
};

function Button({
    btn_label,
    btn_classes,
}: ButtonProps) {
    return (
        <button className={btn_classes}>{btn_label}</button>
    )
}

export default Button
