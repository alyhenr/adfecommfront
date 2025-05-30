import { useLocation } from 'react-router-dom'
import type { AppDispatch, RootState } from '../../store/reducers/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loader, { LoaderType } from '../shared/Loader'
import { confirmStripePayment } from '../../store/actions'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'
import successAnimation from '../../assets/animations/chinese-success.json'

const OrderConfirmation = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const dispatch = useDispatch<AppDispatch>()
    const { 
        errorsState : { isLoading },
        cartState: { products, totalPrice }
    } = useSelector((state: RootState) => state)
    
    const paymentIntent = searchParams.get("payment_intent")
    const clientSecret = searchParams.get("payment_intent_client_secret")
    const redirectStatus = searchParams.get("redirect_status")

    useEffect(() => {
        if (paymentIntent && clientSecret && redirectStatus) {
            dispatch(confirmStripePayment(paymentIntent, redirectStatus))
        }
    }, [dispatch, paymentIntent, clientSecret, redirectStatus])

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-red-50'>
                <div className='max-w-xl mx-auto text-center'>
                    <Loader variant={LoaderType.SKELETON} text="Processando seu pedido..." />
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-red-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto'>
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='bg-white rounded-lg shadow-xl overflow-hidden'
                >
                    <div className='p-8'>
                        {/* Success Animation */}
                        <div className='w-48 h-48 mx-auto mb-8'>
                            <Lottie 
                                animationData={successAnimation} 
                                loop={false}
                                className='w-full h-full'
                            />
                        </div>

                        {/* Thank You Message */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className='text-center mb-12'
                        >
                            <h1 className='text-4xl font-bold text-red-800 mb-4'>
                                谢谢! Obrigado!
                            </h1>
                            <p className='text-xl text-gray-600'>
                                Seu pedido foi confirmado com sucesso!
                            </p>
                        </motion.div>

                        {/* Order Details */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className='bg-red-50 rounded-lg p-6 mb-8'
                        >
                            <h2 className='text-2xl font-semibold text-red-800 mb-6 flex items-center'>
                                <span className='mr-2'>🏮</span>
                                Resumo do Pedido
                            </h2>
                            
                            <div className='space-y-4'>
                                {products.map((product, index) => (
                                    <motion.div
                                        key={product.productId}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className='flex items-center justify-between border-b border-red-200 pb-4'
                                    >
                                        <div className='flex items-center'>
                                            <img 
                                                src={product.imageUrl} 
                                                alt={product.productName}
                                                className='w-16 h-16 object-cover rounded-md'
                                            />
                                            <div className='ml-4'>
                                                <h3 className='text-lg font-medium text-gray-900'>
                                                    {product.productName}
                                                </h3>
                                                <p className='text-gray-500'>
                                                    Quantidade: {product.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className='text-lg font-semibold text-gray-900'>
                                            R$ {(product.price * product.quantity).toFixed(2)}
                                        </p>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className='pt-4'
                                >
                                    <div className='flex justify-between items-center text-lg font-semibold text-red-800'>
                                        <span>Total</span>
                                        <span>R$ {totalPrice.toFixed(2)}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Lucky Message */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className='text-center'
                        >
                            <p className='text-red-700 text-lg'>
                                🎋 恭喜发财 (Gōngxǐ fācái) 🎋
                            </p>
                            <p className='text-gray-600 mt-2'>
                                Que a sorte e a prosperidade estejam sempre com você!
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default OrderConfirmation