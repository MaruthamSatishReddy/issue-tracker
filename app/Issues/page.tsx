import React from 'react'
import { PrismaClient } from "@prisma/client"
import 'react-loading-skeleton/dist/skeleton.css'
import { Table } from "@radix-ui/themes"
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay'
import IssueActions from './IssueActions';
import Link from '../components/Link';


const prisma = new PrismaClient();

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();
    await delay(2000);
    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue =>
                        <Table.Row key={issue.id}>

                            <Table.Cell>
                                <Link href={`/Issues/${issue.id}`}>
                                    {issue.title}
                                </Link></Table.Cell>
                            <Table.Cell>  <IssueStatusBadge status={issue.status} /></Table.Cell>
                            <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root></div>




    )
}

export default IssuesPage;
