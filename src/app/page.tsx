"use client";
import { features } from "@/assets/features";
import DiaryBoard from "@/components/DiaryBoard";
import { FeatureCard } from "@/components/FeatureCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 md:px-8 lg:px-24 py-24">
      <header className="z-10 fixed top-0 left-0 w-full border-b bg-yellow-50 py-4 md:py-8">
        <p className="text-center font-mono text-sm">
          Crafted by Auntie Liko, whose diary sprints started fast and quit
          faster.
        </p>
      </header>
      <div className="relative z-0 flex flex-col items-center mt-24 md:mt-32">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-semibold mb-2 md:mb-3">
          JourneyPal
        </h2>
        <p className="text-xl md:text-2xl lg:text-3xl opacity-50 max-w-xs md:max-w-md lg:max-w-[30ch] text-center">
          An AI assistant to help you write diaries faster and easier.
        </p>
      </div>
      <section className="mb-12 md:mb-16 lg:mb-20">
        <DiaryBoard />
      </section>
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 md:mb-20 lg:mb-32">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </main>
  );
}
