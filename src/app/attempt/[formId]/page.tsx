"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AttemptPage({ params }: { params: { formId: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session, isPending } = authClient.useSession();

    const handleStart = async () => {
        if (!session) return;
        setLoading(true);
        try {
            const res = await fetch("/api/exam/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formId: params.formId, studentName: session.user.name || session.user.email })
            });
            const data = await res.json();
            if (res.ok) {
                router.push(`/exam/${data.sessionId}`);
            } else {
                alert("Failed to start exam. Invalid link or expired.");
            }
        } catch (error) {
            alert("Error starting exam");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    if (!session) {
        // Redirect to sign-in or show options
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
                    <p className="text-gray-500 mb-6">You must sign in to take this exam.</p>
                    <div className="space-y-3">
                        <button
                            onClick={() => authClient.signIn.social({ provider: "google", callbackURL: `/attempt/${params.formId}` })}
                            className="w-full py-3 px-4 border rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center gap-2 font-medium"
                        >
                            Sign in with Google
                        </button>
                        <button
                            onClick={() => authClient.signIn.social({ provider: "microsoft", callbackURL: `/attempt/${params.formId}` })}
                            className="w-full py-3 px-4 border rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center gap-2 font-medium"
                        >
                            Sign in with Microsoft
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="flex items-center gap-3 mb-6">
                    {session.user.image && <img src={session.user.image} alt="User" className="w-10 h-10 rounded-full" />}
                    <div>
                        <h1 className="text-xl font-bold">Welcome, {session.user.name}</h1>
                        <p className="text-sm text-gray-500">{session.user.email}</p>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-6">
                    <p className="font-semibold mb-1">Proctoring Rules:</p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>Timer will start immediately.</li>
                        <li>Do not switch tabs.</li>
                        <li>Keep fullscreen mode on.</li>
                    </ul>
                </div>

                <button
                    onClick={handleStart}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex justify-center gap-2"
                >
                    {loading && <Loader2 className="animate-spin" />}
                    Start Exam
                </button>

                <div className="mt-4 text-center">
                    <button onClick={() => authClient.signOut({ callbackURL: "/" })} className="text-sm text-gray-400 hover:text-gray-600">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
