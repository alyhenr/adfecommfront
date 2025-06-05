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
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
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
    }, 1000);

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
    window.scrollTo(0, 0);
  }
      
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Filter - Hidden on mobile */}
      <aside className="w-64 border-r border-gray-100 p-6 hidden sm:block">
        <Filter categories={categories} setFilterByPrice={setFilterByPrice}/>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Search Bar */}
        <div className="sticky top-16 z-50 bg-white border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={t('products.search.placeholder')}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {                 
                  if (e.key === "Enter") {
                    updateKeyword(e.currentTarget.value);
                  }
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-4 pl-11 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-shadow text-sm"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" onClick={() => updateKeyword(keyword)}/>
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="sm:hidden ml-3 bg-red-500 text-white p-2 rounded-full"
              >
                <FiSliders className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-3 py-4 md:px-6 md:py-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader text={t('products.loading')} />
            </div>
          ) : errorMessage ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <ErrorMessage errorMessage={errorMessage} />
            </div>
          ) : (
            <div className="min-h-[700px]">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-6 md:gap-y-8">
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
                <div className="flex justify-center pt-8 md:pt-12">
                  <CustomPagination paginationInfo={pagination}/>
                </div>
              }
            </div>
          )}
        </div>
      </main>

      {/* Mobile Filter Modal */}
      <Dialog
        open={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        className="relative z-50 sm:hidden"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="w-full h-full bg-white p-6 overflow-y-auto mt-30 sm:mt-0">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-medium text-gray-900">{t('products.filtersTitle')}</div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <Filter 
              categories={categories} 
              setFilterByPrice={setFilterByPrice}
              onFilterApply={() => setIsMobileFilterOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Products;
