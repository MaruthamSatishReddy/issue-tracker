import React from 'react'
import { PrismaClient } from "@prisma/client"
import { Table } from "@radix-ui/themes"
import { Link, IssueStatusBadge } from '@/app/components'
import IssueActions from './IssueActions';



const prisma = new PrismaClient();

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();

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
                                <Link href={`/issues/${issue.id}`}>
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
