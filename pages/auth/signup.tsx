import AuthForm, { RedirectCard } from "components/AuthForm"
import Input from "components/AuthForm/Input"
import { FormEventHandler } from "react"


const Signup = () => {

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()

    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md mx-auto flex-1">
                <AuthForm onSubmit={handleSubmit} submitTxt="Sign up">
                    <Input type="email" name="email" placeholder='email' />
                    <Input type="text" name="fullname" placeholder='full name' />
                    <Input type="username" name="username" placeholder='username' />
                    <Input type="password" name="password" placeholder='password' />
                </AuthForm>
                <RedirectCard login={false} />
            </div>
        </div>
    )
}



export default Signup