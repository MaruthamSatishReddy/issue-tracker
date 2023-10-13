"use client"
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form"
import "easymde/dist/easymde.min.css";
import { TextField, Button } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from 'next/navigation';
interface IssueForm {
    title: String;
    description: String;
}
const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>()
    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
            await axios.post('/api/Issues', data);
            router.push("/Issues")
        })}><TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />

            <Button>Create Issue</Button>
        </form>
    )
}

export default NewIssuePage