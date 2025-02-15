import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { message } = await req.json();

    if (!message) {
        return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    console.log("API Key:", apiKey ? "Loaded" : "Missing");

    if (!apiKey) {
        return NextResponse.json({ error: "Missing API Key in server" }, { status: 500 });
    }

    // ✅ Custom Response for "Who created you?"
    if (message.toLowerCase().includes("who created you")) {
        return NextResponse.json({ reply: "I was created by Shenmar Bonifacio." });
    }

    try {
        const response = await fetch("https://api.groq.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.choices || data.choices.length === 0) {
            return NextResponse.json({ reply: "No response from AI." }, { status: 500 });
        }

        return NextResponse.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
    }
}
