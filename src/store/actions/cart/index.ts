import { setCartItems } from "../../reducers/cart/cartReducer";
import { setError } from "../../reducers/errors/errorReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product, CartItem, Cart } from "../../../types";
import type { CartResponse } from "../../types/cart";
import type { RootState } from "../../types/root";
import { AxiosError, type AxiosResponse } from "axios";
import api from "../../../api/api";
import { truncateText } from "../../../utils/common";
import { getProductById } from "../../../api/products/products";

export const getUserCart = createAsyncThunk(
    'cart/getUserCart',
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;
        if (state.cartState.products.length > 0) return { success: true, message: "Carrinho salvo" };
        
        try {
            dispatch(setError({ errorMessage: "", isLoading: true }));
            
            const { data }: AxiosResponse<CartResponse> = await api.get(`/users/carts/user`);
            
            if (data instanceof AxiosError) throw data;

            if (data.cartId > 0 && state.cartState.cartId <= 0) {
                const products: Product[] = data.cartItems.map(ci => ci.product);
                dispatch(
                    setCartItems({
                        cartId: data.cartId,
                        products: products,
                        totalPrice: data.totalPrice,
                    })
                );

                localStorage.setItem("cartItems", JSON.stringify({
                    cartId: data.cartId,
                    products: products,
                    totalPrice: data.totalPrice,
                }));
            }

            dispatch(setError({ errorMessage: "", isLoading: false }));
            return { success: true, message: "Carrinho salvo" };
        } catch (error) {            
            if (error instanceof AxiosError) {
                dispatch(setError({ 
                    errorMessage: error?.response?.data?.message || "Falha ao buscar carrinho...", 
                    isLoading: false
                }));
            } else if (error instanceof Error) {
                dispatch(setError({ 
                    errorMessage: error.message, 
                    isLoading: false
                }));
            }

            return { success: false, message: "Falha ao buscar carrinho..." };
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ data, updateQtde = false, forceFetch = true }: { 
        data: Product; 
        updateQtde?: boolean; 
        forceFetch?: boolean; 
    }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { products: cartItems } = state.cartState;
    
    
    let existingProduct = state.productsState.products.find(p => p.productId === data.productId);
    
    if (!existingProduct) {
        if (forceFetch) {
            const response: Product = await getProductById(data.productId);
            if (response instanceof AxiosError) throw response;
            else {
                if (response.quantity < data.quantity + 1) {
                    return { addedToCart: false, message: `${truncateText(data.productName, 50)} está fora de estoque`, type: "alert" };
                } else {
                    existingProduct = response;
                }
            }
        }
    }

    if (!existingProduct) return { addedToCart: false, message: "Produto não encontrado, atualize a página", type: "alert" };
    
    let updatedCartItems = [...cartItems];
    let foundProduct = updatedCartItems.find(p => p.productId === data.productId);
    
    if (foundProduct) {
        if (!updateQtde) return { addedToCart: false, message: `${data.productName} já está no carrinho`, type: "ok" };

        if (foundProduct.quantity < existingProduct.quantity) {
            updatedCartItems = updatedCartItems.map(item => {
                if (item.productId == foundProduct.productId) {
                    return { ...foundProduct, quantity: foundProduct.quantity + (updateQtde ? 1 : 0) };
                } else {
                    return item;
                }
            });
        } else {
            return { addedToCart: false, message: `${truncateText(data.productName, 50)} está fora de estoque`, type: "alert" };
        }
    } else {
        updatedCartItems.push({ ...existingProduct, quantity: 1 });
    }

    const updatedTotal = updatedCartItems.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
    );  

    localStorage.setItem("cartItems", JSON.stringify({
        cartItems: state.cartState.cartId,
        products: updatedCartItems,
        totalPrice: updatedTotal,
    }));

    dispatch(
        setCartItems({
            ...state.cartState,
            products: updatedCartItems,
            totalPrice: updatedTotal,
        })
    );

    return { addedToCart: true, message: `${truncateText(data.productName, 50)} adicionado ao carrinho`, type: "ok" };
});

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ productId, clean = false, forceFetch = true }: {
        productId: number;
        clean?: boolean;
        forceFetch?: boolean;
    }, { dispatch, getState }) => {
        const state = getState() as RootState;
    const { products: cartItems } = state.cartState;
    let existingProduct = state.productsState.products.find(p => p.productId === productId);
    
    if (!existingProduct) {
        if (forceFetch) {
            const response: Product = await getProductById(productId);
            if (response instanceof AxiosError) throw response;
            else {
                if (response.quantity < 1) {
                    return { removedFromCart: false, message: `${truncateText(response.productName, 50)} está fora de estoque`, type: "alert" };
                } else {
                    existingProduct = response;
                }
            }
        }
    }

    if (!existingProduct) return { removedFromCart: false, message: "Produto não encontrado, atualize a página", type: "alert" };

    let updatedCartItems: Product[] = [...cartItems];
    let foundProduct = updatedCartItems.find(p => p.productId === productId);  
    
    if (!foundProduct) return { removedFromCart: false, message: `${truncateText(existingProduct.productName, 50)} não está no carrinho`, type: "alert" };

    if (clean || foundProduct.quantity <= 1) {
        updatedCartItems = cartItems.filter(i => i.productId != productId);
    } else {
        updatedCartItems = cartItems.map((i: Product) => {
            if (i.productId == productId) return { ...i, quantity: i.quantity - 1 };
            return i;
        });
    }

    const updatedTotal = updatedCartItems.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
    );

    localStorage.setItem("cartItems", JSON.stringify({
        cartItems: state.cartState.cartId,
        products: updatedCartItems,
        totalPrice: updatedTotal,
    }));

    dispatch(
        setCartItems({
            ...state.cartState,
            products: updatedCartItems,
            totalPrice: updatedTotal
        })
    );

        return { removedFromCart: true, message: `${truncateText(existingProduct.productName, 50)} removido do carrinho`, type: "alert" };
    }
);

export const createCart = createAsyncThunk(
    'cart/createCart',
    async (products: Product[], { dispatch, getState }) => {
        const state = getState() as RootState;
        const cartItems: CartItem[] = products.map(product => ({
            product,
            discount: product.discount,
            price: product.price,
            quantity: product.quantity,
        }));

        const totalPrice = cartItems.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
        );  

        try {
            dispatch(setError({ errorMessage: "", isLoading: true }));
            
            const { data }: AxiosResponse<Cart> = await api.post(`/users/carts`, {
                cartItems, totalPrice
            });
            
            if (data instanceof AxiosError) throw data;

            dispatch(
                setCartItems({
                    ...state.cartState,
                    cartId: data.cartId
                })
            );
            dispatch(setError({ errorMessage: "", isLoading: false }));
            return { success: true, message: "Carrinho salvo" };
        } catch (error) {
            if (error instanceof AxiosError)     
                dispatch(setError({ 
                    errorMessage: error?.response?.data?.message || "Falha ao criar carrinho...", 
                    isLoading: false 
                }));
            return { success: false, message: "Falha ao criar carrinho para o usuário" };
        }
    }
); 