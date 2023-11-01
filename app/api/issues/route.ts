import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { issueSchema } from "@/app/validationIssueSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const prisma = new PrismaClient()
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({},{status:401});
    const body = await request.json();
    const issueCreateValidation = issueSchema.safeParse(body);
    
    if (!issueCreateValidation.success) {
        return NextResponse.json(issueCreateValidation.error.format(),{status:400})
    }
   
    const createNewIssue = prisma.issue.create({ data: { title: body.title, description: body.description } });

    return NextResponse.json((await createNewIssue),{status:201})
}