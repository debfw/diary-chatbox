import React, { useEffect, useState } from "react";
import { Button, Input, List, ListItem, ListItemText } from "@mui/material";
import { DiaryEntry } from "@/utils/schema";
import { trimText } from "@/utils/trimText";

export default function SearchHistory({ entries }: { entries: DiaryEntry[] }) {
  const [displayList, setDisplayList] = useState<DiaryEntry[]>([]);
  const [isSortClicked, setIsSortClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredEntries = entries.filter((entry) =>
      entry.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayList(filteredEntries);
  }, [searchTerm, entries]);

  useEffect(() => {
    const sortedEntries = [...entries].sort((a, b) =>
      isSortClicked ? b.id - a.id : a.id - b.id
    );
    setDisplayList(sortedEntries);
  }, [entries, isSortClicked]);

  return (
    <div className="w-full max-w-2xl p-6 bg-yellow-50 rounded-lg shadow-md dark:bg-gray-800 mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Search Diary</h1>
        <Button
          variant="contained"
          sx={{ marginLeft: 3 }}
          onClick={() => setIsSortClicked(!isSortClicked)}
        >
          {isSortClicked ? "Show original order" : "Show the newest first"}
        </Button>
      </div>
      <div className="flex justify-around items-start  mt-3 flex-col">
        <Input
          fullWidth
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search diary..."
          className="mb-6 p-4 rounded-md"
        />
      </div>
      <List sx={{ minHeight: "300px" }}>
        {displayList.map((diary) => (
          <ListItem key={diary.id}>
            <ListItemText>{diary.date.toLocaleDateString()}</ListItemText>
            <ListItemText> {trimText(diary.text)}</ListItemText>
            <List></List>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
