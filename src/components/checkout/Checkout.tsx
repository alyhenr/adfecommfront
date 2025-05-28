import { Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react"
import AddresInfo from "./AddresInfo"
import PaymentMethod from "./PaymentMethod"
import type { Address } from "../../types"

export enum PaymentMethodEnum {
    CREDIT_CARD, PIX
}

const Checkout = () => {
    const steps = ["Endereço", "Forma de pagamento", "Resumo", "Pagamento"]

    const [currStep, setCurrStep] = useState(0)

    const [selectedAddress, setSelectedAddress] = useState<Address>({
        addressId: 0,
        city: "",
        state: "",
        zipCode: "",
        number: 0,
        reference: "",
        buildingName: "",
        streetName: "",
    }) //addressId
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodEnum>(PaymentMethodEnum.CREDIT_CARD) //enum
    
    return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
        <Stepper alternativeLabel activeStep={currStep}>
            {steps.map((label, i) => <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>)}
        </Stepper>

        <div className="mt-5">
            {currStep == 0 && <AddresInfo selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />}
            {currStep == 1 && <PaymentMethod selectedMethod={selectedPaymentMethod} setSelectedMethod={setSelectedPaymentMethod}/>}
            {/* {currStep == 2 && <AddresInfo />}
            {currStep == 3 && <AddresInfo />} */}
        </div>

    </div>
    )
}

export default Checkout