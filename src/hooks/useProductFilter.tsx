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
    const sortBy = searchParams.get("sortBy") || "productId"
    const sortOrder = searchParams.get("sortOrder") || "asc"
    const category = searchParams.get("category")
    const keyword = searchParams.get("keyword")

    params.set("pageNumber", (currPage - 1).toString())
    params.set("sortBy", sortBy)
    params.set("sortOrder", sortOrder)

    if (category) {
        params.set("category", category)
    }

    if (keyword) {
        params.set("keyword", keyword)
    }

    const queryString = params.toString()
    new Promise(async () => {
      await dispatch(fetchProductsThunk(queryString))
    })
  }, [dispatch, searchParams])
  
}

export default useProductFilter