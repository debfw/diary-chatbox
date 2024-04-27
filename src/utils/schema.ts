"use client";
import { z } from "zod";

export const FeatureTitlesEnum = z.enum([
    "Generate Diary",
    "Search History",
    "Send As Email!",
    "Spell Check",
  ]);

export const FeaturesTypeSchema = z.object({
  title: FeatureTitlesEnum,
  description: z.string(),
});

export const DiaryEntrySchema = z.object({
    id: z.number(),
    text: z.string(),
    date: z.date(),
  });
