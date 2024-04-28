export const features = [
  {
    title: "Generate Diary",
    description: "No ideas? Let JourneyPal suggests you some!",
  },
  {
    title: "Search History",
    description: "Diary detective at your service, find and sort your stories!",
  },
  {
    title: "Send As Email!",
    description: "Click and send, hand out summer homework in ease",
  },
  {
    title: "Spell Check",
    description: "Let me check your work and help you spot any mistakes!",
  },
] as const;

export type Feature = (typeof features)[number];
