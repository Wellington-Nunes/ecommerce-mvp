import { ProductDetails } from "@/components/products/ProductDetails";
import { getProduct } from "@/services/products";
interface ProductDetailsPageParams {
    params: {
        id: string;
    };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageParams) {
    const product = await getProduct(params.id);

    return (
        <div>
            <div className="container mx-auto py-8 max-w-6xl">
                {/* <BackButton href="/products" className="mb-6" /> */}
                <ProductDetails product={product} />
            </div>
        </div>
    );
}