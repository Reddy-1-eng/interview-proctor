import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ProctorAI</h1>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link href="/dashboard" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                        Overview
                    </Link>
                    <Link href="/dashboard/create" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                        New Exam
                    </Link>
                    <Link href="/dashboard/results" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                        Results
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
