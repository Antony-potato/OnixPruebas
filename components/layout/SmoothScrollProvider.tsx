"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.12,         // Bajamos de 0.18 a 0.12: Más inercia, frenado más suave.
                duration: 1.2,      // Subimos de 0.8 a 1.2: El viaje dura un poco más.
                smoothWheel: true,
                wheelMultiplier: 1, // Mantiene la velocidad de la rueda de tu ratón fiel
                syncTouch: true,
            }}
        >
            {children as any}
        </ReactLenis>
    );
}