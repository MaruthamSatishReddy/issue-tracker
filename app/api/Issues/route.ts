import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { createIssueSchema } from "@/app/validationIssueSchema";

const prisma = new PrismaClient()
export async function POST(request: NextRequest) {
    
    const body = await request.json();
    const issueCreateValidation = createIssueSchema.safeParse(body);
    
    if (!issueCreateValidation.success) {
        return NextResponse.json(issueCreateValidation.error.format(),{status:400})
    }
   
    const createNewIssue = prisma.issue.create({ data: { title: body.title, description: body.description } });

    return NextResponse.json((await createNewIssue),{status:201})
}