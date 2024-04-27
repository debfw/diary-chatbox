"use client";
import { Avatar, Box, SnackbarContent } from "@mui/material";
import Button from "@mui/material/Button";
import { useCompletion } from "ai/react";
import React, { useCallback, useRef, useState } from "react";
import SearchHistory from "./SearchHistory";
import { DiaryEntry } from "@/types/feature";

const defaultText =
  "Hey kids, I'm your JourneyPal! I can turn your words into drawings and your stories into memories. Let's make your diary awesome together! Ready for an adventure?";

function DiaryBoard() {
  const [response, setResponse] = React.useState("");

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const diaryEntryRef = useRef<HTMLInputElement | null>(null);
  const { complete } = useCompletion({
    api: "/api/chat",
  });

  const { complete: completeSpellCheck } = useCompletion({
    api: "/api/spellCheck",
  });
  const handleCheckSpelling = useCallback(
    async (entryText: string) => {
      const completion = await completeSpellCheck(entryText);
      if (!completion) throw new Error("Failed to check typos");
      const typos = JSON.parse(completion);
      if (typos?.length && !window.confirm("Typos found… continue?")) return;
      else {
        setDiaryEntries((prevEntries) => [
          ...prevEntries,
          {
            id: Date.now(),
            text: entryText,
            date: new Date(),
          },
        ]);
        diaryEntryRef.current!.value = "";
        alert("Diary Saved!");
      }
    },
    [completeSpellCheck]
  );

  const handleResponse = React.useCallback(
    async (msg: string) => {
      const completion = await complete(msg);
      if (!completion) throw new Error("Failed to generate chat");
      setResponse(completion);
    },
    [complete]
  );

  const handleSendEmail = async (e: React.SyntheticEvent) => {
    console.log("send email");
    e.preventDefault();
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: emailRef.current?.value ?? "",
        message: diaryEntryRef.current?.value ?? "",
      }),
    });
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Diary
      </h1>

      <Box sx={{ display: "flex", marginBottom: 5 }}>
        <Avatar
          alt="J"
          src="/robot.png"
          sx={{ width: 80, height: 80, marginRight: 1 }}
        />
        <SnackbarContent
          sx={{ fontSize: 18 }}
          message={response ? response : defaultText}
        />
      </Box>

      <input
        placeholder="Your Email"
        ref={emailRef}
        className="w-full h-16 mb-6 p-4 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
      />
      <input
        ref={diaryEntryRef}
        className="w-full h-[200px] mb-6 p-4 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
        placeholder={
          "1. Keep your diary. 2. Ask or click buttons below for suggestions."
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Button
          variant="outlined"
          onClick={() => handleResponse("one idea on todays highlights")}
        >
          Highlights
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleResponse("one idea on todays gratitude")}
        >
          Gratitude
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleResponse("one idea on todays today goals")}
        >
          Goals
        </Button>
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          variant="contained"
          sx={{ background: "black" }}
          onClick={() => handleResponse(diaryEntryRef.current!.value)}
        >
          Ask JourneyPal
        </Button>
        <Button
          variant="contained"
          sx={{ background: "black" }}
          onClick={() => handleCheckSpelling(diaryEntryRef.current!.value)}
        >
          Finished & Save
        </Button>
        <Button
          onClick={handleSendEmail}
          variant="contained"
          sx={{ background: "black" }}
        >
          Send email
        </Button>
      </div>
      <SearchHistory entries={diaryEntries} />
    </div>
  );
}

export default DiaryBoard;
