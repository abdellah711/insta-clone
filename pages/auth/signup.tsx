import AuthForm, { RedirectCard } from "components/AuthForm"
import Input from "components/AuthForm/Input"
import { useRouter } from "next/router"

import { ChangeEventHandler, FC, FocusEventHandler, FormEventHandler, useState } from "react"


const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', fullname: '', username: '' })
    const [valideData, setValideData] = useState({ email: true, username: true })
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()


    //used to validate the username and the email
    const handleBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
        const fieldName = e.currentTarget.name as 'email' | 'username'
        if (formData[fieldName] === '' || (fieldName === 'email' && !formData.email.includes('@'))) {
            setValideData(data => ({ ...data, [fieldName]: false }))
            return
        }
        
        const resp = await fetch(`/api/auth/exist?${fieldName}=${encodeURIComponent(formData[fieldName])}`)
        if (resp.ok) {
            const { exists } = await resp.json()
            setValideData(data => ({ ...data, [fieldName]: !exists }))
        }
    }

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
                setIsLoading(false)
                router.replace('/')
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
                <AuthForm onSubmit={handleSubmit} submitTxt="Sign up" disabled={isLoading || Object.values(valideData).some(x => !x)} error={error}>
                    <Input type="email" name="email" placeholder='email' error={!valideData.email} onChange={handleChange} value={formData['email']} onBlur={handleBlur} />
                    <Input type="text" name="fullname" placeholder='full name' onChange={handleChange} value={formData['fullname']} />
                    <Input type="username" name="username" placeholder='username' error={!valideData.username} onChange={handleChange} value={formData['username']} onBlur={handleBlur} />
                    <Input type="password" name="password" placeholder='password' onChange={handleChange} value={formData['password']} />
                </AuthForm>
                <RedirectCard login={false} />
            </div>
        </div>
    )
}


export default Signup