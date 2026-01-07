import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // In production: Authenticate user here

    try {
        const body = await req.json();
        const { url, duration, settings, userId } = body;

        const form = await prisma.form.create({
            data: {
                userId: userId || "mock-user-id", // In real app use session.user.id
                name: "New Exam", // Allow user to name it
                originalUrl: url,
                settings: JSON.stringify({ duration, ...settings }),
            }
        });

        return NextResponse.json(form);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to create exam" }, { status: 500 });
    }
}
