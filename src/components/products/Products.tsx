import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriesThunk } from "../../store/actions";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { type Product } from "../../types";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import CustomPagination from "../shared/CustomPagination";
import ErrorMessage from "../shared/ErrorMessage";

const Products = () => {
  const { isLoading, errorMessage } = useSelector(
    (state: RootState) => state.errorsState
  );
  const { products, pagination } = useSelector(
    (state: RootState) => state.productsState
  );

  const categories = useSelector(
    (state: RootState) => state.categoriesState.categories
  );

  const dispatch = useDispatch<AppDispatch>();

  useProductFilter()
  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);


  return (
    <div className="flex justify-center">
      <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto w-[80%]">
        <Filter categories={categories}/>
        {isLoading ? (
          <Loader text="Carregando produtos..."/>
        ) : errorMessage ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : (
          <div className="min-h-[700px]">
            <div className="pb-6 pt-14 grid 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
              {products &&
                products.map((p: Product, i: number) => (
                  <ProductCard key={i} {...p} />
                ))}
            </div>
            <div className="flex justify-center pt-10">
              <CustomPagination paginationInfo={pagination}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
