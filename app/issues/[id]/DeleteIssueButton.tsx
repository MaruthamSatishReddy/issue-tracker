'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const deleteIssue = async () => {
        try {
            setDeleting(true);
            await axios.delete("/api/issues/" + issueId);
            router.push("/issues/list");
            router.refresh();
        }
        catch (error) {
            setDeleting(false);
            setError(true);
        }
    }
    return (
        <>

            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" variant="soft">Delete Issue{isDeleting && <Skeleton />}</Button>
                </AlertDialog.Trigger>

                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>Are you Sure you want to Delete this Issue</AlertDialog.Description>
                    <Flex mt="4">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action><Button variant="soft" color="red" onClick={deleteIssue}>Delete Issue</Button></AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>

            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This Issue Couldnt Be Deleted..</AlertDialog.Description>
                    <Button variant="soft" color="gray" mt="2" onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>


        </>

    )
};

export default DeleteIssueButton