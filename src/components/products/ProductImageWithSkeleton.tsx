"use client";

import React, { useState } from "react";
import Image from "next/image";

type ProductImageWithSkeletonProps = {
    src?: string | null;
    alt: string;
    className?: string;
    priority?: boolean;
    sizes?: string;
};

export function ProductImageWithSkeleton({
    src,
    alt,
    className = "",
    priority = false,
    sizes,
}: ProductImageWithSkeletonProps) {
    const hasImage = Boolean(src);
    const [imgLoading, setImgLoading] = useState(hasImage);

    return (
        <div className={`relative w-full aspect-square bg-white flex items-center justify-center ${className}`}>
            {imgLoading && hasImage && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            {hasImage ? (
                <Image
                    src={src!}
                    alt={alt}
                    fill
                    sizes={sizes}
                    priority={priority}
                    className={`object-contain transition-transform ${imgLoading ? "invisible" : "visible"}`}
                    onLoadingComplete={() => setImgLoading(false)}
                />
            ) : (
                <div className="text-gray-700 text-sm select-none px-2 text-center">
                    Imagem indisponível
                </div>
            )}
        </div>
    );
}
