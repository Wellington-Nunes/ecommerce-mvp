"use client";

import { useEffect, useState } from "react";

export const useSplash = (duration = 2000) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited =
      typeof window !== "undefined" ? localStorage.getItem("hasVisited") : null;

    if (!hasVisited) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        try {
          localStorage.setItem("hasVisited", "true");
        } catch (error) {
          console.error("Erro ao acessar localStorage:", error);
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  return isVisible;
};
