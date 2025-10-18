import { NextRequest, NextResponse } from "next/server";
// ### CHANGE: Google ki jagah OpenAI ka package import kiya (OpenRouter ke liye)
import OpenAI from 'openai';

// ### CHANGE: Naya OpenAI client initialize kiya OpenRouter ke liye
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", // OpenRouter ka endpoint
  apiKey: process.env.OPENROUTER_API_KEY, // OpenRouter ki key
});

const PROMPT = `You are an AI Trip Planner Agent. Your only function is to ask questions to plan a trip.
Your response MUST be a valid JSON object and NOTHING ELSE.
The JSON object MUST have two keys: "resp" (your question) and "ui" (a keyword).
After ALL information is gathered, your response must use "ui": "final".`;

const FINAL_PROMPT = `Generate a complete Travel Plan...
JSON Output Schema: { ... "hotels": [{"hotel_name": "...", "hotel_image_url": "string (MUST be a REAL, working, public image URL, NO placeholders like example.com)", ...}], ... }`;

export async function POST(req: NextRequest) {
  console.log("API route hit. Processing request with OpenRouter...");
  try {
    const { messages } = await req.json();

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const isFinal = lastUserMessage.includes("generate the final trip plan");

    // ### CHANGE: History format wapas OpenAI jaisa kiya
    const history = messages.map(({ role, content }: any) => ({ role, content }));

    const completion = await openai.chat.completions.create({
      // ### CHANGE: OpenRouter ka free model use kiya
      model: "mistralai/mistral-7b-instruct:free", 
      response_format: { type: 'json_object' }, 
      messages: [
        { role: 'system', content: isFinal ? FINAL_PROMPT : PROMPT },
        ...history
      ],
    });

    let messageContent = completion.choices[0].message.content;
    if (!messageContent) { throw new Error("Empty response from AI"); }

    let responseObject = JSON.parse(messageContent);
    
    // Fallback logic agar AI galti kare (optional but good)
    if (responseObject.resp && typeof responseObject.resp === 'string') {
        try {
            const nestedPlan = JSON.parse(responseObject.resp);
            if (nestedPlan.trip_plan) {
                console.log("AI might have nested the plan, extracting.");
                responseObject = nestedPlan;
            }
        } catch (e) { /* Ignore */ }
    }
    
    console.log("Successfully processed request via OpenRouter.");
    return NextResponse.json(responseObject);

  } catch (e: any) {
    console.error("API Error in POST function:", e.message);
    // OpenRouter se specific error details mil sakti hain
    if (e.response && e.response.data) {
        console.error("OpenRouter Error Details:", e.response.data);
    }
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}