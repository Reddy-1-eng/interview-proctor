"use client";
import Link from 'next/link';

// Mock data
const exams = [
    { id: '1', name: 'Mathematics Final Exam', created: '2025-01-01', violations: 0 },
    { id: '2', name: 'History Quiz', created: '2025-01-02', violations: 5 }
];

export default function Dashboard() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Exams</h1>
                <Link href="/dashboard/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Create New Exam
                </Link>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Activity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {exams.map((exam) => (
                            <tr key={exam.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.created}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.violations} violations reported</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                                    <Link href={`/exam/${exam.id}`} className="text-blue-600 hover:text-blue-900 font-medium" target="_blank">Test Link</Link>
                                    <Link href={`/dashboard/results?id=${exam.id}`} className="text-gray-600 hover:text-gray-900">Results</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
