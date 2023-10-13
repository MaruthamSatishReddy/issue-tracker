"use client"
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form"
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from 'next/navigation';
interface IssueForm {
    title: String;
    description: String;
}
const NewIssuePage = () => {
    const [error, setError] = useState('');
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>()
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color="red" className="mb-3">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/Issues', data);
                    router.push("/Issues");
                } catch (error) {
                    setError("An Error Occured")
                }

            })}><TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />

                <Button>Create Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage