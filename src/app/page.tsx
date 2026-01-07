import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Advanced Proctoring for <span className="text-blue-600">Google & Microsoft Forms</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Secure your online exams with timed sessions, tab-switch detection, and comprehensive proctoring logs.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/sign-in" className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
            Sign In
          </Link>
          <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Dashboard
          </Link>
          <Link href="/dashboard/create" className="px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
            Create Exam
          </Link>
        </div>
      </div>
    </div>
  );
}
