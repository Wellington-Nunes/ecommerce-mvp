import { ProductList } from "@/components/products/ProductList";
import { getProducts } from "@/services/products";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Nossos Produtos
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Descubra nossa seleção premium de produtos com qualidade excepcional
                    </p>
                </div>
                <div className="max-w-6xl mx-auto">
                    <ProductList products={products} itemsPerPage={12} />
                </div>
            </div>
        </div>
    );
}
