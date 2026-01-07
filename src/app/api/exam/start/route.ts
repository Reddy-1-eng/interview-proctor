import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { formId, studentName } = body;

        // Verify form exists
        const form = await prisma.form.findUnique({
            where: { id: formId }
        });

        if (!form) {
            return NextResponse.json({ error: "Form not found" }, { status: 404 });
        }

        // Create Session
        const session = await prisma.proctorSession.create({
            data: {
                formId,
                studentName,
                startTime: new Date(),
                status: "active"
            }
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
