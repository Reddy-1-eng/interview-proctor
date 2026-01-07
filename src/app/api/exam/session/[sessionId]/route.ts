import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { sessionId: string } }
) {
    try {
        const sessionId = params.sessionId;
        const session = await prisma.proctorSession.findUnique({
            where: { id: sessionId },
            include: { form: true }
        });

        if (!session) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        // Calculate time remaining
        const settings = JSON.parse(session.form.settings as string);
        const durationMinutes = settings.duration || 60;
        const startTime = new Date(session.startTime).getTime();
        const endTime = startTime + (durationMinutes * 60 * 1000);
        const now = Date.now();
        const remainingSeconds = Math.max(0, Math.floor((endTime - now) / 1000));

        return NextResponse.json({
            formUrl: session.form.originalUrl,
            studentName: session.studentName,
            remainingSeconds,
            isValid: remainingSeconds > 0,
            settings: settings // Return full settings object
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
