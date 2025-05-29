import { useLocation } from 'react-router-dom'
import type { AppDispatch, RootState } from '../../store/reducers/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loader, { LoaderType } from '../shared/Loader'
import { FaCheckCircle } from 'react-icons/fa'
import { confirmStripePayment } from '../../store/actions'
import { OrderStatus } from '../../types'

const OrderConfirmation = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const dispatch = useDispatch<AppDispatch>()
    const { 
        errorsState : { isLoading, errorMessage },
        orderState: { addressId }
    } = useSelector((state: RootState) => state)
    
    const paymentIntent = searchParams.get("payment_intent")
    const clientSecret = searchParams.get("payment_intent_client_secret")
    const redirectStatus = searchParams.get("redirect_status")

    useEffect(() => {
        if (paymentIntent && clientSecret && redirectStatus) {
            dispatch(confirmStripePayment(paymentIntent, redirectStatus))
        }
    }, [])

    return (
    <div className='min-h-screen flex items-center justify-center'>
        {
            isLoading ? <div className='max-w-xl mx-auto'>
                <Loader variant={LoaderType.SKELETON}/>
            </div>
            :
            <div className='p-8 rounded-lg shadow-lg text-center max-w-md'>
                <div className='text-green-500 mb-4 flex justify-center'>
                    <FaCheckCircle size={64}/>
                </div>
                <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                    Pagamento realizado com sucesso
                </h2>
                <p className='text-gray-600 mb-6'>
                    Obrigado! Volte sempre.
                </p>
            </div>
        }
    </div>
    )
}

export default OrderConfirmation