import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsThunk } from "../store/actions";
import type { AppDispatch, RootState } from "../store/reducers/store";
import ProductCard from "./ProductCard";

const Products = () => {
   
  let { isLoading, errorMessage } = useSelector((state: RootState) => state.errorsState);
  const products = useSelector((state: RootState) => state.productsState.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [dispatch]);
  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      {isLoading ? (
        <p>Carregando...</p>
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
            {products &&
              products.map((p, i) => <ProductCard key={i} {...p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
