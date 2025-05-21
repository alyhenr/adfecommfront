import { useState } from "react";
import type { Product } from "../../types";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { getSpecialPriceStr } from "../../utils/productsUtils";
import { truncateText } from "../../utils/common";

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
  let btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState<Product>();
  const isAvailable: boolean = Boolean(quantity && quantity > 0);

  if (discount >= 1) discount = 0;

  const handleProductView = () => {
    setSelectedViewProduct(product);
    setOpenModal(true);
  };

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 min-w-fit">
      <div
        className="w-full overflow-hidden aspect-[1.3]"
        onClick={() => {
          handleProductView();
        }}
      >
        <img
          className="w-full h-full cursor-pointer transiction-transform duration-300 transform hover:scale-105"
          src={imageUrl}
          alt={productName}
        />
      </div>
      <div className="p-4">
        <h2
          onClick={() => {
            handleProductView();
          }}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {truncateText(productName, 70)}
        </h2>
        <div className="min-h-30 max-h-30">
          <p className="text-gray-600 text-sm">{truncateText(description)}</p>
        </div>
        <div className="flex items-center justify-between gap-5">
          {discount > 0 ? (
            <div className="flex flex-col">
              <span className="text-gray-400 line-through">
                R${price.toFixed(2).toString().replace(".", ",")}
              </span>
              <span className="text-xl font-bold text-slate-700">
                {getSpecialPriceStr(product.price, product.discount)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-slate-700">
              {"  "}
              R${price.toFixed(2).toString().replace(".", ",")}
            </span>
          )}
          <button
            disabled={!isAvailable || btnLoader}
            onClick={() => {}}
            className={`bg-blue-500 ${
              isAvailable
                ? "hover:cursor-pointer opacity-100 hover:bg-blue-600"
                : "opacity-70"
            } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
          >
            <FaShoppingCart className="mr-2" />
            <span className="hidden md:flex">
              {isAvailable ? "Comprar" : "Esgotado"}
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
