"use client";
import { z } from "zod";

export const DiaryEntrySchema = z.object({
  id: z.number(),
  text: z.string(),
  date: z.date(),
});
