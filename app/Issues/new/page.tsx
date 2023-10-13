"use client"
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form"
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout, Text } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from "../../validationIssueSchema";
import { z } from "zod";
import ErrorMessages from '@/app/components/ErrorMessages';
import Spinner from '@/app/components/Spinner';
type IssueForm = z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) })
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color="red" className="mb-3">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    setSubmitting(true);
                    await axios.post('/api/Issues', data);
                    router.push("/Issues");
                } catch (error) {
                    setSubmitting(false);
                    setError("An Error Occured")
                }

            })}><TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>

                <ErrorMessages>{errors.title?.message}</ErrorMessages>
                <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessages>{errors.description?.message}</ErrorMessages>
                <Button disabled={isSubmitting}>Create Issue{isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage