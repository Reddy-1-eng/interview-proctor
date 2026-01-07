import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionId } = body;

        await prisma.proctorSession.update({
            where: { id: sessionId },
            data: { status: "completed", endTime: new Date() }
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to end session" }, { status: 500 });
    }
}
