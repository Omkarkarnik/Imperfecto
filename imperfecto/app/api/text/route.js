import { NextResponse } from "next/server";

const Groq = require('groq-sdk');

const systemPrompt = ``

export async function POST(req) {
    const apiKey = process.env.LLAMA_API_KEY;
    const groq = new Groq({ apiKey });
    const data = await req.text();
    const completion = await groq.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data },
        ],
        model: 'llama3-8b-8192',
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null,
    });

}