"use client";

import { useEffect, useState } from "react";
import { Timer } from "@/components/timer";
import { ProctorManager } from "@/components/proctor-manager";
import { FullscreenEnforcer } from "@/components/fullscreen-enforcer";
import { AlertTriangle } from "lucide-react";

export default function ExamPage({ params }: { params: { sessionId: string } }) {
    const [formUrl, setFormUrl] = useState<string>("");
    const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
    const [studentName, setStudentName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [violations, setViolations] = useState<string[]>([]);
    const [isTerminated, setIsTerminated] = useState(false);
    const [settings, setSettings] = useState({ tabSwitch: true, fullscreen: true });

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch(`/api/exam/session/${params.sessionId}`);
                if (!res.ok) throw new Error("Failed to load exam");
                const data = await res.json();

                if (!data.isValid) {
                    setIsTerminated(true);
                    return;
                }

                setFormUrl(data.formUrl);
                setSecondsLeft(data.remainingSeconds);
                setStudentName(data.studentName);
                if (data.settings) setSettings(data.settings);
            } catch (err) {
                setError("Exam session not found or expired.");
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, [params.sessionId]);

    const handleViolation = (type: string) => {
        setViolations(prev => [...prev, `${type} at ${new Date().toLocaleTimeString()}`]);
        // Fire and forget violation log
        fetch("/api/proctor/violation", {
            method: "POST",
            body: JSON.stringify({ sessionId: params.sessionId, type })
        });
    };

    const handleTimeUp = () => {
        setIsTerminated(true);
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading Exam...</div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-600 font-bold">{error}</div>;

    if (isTerminated) {
        return (
            <div className="flex items-center justify-center h-screen bg-red-50">
                <div className="text-center p-8 bg-white shadow-xl rounded-xl">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Exam Ended</h1>
                    <p>Time is up or the exam was terminated.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Proctor Header */}
            <div className="bg-white shadow-sm p-4 flex justify-between items-center z-50 sticky top-0">
                <div className="flex items-center gap-4">
                    <div className="font-bold text-lg">Exam Session: {params.sessionId.slice(-6).toUpperCase()}</div>
                    <span className="text-sm text-gray-500">Student: {studentName}</span>
                </div>
                {secondsLeft !== null && <Timer durationSeconds={secondsLeft} onTimeUp={handleTimeUp} />}
            </div>

            {settings.tabSwitch && <ProctorManager onViolation={handleViolation} />}
            {settings.fullscreen && <FullscreenEnforcer onViolation={handleViolation} />}

            {/* Violation Toast (Simplified) */}
            {violations.length > 0 && (
                <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 animate-bounce">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <strong>Warning:</strong> Suspicious activity detected! ({violations.length})
                    </div>
                </div>
            )}

            {/* Form Frame */}
            <div className="flex-1 overflow-hidden relative bg-white">
                {/* Note: In production, check if Iframe is allowed */}
                <iframe
                    src={formUrl}
                    className="w-full h-full border-none"
                    title="Exam Form"
                />
            </div>
        </div>
    );
}
