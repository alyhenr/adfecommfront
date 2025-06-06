import { MdArrowBack } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import { Link } from "react-router-dom"
import ItemContent from "./ItemContent"
import { useEffect } from "react"
import { getOrCreateUserCart } from "../../store/actions"
import Loader from "../shared/Loader"
import { FiShoppingBag } from "react-icons/fi"
import { useTranslation } from "react-i18next"

const EmptyCart = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-[600px] flex flex-col items-center justify-center max-w-md mx-auto text-center px-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <FiShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
                {t('cart.emptyCartTitle')}
            </h1>
            <p className="text-gray-500 mb-8">
                {t('cart.emptyCart')}
            </p>
            <Link 
                to="/products" 
                className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 font-medium hover:bg-black transition-colors"
            >
                {t('cart.continueShopping')}
            </Link>
        </div>
    )
}

const Cart = () => {
    const { cartId, products, totalPrice } = useSelector((state : RootState) => state.cartState)
    const { isLoading } = useSelector((state : RootState) => state.errorsState)
    const dispatch = useDispatch<AppDispatch>()
    const { t } = useTranslation();

    useEffect(() => {
        const handler = async () => {
            if (cartId <= 0) {
                await dispatch(getOrCreateUserCart())
            }
        }
        handler()
    },[dispatch, cartId])

    if (isLoading) {
        return (
            <div className="min-h-[600px] flex items-center justify-center">
                <Loader text={t('cart.loading')} />
            </div>
        )
    }

    if (!products?.length) {
        return <EmptyCart />
    }

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-12 text-center">
                    <h1 className="text-3xl font-medium text-gray-900 mb-2">{t('cart.cart')}</h1>
                    <p className="text-gray-500">{products.length} {products.length === 1 ? t('cart.item') : t('cart.items')} {t('cart.inYourCart')}</p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-7">
                        <div className="bg-white shadow-sm border border-gray-100 sm:rounded-lg overflow-hidden">
                            <ul role="list" className="divide-y divide-gray-200">
                                {products.map(p => (
                                    <li key={p.productId} className="p-4 sm:p-6">
                                        <ItemContent product={p} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6">
                            <Link 
                                to="/products" 
                                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                            >
                                <MdArrowBack className="mr-2 h-4 w-4" />
                                {t('cart.continueShopping')}
                            </Link>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <div className="bg-white shadow-sm border border-gray-100 sm:rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">{t('cart.orderSummary')}</h2>
                            
                            <div className="flow-root">
                                <dl className="-my-4 divide-y divide-gray-200">
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">{t('cart.subtotal')}</dt>
                                        <dd className="font-medium text-gray-900">R$ {totalPrice.toFixed(2)}</dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">{t('cart.shipping')}</dt>
                                        <dd className="font-medium text-gray-900">{t('cart.calculatedAtCheckout')}</dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-base font-medium text-gray-900">{t('cart.total')}</dt>
                                        <dd className="text-base font-medium text-gray-900">R$ {totalPrice.toFixed(2)}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mt-6">
                                <Link 
                                    to="/checkout"
                                    className="w-full flex items-center justify-center bg-gray-900 text-white px-6 py-3 font-medium hover:bg-black transition-colors"
                                >
                                    {t('cart.checkout')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart