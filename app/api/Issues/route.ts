import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const createIssueSchema=z.object({ title: z.string().min(1).max(120) , description: z.string().min(1).max(100) })
export async function POST(request: NextRequest) {
    
    const body = await request.json();
    const issueCreateValidation = createIssueSchema.safeParse(body);
    
    if (!issueCreateValidation.success) {
        return NextResponse.json(issueCreateValidation.error.errors,{status:400})
    }
   
    const createNewIssue = prisma.issue.create({ data: { title: body.title, description: body.description } });

    return NextResponse.json((await createNewIssue),{status:201})
}