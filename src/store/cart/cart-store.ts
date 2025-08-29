import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;
    updatedProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            // Methods

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce(
                    (subTotal, product) =>
                        product.quantity * product.price + subTotal,
                    0
                );
                const tax = subTotal * 0.21;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                );

                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart,
                };
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // Revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    (item) =>
                        item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // Si el producto ya existe por talla, incrementar cantidad
                const updatedCartProducts = cart.map((item) =>
                    item.id === product.id && item.size === product.size
                        ? {
                              ...item,
                              quantity: item.quantity + product.quantity,
                          }
                        : item
                );

                set({ cart: updatedCartProducts });
            },
            updatedProductQuantity: (
                product: CartProduct,
                quantity: number
            ) => {
                const { cart } = get();
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                });
                set({ cart: updatedCartProducts });
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get();
                const updateCartProducts = cart.filter(
                    (item) =>
                        item.id !== product.id || item.size !== product.size
                );
                set({ cart: updateCartProducts });
            },
        }),
        {
            name: "shopping-cart",
        }
    )
);
