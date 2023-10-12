import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@prisma/client";
const createIssueSchema=z.object({ tite: z.string().min(1).max(120) , description: z.string().min(1).max(100) })
export async function POST(request: NextRequest) {
    const body = await request.json();
    const issueCreateValidation=createIssueSchema.safeParse(body);
    if (!issueCreateValidation.success) {
        return NextResponse.json(issueCreateValidation.error.errors,{status:400})
    }
}