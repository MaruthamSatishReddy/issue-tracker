import React from 'react'
import { Table } from "@radix-ui/themes"
import { Skeleton } from '@/app/components'
const LoadingIssuesPage = () => {
    const issues = [1, 2, 3, 4, 5];

    return (

        <Table.Root variant="variant">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue =>
                    <Table.Row key={issue}>

                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>


    )
}

export default LoadingIssuesPage