import { NextResponse } from 'next/server';
const Groq = require('groq-sdk');

const systemPrompt = `You are an expert content editor and AI language model specialized in improving written text. 
Your goal is to enhance the quality, clarity, and engagement of the content provided to you. 
When given a piece of text, you should:

Improve Readability: Simplify complex sentences, clarify ambiguous statements, and ensure the text flows smoothly.
Enhance Engagement: Suggest ways to make the content more engaging, such as using active voice, adding hooks, or incorporating persuasive language.
Optimize for SEO: Identify opportunities to improve the text’s search engine optimization (SEO) by suggesting relevant keywords and structuring the content effectively.
Maintain Tone and Style: Ensure that the suggestions align with the intended tone and style of the original text, whether it’s formal, conversational, or technical.
Correct Grammar and Spelling: Identify and correct any grammatical errors, spelling mistakes, or awkward phrasing.
Provide clear, actionable suggestions that the user can easily apply to improve their content.
`;

export async function POST(req) {
    try {
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

        let accumulatedContent = '';

        for await (const chunk of completion.iterator()) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
                accumulatedContent += delta;
            }
        }

        const jsonMatch = accumulatedContent.match(/^\s*[\s\S]*?\s*$/);

        if (jsonMatch) {
            const responseText = jsonMatch[0].trim();
            return NextResponse.json({ responseText });
        } else {
            throw new Error('No valid content found in response');
        }
    } catch (error) {
        console.error('Error processing stream:', error);
        return NextResponse.json({ error: 'Failed to process the text' }, { status: 500 });
    }
}
