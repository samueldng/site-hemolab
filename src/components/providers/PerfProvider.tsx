"use client";

import { useDevicePerf } from "@/hooks/useDevicePerf";
import { createContext, useContext } from "react";

const PerfContext = createContext(false);

export function usePerfContext() {
    return useContext(PerfContext);
}

export default function PerfProvider({ children }: { children: React.ReactNode }) {
    const isLowPerf = useDevicePerf();
    return (
        <PerfContext.Provider value={isLowPerf}>
            {children}
        </PerfContext.Provider>
    );
}
