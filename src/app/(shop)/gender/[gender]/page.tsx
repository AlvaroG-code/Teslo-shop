export const revalidate = 60; // 60 segundos

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/title";
import { Product } from "@/interfaces";
import { Gender } from "@prisma/client";

export default async function GenderPage({
    params,
    searchParams,
}: {
    // params: { [key: string]: string }; // <- obligatorio para Next 15
    params: Promise<{ gender: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { gender } = await params;
    const search = await searchParams;

    const page = search.page ? parseInt(search.page.toString(), 10) : 1;

    const { products, currentPage, totalPages } =
        await getPaginatedProductsWithImages({
            page,
            gender: gender as Gender,
        });

    if (!products || products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    const labels: Record<string, string> = {
        men: "para Hombres",
        women: "para Mujeres",
        kid: "para Niños",
        unisex: "para Todos",
    };

    return (
        <>
            <Title
                title={`Artículos ${labels[gender] ?? ""}`}
                subtitle="Todos los productos"
                className="mb-2"
            />

            <ProductGrid products={products as Product[]} />

            <Pagination totalPages={totalPages} />
        </>
    );
}
