import React, { useState } from 'react';
import { authClient } from "@/lib/auth-client";

export default function CreateExamPage() {
    const [url, setUrl] = useState("");
    const [duration, setDuration] = useState(60);
    const [settings, setSettings] = useState({ tabSwitch: true, fullscreen: true });
    const [createdId, setCreatedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession();

    // Redirect if not logged in (handled more gracefully in real app)
    if (!session && typeof window !== "undefined" && !loading) {
        // Optional: Redirect to sign-in
    }

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            alert("You must be logged in to create an exam.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/exam/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url,
                    duration,
                    settings,
                    userId: session.user.id
                })
            });
            const data = await res.json();
            if (res.ok) {
                setCreatedId(data.id);
            } else {
                alert("Error creating exam: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Failed to create exam");
        } finally {
            setLoading(false);
        }
    };

    if (createdId) {
        return (
            <div className="p-8 max-w-2xl mx-auto text-center">
                <div className="bg-green-50 p-8 rounded-xl border border-green-200">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Exam Created Successfully!</h2>
                    <p className="mb-6 text-green-700">Share this link with your students:</p>
                    <div className="bg-white p-4 rounded border flex items-center gap-2 justify-center mb-6">
                        <code className="text-lg font-mono text-gray-800">
                            {`${window.location.origin}/attempt/${createdId}`}
                        </code>
                    </div>
                    <button
                        onClick={() => { setCreatedId(null); setUrl(""); }}
                        className="text-green-700 hover:text-green-900 underline"
                    >
                        Create Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Proctoring Session</h1>
            <form onSubmit={handleImport} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <div>
                    <label className="block font-medium text-gray-700 mb-2">Google/Microsoft Form URL</label>
                    <input
                        type="url"
                        required
                        placeholder="https://docs.google.com/forms/..."
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <p className="text-sm text-gray-400 mt-1">Paste the 'Send' link or embed link.</p>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-2">Duration (Minutes)</label>
                    <input
                        type="number"
                        min="1"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                    />
                </div>

                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900">Proctoring Settings</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="tabSwitch"
                            checked={settings.tabSwitch}
                            onChange={(e) => setSettings({ ...settings, tabSwitch: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="tabSwitch" className="text-gray-700">Enable Tab Switch Detection</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="fullscreen"
                            checked={settings.fullscreen}
                            onChange={(e) => setSettings({ ...settings, fullscreen: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="fullscreen" className="text-gray-700">Enforce Fullscreen Mode</label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Exam"}
                </button>
            </form>
        </div>
    );
}
