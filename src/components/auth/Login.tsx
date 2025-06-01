import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"
import InputField from "../shared/InputField"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/reducers/store"
import { authenticateUser, authenticateWithGoogle } from "../../store/actions"
import toast from "react-hot-toast"
import SubmitBtn from "../shared/SubmitBtn"
import { useGoogleLogin } from '@react-oauth/google'

export type LoginRequest = {
    email: string,
    password: string,
}

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>();

    const {
        register, handleSubmit, formState: { errors }, reset
    } = useForm<LoginRequest>({
        mode: "onTouched"
    })

    const handleRedirectAfterLogin = () => {
        const redirectUrl = localStorage.getItem('redirectAfterLogin')
        localStorage.removeItem('redirectAfterLogin') // Clean up
        console.log(redirectUrl);
        if (redirectUrl?.includes('/login')) return '/'
        return redirectUrl || '/'
    }

    const loginHandler: SubmitHandler<LoginRequest> = async (data: LoginRequest) => {
        setLoading(true)
        const { success, message } = await dispatch(authenticateUser(data))
        if (success) {
            toast.success(message)
            navigate(handleRedirectAfterLogin())
        } else {
            toast.error(message)
        }
        reset()
        setLoading(false)
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            setGoogleLoading(true)
            const { success, message } = await dispatch(
                authenticateWithGoogle({ credential: response.access_token })
            )
            if (success) {
                toast.success(message)
                navigate(handleRedirectAfterLogin())
            } else {
                toast.error(message)
            }
            setGoogleLoading(false)
        },
        onError: () => {
            toast.error('Login com Google falhou')
        }
    })

    return (
        <div className="min-h-[calc(100vh-64px)] flex">
            {/* Left side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/90 to-red-800/90 mix-blend-multiply" />
                <img 
                    src="https://images.unsplash.com/photo-1540648639573-8c848de23f0a" 
                    alt="Asian Market" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white p-12">
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold mb-6">Bem-vindo de volta ao YOUDE</h2>
                        <p className="text-lg text-white/90">
                            Sua porta de entrada para a autêntica culinária asiática. 
                            Faça login para acessar nossa seleção exclusiva de produtos.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
                        <p className="text-gray-600">Entre com sua conta para continuar</p>
                    </div>

                    {/* Social Login Button */}
                    <div className="mb-8">
                        <button 
                            onClick={() => handleGoogleLogin()}
                            disabled={googleLoading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {googleLoading ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Conectando...</span>
                                </div>
                            ) : (
                                <>
                                    <FaGoogle className="w-5 h-5 text-red-600" />
                                    <span className="text-gray-700">Continuar com Google</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">ou continue com email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(loginHandler)}>
                        <div className="space-y-4">
                            <InputField 
                                label="Email"
                                required
                                id="email"
                                register={register}
                                errors={errors}
                                message="Email é obrigatório"
                                min={3}
                                placeholder="seu@email.com"
                                type="email"
                                value={""}
                            />

                            <InputField 
                                label="Senha"
                                required
                                id="password"
                                register={register}
                                errors={errors}
                                message="Senha é obrigatória"
                                min={5}
                                placeholder="••••••••"
                                type="password"
                                value={""}
                            />

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                    <span className="ml-2 text-gray-600">Lembrar-me</span>
                                </label>
                                <a href="#" className="text-red-600 hover:text-red-800">Esqueceu a senha?</a>
                            </div>
                        </div>

                        <SubmitBtn loading={loading} text="Entrar" />

                        <p className="text-center text-sm text-gray-600 mt-8">
                            Não tem uma conta?{" "}
                            <Link to="/signup" className="text-red-600 hover:text-red-800 font-medium">
                                Criar conta
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login