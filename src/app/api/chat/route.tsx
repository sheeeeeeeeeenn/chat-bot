import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        // Custom responses for portfolio-specific questions
        if (message.toLowerCase().includes("who created you")) {
            return NextResponse.json({
                reply: "I was created by Shenmar Bonifacio, an AI developer specializing in LLM applications."
            });
        }

        if (message.toLowerCase().includes("what can you do")) {
            return NextResponse.json({
                reply: "I'm an AI assistant created by Shenmar Bonifacio. I can answer questions, help with various tasks, provide information, and showcase Shenmar's AI development skills. Feel free to ask me anything!"
            });
        }

        if (message.toLowerCase().includes("portfolio") || message.toLowerCase().includes("projects")) {
            return NextResponse.json({
                reply: "Shenmar has worked on several projects including this chatbot, an AI content generator, a sentiment analysis tool, and various custom LLM integrations. You can see more details in the Projects section of this portfolio."
            });
        }

        // Call the Groq API for other responses
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "llama3-70b-8192",
                    messages: [
                        {
                            role: "system",
                            content: "You are an AI assistant created by Shenmar Bonifacio. You're helpful, creative, friendly, and showcase Shenmar's AI development skills. Keep responses concise and engaging."
                        },
                        { role: "user", content: message }
                    ],
                    max_tokens: 800,
                    temperature: 0.7,
                }),
            });

            const data = await response.json();

            if (data.error) {
                console.error("Groq API Error:", data.error);
                return NextResponse.json({
                    reply: "I'm having trouble connecting to my AI service. Please try again later."
                }, { status: 500 });
            }

            if (!data.choices || data.choices.length === 0) {
                return NextResponse.json({
                    reply: "I received an empty response. Please try asking something else."
                }, { status: 500 });
            }

            return NextResponse.json({ reply: data.choices[0].message.content });
        } catch (error) {
            console.error("API Call Error:", error);
            return NextResponse.json({
                reply: "I encountered an error while processing your request. Please try again."
            }, { status: 500 });
        }
    } catch (error) {
        console.error("Request Processing Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}