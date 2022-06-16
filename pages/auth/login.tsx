import AuthForm, { RedirectCard } from "components/AuthForm"
import Input from "components/AuthForm/Input"
import { FormEventHandler } from "react"


const Login = () => {

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()

    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md mx-auto flex-1">
                <AuthForm onSubmit={handleSubmit} submitTxt="Login">
                    <Input type="email" name="email" placeholder='email' />
                    <Input type="password" name="password" placeholder='password' />
                </AuthForm>
                <RedirectCard />
            </div>
        </div>
    )
}



export default Login