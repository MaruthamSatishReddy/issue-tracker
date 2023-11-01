import { z } from "zod";

export const issueSchema = z.object({ title: z.string().min(1, "Title Is Required").max(120), description: z.string().min(1, "Description Is Required").max(100) });
export const patchIssueSchema = z.object({ title: z.string().min(1, "Title Is Required").max(120).optional(), description: z.string().min(1, "Description Is Required").max(100).optional(),assignedToUserId:z.string().min(1,"AssignedToUserId is Required").max(255).optional().nullable() });