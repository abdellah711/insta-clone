import { FC, MouseEventHandler, ReactNode } from "react"

interface Props {
    children?: ReactNode | ReactNode[];
    onClose?: () => void;
}

const Modal: FC<Props> = ({ children,onClose }) => {
    const handleClick:MouseEventHandler = e => {
        if(e.target === e.currentTarget){
            onClose?.()
        }
    }
    return (
        <div className="fixed inset-0 bg-black/20 grid place-items-center" onClick={handleClick}>
            <div className="w-[min(90vw,600px)] bg-white rounded-xl animate-show">
                {children}
            </div>
        </div>
    )
}

export default Modal