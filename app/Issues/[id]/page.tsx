import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Flex, Heading, Text, Card } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import classNames from 'classnames';
interface Props {
    params: { id: string }
}
const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({ where: { id: params.id } });
    if (!issue) notFound();
    return (
        <div><Heading>{issue.title}</Heading>
            <Flex className="space-x-3" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card><p>{issue.description}</p></Card>



        </div>
    )
}

export default IssueDetailsPage;