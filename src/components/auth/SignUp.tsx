import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"
import InputField from "../shared/InputField"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/reducers/store"
import { registerUser, authenticateWithGoogle } from "../../store/actions"
import toast from "react-hot-toast"
import SubmitBtn from "../shared/SubmitBtn"
import { useGoogleLogin } from '@react-oauth/google'

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
    const [googleLoading, setGoogleLoading] = useState(false)

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

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            setGoogleLoading(true)
            const { success, message, redirectTo } = await dispatch(
                authenticateWithGoogle({ credential: response.access_token })
            )
            if (success) {
                toast.success(message)
                navigate(redirectTo)
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
            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Criar Conta</h1>
                        <p className="text-gray-600">Junte-se à comunidade YOUDE</p>
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
                            <span className="px-4 bg-white text-gray-500">ou registre-se com email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(registerHandler)}>
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
                                label="Nome"
                                required
                                id="username"
                                register={register}
                                errors={errors}
                                message="Nome é obrigatório"
                                min={5}
                                placeholder="Seu nome completo"
                                type="text"
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

                            <InputField 
                                label="Confirme a Senha"
                                required
                                id="passwordConfirmation"
                                register={register}
                                errors={errors}
                                message="Confirmação de senha é obrigatória"
                                min={5}
                                placeholder="••••••••"
                                type="password"
                                value={""}
                            />

                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                                    Eu concordo com os{" "}
                                    <a href="#" className="text-red-600 hover:text-red-800">
                                        Termos de Serviço
                                    </a>
                                    {" "}e{" "}
                                    <a href="#" className="text-red-600 hover:text-red-800">
                                        Política de Privacidade
                                    </a>
                                </label>
                            </div>
                        </div>

                        <SubmitBtn loading={loading} text="Criar conta" />

                        <p className="text-center text-sm text-gray-600 mt-8">
                            Já tem uma conta?{" "}
                            <Link to="/login" className="text-red-600 hover:text-red-800 font-medium">
                                Fazer login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-bl from-red-500/90 to-red-800/90 mix-blend-multiply" />
                <img 
                    src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9" 
                    alt="Asian Food" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white p-12">
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold mb-6">Descubra o Melhor da Culinária Asiática</h2>
                        <p className="text-lg text-white/90">
                            Crie sua conta para ter acesso a produtos exclusivos, 
                            ofertas especiais e conteúdo personalizado.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp