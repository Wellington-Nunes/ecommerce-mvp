"use client"

import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductImageWithSkeleton } from "./ProductImageWithSkeleton"
import { Product } from "@/types/product"
import { useCart } from "@/hooks/useCart"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

type ProductCardProps = {
    product: Product
    className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
    const { addItem } = useCart()

    return (
        <Card className={`hover:shadow-lg transition-all h-full flex flex-col min-h-[400px] ${className}`}>
            <Link href={`/products/${product.id}`} className="block group">
                <CardHeader className="p-4 pb-2">
                    <div className="relative w-full aspect-[4/4] overflow-hidden rounded-lg">
                        <ProductImageWithSkeleton
                            src={product.image}
                            alt={product.title}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-2 flex-grow">
                    <div className="flex items-center justify-end gap-2 pb-2">
                        {product.onSale && <Badge variant="destructive" className="uppercase">Promoção</Badge>}
                        {product.popular && <Badge className="bg-green-500 uppercase">Popular</Badge>}
                        <Badge className="uppercase">
                            {product.category}
                        </Badge>
                    </div>

                    <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-semibold leading-tight line-clamp-2">
                            {product.title}
                        </CardTitle>
                    </div>


                    <div className="text-lg font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                        {product.discount && (
                            <span className="ml-2 text-sm line-through text-muted-foreground">
                                R$ {(product.price / (1 - product.discount / 100)).toFixed(2)}
                            </span>
                        )}
                    </div>
                </CardContent>
            </Link>

            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={() =>
                        addItem({
                            id: String(product.id),
                            title: product.title,
                            price: product.price,
                            image: product.image,
                        })
                    }
                    className="w-full text-sm"
                >
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar ao carrinho
                </Button>

            </CardFooter>
        </Card>
    )
}
