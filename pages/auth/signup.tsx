import AuthForm, { RedirectCard } from "components/AuthForm"
import Input from "components/AuthForm/Input"
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react"


const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', fullname: '', username: '' })
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)


    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const resp = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const { message } = await resp.json()
            if (resp.ok) {
                console.log({ message })
                setIsLoading(false)
                return
            }
            setError(message)
        } catch (err) {
            setError("Something went wrong! please check your network and try again")
        }
        setIsLoading(false)
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md mx-auto flex-1">
                <AuthForm onSubmit={handleSubmit} submitTxt="Sign up" disabled={isLoading} error={error}>
                    <Input type="email" name="email" placeholder='email' onChange={handleChange} value={formData['email']} />
                    <Input type="text" name="fullname" placeholder='full name' onChange={handleChange} value={formData['fullname']} />
                    <Input type="username" name="username" placeholder='username' onChange={handleChange} value={formData['username']} />
                    <Input type="password" name="password" placeholder='password' onChange={handleChange} value={formData['password']} />
                </AuthForm>
                <RedirectCard login={false} />
            </div>
        </div>
    )
}



export default Signup