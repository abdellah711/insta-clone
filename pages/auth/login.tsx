import AuthForm, { RedirectCard } from "components/AuthForm"
import Input from "components/AuthForm/Input"
import { FormEventHandler, useState } from "react"
import { signIn } from "next-auth/react"
import { RedirectableProviderType } from "next-auth/providers"
import { useRouter } from "next/router"

const Login = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setIsLoading(true)
        setError(null)
        try {
            const resp = await signIn<RedirectableProviderType>('credentials', { redirect: false, ...Object.fromEntries(formData.entries()) })
            if (resp?.ok) {
                router.replace('/')
            } else {
                setError('Wrong email/password combination')
            }
        } catch (err) {
            console.log({ err })
            setError("Something went wrong! please check your network and try again")
        }
        setIsLoading(false)

    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md mx-auto flex-1">
                <AuthForm onSubmit={handleSubmit} submitTxt="Login" error={error} disabled={isLoading}>
                    <Input type="email" name="email" placeholder='email' />
                    <Input type="password" name="password" placeholder='password' />
                </AuthForm>
                <RedirectCard />
            </div>
        </div>
    )
}



export default Login