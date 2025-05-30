import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategoriesThunk } from "../../store/actions";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { type Product } from "../../types";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import CustomPagination from "../shared/CustomPagination";
import ErrorMessage from "../shared/ErrorMessage";
import { FiSearch, FiSliders } from "react-icons/fi";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const { isLoading, errorMessage } = useSelector(
    (state: RootState) => state.errorsState
  );
  const { products, pagination } = useSelector(
    (state: RootState) => state.productsState
  );
  const { filteredProducts } = useSelector(
    (state: RootState) => state.filteredProductsState
  );

  const categories = useSelector(
    (state: RootState) => state.categoriesState.categories
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const path: string = useLocation().pathname;
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [filterByPrice, setFilterByPrice] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useProductFilter() //fetch products here
  useEffect(() => {
    const {} = new Promise(async () => {
      await dispatch(fetchCategoriesThunk())
    })
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      updateKeyword(keyword);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  const updateKeyword = (keyword: string) => {
    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }
    navigate(`${path}?${params}`);
  }
      
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Filter */}
      <aside className="w-64 border-r border-gray-100 p-6 hidden lg:block">
        <Filter categories={categories} setFilterByPrice={setFilterByPrice}/>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Search Bar */}
        <div className="border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {                 
                  if (e.key === "Enter") {
                    updateKeyword(e.currentTarget.value);
                  }
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2.5 px-4 pl-11 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-shadow"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" onClick={() => updateKeyword(keyword)}/>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-6 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader text="Carregando produtos..." />
            </div>
          ) : errorMessage ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <ErrorMessage errorMessage={errorMessage} />
            </div>
          ) : (
            <div className="min-h-[700px]">
              <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8">
                {(filteredProducts.length > 0 ?
                  filteredProducts.map((p: Product, i: number) => (
                    <ProductCard key={i} {...p} />
                  )) : (
                    products.map((p: Product, i: number) => (
                      <ProductCard key={i} {...p} />
                    ))
                  ))}
              </div>
              {!filterByPrice && 
                <div className="flex justify-center pt-12">
                  <CustomPagination paginationInfo={pagination}/>
                </div>
              }
            </div>
          )}
        </div>
      </main>

      {/* Mobile Filter Button */}
      <button className="lg:hidden fixed bottom-6 right-6 bg-white text-gray-700 p-3 rounded-sm shadow-lg border border-gray-200">
        <FiSliders className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Products;
