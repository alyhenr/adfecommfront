import { useDispatch, useSelector } from "react-redux"
import HeroBanner from "./HeroBanner"
import { fetchProductsThunk, fetchCategoriesThunk } from "../../store/actions"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import { useEffect } from "react"
import type { Product, Category } from "../../types"
import ProductCard from "../products/ProductCard"
import Loader from "../shared/Loader"
import ErrorMessage from "../shared/ErrorMessage"
import { FaAward, FaLeaf, FaTruck, FaStore } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useTranslation } from "react-i18next"

// Define type for category images
type CategoryImageMap = {
  [key: string]: string;
};

// Default category images - will be used if no image is provided in the category data
const categoryImages: CategoryImageMap = {
  "Molhos": "https://images.unsplash.com/photo-1606483956061-46a898dce538",
  "Massas": "https://images.unsplash.com/photo-1552611052-33e04de081de",
  "Bebidas": "https://images.unsplash.com/photo-1621267860478-fa4c5988a4bb",
  "Snacks": "https://images.unsplash.com/photo-1582461833047-2afd0994b746",
  "default": "https://images.unsplash.com/photo-1550367363-ea12860cc124"
};

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const topSellingProducts: Product[] = useSelector(
    (state: RootState) => state.productsState.products
  );
  const categories = useSelector(
    (state: RootState) => state.categoriesState.categories
  );
  const { errorMessage, isLoading } = useSelector(
    (state: RootState) => state.errorsState
  );

  const { t } = useTranslation();

  const features = [
    {
      icon: FaAward,
      title: t('home.features.authentic.title'),
      description: t('home.features.authentic.description')
    },
    {
      icon: FaLeaf,
      title: t('home.features.fresh.title'),
      description: t('home.features.fresh.description')
    },
    {
      icon: FaTruck,
      title: t('home.features.delivery.title'),
      description: t('home.features.delivery.description')
    },
    {
      icon: FaStore,
      title: t('home.features.experience.title'),
      description: t('home.features.experience.description')
    }
  ];

  useEffect(() => {
    // Fetch categories
    dispatch(fetchCategoriesThunk());

    // Fetch top selling products
    const params = new URLSearchParams();
    params.set("pageNumber", "0");
    params.set("pageSize", "8");
    params.set("sortBy", "price");
    params.set("sortOrder", "desc");
    dispatch(fetchProductsThunk(params.toString()));
  }, [dispatch]);

  // Helper function to get category image
  const getCategoryImage = (categoryName: string): string => {
    const key = Object.keys(categoryImages).find(k => categoryName.toLowerCase().includes(k.toLowerCase()));
    return key ? categoryImages[key] : categoryImages.default;
  };
  
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white border border-gray-100 hover:border-red-100 transition-all">
                <div className="w-12 h-12 flex items-center justify-center bg-red-50 rounded-sm mb-4">
                  <feature.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.categories.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('home.categories.description')}
            </p>
          </div>

          <div className="relative">
            <Swiper
              slidesPerView="auto"
              spaceBetween={24}
              centeredSlides={true}
              onInit={(swiper) => {
                swiper.slideTo(2);
              }}
            >
              {categories.map((category: Category) => (
                <SwiperSlide key={category.categoryId} className="!w-[280px] !h-auto">
                  <Link 
                    to={`/products?category=${category.categoryName}`}
                    className="group block relative h-[320px] overflow-hidden bg-gray-100 rounded-lg"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={getCategoryImage(category.categoryName)}
                        alt={category.categoryName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-colors"></div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{category.categoryName}</h3>
                      <p className="text-sm text-gray-200 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {t('home.categories.explore')} {category.categoryName.toLowerCase()}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.products.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('home.products.description')}
            </p>
          </div>

          {isLoading ? (
            <Loader text="Carregando produtos..." />
          ) : errorMessage ? (
            <ErrorMessage errorMessage={errorMessage} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {topSellingProducts.slice(0, 8).map((product: Product, index: number) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 font-medium hover:bg-black transition-colors"
            >
              {t('home.products.explore')}
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550367363-ea12860cc124"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 font-medium hover:bg-red-700 transition-colors"
          >
            {t('home.cta.explore')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;