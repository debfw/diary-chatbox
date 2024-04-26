"use client";
import ChatSnackbar from "@/components/ChatSnackbar";
import { features } from "@/assets/features";
import { FeatureTitles } from "@/types/feature";

import { ReactNode, useState } from "react";

import SpellCheck from "@/components/spellCheck";
import DiaryBoard from "@/components/DiaryBoard";

export default function Home() {
  const [displayFeature, setDisplayFeature] = useState<ReactNode>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl flex items-center justify-between font-mono text-sm flex-wrap">
        <p className="fixed left-0 top-0 w-full flex justify-center border-b py-8 bg-yellow-50">
          Developed by Auntie Liko.
        </p>
      </div>

      <div className="relative z-0 flex flex-col items-center">
        <h2 className="mb-3 text-9xl font-semibold">JourneyPal</h2>
        <p className="text-3xl max-w-[30ch] opacity-50">
          An AI assistant to help you write diaries faster and easier.
        </p>
        <DiaryBoard />
      </div>

      <div className="mt-10 mb-10"> {displayFeature}</div>

      <div className="mb-32 lg:mb-0 lg:w-full lg:max-w-5xl lg:grid lg:grid-cols-4 lg:text-left">
        {features.map((feature) => (
          <div key={feature.title} className="mb-6 lg:mb-0 ">
            <div className="mb-2 text-2xl font-semibold">{feature.title}</div>
            <p className="text-sm max-w-[25ch] opacity-50 ">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
