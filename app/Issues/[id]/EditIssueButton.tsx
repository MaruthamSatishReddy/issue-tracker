import { Pencil2Icon } from '@radix-ui/react-icons'
import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
const EditIssueButton = ({ issueId }: { issueId: string }) => {
    return (
        <Button><Pencil2Icon />
            <Link href={`/Issues/${issueId}`}>Edit Issue</Link></Button>
    )
}

export default EditIssueButton