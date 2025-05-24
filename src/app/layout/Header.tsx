"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo + Navegação */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            ECOMMERCE-MVP
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/"
                            className={`px-3 py-2 rounded text-sm ${pathname === "/"
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Início
                        </Link>
                        <Link
                            href="/products"
                            className={`px-3 py-2 rounded text-sm ${pathname === "/products"
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Produtos
                        </Link>
                    </nav>
                </div>

                {/* Busca centralizada */}
                <div className="flex-1 max-w-xl">
                    <Input
                        type="search"
                        placeholder="Buscar produtos..."
                        className="w-full"
                    />
                </div>

                {/* Carrinho */}
                <Link href="/cart" className="text-muted-foreground hover:text-foreground">
                    <ShoppingCart className="w-6 h-6" />
                </Link>
            </div>
        </header>
    );
}
