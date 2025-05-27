import type { Product } from "../../types"
import { truncateText } from "../../utils/common";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/actions";
import type { AppDispatch } from "../../store/reducers/store";
import toast from "react-hot-toast";
import { getSpecialPriceStr } from "../../utils/productsUtils";

const toastWatcher : Set<string> = new Set()
export const QuantityHanlder = ({ product } : { product: Product }) => {
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

    const handleAddToCart = () => {
        const { addedToCart, message } = dispatch(addToCart(product, true))
        toasterController(addedToCart, message)
    }

    const handleSubtractFromCart = () => {
        if (quantity <= 1) return;
        const { removedFromCart, message } = dispatch(removeFromCart(productId, !(quantity > 1)))
        toasterController(removedFromCart, message)
    }

    const btnStyles = "border-[1.2px] border-slate-800 px-3 py-1 rounded-full w-10 h-10 hover:cursor-pointer hover:bg-slate-800 hover:text-white transition duration-300";

    return <div className="flex gap-8 items-center">
        <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
            <button
                disabled={quantity == 0}
                onClick={handleSubtractFromCart}
                className={btnStyles}
            >
                -
            </button>
                {quantity}
            <button
                onClick={handleAddToCart}
                className={btnStyles}
            >
                +
            </button>
        </div>
    </div>
}

const ItemContent = ({ product } : { product: Product }) => {
    const { productId, 
            productName, 
            imageUrl, 
            price, 
            discount, 
            quantity } = product
    
    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveFromCart = () => {
        const { removedFromCart, message } = dispatch(removeFromCart(productId, true))

        if (removedFromCart) {
            toast.success(message)
        } else {
            toast.error(message)
        }
    }

    return (
        <div>
            <IoCloseCircle 
                size={25} 
                color="red"
                className="sm:hidden relative top-6 left-[95%] hover:scale-105 hover:cursor-pointer hover:opacity-80"
                onClick={handleRemoveFromCart}
            />
            <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-300 rounded-md px-2 lg:px-4 py-2 my-2">
                <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
                    <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-1 items-start">
                        <h3 className="lg:text-[15px] text-sm font-semibold text-slate-600">
                            {truncateText(productName, 50)}
                        </h3>
                    </div>

                    <div className="flex md:h-36 sm:w-48 w-12 shadow-md">
                        <IoCloseCircle 
                            size={32} 
                            color="red"
                            className="relative hidden sm:flex sm:-top-3 left-[90%] hover:scale-105 hover:cursor-pointer hover:opacity-80"
                            onClick={handleRemoveFromCart}
                        />
                        <img 
                            src={imageUrl}
                            alt={truncateText(productName, 50)}
                            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
                        />
                    </div>
                </div>
                <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                    {getSpecialPriceStr(price, discount)}
                </div>

                <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                    <QuantityHanlder product={product} />
                </div>

                <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                    {getSpecialPriceStr(price * quantity, discount)}
                </div>
            </div>
        </div>
    )
}

export default ItemContent