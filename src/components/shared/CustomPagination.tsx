import { Pagination } from "@mui/material"
import type { Pagination as PaginationType } from "../../types"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

type PaginationProps = {
  paginationInfo : PaginationType,
}

const CustomPagination = ({ paginationInfo } : PaginationProps) => {
  const [searchParams] = useSearchParams()
  const pathName = useLocation().pathname
  const params = new URLSearchParams(searchParams)
  const navigate = useNavigate()

  const currPage = Number(searchParams.get("page") || 1)
    
  const changePage = (_ev: React.ChangeEvent<unknown>, value: number) => {
    params.set("page", value.toString())
    navigate(`${pathName}?${params.toString()}`)
  }

  return (
    <Pagination
      defaultPage={1} 
      defaultValue={0} 
      page={currPage}
      count={paginationInfo.totalPages} 
      siblingCount={1} 
      variant="outlined" 
      color="primary"
      onChange={(ev: React.ChangeEvent<unknown>, value: number) => changePage(ev, value)}
    />
  )
}

export default CustomPagination