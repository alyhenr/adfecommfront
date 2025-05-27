import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import { AiOutlineLogin } from "react-icons/ai"
import InputField from "../shared/InputField"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/reducers/store"
import { authenticateUser } from "../../store/actions"
import toast from "react-hot-toast"

export type LoginRequest = {
    email: string,
    password: string,
}

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>();

    const {
        register, handleSubmit, formState: { errors }, reset
    } = useForm<LoginRequest>({
        mode: "onTouched"
    })

    const loginHandler: SubmitHandler<LoginRequest> = async (data: LoginRequest) => {
        setLoading(true)
        const { success, message, redirectTo } = await dispatch(authenticateUser(data))
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
            onSubmit={handleSubmit(loginHandler)}
            className="sm:w-[450px] w-[360px] shadow-lg py-8 sm:px-8 px-4 rounded-md"
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <AiOutlineLogin className="text-slate-800 text-5xl"/>
                <h1 className="text-slate-800 text-center font-serif lg:text-3xl font-bold">
                   Login 
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
                    placeholder="Digite seu e-mail aqui"
                    type="email"
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
                    placeholder="Digite sua senha aqui"
                    type="password"
                    value={1}
                />

                <button
                    disabled={loading}
                    className={`bg-gradient-to-tr from-red-600 to-purple-900 text-white font-bold p-2 rounded-sm w-full transition-colors duration-100 my-3 ${loading ? "" : "hover:cursor-pointer hover:opacity-90"}`}
                    type="submit"
                >
                    {loading ? "Carregando..." : "Entrar"}
                </button>

                <p className="text-center text-sm text-slate-700 mt-6">
                    <Link to="/signup" className="font-semibold hover:text-black underline">
                        Criar uma conta
                    </Link>
                </p>
            </div>
        </form>
    </div>
    )
}

export default Login