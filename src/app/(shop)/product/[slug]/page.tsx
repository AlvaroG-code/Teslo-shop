export const revalidate = 604800; // 7 dias

import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/sice-selector/SizeSelector";
import { ProductMobileSlideshow } from "@/components/product/slideshow/ProductMobileSlideshow ";
import { ProductSlideshow } from "@/components/product/slideshow/ProductSlideshow";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFonts } from "@/config/fonts";
import { ValidSizes } from "@/interfaces";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
        return null;
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Slideshow */}

            <div className="col-span-1 md:col-span-2 ">
                {/* Slideshow de movil */}
                <ProductMobileSlideshow
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />
                {/* Slideshow de escritorio */}
                <ProductSlideshow
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />
            </div>

            {/* detalles */}

            <div className="col-span-1 px-5 ">
                <StockLabel slug={product.slug} />

                <h1
                    className={`${titleFonts.className} antialiased font-bold text-xl`}
                >
                    {product.title}
                </h1>
                <p className="text-lg mb-5">{product.price}</p>

                <AddToCart product={product} />

                {/* Descripcion */}
                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light">{product.description}</p>
            </div>
        </div>
    );
}
