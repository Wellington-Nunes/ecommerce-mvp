import { ProductList } from "@/components/products/ProductList";
import { getProducts } from "@/services/products";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>
            <ProductList products={products} />
        </div>
    );
}