import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ProductImageWithSkeleton } from "./ProductImageWithSkeleton";

type ProductCardProps = {
    product: Product;
    className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
    return (
        <Card className={`hover:shadow-lg transition-all h-full flex flex-col min-h-[400px] ${className}`}>
            <Link href={`/products/${product.id}`} className="block group">
                <CardHeader className="p-4 pb-2">
                    <ProductImageWithSkeleton
                        src={product.image}
                        alt={product.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </CardHeader>

                <CardContent className="p-4 pt-0 flex-grow space-y-2">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg line-clamp-2 leading-tight">{product.title}</CardTitle>
                        <Badge variant="outline" className="shrink-0 uppercase text-sm">
                            {product.category}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        {product.onSale && (
                            <Badge variant="destructive" className="mr-2">
                                Promoção
                            </Badge>
                        )}
                        {product.popular && <Badge variant="secondary">Popular</Badge>}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                            {product.discount && (
                                <span className="ml-2 text-sm line-through text-gray-500">
                                    ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                </span>
                            )}
                        </span>
                    </div>
                </CardContent>
            </Link>

            <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full" asChild>
                    <Link href={`/products/${product.id}`} className="text-sm">
                        Ver Detalhes
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
