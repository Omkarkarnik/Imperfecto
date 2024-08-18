import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
// const Groq = require('groq-sdk');

const systemPrompt = `You are an expert content editor and AI language model specialized in improving written text. Your goal is to enhance the quality, clarity, and engagement of the content provided to you. When given a piece of text, you should:

Improve Readability: Simplify sentences, clarify statements, and ensure smooth flow.
Enhance Engagement: Suggest ways to make the content more engaging, using active voice and persuasive language.
Optimize for SEO: Recommend relevant keywords and effective content structuring.
Maintain Tone and Style: Ensure suggestions align with the original tone and style (e.g., formal, conversational, technical).
Correct Grammar and Spelling: Identify and correct grammatical errors, spelling mistakes, and awkward phrasing.

Your response should be structured as follows:
Suggestions for Improvement:
Explain what specific aspects of the content can be improved and why these changes are beneficial.
Revised Version of Input:
Provide an edited version of the original text with the improvements applied.
Explain what changes were made and how they enhance the overall quality, clarity, and effectiveness of the content.
`;

// Function to process text with openAI-API
export async function POST(req) {
    try {
        // Set up the OpenAI API client with your API key
        const apiKey = process.env.OPENAI_API_KEY;
        const configuration = new Configuration({ apiKey });
        const openai = new OpenAIApi(configuration);

        // Read the input text from the request
        const data = await req.text();
        
        // Create a streaming completion request to OpenAI
        const completion = await openai.createChatCompletion({
            model: 'gpt-4o-mini', // Specify the model you want to use
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data },
            ],
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: true, // Enable streaming
            stop: null,
        });

        let accumulatedContent = '';
        console.log("Currently in API and processing user request")
        // Process the streamed response
        for await (const chunk of completion.data) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
                accumulatedContent += delta;
            }
        }

        const responseText = accumulatedContent.trim();

        // Return the accumulated response as JSON
        return NextResponse.json({ responseText });
    } catch (error) {
        console.error('Error processing OpenAI request:', error);
        return NextResponse.json({ error: 'Failed to process the text' }, { status: 500 });
    }
}

// Funtion to process text with Llama-API
// export async function POST(req) {
//     try {
//         const apiKey = process.env.LLAMA_API_KEY;
//         const groq = new Groq({ apiKey });
//         const data = await req.text();

//         const completion = await groq.chat.completions.create({
//             messages: [
//                 { role: 'system', content: systemPrompt },
//                 { role: 'user', content: data },
//             ],
//             model: 'llama3-8b-8192',
//             temperature: 1,
//             max_tokens: 1024,
//             top_p: 1,
//             stream: true,
//             stop: null,
//         });

//         let accumulatedContent = '';

//         for await (const chunk of completion.iterator()) {
//             const delta = chunk.choices[0]?.delta?.content;
//             if (delta) {
//                 accumulatedContent += delta;
//             }
//         }

//         const jsonMatch = accumulatedContent.match(/^\s*[\s\S]*?\s*$/);

//         if (jsonMatch) {
//             const responseText = jsonMatch[0].trim();
//             return NextResponse.json({ responseText });
//         } else {
//             throw new Error('No valid content found in response');
//         }
//     } catch (error) {
//         console.error('Error processing stream:', error);
//         return NextResponse.json({ error: 'Failed to process the text' }, { status: 500 });
//     }
// }
