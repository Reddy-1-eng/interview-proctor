"use client";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard"
        });
    };

    const handleMicrosoft = async () => {
        await authClient.signIn.social({
            provider: "microsoft",
            callbackURL: "/dashboard"
        });
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-6">Sign In to ProctorAI</h1>
                <p className="mb-6 text-gray-500">Secure proctoring for Google & Microsoft Forms</p>
                <div className="space-y-4">
                    <button onClick={handleGoogle} className="w-full py-3 px-4 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors font-medium">
                        {/* Check Google Icon SVG here later */}
                        Continue with Google
                    </button>
                    <button onClick={handleMicrosoft} className="w-full py-3 px-4 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors font-medium">
                        Continue with Microsoft
                    </button>
                </div>
            </div>
        </div>
    );
}
