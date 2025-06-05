import { useEffect, useState } from "react";
import type { Category } from "../../types";
import { FiRefreshCcw, FiCheck } from "react-icons/fi";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import useProductFilter from "../../hooks/useProductFilter";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import { filterProducts } from "../../store/actions";
import { useTranslation } from "react-i18next";
type FilterProps = {
  categories: Category[];
  setFilterByPrice: (value: boolean) => void;
  onFilterApply?: () => void;
};

type SortOption = {
  label: string;
  property: string;
  order: "asc" | "desc";
};

const Filter = ({ categories, setFilterByPrice, onFilterApply }: FilterProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const sortOptions: SortOption[] = [
    { label: t('products.filters.sort.recent'), property: "productId", order: "desc" },
    { label: t('products.filters.sort.nameAsc'), property: "productName", order: "asc" },
    { label: t('products.filters.sort.nameDesc'), property: "productName", order: "desc" },
    { label: t('products.filters.sort.priceAsc'), property: "price", order: "asc" },
    { label: t('products.filters.sort.priceDesc'), property: "price", order: "desc" },
  ];
  

  const categoryMap: Record<number, string> = { [-1]: "" };
  categories.forEach((category) => {
    categoryMap[category.categoryId] = category.categoryName;
  });

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const path: string = useLocation().pathname;

  const [category, setCategory] = useState<Category>({
    categoryId: -1,
    categoryName: "",
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([0, 1000]);
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("productId:desc");

  const products = useSelector((state: RootState) => state.productsState.products);
  const filteredProducts = useSelector((state: RootState) => state.filteredProductsState.filteredProducts);
  const [previewCount, setPreviewCount] = useState<number>(products.length);

  useProductFilter();

  useEffect(() => {
    const currCategory: string = searchParams.get("category") || "";
    const currSortBy = searchParams.get("sortBy") || "productId";
    const currSortOrder = searchParams.get("sortOrder") || "desc";

    setCategory(() => {
      return {
        categoryId:
          categories.find((c) => c.categoryName == currCategory)?.categoryId ||
          -1,
        categoryName: currCategory,
      };
    });
    setSelectedSort(`${currSortBy}:${currSortOrder}`);
  }, [searchParams]);

  useEffect(() => {
    const count = products.filter((product) => {
      const price = product.price * (1 - product.discount);
      return price >= priceRange[0] && price <= priceRange[1];
    }).length;
    setPreviewCount(count);
  }, [products, priceRange]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const price = product.price * (1 - product.discount);
      return price >= appliedPriceRange[0] && price <= appliedPriceRange[1];
    });
    
    if (isPriceFilterActive) {
      dispatch(filterProducts(filtered));
      params.delete("page")
    } else {
      dispatch(filterProducts(products));
    }
  }, [products, appliedPriceRange, isPriceFilterActive, dispatch]);

  const handleCategory = (categoryId: number) => {
    if (categoryId == -1) params.delete("category");
    else
      params.set("category", categoryMap[categoryId] || category.categoryName);

    setCategory((prev) => {
      if (categoryMap[categoryId]) {
        return {
          categoryId,
          categoryName: categoryMap[categoryId],
        };
      } else return prev;
    });
    navigate(`${path}?${params}`);
  };

  const handleSort = (value: string) => {
    const [property, order] = value.split(":");
    setSelectedSort(value);
    params.set("sortBy", property);
    params.set("sortOrder", order);
    navigate(`${path}?${params}`);
  };

  const handleApplyPriceFilter = () => {
    setFilterByPrice(true);
    setAppliedPriceRange(priceRange);
    setIsPriceFilterActive(true);
    onFilterApply?.();
  };

  const handleRemovePriceFilter = () => {
    setFilterByPrice(false);
    setAppliedPriceRange([0, 1000]);
    setPriceRange([0, 1000]);
    setIsPriceFilterActive(false);
    onFilterApply?.();
  };

  const clearFilters = () => {
    setCategory({ categoryId: -1, categoryName: t('products.filters.all') });
    setPriceRange([0, 0]);
    setSelectedSort("");
    setFilterByPrice(false);
    onFilterApply?.();
  };

  return (
    <div className="text-gray-600 z-1000">
     
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">{t('products.filters.categories')}</h3>
        <div className="space-y-2">
          <label className="relative flex items-start group cursor-pointer py-1">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name="category"
                className="peer h-4 w-4 opacity-0 absolute"
                checked={category.categoryId === -1}
                onChange={() => handleCategory(-1)}
              />
              <div className="w-4 h-4 border border-gray-300 rounded-full peer-checked:border-[5px] peer-checked:border-red-500 transition-all"></div>
            </div>
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{t('products.filters.all')}</span>
          </label>
          {categories.map((c) => (
            <label key={c.categoryId} className="relative flex items-start group cursor-pointer py-1">
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="category"
                  className="peer h-4 w-4 opacity-0 absolute"
                  checked={category.categoryId === c.categoryId}
                  onChange={() => handleCategory(c.categoryId)}
                />
                <div className="w-4 h-4 border border-gray-300 rounded-full peer-checked:border-[5px] peer-checked:border-red-500 transition-all"></div>
              </div>
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{c.categoryName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">{t('products.filters.price')}</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="number"
                min="0"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full bg-white border border-gray-200 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                placeholder="Min"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                min="0"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full bg-white border border-gray-200 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-gray-500">
              {isPriceFilterActive ? (
                <span>{t('products.filters.applied', { count: filteredProducts.length })}</span>
              ) : (
                <span>{t('products.filters.found', { count: previewCount })}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleApplyPriceFilter}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                  isPriceFilterActive
                    ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {isPriceFilterActive && <FiCheck className="w-3.5 h-3.5" />}
                <span>
                  {isPriceFilterActive
                    ? t('products.filters.update')
                    : t('products.filters.apply')}
                </span>
              </button>
              {isPriceFilterActive && (
                <button
                  onClick={handleRemovePriceFilter}
                  className="text-red-500 hover:text-red-600 cursor-pointer text-sm font-medium"
                >
                  {t('products.filters.remove')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-8">
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">{t('products.filters.sort')}</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label key={`${option.property}:${option.order}`} className="relative flex items-start group cursor-pointer py-1">
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="sort"
                  className="peer h-4 w-4 opacity-0 absolute"
                  checked={selectedSort === `${option.property}:${option.order}`}
                  onChange={() => handleSort(`${option.property}:${option.order}`)}
                />
                <div className="w-4 h-4 border border-gray-300 rounded-full peer-checked:border-[5px] peer-checked:border-red-500 transition-all"></div>
              </div>
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 border border-gray-200 transition-colors text-sm font-medium group"
      >
        <FiRefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
        <span>{t('products.filters.clear')}</span>
      </button>
    </div>
  );
};

export default Filter;
