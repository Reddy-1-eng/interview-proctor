"use client";
import React, { useEffect, useState } from 'react';

export function FullscreenEnforcer({ onViolation }: { onViolation: (type: string) => void }) {
    const [isFullscreen, setIsFullscreen] = useState(true);

    // Allow initial render to be non-fullscreen until interaction
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const handleChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
                if (hasInteracted) {
                    onViolation("fullscreen_exit");
                }
            } else {
                setIsFullscreen(true);
                setHasInteracted(true);
            }
        };

        document.addEventListener("fullscreenchange", handleChange);
        return () => document.removeEventListener("fullscreenchange", handleChange);
    }, [onViolation, hasInteracted]);

    const requestFullscreen = () => {
        document.documentElement.requestFullscreen().then(() => {
            setIsFullscreen(true);
            setHasInteracted(true);
        }).catch(err => {
            console.error("Error enabling fullscreen mode:", err);
        });
    };

    if (isFullscreen && hasInteracted) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl max-w-md text-center shadow-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Exam</h2>
                <p className="text-gray-600 mb-6">Fullscreen mode is required to continue. Please do not exit fullscreen.</p>
                <button
                    onClick={requestFullscreen}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full"
                >
                    Enter Fullscreen
                </button>
            </div>
        </div>
    );
}
