import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

// This is the correct configuration for the Groq API client
export const openai = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
});

// NEW, IMPROVED PROMPT
const PROMPT = `You are an AI Trip Planner Agent who asks one question at a time to plan a user's trip.
Based on the user's answers, ask the next question in the sequence:
1. Starting location
2. Destination
3. Group size
4. Budget
5. Trip duration
6. Travel interests
7. Special requirements

Your entire response must be in a strict JSON format. Do not include any extra text, explanations, or markdown.

The JSON object must have two keys:
1.  "ui": A short string representing the next piece of information you are asking for (e.g., "destination", "groupSize", "budget").
2.  "resp": A friendly, conversational string which is your full response to the user, asking the next question.

Example of a valid response:
{
  "resp": "Great! Where would you like to travel to from Delhi? Please tell me the destination city or country.",
  "ui": "destination"
}
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'llama3-8b-8192',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: PROMPT },
        ...messages
      ],
    });

    const messageContent = completion.choices[0].message.content;

    if (!messageContent) {
      throw new Error("Empty response from AI");
    }
    
    const responseObject = JSON.parse(messageContent);
    
    return NextResponse.json(responseObject);

  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}