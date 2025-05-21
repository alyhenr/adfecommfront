import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { Product } from "../../types";
import { getSpecialPriceStr } from "../../utils/productsUtils";
import { Divider } from "@mui/material";
import Status from "../shared/Status";
import { MdClose, MdDone } from "react-icons/md";

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
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(false)}
        __demoMode
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-400 opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full"
            >
              {product.imageUrl && (
                <div className="flex justify-center aspact-[3/2]">
                  <img
                    className="w-full h-full cursor-pointer transiction-transform duration-300 transform hover:scale-101"
                    src={product.imageUrl}
                    alt={product.productName}
                  />
                </div>
              )}
              <div className="px-6 pt-6 pb-2">
                <DialogTitle
                  as="h1"
                  className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800"
                >
                  {product.productName}
                </DialogTitle>

                <div className="space-y-2 text-gray-700 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    {product.discount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through">
                          R${product.price.toFixed(2).replace(".", ",")}
                        </span>
                        <span className="sm:text-xl font-semibold text-slate-800">
                          {getSpecialPriceStr(product.price, product.discount)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold">
                        {" "}
                        R$
                        {product.price.toFixed(2).toString().replace(",", ".")}
                      </span>
                    )}

                    {isAvailable ? (
                      <Status
                        text="Em estoque"
                        bg="bg-teal-200"
                        Icon={MdDone}
                        color="text-teal-900"
                      />
                    ) : (
                      <Status
                        text="Esgotado"
                        Icon={MdClose}
                        bg="bg-rose-200"
                        color="text-rose-700"
                      />
                    )}
                  </div>

                  <Divider />

                  <p className="mt-2">{product.description}</p>
                </div>
              </div>

              <div className="px-6 py-4 flex justify-end gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md cursor-pointer hover:opacity-80"
                >
                  Voltar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductViewModal;
