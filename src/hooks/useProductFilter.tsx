import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { fetchProductsThunk } from "../store/actions"
import type { AppDispatch } from "../store/reducers/store"

const useProductFilter = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const params = new URLSearchParams()

    const currPage = Number(searchParams.get("page") || 1)
    const sortOrder = searchParams.get("sortBy") || "asc"
    const category = searchParams.get("category")
    const keyword = searchParams.get("keyword")

    params.set("pageNumber", (currPage - 1).toString())
    params.set("sortBy", "price")
    params.set("sortOrder", sortOrder)

    if (category) {
        params.set("category", category)
    }

    if (keyword) {
        params.set("keyword", keyword)
    }

    const queryString = params.toString()
    console.log(queryString);
    dispatch(fetchProductsThunk(queryString))
  }, [dispatch, searchParams])
  
}

export default useProductFilter