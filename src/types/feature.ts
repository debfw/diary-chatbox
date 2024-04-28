import { DiaryEntrySchema } from "@/utils/schema";
import { z } from "zod";

export type DiaryEntry = z.infer<typeof DiaryEntrySchema>;
