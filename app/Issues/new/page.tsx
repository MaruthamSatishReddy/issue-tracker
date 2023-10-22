import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
const IssueForm = dynamic(
    () => import('@/app/Issues/_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
);
const NewIssuePage = () => {
    return (
        <IssueForm />
    )
}

export default NewIssuePage;