export const revalidate = 60; //60 segundos

import { Title } from "../../components/ui/title/title";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Product } from "@/interfaces";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { redirect } from "next/navigation";
import { Pagination } from "../../components/ui/pagination/Pagination";
interface Props {
    searchParams: Promise<{ page?: string }>;
}

export default async function home({ searchParams }: Props) {
    const { page } = await searchParams;

    const pageNumber = page ? parseInt(page) : 1;

    const { products, currentPage, totalPages } =
        await getPaginatedProductsWithImages({ page: pageNumber });

    return (
        <>
            <Title
                title="Tienda"
                subtitle="Todos los productos"
                className="mb-2"
            />

            <ProductGrid products={products as Product[]} />

            <Pagination totalPages={totalPages} />
        </>
    );
}
