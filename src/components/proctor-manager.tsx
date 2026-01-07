"use client";
import { useEffect } from "react";

export function ProctorManager({ onViolation }: { onViolation: (type: string) => void }) {
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                onViolation("tab_switch");
            }
        };

        const handleBlur = () => {
            // onViolation("window_blur"); // Optional: enable if stricter proctoring needed
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, [onViolation]);

    return null;
}
