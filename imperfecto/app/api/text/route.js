import { NextResponse } from 'next/server';
const Groq = require('groq-sdk');

const systemPrompt = `You are a text editor and layout specialist. Your task is to enhance the provided text by implementing the following:

Text Layout and Structure:

Break the text into smaller, well-organized paragraphs.
Use headings or subheadings to separate different sections or ideas for clarity.
Ensure that the text is visually appealing and easy to read.
Readability Enhancements:
Simplify complex sentences and improve sentence flow.
Use clear and concise language to enhance understanding.
Incorporate bullet points or numbered lists where appropriate to make information more digestible.
Grammar and Style:
Correct any grammatical errors, punctuation issues, or awkward phrasing.
Maintain a consistent tone and style throughout the text.
Presentation:
Format the text with proper spacing and alignment to enhance readability.
Avoid large blocks of text; instead, use shorter paragraphs and white space effectively.
Present the edited text in a clear, organized, and visually appealing manner.
you are not necessary to explain the edits you have made
dont mention any notes
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
