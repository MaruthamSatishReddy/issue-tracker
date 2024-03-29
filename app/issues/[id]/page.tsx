
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Grid, Box, Flex } from '@radix-ui/themes';
import delay from 'delay'
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';

interface Props {
    params: { id: string }
}
const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({ where: { id: params.id } });
    const session = await getServerSession(authOptions);
    if (!issue) notFound();
    await delay(2000);
    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            {session && (<Box>
                <Flex direction="column" gap="4">
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>)}


        </Grid>
    )
}

export default IssueDetailsPage;