
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Grid, Box } from '@radix-ui/themes';
import delay from 'delay'
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>

        </Grid>
    )
}

export default IssueDetailsPage;