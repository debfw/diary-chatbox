"use client";
import { z } from "zod";

export const DiaryEntrySchema = z.object({
  id: z.number(),
  text: z.string(),
  date: z.date(),
});

export const formSchema = z.object({
  text: z
    .string()
    .min(10, { message: "Please enter more than 10 characters." }),
  email: z.string().email({ message: "Please correct your email address." }),
});

export type DiaryEntry = z.infer<typeof DiaryEntrySchema>;
export type FormValue = z.infer<typeof formSchema>;
