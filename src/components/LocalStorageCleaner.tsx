// components/LocalStorageCleaner.tsx
"use client";

import { useEffect } from "react";

export default function LocalStorageCleaner() {
    useEffect(() => {
        const handleTabClose = () => {
            localStorage.removeItem("filters");
        };

        window.addEventListener("beforeunload", handleTabClose);
        return () => window.removeEventListener("beforeunload", handleTabClose);
    }, []);

    return null;
}
