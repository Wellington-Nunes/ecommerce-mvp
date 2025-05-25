export function ProductDetailsSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Cabeçalho */}
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gray-200 rounded-md" />
                <div className="h-8 w-48 bg-gray-200 rounded" />
            </div>

            {/* Conteúdo Principal */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Imagem */}
                <div className="w-full aspect-square bg-gray-200 rounded-lg" />

                {/* Informações */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="h-8 w-3/4 bg-gray-200 rounded" />
                        <div className="flex gap-2">
                            <div className="h-6 w-24 bg-gray-200 rounded-full" />
                            <div className="h-6 w-32 bg-gray-100 rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="h-10 w-1/3 bg-gray-200 rounded" />
                        <div className="flex gap-4 pt-2">
                            <div className="h-12 w-full bg-gray-200 rounded" />
                            <div className="h-12 w-full bg-gray-100 rounded" />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="h-8 w-32 bg-gray-200 rounded" />
                            <div className="h-8 w-40 bg-gray-100 rounded" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-100 rounded" />
                            <div className="h-4 w-5/6 bg-gray-100 rounded" />
                            <div className="h-4 w-2/3 bg-gray-100 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
