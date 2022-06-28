import { DragEventHandler, FC, FormEventHandler, useEffect, useState } from "react"
import Modal from "./Modal"
import MediaIcon from 'public/assets/icons/media.svg'
import CloseIcon from 'public/assets/icons/close.svg'


interface Props {
    onClose?: () => void;
}

const NewPostModal: FC<Props> = (props) => {
    const [image, setImage] = useState<File | undefined | null>()
    const [description, setDescription] = useState('')
    const [dragging, setDragging] = useState(false)
    const [imageUrl, setImageUrl] = useState<any>('')
    const [message, setMessage] = useState<{ msg: string, error: boolean } | null>(null)

    useEffect(() => {
        if (image) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)
            setImageUrl(fileReader.result)
            const onLoad = (e: ProgressEvent<FileReader>) => setImageUrl(e.target?.result)
            fileReader.addEventListener('loadend', onLoad, { once: true })
            return () => {
                fileReader.abort()
            }
        }
        setImageUrl(null)
    }, [image])


    const handleDrop: DragEventHandler<HTMLDivElement> = e => {
        e.stopPropagation()
        e.preventDefault()
        setImage(e.dataTransfer.files?.[0])
        setDragging(false)
        return false
    }

    const handleDragOver: DragEventHandler<HTMLDivElement> = e => {
        e.preventDefault()
        setDragging(true)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        try {

            if (image) {
                const formData = new FormData()
                formData.append("image", image, image.name)
                formData.append("description", description)
                const resp = await fetch('/api/posts', {
                    method: 'POST',
                    body: formData,
                })
                if (resp?.ok) {
                    setMessage({ msg: 'Post shared successfully', error: false })
                    setDescription('')
                    setImage(null)
                    return
                }
            }
        } catch { }
        setMessage({ msg: 'Something went wrong! Please check your network', error: true })

    }


    return (
        <Modal {...props}>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <h1 className="text-center border-b border-gray-300 font-semibold py-2">Create new post</h1>
                {message &&
                    <p
                        className={`text-center p-2 mx-2 rounded ${message?.error ? 'text-red-500 bg-red-50' : 'text-green-500 bg-green-50'}`}>
                        {message.msg}
                    </p>
                }
                {image ?
                    //image preview
                    <div className="flex justify-center relative">
                        <CloseIcon
                            onClick={() => setImage(null)}
                            className="fill-gray-600 absolute w-9 cursor-pointer right-6 shadow-md rounded-full p-2 transition duration-200 hover:scale-105 hover:shadow-lg"
                        />
                        <img className="max-h-[40vh] h-full object-cover" src={imageUrl} />
                    </div>
                    :
                    //drop image area
                    <div
                        className={"flex flex-col items-center min-h-[40vh] justify-center gap-2 " + (dragging && "bg-gray-100")}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={() => setDragging(false)}
                    >
                        <MediaIcon className="w-24" color={dragging ? 'rgb(14 165 233)' : '#262626'} />
                        <p className="text-xl font-light">Drag photos here</p>
                        <label className="bg-sky-500 text-white py-1 px-3 rounded cursor-pointer mt-3">
                            Select from computer
                            <input type="file" className="file:hidden hidden" accept="image/*" onChange={(e) => setImage(e.currentTarget.files?.[0])} />
                        </label>
                    </div>

                }

                <textarea className="w-4/5 mx-auto border border-gray-300 rounded p-2" placeholder="Description..." value={description} onChange={e => setDescription(e.currentTarget.value)} required />
                <button className="self-end bg-sky-500 text-white py-1 px-6 rounded m-2 disabled:bg-sky-200" disabled={!imageUrl || description.length === 0}>Post</button>
            </form>

        </Modal>
    )
}

export default NewPostModal