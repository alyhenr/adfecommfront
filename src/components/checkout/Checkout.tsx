import { useEffect, useState } from "react"
import AddresInfo from "./AddresInfo"
import { OrderStatus, type Address } from "../../types"
import Summary from "./Summary"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import PaymentForm from "./PaymentForm"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { createOrder, createStripePaymentSecret, getOrCreateUserCart } from "../../store/actions"
import toast from "react-hot-toast"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { Stepper, Step, StepLabel } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import { calculateTax } from "../../utils/common"

export enum PaymentMethodEnum {
    CREDIT_CARD = "CREDIT_CARD", PIX = "PIX"
}

const clientPublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(clientPublishableKey)

// Create a custom theme for the stepper
const theme = createTheme({
    palette: {
        primary: {
            main: '#111827', // gray-900
        },
    },
    components: {
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    '&.Mui-completed': {
                        color: '#111827', // gray-900
                    },
                },
            },
        },
    },
})

const Checkout = () => {
    const steps = ["Endereço", "Resumo", "Pagamento"]
    const navigate = useNavigate()
    const [currStep, setCurrStep] = useState(0)
    const { cartState, errorsState: { isLoading } } = useSelector((state: RootState) => state)
    const { products, totalPrice } = cartState

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
                return clientPublishableKey && clientSecret != "" && pgPaymentId != ""
            default:
                return false
        }
    }
    console.log(cartState);
    
    useEffect(() => {
        if (pgPaymentId == "") return
        new Promise(async () => {
            await dispatch(createOrder({
                paymentMethod: "stripe",
                orderRequest: {
                    addressId: selectedAddress.addressId,
                    tax: calculateTax(totalPrice),
                    pgPaymentId: pgPaymentId,
                    pgResponseMessage: "",
                    pgStatus: OrderStatus.WAITING_PAYMENT
                }
            }))
        })
    }, [pgPaymentId])

    const dispatch = useDispatch<AppDispatch>()
    const isLoggedIn = useSelector((state: RootState) => state.authState.user.userId > 0)
    const handlePaymentConfiguration = async () => {
        const { success, clientSecret, paymentId} = await dispatch(createStripePaymentSecret(Number((totalPrice + calculateTax(totalPrice)).toFixed(2)) * 100))
        if (!success) {
            if (isLoggedIn) {
                toast.error("Falha ao comunicar com o provedor de pagamento")
            } else {
                toast.error("Sessão expirada, faça login novamente")
            }
        }
            
        setClientSecret(clientSecret)
        setPgPaymentId(paymentId)
    }

    const handleNextStep = async () => {
        const nextStep = Math.min(currStep + 1, steps.length - 1)
        
        if (nextStep == 1) {      
            const { success, message, products: getUserCartProducts } = await dispatch(getOrCreateUserCart()).unwrap()
            console.log(getUserCartProducts);
                        
            if (success) {
                if (getUserCartProducts.length == 0) {
                    toast.error("Seu carrinho está vazio")
                    navigate("/cart")
                }
            } else {
                setCurrStep(0)
                toast.error(message)
            }
        } else if (nextStep == 2) {
            await handlePaymentConfiguration()
        }
        setCurrStep(prev => Math.min(prev + 1, steps.length - 1))
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Progress Steps */}
                <ThemeProvider theme={theme}>
                    <Stepper activeStep={currStep} alternativeLabel className="mb-12">
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </ThemeProvider>

                {/* Content */}
                <div className="mt-16">
                    {currStep === 0 && <AddresInfo selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />}
                    {currStep === 1 && <Summary 
                        selectedAddress={selectedAddress} 
                        selectedMethod={""} 
                        products={products}
                        totalPrice={totalPrice}
                    />}
                    {currStep === 2 && <Elements options={{ clientSecret }} stripe={stripePromise}>
                        <PaymentForm totalPrice={Number(totalPrice.toFixed(2))} clientSecret={clientSecret}/>
                    </Elements>}
                </div>

                {/* Navigation - Desktop and Mobile */}
                <div className="fixed bottom-16 sm:bottom-0 left-0 right-0">
                    {/* Desktop version */}
                    <div className="hidden sm:block bg-white border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={() => setCurrStep(prev => prev - 1)}
                                    disabled={currStep === 0}
                                    className={`
                                        inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                                        ${currStep === 0 
                                            ? 'text-gray-400 cursor-not-allowed' 
                                            : 'text-gray-700 hover:text-gray-900'}
                                    `}
                                >
                                    <HiChevronLeft className="mr-1 h-5 w-5" />
                                    Anterior
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    disabled={!canGoToNextStep() || isLoading}
                                    className={`${currStep === 2 ? "hidden" : "inline-flex"}
                                        items-center px-6 py-3 text-sm font-medium rounded-md
                                        ${!canGoToNextStep() || isLoading
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-gray-900 hover:bg-black text-white'}
                                    `}
                                >
                                    {currStep === 2 
                                        ? (canGoToNextStep() 
                                            ? "Finalizar compra"
                                            : "Processando pagamento...") 
                                        : currStep === 1
                                            ? (isLoading 
                                                ? "Preparando pagamento..." 
                                                : "Prosseguir para pagamento") 
                                            : "Próximo"}
                                    <HiChevronRight className="ml-1 h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile version - Floating buttons */}
                    <div className="sm:hidden px-4 pb-4">
                        <div className="flex gap-3 justify-end">
                            {currStep !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => setCurrStep(prev => prev - 1)}
                                    className="flex items-center justify-center p-3 bg-white text-gray-700 rounded-full shadow-lg border border-gray-200"
                                >
                                    <HiChevronLeft className="h-6 w-6" />
                                </button>
                            )}
                            {currStep !== 2 && (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    disabled={!canGoToNextStep() || isLoading}
                                    className={`
                                        flex items-center justify-center p-3 rounded-full shadow-lg
                                        ${!canGoToNextStep() || isLoading
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-gray-900 hover:bg-black text-white'}
                                    `}
                                >
                                    <HiChevronRight className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout