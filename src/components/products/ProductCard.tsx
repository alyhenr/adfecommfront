import { useState } from "react";
import type { Product } from "../../types";
import { FaShoppingCart, FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { getSpecialPriceStr } from "../../utils/productsUtils";
import { truncateText } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import { addToCart, removeFromCart } from "../../store/actions";
import { toast } from "react-hot-toast"

const ProductCard = (product: Product) => {
  let {
    productId,
    productName,
    description,
    price,
    discount,
    quantity,
    imageUrl,
    category,
  } = product;

  const [openModal, setOpenModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  let btnLoader = false;
  const [_selectedViewProduct, setSelectedViewProduct] = useState<Product>();
  const isAvailable: boolean = Boolean(quantity && quantity > 0);

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cartState.products);
  const isInCart = cartItems.some(item => item.productId === productId);

  if (discount >= 1) discount = 0;

  const handleProductView = () => {
    setSelectedViewProduct(product);
    setOpenModal(true);
  };

  const handleAddToCart = async () => {
    const { message, type } = await dispatch(addToCart({data: product})).unwrap()
    
    switch (type) {
      case "ok":
        toast.success(message)        
        break;
      case "alert":
        toast.error(message)
        break;
      default:
        toast.error("Product not added to cart.")
        break;
    }  
  }

  const handleRemoveFromCart = async () => {
    const { removedFromCart, message } = await dispatch(removeFromCart({productId, clean: true})).unwrap()  
    
    if (removedFromCart) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  
  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 flex flex-col h-full relative">
      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-red-50 text-red-600 px-2 py-1 text-xs font-medium z-10">
          -{(discount * 100).toFixed(0)}% OFF
        </div>
      )}
      <button 
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
          isWishlisted 
            ? 'bg-red-500 text-white' 
            : 'bg-white border border-gray-200 shadow-sm hover:bg-gray-50'
        }`}
      >
        {isWishlisted ? (
          <FaHeart className="w-4 h-4" />
        ) : (
          <FaRegHeart className="w-4 h-4 text-gray-600" />
        )}
      </button>
      <div
        className="relative overflow-hidden aspect-square cursor-pointer bg-gray-50"
        onClick={handleProductView}
      >
        <img
          className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-200"
          src={imageUrl}
          alt={productName}
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {String(category.categoryName)}
          </span>
        </div>
        <h2
          onClick={handleProductView}
          className="font-medium text-gray-900 hover:text-red-600 transition-colors duration-200 cursor-pointer"
        >
          {truncateText(productName, 50)}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2 flex-grow">
          {truncateText(description, 80)}
        </p>
        <div className="flex items-center justify-between flex-wrap mt-auto pt-3 sm:items-start flex-col gap-2">
          <div className="flex flex-col">
            {discount > 0 ? (
              <>
                <span className="text-sm text-gray-500 line-through">
                  R${price.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-lg font-medium text-gray-900">
                  {getSpecialPriceStr(price, discount)}
                </span>
              </>
            ) : (
              <span className="text-lg font-medium text-gray-900">
                R${price.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>
          <button
            disabled={!isAvailable || btnLoader}
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`cursor-pointer
              flex items-center gap-2 px-4 py-2 rounded w-full sm:w-auto justify-center
              transition-all duration-200
              ${!isAvailable 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : isInCart
                  ? isHovered
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-50 text-green-600 hover:bg-red-500 hover:text-white'
                  : 'bg-gray-900 hover:bg-black text-white cursor-pointer'}
            `}
          >
            {isInCart ? (
              isHovered ? <FaTrash className="w-4 h-4" /> : <FaShoppingCart className="w-4 h-4" />
            ) : (
              <FaShoppingCart className="w-4 h-4" />
            )}
            <span className="text-sm font-medium h-5 h-auto w-full text-center flex items-center justify-center">
              {!isAvailable 
                ? "Esgotado" 
                : isInCart 
                  ? isHovered 
                    ? "Remover" 
                    : "No carrinho" 
                  : "Adicionar"}
            </span>
          </button>
        </div>
      </div>
      <ProductViewModal
        product={product}
        isAvailable={isAvailable}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
    </div>
  );
};

export default ProductCard;
