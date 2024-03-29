import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
interface Props {
    params: { id: string }
}
const prisma = new PrismaClient();
const EdidIssuePage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id

        }
    });
    if (!issue) notFound();
    return (
        <IssueForm issue={issue} />
    )
}

export default EdidIssuePage