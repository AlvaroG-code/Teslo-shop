"use client";

import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFonts } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setstock] = useState(0);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async () => {
        const inStock = await getStockBySlug(slug);

        setstock(inStock);
        setisLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <h1
                    className={`${titleFonts.className} antialiased font-bold text-xl text-lg animate-pulse bg-gray-200`}
                >
                    &ensp;
                </h1>
            ) : (
                <h1
                    className={`${titleFonts.className} antialiased font-bold text-xl text-lg`}
                >
                    En Stock: {stock}
                </h1>
            )}
        </>
    );
};
