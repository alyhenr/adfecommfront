import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { type StripePaymentElementChangeEvent } from "@stripe/stripe-js"
import { type FormEvent, useEffect, useState } from "react"
import Loader, { LoaderType } from "../shared/Loader"
import { HiLockClosed } from "react-icons/hi"

const PaymentForm = ({ clientSecret, totalPrice } : { clientSecret: string, totalPrice: number}) => {
    const stripe = useStripe()
    const elements = useElements()

    const [isLoading, setIsLoading] = useState(false)
    const [isFormComplete, setIsFormComplete] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }
        setIsReady(true)
    }, [stripe, clientSecret])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements || !isReady || !isFormComplete) {
            console.error("Stripe not initialized or form not complete")
            return;
        }

        setIsLoading(true)
        setErrorMessage("")

        try {
            const { error: submitError } = await elements.submit()
            if (submitError) {
                setErrorMessage(submitError.message ?? "Ocorreu um erro ao processar o pagamento.")
                console.error("Payment error:", submitError)
                return;
            }

            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/order-confirm`,
                },
            })

            if (error) {
                setErrorMessage(error.message ?? "Ocorreu um erro ao processar o pagamento.")
                console.error("Payment error:", error)
            }
        } catch (err) {
            console.error("Payment submission error:", err)
            setErrorMessage("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.")
        }

        setIsLoading(false)
    }

    const paymentElementOptions = {
        layout: "tabs" as const,
        defaultValues: {
            billingDetails: {
                name: '',
                email: '',
                phone: '',
            }
        }
    }

    if (!stripe || !elements) {
        return (
            <div className="max-w-lg mx-auto">
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8">
                    <div className="flex items-center justify-center">
                        <Loader text="Inicializando formulário de pagamento..." variant={LoaderType.SKELETON}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto">
            <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-medium text-gray-900">
                        Informações de pagamento
                    </h2>
                    <div className="flex items-center text-sm text-gray-500">
                        <HiLockClosed className="w-4 h-4 mr-1" />
                        Pagamento seguro
                    </div>
                </div>

                {errorMessage && (
                    <div className="mb-6">
                        <div className="bg-red-50 p-4 rounded-lg">
                            <p className="text-red-600 font-medium">{errorMessage}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className={`relative ${isLoading ? 'opacity-50' : ''}`}>
                            <PaymentElement 
                                options={paymentElementOptions}
                                onChange={(event: StripePaymentElementChangeEvent) => {
                                    setIsFormComplete(event.complete)
                                    setErrorMessage("")
                                }}
                            />
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                                    <Loader text="" variant={LoaderType.DEFAULT} />
                                </div>
                            )}
                        </div>
                        
                        <button
                            type="submit"
                            disabled={!stripe || !elements || !isReady || isLoading || !isFormComplete}
                            className={`
                                w-full flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md
                                ${!stripe || !elements || !isReady || isLoading || !isFormComplete
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-gray-900 hover:bg-black text-white'}
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader text="" variant={LoaderType.DEFAULT} />
                                    <span className="ml-2">Processando...</span>
                                </>
                            ) : !isFormComplete ? (
                                "Preencha todos os campos"
                            ) : (
                                `Pagar R$ ${totalPrice.toFixed(2)}`
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
                Ao confirmar seu pagamento, você concorda com nossos termos de serviço.
            </p>
        </div>
    )
}

export default PaymentForm