
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Flex, Heading, Text, Card, Grid, Box, Button, Link } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from "react-markdown"
import delay from 'delay'
import { Pencil2Icon } from '@radix-ui/react-icons'
interface Props {
    params: { id: string }
}
const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({ where: { id: params.id } });
    if (!issue) notFound();
    await delay(2000);
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <Heading>{issue.title}</Heading>

                <Flex className="space-x-3" my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card><ReactMarkdown className='prose space-x-3'>{issue.description}</ReactMarkdown></Card>

            </Box>
            <Box>
                <Button><Pencil2Icon />
                    <Link href={`/Issues/${issue.id}`}>Edit Issue</Link></Button>
            </Box>

        </Grid>
    )
}

export default IssueDetailsPage;