import { useState } from "react";
import type { Product } from "../../types";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { getSpecialPriceStr } from "../../utils/productsUtils";
import { truncateText } from "../../utils/common";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/reducers/store";
import { addToCart } from "../../store/actions";
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
  let btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState<Product>();
  const isAvailable: boolean = Boolean(quantity && quantity > 0);

  const dispatch = useDispatch<AppDispatch>();

  if (discount >= 1) discount = 0;

  const handleProductView = () => {
    setSelectedViewProduct(product);
    setOpenModal(true);
  };

  const handleAddToCart = () => {
    const { addedToCart, message, type } = dispatch(addToCart(product))
    
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
  
  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 flex flex-col justify-between">
      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-red-50 text-red-600 px-2 py-1 text-xs font-medium z-10">
          -{(discount * 100).toFixed(0)}% OFF
        </div>
      )}
      <button 
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 p-2 hover:bg-gray-100 transition-colors z-10"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 w-4 h-4" />
        ) : (
          <FaRegHeart className="text-gray-400 w-4 h-4" />
        )}
      </button>
      <div
        className="relative overflow-hidden aspect-square cursor-pointer bg-gray-50"
        onClick={handleProductView}
      >
        <img
          className="w-full h-1/2 object-cover object-center group-hover:opacity-90 transition-opacity duration-200"
          src={imageUrl}
          alt={productName}
        />
      </div>
      <div className="p-4 flex flex-col gap-1 justify-between h-1/2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1">
            {String(category.categoryName)}
          </span>
        </div>
        <h2
          onClick={handleProductView}
          className="font-medium text-gray-900 hover:text-red-600 transition-colors duration-200 cursor-pointer"
        >
          {truncateText(productName, 50)}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {truncateText(description, 80)}
        </p>
        <div className="flex items-center justify-between mt-1">
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
            onClick={handleAddToCart}
            className={`
              flex items-center gap-2 px-4 py-2
              ${isAvailable 
                ? 'bg-gray-900 hover:bg-black text-white cursor-pointer' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              transition-all duration-200
            `}
          >
            <FaShoppingCart className="w-4 h-4" />
            <span className="hidden md:inline text-sm font-medium">
              {isAvailable ? "Adicionar" : "Esgotado"}
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
