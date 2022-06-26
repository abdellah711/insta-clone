import Input from "components/AuthForm/Input"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next/types"
import { FormEventHandler, useEffect, useState } from "react"

const Facebook = () => {
    const [username, setUsername] = useState("")
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)


    const router = useRouter()

    useEffect(() => {
        if (username.length === 0) {
            setError(true)
            return
        }
        const controller = new AbortController()
        const checkUsername = async () => {
            try {
                const resp = await fetch('/api/auth/exist?username=' + username)
                if (resp?.ok) {
                    const { exists } = await resp.json()
                    setError(exists)
                }
            } catch { }

        }

        const id = setTimeout(checkUsername, 300)

        return () => {
            controller.abort()
            clearTimeout(id)
        }
    }, [username])


    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        setErrorMsg(null)
        try {
            const resp = await fetch('/api/auth/username', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username })
            })
            if (resp?.ok) {
                router.replace('/')
                return
            }
            const { message } = await resp.json()
            setErrorMsg(message ?? 'Something went wrong!')
            return
        } catch (err) {
            console.error(err)
        }
        setErrorMsg('Something went wrong!')
    }

    return (
        <form className="flex flex-col gap-3 max-w-md mx-auto h-screen justify-center text-gray-800" onSubmit={handleSubmit}>
            <p>Please choose a username</p>
            <Input type="text" placeholder="username" value={username} onChange={e => setUsername(e.currentTarget.value)} error={error} />
            <button className="bg-blue-500 p-2 disabled:bg-blue-300 text-white transition duration-150 rounded hover:bg-blue-600" disabled={error}>Continue</button>
            {errorMsg && <p className="text-red-600 border border-red-600 bg-red-50 select-none rounded p-2">{errorMsg}</p>}
        </form>
    )
}

export default Facebook