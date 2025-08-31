import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

// This is the correct configuration for the Groq API client
export const openai = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
});

// THIS IS THE ONLY MINIMAL CHANGE:
// The prompt is now more explicit about the final step.
const PROMPT = `You are an AI Trip Planner Agent. Your primary role is to ask questions sequentially to gather all information needed for a trip plan.

Your response MUST ALWAYS be a JSON object.

The JSON object MUST contain two keys:
1. "resp": Your full, conversational question to the user.
2. "ui": A keyword indicating the UI to show.

Ask questions in this exact sequence:
1. Starting location (use "ui": "text")
2. Destination (use "ui": "text")
3. Group size (use "ui": "groupSize")
4. Budget (use "ui": "budget")
5. Trip duration (use "ui": "tripDuration")
6. Travel interests (use "ui": "text")
7. Special requirements (use "ui": "text")

After you have asked about and received an answer for "Special requirements", your very next response MUST be a confirmation message and the "ui" key set to "final".

Example of the final response:
{
  "resp": "Thanks for all the details! I'm now generating your personalized trip plan.",
  "ui": "final"
}
`;


export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Create a clean version of the message history for the AI.
    const history = messages.map(({ role, content }: any) => ({
      role,
      content,
    }));

    const completion = await openai.chat.completions.create({
      model: 'llama3-8b-8192',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: PROMPT },
        ...history // Use the cleaned history here
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