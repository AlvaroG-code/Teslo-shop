"use client";

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
    const updateProductsQuantity = useCartStore(
        (state) => state.updatedProductQuantity
    );
    const removeProduct = useCartStore((state) => state.removeProduct);
    const [loaded, setloaded] = useState(false);
    const productsInCart = useCartStore((state) => state.cart);

    useEffect(() => {
        setloaded(true);
    });

    if (!loaded) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            {productsInCart.map((product) => (
                <div
                    key={`${product.slug}-${product.size}`}
                    className="flex mb'5"
                >
                    <Image
                        src={`/products/${product.image}`}
                        width={100}
                        height={100}
                        style={{
                            width: "100px",
                            height: "100px",
                        }}
                        alt={product.title}
                        className="mr-5 rounded"
                    />
                    <div>
                        <Link
                            className="hover:underline cursor-pointer"
                            href={`/product/${product.slug}`}
                        >
                            {product.size} - {product.title}
                        </Link>

                        <p>${product.price}</p>
                        <QuantitySelector
                            quantity={product.quantity}
                            onQuantityChanged={(quantity) =>
                                updateProductsQuantity(product, quantity)
                            }
                        />
                        <button
                            onClick={() => removeProduct(product)}
                            className="underline mt-3"
                        >
                            Remover
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};
