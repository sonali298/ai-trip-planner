import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

// This is the correct configuration for the Groq API client
export const openai = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
});

// NEW, IMPROVED PROMPT
// In app/api/aimodel/route.ts

// ... (your OpenAI client setup remains the same)

// NEW, MORE FLEXIBLE PROMPT
const PROMPT = `You are an AI Trip Planner Agent who asks one question at a time to plan a user's trip.
Your goal is to have a natural, text-based conversation.

- Ask questions in sequence: Starting location, Destination, Group size, Budget, etc.
- Your entire response must be in a strict JSON format.

The JSON object must always have a "resp" key containing your friendly, conversational text response.

Optionally, if and only if you need the user to select from a specific list of options, you can include a "ui" key.
- For asking about the number of travelers, include "ui": "groupSize".
- For all other questions, DO NOT include the "ui" key.

Example of a standard response (most common):
{
  "resp": "Great! You're starting from Charlotte and heading to New York. How many people will be traveling with you?"
}

Example of a response that needs a special UI:
{
  "resp": "Okay, so you're planning to travel from Delhi to Paris! How many people are you planning to travel with?",
  "ui": "groupSize"
}
`;

// ... the rest of your file (the POST function) remains exactly the same.

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