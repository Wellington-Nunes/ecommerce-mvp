import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-white p-4 text-center">
      <div className="max-w-2xl space-y-8 px-4">

        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight md:leading-normal">
            Bem-vindo ao <br className="hidden md:block" />
            ECOMMERCE-MVP
          </h1>


          <p className="text-lg md:text-xl text-muted-foreground mt-6">
            Encontre os melhores produtos<br />
            com preços incríveis e entrega rápida
          </p>
        </div>


        <div className="pt-12">
          <Button
            asChild
            size="lg"
            className="gap-3 px-8 py-6 text-lg"
          >
            <Link href="/products">
              <ShoppingCartIcon className="w-6 h-6" />
              Ver Produtos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}