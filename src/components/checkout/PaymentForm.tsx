import { PaymentElement, useElements, useStripe, type PaymentElementProps } from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import Loader, { LoaderType } from "../shared/Loader"
import SubmitBtn from "../shared/SubmitBtn"
import toast from "react-hot-toast"


const PaymentForm = ({ clientSecret, totalPrice } : { clientSecret: string, totalPrice: number}) => {
    const { isLoading, errorMessage  } = useSelector((state: RootState) => state.errorsState)
    const elements = useElements()
    const stripe = useStripe()
    const paymentElementOption : PaymentElementProps = {
        options: {
            layout: "tabs",
        },
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!stripe || !elements) return;

        const { error: submitError, selectedPaymentMethod } = await elements.submit()

        if (submitError) {
            toast.error(submitError.message || "Falha ao processar pagamento")
            return;
        }
        console.log(submitError, selectedPaymentMethod);
        
        const { error } = await stripe.confirmPayment({
            elements, clientSecret, confirmParams: {
                return_url: `${import.meta.env.VITE_FRONT_END_URL}/order-confirm`,
            },
        })
        if (error) {
            toast.error(error.message || "Falha ao processar pagamento")
            return;
        }
        console.log(error);
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className="max-w-lg mx-auto p-4">
            {isLoading ? <Loader text="Carregando formulario de pagamento" variant={LoaderType.SKELETON}/> 
                : errorMessage != "" ? <div className="w-full mx-auto mt-10">
                    <h1 className="text-red-500">{errorMessage}</h1>
                </div>
                : <>
                    <hr className="mb-5 text-slate-300"/>
                    <PaymentElement {...paymentElementOption} />

                    <SubmitBtn
                        text={isLoading ? "Processando" : `Pagar R$${totalPrice}`}
                        loading={isLoading}
                        classes="bg-black font-semibold cursor-pointer"
                        // disabled={!stripe || isLoading}
                    />
                </>
            }
        </form>
    )
}

export default PaymentForm