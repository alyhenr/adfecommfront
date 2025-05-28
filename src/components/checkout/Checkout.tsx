import { Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react"
import AddresInfo from "./AddresInfo"

const Checkout = () => {
    const steps = ["Endereço", "Forma de pagamento", "Resumo", "Pagamento"]

    const [currStep, setCurrStep] = useState(1)

    return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
        <Stepper alternativeLabel activeStep={currStep}>
            {steps.map((label, i) => <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>)}
        </Stepper>

        <div className="mt-5">
            {currStep == 0 && <AddresInfo />}
            {currStep == 1 && <AddresInfo />}
            {currStep == 2 && <AddresInfo />}
            {currStep == 3 && <AddresInfo />}
        </div>

    </div>
    )
}

export default Checkout