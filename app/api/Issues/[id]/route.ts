import { issueSchema } from "@/app/validationIssueSchema";
import { PrismaClient } from '@prisma/client'

import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function PATCH(request: NextRequest, { params }:{params:{id:string}} ) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(),{status:400})
    }
    const issue= await prisma.issue.findUnique({
        where:{id:params.id}
    })
    if (!issue) 
        return NextResponse.json({error: "Invalid Issue"},{status:400})
    const updateIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(updateIssue);
}