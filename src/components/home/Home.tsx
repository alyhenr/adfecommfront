import { useDispatch, useSelector } from "react-redux"
import HeroBanner from "./HeroBanner"
import { fetchProductsThunk } from "../../store/actions"
import type { AppDispatch, RootState } from "../../store/reducers/store"
import { useEffect } from "react"
import type { Product } from "../../types"
import ProductCard from "../products/ProductCard"
import Loader from "../shared/Loader"
import ErrorMessage from "../shared/ErrorMessage"

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const topSellingProducts: Product[] = useSelector(
    (state: RootState) => state.productsState.products
  );
  const { errorMessage, isLoading } =  useSelector(
    (state: RootState) => state.errorsState
  );

  useEffect(() => {
    const params = new URLSearchParams()
    params.set("pageNumber", "0")
    params.set("pageSize", "10")
    params.set("sortBy", "price")
    params.set("sortOrder", "desc")
    dispatch(fetchProductsThunk(params.toString()))
  }, [dispatch])
  
  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>

      <div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-700 text-4xl font-bold">
            Produtos
          </h1>
          <span className="text-slate-700">
            Confira os mais vendidos do momento
          </span>
        </div>
      </div>

      {isLoading ? (
          <Loader text="Carregando produtos..."/>
        ) : errorMessage ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : (
          <div className="min-h-[700px]">
            <div className="pb-6 pt-14 grid 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
              {topSellingProducts &&
                topSellingProducts.map((p: Product, i: number) => (
                  <ProductCard key={i} {...p} />
                ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default Home