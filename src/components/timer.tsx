"use client";
import { useEffect, useState } from "react";

export function Timer({ durationSeconds, onTimeUp }: { durationSeconds: number, onTimeUp: () => void }) {
    const [timeLeft, setTimeLeft] = useState(durationSeconds);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="font-mono text-xl font-bold p-4 bg-white shadow rounded-lg border border-red-100 text-red-600">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
    );
}
