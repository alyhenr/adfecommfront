import type { Address, Product } from "../../types"
import AddressInfoCard from "./AddressInfoCard"
import { truncateText } from "../../utils/common"
import { getSpecialPriceStr } from "../../utils/productsUtils"
import { PaymentMethodEnum } from "./Checkout"

const Summary = ({
    selectedAddress, selectedMethod, products, totalPrice
} : {
    selectedAddress: Address, selectedMethod: string, products: Product[], totalPrice: number
}) => {
    const taxesPct = 2
    const taxesValue = totalPrice * (taxesPct/100)
    const total = totalPrice + taxesValue

    return (
        <div className="max-w-4xl mx-auto mb-20 sm:mb-0">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                {/* Order details */}
                <div className="lg:col-span-7">
                    {/* Address */}
                    <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Endereço de entrega
                        </h2>
                        <AddressInfoCard address={selectedAddress} />
                    </div>

                    {/* Items */}
                    <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Itens do pedido
                            </h2>
                        </div>
                        <ul role="list" className="divide-y divide-gray-200">
                            {products.map(p => (
                                <li key={p.productId} className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                                            <img 
                                                src={p.imageUrl} 
                                                alt={p.productName} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="ml-6 flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        {truncateText(p.productName, 30)}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Quantidade: {p.quantity}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {getSpecialPriceStr(p.price * p.quantity, p.discount)}
                                                    </p>
                                                    {p.discount > 0 && (
                                                        <p className="mt-1 text-sm text-gray-500 line-through">
                                                            R$ {(p.price * p.quantity).toFixed(2)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Order summary */}
                <div className="lg:col-span-5 mt-8 lg:mt-0">
                    <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 space-y-6 sticky top-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Resumo do pedido
                        </h2>

                        <dl className="space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">R$ {totalPrice.toFixed(2)}</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">
                                    Frete ({taxesPct}%)
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    R$ {taxesValue.toFixed(2)}
                                </dd>
                            </div>

                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="text-base font-medium text-gray-900">Total</dt>
                                <dd className="text-base font-medium text-gray-900">R$ {total.toFixed(2)}</dd>
                            </div>
                        </dl>

                        {selectedMethod && (
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="text-sm font-medium text-gray-900 mb-2">
                                    Forma de pagamento
                                </dt>
                                <dd className="text-sm text-gray-600">
                                    {selectedMethod === PaymentMethodEnum.PIX ? "PIX" : 
                                    selectedMethod === PaymentMethodEnum.CREDIT_CARD ? "Cartão de crédito" : 
                                    "Forma de pagamento não selecionada"}
                                </dd>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary