import { useState } from "react"
import type { Product } from "../types"
import { FaShoppingCart } from "react-icons/fa";


const ProductCard = (product: Product) => {
    let {
        productId,
        productName,
        description, 
        price,
        discount,
        quantity,
        imageUrl,
        category
    } = product;

    const [openModal, setOpenModal] = useState(false)
    let btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState<Product>()
    const isAvailable = quantity && quantity > 0;

    if (discount >= 1) discount = 0;

    const handleProductView = () => {
        setSelectedViewProduct(product)
        setOpenModal(true);
    }

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div 
                className="w-full overflow-hidden aspect-[3/2]"
                onClick={() => {handleProductView()}}>
                    <img 
                        className="w-full h-full cursor-pointer transiction-transform duration-300 transform hover:scale-105" 
                        src={imageUrl}
                        alt={productName}
                    />
            </div>
            <div className="p-4">
                <h2 onClick={() => {handleProductView()}}
                    className="text-lg font-semibold mb-2 cursor-pointer">
                    {productName}
                </h2>
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">
                        {description}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    {discount > 0 ? (
                        <div className="flex flex-col">
                            <span className="text-gray-400 line-through">
                                R${price.toFixed(2).toString().replace(".",",")}
                            </span>
                            <span className="text-xl font-bold text-slate-700">
                                R${(price * (1 - discount)).toFixed(2).toString().replace(".",",")}
                            </span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-slate-700">
                            {"  "}
                            R${price.toFixed(2).toString().replace(".",",")}
                        </span>
                    )}
                    <button disabled={!isAvailable || btnLoader}
                        onClick={() => {}}
                        className={`bg-blue-500 ${isAvailable ? "hover:cursor-pointer opacity-100 hover:bg-blue-600" : "opacity-70"} text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}>
                        <FaShoppingCart className="mr-2"/>
                        {isAvailable ? "Comprar" : "Esgotado"}
                    </button>
                </div>
            </div>
        </div>
  )
}

export default ProductCard