import { Button, Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react"
import AddresInfo from "./AddresInfo"
import PaymentMethod from "./PaymentMethod"
import type { Address } from "../../types"
import Finish from "./Finish"
import Summary from "./Summary"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/reducers/store"

export enum PaymentMethodEnum {
    CREDIT_CARD = "CREDIT_CARD", PIX = "PIX"
}

const Checkout = () => {
    const steps = ["Endereço", "Forma de pagamento", "Resumo", "Pagamento"]

    const [currStep, setCurrStep] = useState(0)
    const { products, totalPrice } = useSelector((state: RootState) => state.cartState)

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
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(PaymentMethodEnum.PIX)
    
    const canGoToNextStep = () : boolean => {
        switch (currStep) {
            case 0:
                return selectedAddress.addressId > 0
            case 1: 
                return selectedPaymentMethod != null
            case 2:
                return true
            case 3:
                return true
            default:
                return false
        }
    }

    return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
        <Stepper alternativeLabel activeStep={currStep}>
            {steps.map((label, i) => <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>)}
        </Stepper>

        <div className="mt-5 px-5">
            {currStep == 0 && <AddresInfo selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />}
            {currStep == 1 && <PaymentMethod selectedMethod={selectedPaymentMethod} setSelectedMethod={setSelectedPaymentMethod}/>}
            {currStep == 2 && <Summary 
                                selectedAddress={selectedAddress} 
                                selectedMethod={selectedPaymentMethod} 
                                products={products}
                                totalPrice={totalPrice}
                            />}
            {currStep == 3 && <Finish />}
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
                    disabled={!canGoToNextStep()}
                    onClick={() => setCurrStep(prev => Math.min(prev + 1, steps.length))}
                >
                    Próximo
                </Button>
        </div>

    </div>
    )
}

export default Checkout