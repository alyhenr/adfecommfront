import type { Pagination as PaginationType } from "../../types"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

type PaginationProps = {
  paginationInfo : PaginationType,
}

const CustomPagination = ({ paginationInfo } : PaginationProps) => {
  const [searchParams] = useSearchParams()
  const pathName = useLocation().pathname
  const params = new URLSearchParams(searchParams)
  const navigate = useNavigate()

  const currentPage = Number(searchParams.get("page") || 1)
  const totalPages = paginationInfo.totalPages
    
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return
    params.set("page", page.toString())
    navigate(`${pathName}?${params.toString()}`)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`
            px-3 py-1 text-sm font-medium
            ${currentPage === i
              ? "text-gray-900 border-t-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700 hover:border-t-2 hover:border-gray-200"}
            transition-colors
          `}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center space-x-1">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          p-1 text-gray-400
          ${currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:text-gray-700"}
          transition-colors
        `}
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          p-1 text-gray-400
          ${currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:text-gray-700"}
          transition-colors
        `}
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </nav>
  )
}

export default CustomPagination