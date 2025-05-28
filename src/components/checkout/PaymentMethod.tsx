import { type Dispatch, type SetStateAction } from 'react'
import { PaymentMethodEnum } from './Checkout'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'

const PaymentMethod = ({ selectedMethod, setSelectedMethod } : {
    selectedMethod: string,
    setSelectedMethod: Dispatch<SetStateAction<string>>
}) => {

  return (
    <div className='max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border-slate-300'>
      <h1 className='text-2xl font-semibold mb-4'>
        Selecione a forma de pagamento
      </h1>
      <FormControl>
        <RadioGroup
          aria-labelledby='payment-method'
          aria-label='payment-method'
          defaultValue={selectedMethod}
          name='btn-payment-method'
          onChange={ev => setSelectedMethod(ev.target.value)}
          value={selectedMethod}
          >
          <FormControlLabel value={PaymentMethodEnum.PIX} control={<Radio />} label="PIX"/>
          <FormControlLabel value={PaymentMethodEnum.CREDIT_CARD} control={<Radio />} label="Cartão de Crédito"/>
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default PaymentMethod