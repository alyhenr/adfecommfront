import type { Product } from "../../types"
import { truncateText } from "../../utils/common";
import { HiX, HiMinus, HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/actions";
import type { AppDispatch } from "../../store/reducers/store";
import toast from "react-hot-toast";
import { getSpecialPriceStr } from "../../utils/productsUtils";

const toastWatcher : Set<string> = new Set()

export const QuantityHandler = ({ product } : { product: Product }) => {
    const { productId, quantity } = product
    const dispatch = useDispatch<AppDispatch>();

    //toastWatcher.clear() If cleaned, this will allow to acumulate product addition toasters in the Pscreen, but the controller will prevent the user to acumulate toaster when the state is not changing    
    const toasterController = (success: boolean, message: string) => {
        if (toastWatcher.has(message)) 
            return;
        
        toastWatcher.add(message)
        
        if (success) {
            toast.success(message)
        } else {
            toast.error(message)
        }
        
        setTimeout(() => {
            toastWatcher.delete(message)
        }, 3000);
    }

    const handleAddToCart = async () => {
        const { addedToCart, message } = await dispatch(addToCart(product, true))
        toasterController(addedToCart, message)
    }

    const handleSubtractFromCart = async () => {
        if (quantity <= 1) return;
        const { removedFromCart, message } = await dispatch(removeFromCart(productId, !(quantity > 1)))
        toasterController(removedFromCart, message)
    }

    return (
        <div className="inline-flex items-center border border-gray-200 rounded-md">
            <button
                onClick={handleSubtractFromCart}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <HiMinus className="h-4 w-4 text-gray-600" />
            </button>
            <span className="px-4 py-2 text-sm text-gray-900 font-medium border-x border-gray-200">
                {quantity}
            </span>
            <button
                onClick={handleAddToCart}
                className="p-2 hover:bg-gray-50 transition-colors"
            >
                <HiPlus className="h-4 w-4 text-gray-600" />
            </button>
        </div>
    )
}

const ItemContent = ({ product } : { product: Product }) => {
    const { 
        productId, 
        productName, 
        imageUrl, 
        price, 
        discount, 
        quantity,
        category 
    } = product
    
    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveFromCart = async () => {
        const { removedFromCart, message } = await dispatch(removeFromCart(productId, true))

        if (removedFromCart) {
            toast.success(message)
        } else {
            toast.error(message)
        }
    }

    return (
        <div className="flex items-start space-x-6">
            {/* Product Image */}
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img 
                    src={imageUrl}
                    alt={productName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-base font-medium text-gray-900">
                            {truncateText(productName, 50)}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {category.categoryName}
                        </p>
                    </div>
                    <button
                        onClick={handleRemoveFromCart}
                        className="ml-4 p-2 -m-2 text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Remover</span>
                        <HiX className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <QuantityHandler product={product} />
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                            {getSpecialPriceStr(price * quantity, discount)}
                        </p>
                        {discount > 0 && (
                            <p className="mt-1 text-sm text-gray-500 line-through">
                                R$ {(price * quantity).toFixed(2)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemContent