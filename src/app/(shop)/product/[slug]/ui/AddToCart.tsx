"use client";

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/sice-selector/SizeSelector";
import { CartProduct, Product, ValidSizes } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    const addProductToCart = useCartStore((state) => state.addProductToCart);

    const [size, setsize] = useState<ValidSizes | undefined>();
    const [quantitty, setQuantity] = useState<number>(1);
    const [posted, setposted] = useState(false);

    const addToCart = () => {
        setposted(true);
        if (!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantitty,
            size: size,
            image: product.images[0],
        };

        addProductToCart(cartProduct);
        setposted(false);
        setQuantity(1);
        setsize(undefined);
    };

    return (
        <>
            {posted && !size && (
                <span className="mt-2 text-red-500 fade-in">
                    Selecciona una talla disponible*
                </span>
            )}

            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setsize}
            />

            {/* Selector de canidad */}
            <QuantitySelector
                quantity={quantitty}
                onQuantityChanged={setQuantity}
            />

            {/* button */}
            <button className="btn-primary my-5" onClick={addToCart}>
                Agregar al carrito
            </button>
        </>
    );
};
