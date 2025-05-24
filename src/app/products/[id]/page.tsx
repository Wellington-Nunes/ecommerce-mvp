import { getProduct } from "@/services/products";
import Link from "next/link";

interface ProductDetailsPageParams {
    params: {
        id: string;
    };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageParams) {
    const product = await getProduct(params.id);

    return (
        <div>
            <h1>Detalhes do Produto</h1>
            <p>Você está visualizando o produto: {product.title}</p>

            <Link href="/products" className="text-blue-400 hover:underline">
                Voltar
            </Link>
        </div>
    );
}