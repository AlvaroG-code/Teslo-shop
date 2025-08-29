import { Title } from "@/components/ui/title/title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function AddressPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] ">
                <Title title="Verificar orden de compra" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* carito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Ajustar elementos</span>
                        <Link href={"/cart"} className="underline mb-5">
                            Editar carrito
                        </Link>

                        {/* items */}

                        {productsInCart.map((product) => (
                            <div key={product.slug} className="flex mb'5">
                                <Image
                                    src={`/products/${product.images[0]}`}
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
                                    <p>{product.title}</p>
                                    <p>${product.price} * 3</p>
                                    <p className="font-bold">
                                        Subtotal: ${product.price} * 3
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* checkout */}

                    <div className="bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2 font-bold">
                            Direccion de entrega
                        </h2>
                        <div className="mb-10">
                            <p className="text-xl">Alvaro Garcia</p>
                            <p>Calle ecija n 12</p>
                            <p>Sanlucar de Barrameda</p>
                            <p>Cadiz</p>
                            <p>España</p>
                            <p>C.P 11540</p>
                            <p>TLF 699879165</p>
                        </div>

                        {/* divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2">
                            Resumen orden de compra
                        </h2>
                        <div className="grid grid-cols-2">
                            <span>No. Productos</span>
                            <span className="text-right">3 articulos</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>
                            <span>Impuestos (21%)</span>
                            <span className="text-right">100</span>
                            <span className="text-2xl mt-5">Total:</span>
                            <span className="text-right text-2xl mt-5">
                                100
                            </span>
                        </div>

                        <div className="mt-5 mb-2 w-full">
                            <p className="mb-5">
                                {/* disclaimer */}
                                <span className="text-xs">
                                    Al hacer clic en "Colocar orden de compra,
                                    aceptas nuestros{" "}
                                    <a href="#" className="underline">
                                        terminos y condiciones
                                    </a>{" "}
                                    y{" "}
                                    <a href="#" className="underline">
                                        Politicas de privacidad
                                    </a>
                                </span>
                            </p>

                            <Link
                                className="flex btn-primary justify-center"
                                href="/orders/123"
                            >
                                Colocar orden de compra
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
