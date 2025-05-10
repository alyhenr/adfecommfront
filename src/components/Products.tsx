import { FaExclamationTriangle } from "react-icons/fa";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

const Products = () => {
  let isLoading: boolean = false;
  let errorMessage: string = "";

  const mockProduct: Product = {
    productId: 1,
    productName: "Mock product",
    imageUrl:
      "https://abrale.org.br/wp-content/uploads/2022/07/shutterstock_288575585.jpg",
    description:
      "A cool product description uses compelling language to create a vivid image and highlight the benefits of a product.",
    quantity: 10,
    price: 10.57,
    discount: 0.25,
    category: {
      categoryId: 1,
      categoryName: "category name",
    },
  };

  const mockProductArr: Product[] = Array(10)
    .fill(0)
    .map((_) => mockProduct);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      {isLoading ? (
        <p>It's loading...</p>
      ) : errorMessage ? (
        <div className="flex justify-center items-center  h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-4xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 gap-y-6 gap-x-6">
            {mockProductArr &&
              mockProductArr.map((p, i) => <ProductCard key={i} {...p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
