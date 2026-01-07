import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionId, type } = body;

        // Logic to update ProctorSession violations in DB
        // const session = await prisma.proctorSession.findUnique({ where: { id: sessionId } });
        // const violations = JSON.parse(session.violations || "[]");
        // violations.push({ type, time: new Date() });
        // await prisma.proctorSession.update(...)

        console.log(`[Violation] Session ${sessionId}: ${type}`);

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to log violation" }, { status: 500 });
    }
}
