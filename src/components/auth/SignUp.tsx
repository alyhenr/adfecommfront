import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import InputField from "../shared/InputField"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/reducers/store"
import { registerUser } from "../../store/actions"
import toast from "react-hot-toast"
import { FaUserPlus } from "react-icons/fa"
import SubmitBtn from "./SubmitBtn"

export type SignUpRequest = {
    email: string,
    username: string,
    password: string,
}

type SignUpForm = {
    email: string,
    username: string,
    password: string,
    passwordConfirmation: string,
}

const SignUp = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>();

    const {
        register, handleSubmit, formState: { errors }, reset
    } = useForm<SignUpForm>({
        mode: "onTouched"
    })

    const registerHandler: SubmitHandler<SignUpForm> = async (data: SignUpForm) => {
        setLoading(true)

        if (data.password != data.passwordConfirmation) {
            toast.error("As senhas devem ser iguais, favor verificar")
            setLoading(false)
            return
        }

        const { success, message, redirectTo } = await dispatch(registerUser({
            email: data.email,
            username: data.username,
            password: data.password
        }))
        if (success) {
            toast.success(message)
            navigate(redirectTo)
        } else {
            toast.error(message)
        }
        reset()
        setLoading(false)
    }

    return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
        <form 
            onSubmit={handleSubmit(registerHandler)}
            className="sm:w-[450px] w-[360px] shadow-lg py-8 sm:px-8 px-4 rounded-md"
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <FaUserPlus className="text-slate-800 text-5xl"/>
                <h1 className="text-slate-800 text-center font-serif lg:text-3xl font-bold">
                   Registrar
                </h1>
            </div>

            <hr className="mt-2 mb-5 text-slate-600"/>

            <div className="flex flex-col gap-3">
                <InputField 
                    label="Email"
                    required
                    id="email"
                    register={register}
                    errors={errors}
                    className=""
                    message="*Email é um campo obrigatório"
                    min={3}
                    placeholder="Digite seu e-mail"
                    type="email"
                    value={1}
                />

                <InputField 
                    label="Nome"
                    required
                    id="username"
                    register={register}
                    errors={errors}
                    className=""
                    message="*Nome é um campo obrigatório"
                    min={5}
                    placeholder="Digite seu nome"
                    type="text"
                    value={1}
                />

                <InputField 
                    label="Senha"
                    required
                    id="password"
                    register={register}
                    errors={errors}
                    className=""
                    message="*Senha é um campo obrigatório"
                    min={5}
                    placeholder="Digite sua senha"
                    type="password"
                    value={1}
                />

                <InputField 
                    label="Corfime a Senha"
                    required
                    id="passwordConfirmation"
                    register={register}
                    errors={errors}
                    className=""
                    message="*Senha é um campo obrigatório"
                    min={5}
                    placeholder="Digite sua senha novamente"
                    type="password"
                    value={1}
                />

                <SubmitBtn loading={loading}/>

                <p className="text-center text-sm text-slate-700 mt-6">
                    <Link to="/login" className="font-semibold hover:text-black underline">
                        Já tenho uma conta
                    </Link>
                </p>
            </div>
        </form>
    </div>
    )
}

export default SignUp