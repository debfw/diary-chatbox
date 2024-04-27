import {
  DiaryEntrySchema,
  FeatureTitlesEnum,
  FeaturesTypeSchema,
} from "@/utils/schema";
import { z } from "zod";

export type FeatureTitles = z.infer<typeof FeatureTitlesEnum>;
export type FeaturesType = z.infer<typeof FeaturesTypeSchema>;
export type DiaryEntry = z.infer<typeof DiaryEntrySchema>;
