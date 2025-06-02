import api from "../api";

export const products = {
  getProducts: async (queryString: string = "") => {
    const response = await api.get(`/public/products?${queryString}`);
    return response.data;
  },
  getProductById: async (productId: number) => {
    const response = await api.get(`/public/products/${productId}`);
    return response.data;
  },
  getProductsByCategory: async (categoryId: number) => {
    const response = await api.get(`/public/products/category/${categoryId}`);
    return response.data;
  }
}

export default products;