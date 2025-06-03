import { setCartItems } from "../../reducers/cart/cartReducer";
import { setError } from "../../reducers/errors/errorReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product, CartItem, Cart } from "../../../types";
import type { CartResponse } from "../../types/cart";
import type { RootState } from "../../types/root";
import { AxiosError, type AxiosResponse } from "axios";
import api from "../../../api/api";
import { truncateText } from "../../../utils/common";
import { products } from "../../../api/products/products";

export const getOrCreateUserCart = createAsyncThunk(
    'cart/getOrCreateUserCart',
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;
        if (state.cartState.products.length > 0) {
            const { success, message, cartId } = await dispatch(createCart(state.cartState.products)).unwrap()
            return { success, message, cartId, products: state.cartState.products };
        }
        
        try {
            dispatch(setError({ errorMessage: "", isLoading: true }));
            
            const { data }: AxiosResponse<CartResponse> = await api.get(`/users/carts/user`);
            
            if (data instanceof AxiosError) throw data;
            console.log(data);
            
            const products: Product[] = data.cartItems.map(ci => {
                return {
                    productId: ci.product.productId,
                    productName: ci.product.productName,
                    imageUrl: ci.product.imageUrl,
                    description: ci.product.description,
                    price: ci.price,
                    quantity: ci.quantity,
                    discount: ci.discount,
                    category: ci.product.category,
                }
            });
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

            dispatch(setError({ errorMessage: "", isLoading: false }));
            return { 
                success: true, 
                message: "Carrinho salvo", 
                cartId: data.cartId, products: data.cartItems.map(ci => ci.product) 
            };
        } catch (error) {            
            if (error instanceof AxiosError) {
                dispatch(setError({ 
                    errorMessage: error?.response?.data?.message || "Falha ao buscar carrinho...", 
                    isLoading: false
                }));
            } else if (error instanceof Error) {
                console.log(error);
                
                dispatch(setError({ 
                    errorMessage: error.message, 
                    isLoading: false
                }));
            }
            console.log(error);
            
            return { success: false, message: "Falha ao buscar carrinho...", cartId: 0, products: [] };
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
            const response: Product = await products.getProductById(data.productId);
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
            const response: Product = await products.getProductById(productId);
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

const createCart = createAsyncThunk(
    'cart/createCart',
    async (products: Product[], { dispatch, getState }) => {
        const state = getState() as RootState;
        const cartItems: CartItem[] = products.map(product => ({
            product,
            discount: product.discount,
            price: product.price,
            quantity: product.quantity,
        }));

        try {
            dispatch(setError({ errorMessage: "", isLoading: true }));
            
            const { data }: AxiosResponse<Cart> = await api.post(`/users/carts`, {
                cartItems
            });
            console.log(data);
            
            if (data instanceof AxiosError) throw data;

            dispatch(
                setCartItems({
                    ...state.cartState,
                    cartId: data.cartId
                })
            );
            dispatch(setError({ errorMessage: "", isLoading: false }));
            return { success: true, message: "Carrinho salvo", cartId: data.cartId };
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.response?.status == 422) { //TODO: Manage when product is out of stock
                    return { success: false, message: "Produto fora de estoque", cartId: 0 };
                }
            }
            dispatch(setError({     
                errorMessage: "Falha ao criar carrinho...", 
                isLoading: false 
            }));
            return { success: false, message: "Falha ao criar carrinho para o usuário", cartId: 0 };
        }
    }
); 