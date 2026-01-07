import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";

export default async function ResultsPage() {
    const sessions = await prisma.proctorSession.findMany({
        include: { form: true },
        orderBy: { startTime: 'desc' }
    });

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Exam Results & Proctoring Logs</h1>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trust Score</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sessions.map((session) => {
                            const violationCount = 0; // TODO: Parse JSON
                            const trustScore = Math.max(0, 100 - (violationCount * 10)); // Simple algorithm

                            return (
                                <tr key={session.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{session.studentName}</div>
                                        <div className="text-sm text-gray-500">{session.id.slice(-6)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {session.form.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDistanceToNow(new Date(session.startTime))} ago
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${session.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {session.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className={`text-lg font-bold ${trustScore > 80 ? 'text-green-600' : trustScore > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {trustScore}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
