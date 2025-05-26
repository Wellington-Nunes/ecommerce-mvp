"use client";

import { useCart } from "@/hooks/useCart";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { CartItem } from "@/types/cart";
import { ProductImageWithSkeleton } from "../products/ProductImageWithSkeleton";
import { useToast } from "@/hooks/use-toast";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, total, removeItem, clearCart, increaseItem, decreaseItem } = useCart();
    const { toast } = useToast();

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleFinalizePurchase = () => {
        toast({
            title: "Compra finalizada!",
            description: `Você comprou ${totalItems} item(s) por R$ ${total.toFixed(2)}`,
            duration: 4000,
        });

        clearCart();
        onClose();
    };

    const handleClearCart = () => {
        clearCart();
        toast({
            title: "Carrinho limpo",
            description: "Todos os itens foram removidos do carrinho.",
            duration: 3000,
        });
        onClose();
    };


    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                    aria-hidden
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">Seu Carrinho</h2>
                    <button onClick={onClose} title="Fechar carrinho">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Conteúdo*/}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center text-muted-foreground">
                            <p className="mb-4 text-sm">Seu carrinho está vazio.</p>
                            <Button
                                onClick={onClose}
                                className="font-medium hover:underline text-sm"
                            >
                                Continuar comprando
                            </Button>
                        </div>
                    ) : (
                        items.map((item: CartItem) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between gap-4 border rounded p-2"
                            >
                                <div className="flex items-center gap-2">
                                    {item.image && (
                                        <div className="w-12 h-12">
                                            <ProductImageWithSkeleton
                                                src={item.image}
                                                alt={item.title}
                                                sizes="48"
                                            />
                                        </div>
                                    )}

                                    <div className="text-sm">
                                        <p className="font-medium truncate max-w-[140px]">
                                            {item.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                title="Diminuir quantidade"
                                                onClick={() => decreaseItem(item.id)}
                                                className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                                                disabled={item.quantity === 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs">{item.quantity}</span>
                                            <button
                                                title="Aumentar quantidade"
                                                onClick={() => increaseItem(item.id)}
                                                className="p-1 border rounded hover:bg-gray-100"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="text-muted-foreground text-xs">
                                            R$ {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-600"
                                    title="Remover item"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Rodapé  */}
                {items.length > 0 && (
                    <div className="p-4 pb-6 border-t space-y-4">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Itens:</span>
                            <span>{totalItems}</span>
                        </div>

                        <div className="flex justify-between font-medium text-base">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleFinalizePurchase}
                            className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition"
                        >
                            Finalizar Compra
                        </button>

                        <button
                            onClick={handleClearCart}
                            className="w-full text-sm text-destructive hover:underline mt-2"
                        >
                            Limpar carrinho
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
