import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ShoppingCart, CreditCard, Link } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/products">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Detalhes do Produto</h1>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagem */}
        <div className="relative w-full aspect-square bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform"
            priority

          />
        </div>

        {/* Informações */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <div className="mt-2 flex items-center gap-3">
              <Badge variant="secondary">{product.category}</Badge>
              {product.brand && (
                <Badge variant="outline">Marca: {product.brand}</Badge>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-4xl font-bold text-primary">
              ${product.price.toFixed(2)}
              {product.discount && (
                <span className="ml-2 text-sm line-through text-gray-500">
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
              )}
            </p>

            <div className="flex gap-4 pt-2">
              <Button className="flex-1 gap-2">
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="secondary" className="flex-1 gap-2">
                <CreditCard className="h-4 w-4" />
                Comprar Agora
              </Button>
            </div>
          </div>

          {/* Tabs de Informações */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specs">Especificações</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </TabsContent>

            <TabsContent value="specs">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Categoria</p>
                  <p>{product.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Marca</p>
                  <p>{product.brand || 'Não especificada'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Modelo</p>
                  <p>{product.model || '--'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cor</p>
                  <p>{product.color || '--'}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}