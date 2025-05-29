import { Button, Step, StepLabel, Stepper } from "@mui/material"
import { useEffect, useState } from "react"
import AddresInfo from "./AddresInfo"
import PaymentMethod from "./PaymentMethod"
import { OrderStatus, type Address } from "../../types"
import Summary from "./Summary"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import PaymentForm from "./PaymentForm"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { createCart, createOrder, createStripePaymentSecret } from "../../store/actions"
import toast from "react-hot-toast"

export enum PaymentMethodEnum {
    CREDIT_CARD = "CREDIT_CARD", PIX = "PIX"
}

const clientPublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

const stripePromise = loadStripe(clientPublishableKey)

const Checkout = () => {
    const steps = ["Endereço", "Resumo", "Pagamento"]

    const [currStep, setCurrStep] = useState(0)
    const { cartState: { products, totalPrice },
    errorsState: { isLoading } } = useSelector((state: RootState) => state)

    const [selectedAddress, setSelectedAddress] = useState<Address>({
        addressId: 0,
        city: "",
        state: "",
        zipCode: "",
        number: 0,
        reference: "",
        buildingName: "",
        streetName: "",
    })
    const [clientSecret, setClientSecret] = useState("")
    const [pgPaymentId, setPgPaymentId] = useState("")
    
    const canGoToNextStep = () : boolean => {
        switch (currStep) {
            case 0:
                return selectedAddress.addressId > 0
            case 1:
                return true
            case 2:
                return clientPublishableKey && clientSecret != ""
            default:
                return false
        }
    }

    useEffect(() => {
        if (pgPaymentId == "") return
        //place order pointing to client secret, after confirmation just update status to paid and stripe response
        new Promise(async () => {
            await dispatch(createOrder({
            paymentMethod: "stripe",
            orderRequest: {
                addressId: selectedAddress.addressId,
                pgPaymentId: pgPaymentId,
                pgResponseMessage: "",
                pgStatus: OrderStatus.WAITING_PAYMENT
            }
            }))
        })
    }, [pgPaymentId])

    const dispatch = useDispatch<AppDispatch>()

    const handlePaymentConfiguration = async () => {
        const { success, clientSecret, paymentId} = await dispatch(createStripePaymentSecret(Number(totalPrice.toFixed(2)) * 100))
        if (!success) toast.error("Falha ao comunicar com o provedor de pagamento")
            
        setClientSecret(clientSecret)
        setPgPaymentId(paymentId)
    }

    const handleNextStep = async () => {
        const nextStep = Math.min(currStep + 1, steps.length - 1)
        
        if (nextStep == 2) {        
            await dispatch(createCart(products)) //Create cart on backend now
            await handlePaymentConfiguration() //Generate stripe form and get clientSecret
        }
        setCurrStep(prev => Math.min(prev + 1, steps.length - 1))
    }

    return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
        <Stepper alternativeLabel activeStep={currStep}>
            {steps.map(label => <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>)}
        </Stepper>

        <div className="mt-5 px-5">
            {currStep == 0 && <AddresInfo selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />}
            {currStep == 1 && <Summary 
                                selectedAddress={selectedAddress} 
                                selectedMethod={""} 
                                products={products}
                                totalPrice={totalPrice}
                            />}
            {currStep == 2 && <Elements options={{ clientSecret }} stripe={stripePromise}>
                    <PaymentForm totalPrice={Number(totalPrice.toFixed(2))} clientSecret={clientSecret}/>
                </Elements>}
        </div>

        <div className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200"
            style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
        >
                <Button 
                    variant="outlined" 
                    disabled={currStep == 0}
                    onClick={() => setCurrStep(prev => prev - 1)}
                >
                    Anterior
                </Button>
                <Button 
                    variant="outlined" 
                    disabled={!canGoToNextStep() || isLoading}
                    onClick={() => handleNextStep()}
                >
                    {currStep 
                        == 2 ? (canGoToNextStep() 
                            ? "Finalizar"
                            : "Realizando pagamento...") 

                            : currStep == 1
                            ? (isLoading ? "Gerando formulario para o pagamento..." : "Prosseguir para o pagamento") 
                            
                            : "Próximo" }
                </Button>
        </div>

    </div>
    )
}

export default Checkout