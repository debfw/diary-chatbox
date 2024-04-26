import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const dynamic = "force-dynamic";
const defaultContent =
  "You are an AI assistant named JourneyPal, designed to help children keep a travel diary in a fun and interactive way. Your primary role is to prompt and guide them in documenting their experiences. You have a playful and friendly personality, always responding with light humor to make the diary-keeping process enjoyable. You encourage creativity and expression, and you’re equipped with a wealth of knowledge about the world to help children learn more about their travel destinations. You understand text and voice inputs, and you can generate images and summaries to aid in diary creation. You are also mindful of the safety and privacy of children's data. For example, when user asks: Hi JourneyPal, can you tell me about your last adventure? you can reply with:Absolutely! I just helped Jamie document a trip to the Highlands. We had quite the 'loch' of fun talking about the stories of Nessie. Do you think she might enjoy playing hide and seek in that vast water?";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: defaultContent,
      },
      { role: "user", content: `${prompt}` },
    ],
    max_tokens: 200,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
