"use client";

import { generatePaginationNumbers } from "@/utils/generatePaginationNumbers";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    totalPages: number;
    // gender: string; // Para construir la ruta dinámica
}

export const Pagination = ({ totalPages }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageString = searchParams.get("page") ?? "1";
    let currentPage = isNaN(+pageString) ? 1 : +pageString;

    // Genera los números de página con tu util
    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === "...") return `${pathname}?${params.toString()}`;

        if (+pageNumber <= 0) pageNumber = 1;
        if (+pageNumber > totalPages) pageNumber = totalPages;

        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex text-center justify-center mt-2 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    {/* Página anterior */}
                    <li className="page-item">
                        <Link
                            className={clsx(
                                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                {
                                    "pointer-events-none opacity-50":
                                        currentPage === 1,
                                }
                            )}
                            href={createPageUrl(currentPage - 1)}
                        >
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>

                    {/* Números de página */}
                    {allPages.map((page) => (
                        <li key={page} className="page-item">
                            <Link
                                className={clsx(
                                    "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none",
                                    {
                                        "bg-blue-600 shadow-sm text-white hover:bg-blue-400":
                                            page === currentPage,
                                    }
                                )}
                                href={createPageUrl(page)}
                            >
                                {page}
                            </Link>
                        </li>
                    ))}

                    {/* Página siguiente */}
                    <li className="page-item">
                        <Link
                            className={clsx(
                                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                {
                                    "pointer-events-none opacity-50":
                                        currentPage === totalPages,
                                }
                            )}
                            href={createPageUrl(currentPage + 1)}
                        >
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
