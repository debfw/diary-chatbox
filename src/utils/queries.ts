"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCompletion } from "ai/react";

export const useChatQuery = (prompt: string) => {
  const { complete } = useCompletion({ api: "/api/chat" });
  return useQuery({
    queryKey: ["chatQuery", prompt] as const,
    queryFn: async () => {
      const completion = await complete(prompt);
      if (!completion || typeof completion !== "string") {
        throw new Error("something went wrong!");
      }

      return completion;
    },
    enabled: false,
  });
};

export const useSpellCheckQuery = (prompt: string) => {
  const { complete } = useCompletion({ api: "/api/spellCheck" });
  return useQuery({
    queryKey: ["spellCheckQuery", prompt] as const,
    queryFn: async () => {
      const completion = await complete(prompt);
      if (!completion) {
        throw new Error("something went wrong!");
      }
      const typos = JSON.parse(completion);
      return typos as string[];
    },
    enabled: false,
  });
};

export const useSendEmailMutation = () => {
  return useMutation({
    mutationFn: async ({ email, text }: { email: string; text: string }) => {
      const resp = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: email,
          message: text,
        }),
      });
      const payload = await resp.json();
      if (resp.status >= 400) {
        throw new Error(`Send Email Failed: ${JSON.stringify(payload)}`);
      }
      return payload;
    },
    onSuccess: () => {
      alert("Sent email successfully");
    },
  });
};
