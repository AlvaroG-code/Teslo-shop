"use client";

import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);

    const { getSummaryInformation } = useCartStore();

    const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return <p>Cargando...</p>;

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">
                    {itemsInCart === 1
                        ? "1 artículo"
                        : `${itemsInCart} artículos`}
                </span>
            </div>

            <div className="grid grid-cols-2">
                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos (21%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="text-2xl mt-5">Total:</span>
                <span className="text-right text-2xl mt-5">
                    {currencyFormat(total)}
                </span>
            </div>
        </div>
    );
};
