import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  github_url: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  live_url: z
    .string()
    .url("Invalid live demo URL")
    .optional()
    .or(z.literal("")),
  main_image_url: z.string().url("Invalid image URL").nullable().optional(),
  tech_stack: z.string().min(1, "At least one technology is required"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be less than 50 characters"),
});
export type ProjectSchemaType = z.infer<typeof projectSchema>;
