import api from "../api";

export const getProducts = async (queryString: string = "") => {
  const response = await api.get(`/public/products?${queryString}`);
  return response.data;
};

export const getProductById = async (productId: number) => {
  const response = await api.get(`/public/products/${productId}`);
  return response.data;
};

export const getProductsByCategory = async (categoryId: number) => {
  const response = await api.get(`/public/products/category/${categoryId}`);
  return response.data;
};