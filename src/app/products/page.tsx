import { getProducts } from "@/services/products";
import Link from "next/link";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <h1>Produtos</h1>
            <p>Explore nossa seleção de produtos incríveis!</p>

            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link
                            href={`/products/${product.id}`}
                            className="text-blue-400 hover:underline"
                        >
                            {product.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}