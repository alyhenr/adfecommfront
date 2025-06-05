import { useState } from "react";
import type { Product } from "../../types";
import { FaShoppingCart, FaHeart, FaRegHeart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { getSpecialPriceStr } from "../../utils/productsUtils";
import { truncateText } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import { addToCart, removeFromCart } from "../../store/actions";
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [_selectedViewProduct, setSelectedViewProduct] = useState<Product>();
  const isAvailable: boolean = Boolean(quantity && quantity > 0);

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cartState.products);
  const isInCart = cartItems.some(item => item.productId === productId);

  if (discount >= 1) discount = 0;

  const handleProductView = () => {
    if (isInCart) return;

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

  const handleIncreaseQuantity = async () => {
    const quantityInCart = cartItems.find(item => item.productId === productId)?.quantity || 0;
    const availableQuantity = quantity;
    
    if (quantityInCart >= availableQuantity) {
      toast.error("Quantidade insuficiente em estoque.")
      return;
    }

    await dispatch(addToCart({data: product, updateQtde: true})).unwrap();
  }

  const handleDecreaseQuantity = async () => {
    await dispatch(removeFromCart({productId, clean: false})).unwrap();
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
        className={`relative overflow-hidden aspect-square bg-gray-50 ${isInCart ? 'border-1 border-green-500' : 'cursor-pointer'}`}
        onClick={handleProductView}
      >
        <img
          className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-200"
          src={imageUrl}
          alt={productName}
        />
        {/* Green overlay when product is in cart */}
        {isInCart && (
          <>
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <FaShoppingCart className="w-10 h-10 text-green-600" />
                <span className="absolute -top-2 -right-4 text-sm p-1 rounded-full w-7 h-7 flex items-center justify-center bg-white text-green-600 font-bold">
                    {cartItems.find(item => item.productId === productId)?.quantity}
                </span>
              </div>              
            </div>
          </>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex items-center gap-2 justify-between relative w-full">
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1  rounded">
            {String(category.categoryName)}
          </span>
          {isInCart && <div className="flex items-center justify-end w-fit p-1 rounded-md absolute -top-9 -right-5 z-10 gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDecreaseQuantity();
              }}
              className="p-2 rounded-full bg-white text-gray-700 shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:bg-gray-100"
            >
              <FaMinus className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleIncreaseQuantity();
              }}
              className="p-2 rounded-full bg-white text-gray-700 shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:bg-gray-100"
            >
              <FaPlus className="w-4 h-4" />
            </button>
          </div>}
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
        <div className="flex items-center justify-between flex-wrap mt-auto pt-3">
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
            disabled={!isAvailable}
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-200 w-full justify-center mt-2
              ${!isAvailable 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : isInCart
                  ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                  : 'bg-gray-900 hover:bg-black text-white cursor-pointer'}`}
          >
            {isInCart ? (
              <>
                <FaTrash className="w-4 h-4" />
                <span className="text-sm font-medium">{t('products.remove')}</span>
              </>
            ) : (
              <>
                <FaShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {!isAvailable ? t('products.outOfStock') : t('products.addToCart')}
                </span>
              </>
            )}
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
