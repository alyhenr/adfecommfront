import type { Product, Pagination } from "../../types";
import { SET_FILTERED_PRODUCTS } from "../actions";

export type FilteredProductState = {
  filteredProducts: Product[];
  pagination: Pagination;
};

const initialState: FilteredProductState = {
  filteredProducts: [],
  pagination: {
    pageNumber: 1,
    totalPages: 1,
    totalElements: 0,
    pageSize: 10,
    lastPage: true,
  },
};

const filteredProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      };
    default:
      return state;
  }
};

export default filteredProductReducer; 