"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

export default function ResultadosModal() {
    const { isResultadosModalOpen, closeResultadosModal } = useUiStore();

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (isResultadosModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isResultadosModalOpen]);

    if (!isResultadosModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={closeResultadosModal}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white dark:bg-hemo-dark rounded-2xl shadow-2xl overflow-hidden shadow-black/40 z-10 animate-fade-in-up border dark:border-white/10">
                {/* Close Button */}
                <button
                    onClick={closeResultadosModal}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                >
                    <X size={18} className="text-hemo-dark dark:text-white" />
                </button>

                <div className="p-8 text-center">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold dark:text-white text-hemo-dark mb-3">
                        Resultados de Exames
                    </h2>
                    <p className="text-sm lg:text-base dark:text-white/70 text-hemo-dark/70 mb-8 max-w-sm mx-auto">
                        Seu exame foi realizado antes ou a partir de 18 de julho de 2025?
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="https://worklabweb.com.br/frame.php?Cliente=438"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeResultadosModal}
                            className="w-full py-4 px-6 bg-[#006ca5] hover:bg-[#005a8a] text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center"
                        >
                            Antes de 18/07/2025
                        </Link>
                        
                        <Link
                            href="https://www.hemolabma.com.br/resultados-pulse/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeResultadosModal}
                            className="w-full py-4 px-6 bg-[#006ca5] hover:bg-[#005a8a] text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center"
                        >
                            A partir de 18/07/2025
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
