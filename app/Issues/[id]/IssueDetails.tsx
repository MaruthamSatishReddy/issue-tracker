import React from 'react'
import { Flex, Heading, Text, Card } from '@radix-ui/themes';
import { Issue } from '@prisma/client';
import { IssueStatusBadge } from '@/app/components';
import ReactMarkdown from 'react-markdown';
const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <div><Heading>{issue.title}</Heading>

            <Flex className="space-x-3" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card><ReactMarkdown className='prose space-x-3'>{issue.description}</ReactMarkdown></Card></div>
    )
}

export default IssueDetails