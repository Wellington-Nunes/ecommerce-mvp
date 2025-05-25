import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Página não encontrada</h1>
            <p className="text-gray-600 mb-8">A página que você está procurando não existe.</p>
            <Button asChild>
                <Link href="/">Voltar ao início</Link>
            </Button>
        </div>
    )
}
