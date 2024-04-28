"use client";
import { Avatar, Box, SnackbarContent } from "@mui/material";
import Button from "@mui/material/Button";
import { useCompletion } from "ai/react";
import React, { useState } from "react";
import SearchHistory from "./SearchHistory";
import { DiaryEntry } from "@/types/feature";
import { useForm } from "react-hook-form";
const defaultText =
  "Hey kids, I'm your JourneyPal! I can turn your words into drawings and your stories into memories. Let's make your diary awesome together! Ready for an adventure?";

function DiaryBoard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  const initialValues = {
    text: "",
    email: "",
  };
  const [response, setResponse] = useState("");
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const { complete } = useCompletion({
    api: "/api/chat",
  });

  const { complete: completeSpellCheck } = useCompletion({
    api: "/api/spellCheck",
  });

  const handleCheckSpelling = async (entryText: string) => {
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
      getValues().text = "";
      alert("Diary Saved!");
    }
  };

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
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: getValues().text ?? "",
        message: getValues().text ?? "",
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          className="w-full h-16 mb-6 p-4 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
          defaultValue={initialValues.email}
          placeholder="bluebill1049@hotmail.com"
          type="email"
          {...register("email")}
        />

        <label htmlFor="text">Diary Box</label>
        <input
          className="w-full h-[200px] p-4 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
          defaultValue={initialValues.text}
          placeholder="Keep your diary or ask for suggestions."
          {...register("text", {
            required: true,
            validate: (value) =>
              value !== "Keep your diary or ask for suggestions.",
          })}
        />
        {errors.text && <p className="text-red-500 mb-5">This is required</p>}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button
            variant="outlined"
            type="submit"
            onClick={() => handleResponse("one idea on todays highlights")}
          >
            Highlights
          </Button>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => handleResponse("one idea on todays gratitude")}
          >
            Gratitude
          </Button>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => handleResponse("one idea on todays today goals")}
          >
            Goals
          </Button>
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            variant="contained"
            type="submit"
            sx={{ background: "black" }}
            onClick={() => handleResponse(getValues().text)}
          >
            Ask JourneyPal
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ background: "black" }}
            onClick={() => handleCheckSpelling(getValues().text)}
          >
            Finished & Save
          </Button>
          <Button
            type="submit"
            onClick={(e) => {
              handleSendEmail(e);
            }}
            variant="contained"
            sx={{ background: "black" }}
          >
            Send email
          </Button>
        </div>
      </form>
      <SearchHistory entries={diaryEntries} />
    </div>
  );
}

export default DiaryBoard;
