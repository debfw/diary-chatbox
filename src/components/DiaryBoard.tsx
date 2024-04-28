"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, SnackbarContent } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import SearchHistory from "./SearchHistory";
import { useForm, Controller } from "react-hook-form";
import {
  useChatQuery,
  useSpellCheckQuery,
  useSendEmailMutation,
} from "@/utils/queries";
import { DiaryEntry, FormValue, formSchema } from "@/utils/schema";
import { defaultText, defaultValues } from "@/assets/defaults";

const chatBotButtons = [
  { label: "Highlights", response: "one idea on todays highlights" },
  { label: "Gratitude", response: "one idea on todays gratitude" },
  { label: "Goals", response: "one idea on todays today goals" },
] as const;

function DiaryBoard() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const { control, handleSubmit, formState, setValue, watch } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema),
  });

  const watchText = watch("text");

  const { refetch: fetchSpellCheck, error: spellCheckError } =
    useSpellCheckQuery(watchText);
  const {
    error: chatQueryError,
    data: response,
    refetch: handleAskPal,
  } = useChatQuery(watchText);

  const { mutate: sendEmail, error: sendEmailError } = useSendEmailMutation();

  const handleOnSave = async (data: FormValue) => {
    const { data: typos } = await fetchSpellCheck();
    if (typos?.length && !window.confirm("Typos found… continue?")) return;
    const now = new Date();
    setDiaryEntries((prevEntries) => [
      ...prevEntries,
      {
        id: now.getTime(),
        text: data.text,
        date: now,
      },
    ]);
    setValue("text", "");
    alert("Diary Saved!");
  };

  const errors = [chatQueryError, spellCheckError, sendEmailError];

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Diary
      </h1>
      {errors.map(
        (error, idx) =>
          error && (
            <p className="text-red-500 mb-5" key={idx}>
              {error.message}
            </p>
          )
      )}
      <Box sx={{ display: "flex", marginBottom: 5 }}>
        <Avatar
          alt="J"
          src="/robot.png"
          sx={{ width: 80, height: 80, marginRight: 1 }}
        />
        <SnackbarContent
          sx={{ fontSize: 18 }}
          message={response || defaultText}
        />
      </Box>

      <form>
        <label htmlFor="email">Your Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full h-16 mb-6 p-4 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
              placeholder="yourEmail@hotmail.com"
              type="email"
            />
          )}
        />
        {formState.errors.email && (
          <p className="text-red-500 mb-5">{formState.errors.email.message}</p>
        )}
        <label htmlFor="text">Diary Box</label>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full h-[200px] p-4 rosunded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Keep your diary or ask for suggestions."
              type="text"
            />
          )}
        />
        {formState.errors.text && (
          <p className="text-red-500 mb-5">{formState.errors.text.message}</p>
        )}
        <div className="grid grid-cols-3 gap-4 mb-6 mt-6">
          {chatBotButtons.map((data, idx) => (
            <Button
              key={idx}
              variant="outlined"
              type="submit"
              onClick={handleSubmit(() => handleAskPal())}
            >
              {data.label}
            </Button>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            variant="contained"
            onClick={handleSubmit(() => handleAskPal())}
            type="submit"
            sx={{ bgcolor: "black", mr: 2 }}
          >
            Ask JourneyPal
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(handleOnSave)}
            type="submit"
            sx={{ bgcolor: "black", mr: 2 }}
          >
            Finished & Save
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit((data) => {
              sendEmail(data);
            })}
            type="submit"
            sx={{ bgcolor: "black", mr: 2 }}
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
