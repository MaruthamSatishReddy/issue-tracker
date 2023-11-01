import { issueSchema,patchIssueSchema } from "@/app/validationIssueSchema";
import { PrismaClient } from '@prisma/client';
import authOptions from "@/app/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
const prisma = new PrismaClient()
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({},{status:401});
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(),{status:400})
    }
    const { title,description,assignedToUserId } = body;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
        if (!user) {
            return NextResponse.json({ error: 'Invalid User' },{status:400});
        }
            
    }
    const issue= await prisma.issue.findUnique({
        where:{id:params.id}
    })
    if (!issue) 
        return NextResponse.json({error: "Invalid Issue"},{status:400})
    const updateIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId
        }
    })
    return NextResponse.json(updateIssue);
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({},{status:401});
    const issue= await prisma.issue.findUnique({
        where:{id:params.id}
    })
    if (!issue) 
        return NextResponse.json({ error: "Invalid Issue" }, { status: 400 })
    await prisma.issue.delete({ where: { id: issue.id } })
    return NextResponse.json({});
}