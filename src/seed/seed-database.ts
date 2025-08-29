import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
    //Borrar registros previos//
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]);

    //categorias//

    const { categories, products, users } = initialData;

    await prisma.user.createMany({
        data: users,
    });

    const categoriesData = categories.map((category) => ({
        name: category,
    }));

    await prisma.category.createMany({
        data: categoriesData,
    });

    const categoriesDB = await prisma.category.findMany();

    const cateogiresMap = categoriesDB.reduce((map, Category) => {
        map[Category.name.toLocaleLowerCase()] = Category.id;

        return map;
    }, {} as Record<string, string>);

    //Productos//

    products.forEach(async (product) => {
        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: cateogiresMap[type],
            },
        });
        //imagenes//
        const imagesData = images.map((image) => ({
            url: image,
            productId: dbProduct.id,
        }));

        await prisma.productImage.createMany({
            data: imagesData,
        });
    });

    console.log("Seed Executed correctly");
}

(() => {
    if (process.env.NODE_ENV === "production") return;

    main();
})();
