'use client'

import { useSplash } from '@/hooks/useSplash'

export const SplashScreen = () => {
    const isVisible = useSplash()

    if (!isVisible) return null

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-50 bg-white dark:bg-gray-950 flex items-center justify-center animate-fadeIn"
        >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight md:leading-normal">
                ECOMMERCE-MVP
            </h1>
        </div>
    )
}