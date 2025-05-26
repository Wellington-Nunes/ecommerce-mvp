"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import { useFilters } from "@/contexts/FiltersContext";
import { useCart } from "@/hooks/useCart"
import { useState } from "react"
import { CartDrawer } from "../cart/CartDrawer";

export default function Header() {
    const pathname = usePathname();
    const { state, actions } = useFilters();
    const { count } = useCart()
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <header className="bg-white fixed top-0 w-full z-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="container mx-auto px-4 h-16 grid grid-cols-3 items-center">
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
                            className={`px-3 py-2 rounded text-sm transition-colors ${pathname === "/"
                                ? "text-primary font-medium bg-primary/10"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Início
                        </Link>
                        <Link
                            href="/products"
                            className={`px-3 py-2 rounded text-sm transition-colors ${pathname === "/products"
                                ? "text-primary font-medium bg-primary/10"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Produtos
                        </Link>
                    </nav>
                </div>

                {/* Campo de busca */}
                <div className="hidden md:flex justify-center">
                    <Input
                        placeholder="Buscar produtos..."
                        value={state.searchTerm}
                        onChange={(e) => actions.setSearchTerm(e.target.value)}
                        className="w-full max-w-md"
                    />
                </div>

                {/* Carrinho (Drawer) */}
                <div className="flex justify-end relative">
                    <button
                        onClick={() => setCartOpen(true)}
                        className="text-muted-foreground hover:text-foreground relative p-2"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {count}
                            </span>
                        )}
                    </button>
                    <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                </div>


            </div>
        </header>
    );
}
