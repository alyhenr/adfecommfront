import { dividerClasses } from "@mui/material"
import type { Address, Product } from "../../types"
import AddressInfoCard from "./AddressInfoCard"
import ProductCard from "../products/ProductCard"
import { truncateText } from "../../utils/common"
import { getSpecialPriceStr } from "../../utils/productsUtils"
import { useState } from "react"
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
    <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 pr-4">
                <div className="space-y-4">
                    
                    <div className="p-4 border-slate-400 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-2">
                            Endereço de cobrança:
                        </h2>
                        <AddressInfoCard address={selectedAddress} />
                    </div>
                    
                    <div className="p-4 border-slate-400 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-2">
                            Forma de pagamento: 
                        </h2>
                        <p>
                            {selectedMethod == PaymentMethodEnum.PIX ? "PIX" : 
                                selectedMethod == PaymentMethodEnum.CREDIT_CARD ? "Cartão de crédito" : "Forma de pagamento não selecionada"}
                        </p>
                    </div>

                    <div className="p-4 border-slate-400 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-2">
                            Items:
                        </h2>
                        <div className="space-y-2">
                            {products.map(p => <div key={p.productId}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex gap-2">
                                        <img 
                                            src={p.imageUrl} 
                                            alt={p.productName} 
                                            className="w-12 h-12 rounded"
                                        />
                                        <div className="text-gray-500 ml-3">
                                            <p>{truncateText(p.productName, 30)}</p>
                                            <p>{p.quantity} x {getSpecialPriceStr(p.price, p.discount)}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 font-thin">RS${" "}{(p.quantity*p.price*(1-p.discount)).toFixed(2)}</p>
                                </div>
                                <hr className="text-slate-500"/>
                            </div>
                        )}
                        <p className="text-end font-bold">R${" "}{totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
                <div className="border-slate-400 shadow-sm p-4 space-y-4">
                    <h2 className="text-2xl font-semibold mb-2">
                        Resumo
                    </h2>
                    <p className="flex justify-between w-full">
                        Subtotal: <span>R${" "}{totalPrice.toFixed(2)}
                        </span>
                    </p>
                    <p className="flex justify-between w-full">
                        Frete ({taxesPct}%): <span>R${" "}{taxesValue.toFixed(2)}
                        </span>
                    </p>
                    <p className="flex justify-between w-full font-extrabold">
                        Total: <span>R${" "}{total.toFixed(2)}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Summary