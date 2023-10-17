
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Flex, Heading, Text, Card } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from "react-markdown"
import delay from 'delay'
interface Props {
    params: { id: string }
}
const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({ where: { id: params.id } });
    if (!issue) notFound();
    await delay(2000);
    return (
        <div className='max-w-xl'><Heading>{issue.title}</Heading>
            <Flex className="space-x-3" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card><ReactMarkdown className='prose space-x-3'>{issue.description}</ReactMarkdown></Card>



        </div>
    )
}

export default IssueDetailsPage;