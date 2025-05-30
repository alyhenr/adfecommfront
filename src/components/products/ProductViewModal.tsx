import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { Product } from "../../types";
import { getSpecialPriceStr } from "../../utils/productsUtils";
import { MdClose, MdDone, MdLocalShipping } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

type ProductViewModalProps = {
  product: Product;
  isAvailable: boolean;
  isOpen: boolean;
  setIsOpen: Function;
};

const ProductViewModal = ({
  product,
  isAvailable,
  isOpen,
  setIsOpen,
}: ProductViewModalProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={() => setIsOpen(false)}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40 transition-opacity" />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative transform overflow-hidden bg-white shadow-xl transition-all w-full max-w-3xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 transition-colors rounded-sm z-10"
            >
              <MdClose className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-gray-50">
                {/* Discount Tag */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-50 text-red-600 px-3 py-1 text-sm font-medium">
                    -{(product.discount * 100).toFixed(0)}% OFF
                  </div>
                )}
                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/80 transition-colors rounded-sm bg-white/60"
                >
                  {isWishlisted ? (
                    <FaHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <img
                  className="w-full h-full object-cover"
                  src={product.imageUrl}
                  alt={product.productName}
                />
              </div>
              
              <div className="p-6 flex flex-col gap-4">
                <DialogTitle className="text-2xl font-medium text-gray-900">
                  {product.productName}
                </DialogTitle>

                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    {product.discount > 0 ? (
                      <>
                        <span className="text-3xl font-medium text-gray-900">
                          {getSpecialPriceStr(product.price, product.discount)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          R${product.price.toFixed(2).replace(".", ",")}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-medium text-gray-900">
                        R${product.price.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`
                      px-3 py-1 text-sm font-medium flex items-center gap-2
                      ${isAvailable 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'}
                    `}>
                      {isAvailable ? (
                        <>
                          <MdDone className="w-4 h-4" />
                          <span>Em estoque</span>
                        </>
                      ) : (
                        <>
                          <MdClose className="w-4 h-4" />
                          <span>Esgotado</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4">
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MdLocalShipping className="w-5 h-5" />
                    <span className="text-sm">Frete grátis para todo o Brasil</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                  {isAvailable && (
                    <button
                      className="flex-1 px-6 py-2.5 bg-gray-900 text-white font-medium hover:bg-black transition-colors"
                    >
                      Adicionar ao carrinho
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductViewModal;
