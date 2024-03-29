"use client"
import { useState } from 'react';
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '../../validationIssueSchema';
import { z } from 'zod';
import 'easymde/dist/easymde.min.css';
import ErrorMessages from '@/app/components/ErrorMessages';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client/';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) })
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color="red" className="mb-3">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    setSubmitting(true);
                    if (issue) {
                        await axios.patch('/api/issues/' + issue.id, data);
                    }

                    else {
                        await axios.post('/api/issues', data);
                    }

                    router.push("/issues/list");
                    router.refresh();
                } catch (error) {
                    setSubmitting(false);
                    setError("An Error Occured")
                }

            })}><TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                </TextField.Root>

                <ErrorMessages>{errors.title?.message}</ErrorMessages>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description"  {...field} />
                    )}
                />
                <ErrorMessages>{errors.description?.message}</ErrorMessages>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Create Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>

            </form>
        </div>
    )
}

export default IssueForm;