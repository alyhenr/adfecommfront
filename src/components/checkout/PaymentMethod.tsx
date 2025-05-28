import React, { type Dispatch, type SetStateAction } from 'react'
import type { PaymentMethodEnum } from './Checkout'

const PaymentMethod = ({ selectedMethod, setSelectedMethod } : {
    selectedMethod: PaymentMethodEnum,
    setSelectedMethod: Dispatch<SetStateAction<PaymentMethodEnum>>
}) => {
  return (
    <div>{selectedMethod}</div>
  )
}

export default PaymentMethod