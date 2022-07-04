import { CSSProperties, FC, MouseEventHandler, ReactNode } from "react"

interface Props {
    children?: ReactNode | ReactNode[];
    onClose?: () => void;
    style?: CSSProperties;
}

const Modal: FC<Props> = ({ children, onClose, style }) => {
    const handleClick: MouseEventHandler = e => {
        if (e.target === e.currentTarget) {
            onClose?.()
        }
    }
    return (
        <div className="fixed inset-0 bg-black/20 grid place-items-center z-50" onClick={handleClick}>
            <div className="w-4/5 max-w-2xl bg-white rounded-lg animate-show overflow-hidden "  style={style} role="dialog">
                {children}
            </div>
        </div>
    )
}

export default Modal