import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }).max(50, {
        message: 'Max 50 characters'
    }),
    description: z.string({
        required_error: 'Description is required'
    }).max(100, {
        message: 'description is required'
    }),
    date: z.string().datetime().optional()
})
