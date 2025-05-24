import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-white p-4 text-center">
      <div className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Bem-vindo ao ECOMMERCE-MVP
          </h1>
          <p className="text-lg text-muted-foreground">
            Encontre os melhores produtos com preços incríveis e entrega rápida
          </p>
        </div>

        <div className="pt-8">
          <Button asChild size="lg" className="gap-2">
            <Link href="/products">
              <ShoppingCartIcon className="w-5 h-5" />
              Ver Produtos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}