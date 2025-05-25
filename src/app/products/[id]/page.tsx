import { ProductDetails } from "@/components/products/ProductDetails"
import { getProduct, getProducts } from "@/services/products"
import { notFound } from "next/navigation"

export type ProductPageProps = Promise<{ id: string }>;

export async function generateStaticParams() {
    const products = await getProducts()
    return products.map(({ id }) => ({ id: id.toString() }))
}

export async function generateMetadata({ params }: { params: ProductPageProps }) {
    const { id } = await params

    try {
        const product = await getProduct(id)

        return {
            title: `${product.title} - ECOMMERCE-MVP`,
            description: product.description,
        }
    } catch {
        return {
            title: "Produto não encontrado",
            description: "O produto solicitado não foi encontrado.",
        }
    }
}

export default async function ProductDetailsPage({ params }: { params: ProductPageProps }) {
    const { id } = await params

    if (!id) {
        throw new Error("ID do produto não encontrado");
    }

    const product = await getProduct(id)

    if (!product) {
        notFound()
    }

    return (
        <div className="container max-w-6xl mx-auto py-8">
            <ProductDetails product={product} />
        </div>
    )
}
