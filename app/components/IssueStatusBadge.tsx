import { Status } from '@prisma/client'
import React from 'react'
import { Badge } from "@radix-ui/themes"
const statusMap: Record<Status, { label: string, color: string }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'voilet' },
    CLOSED: { label: 'Closed', color: 'green' }

}
interface Props {
    status: Status
}
const IssueStatusBadge = ({ status }: { status: Status }) => {
    if (status === 'OPEN') {
        return <Badge color="red" >Open</Badge>
    }
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>


    )
}

export default IssueStatusBadge