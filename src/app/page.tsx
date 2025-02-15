"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { role: "user", content: message };
        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            const botMessage = { role: "bot", content: data.reply || "No response from AI." };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessages((prev) => [...prev, { role: "bot", content: "Error: Unable to connect." }]);
        }
        setLoading(false);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#f3e9e1] to-[#4a6072] p-4">
            <h1 className="text-3xl font-bold text-white mb-4">💬 AI Chatbot</h1>

            {/* Chat Container */}
            <div className="w-full max-w-lg h-[450px] overflow-y-auto bg-white p-4 rounded-lg shadow-xl">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-3 my-2 rounded-xl w-fit max-w-[80%] text-sm ${msg.role === "user"
                                ? "bg-blue-500 text-white ml-auto"
                                : "bg-gray-200 text-black"
                            }`}
                    >
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                ))}

                {loading && (
                    <div className="p-3 my-2 bg-gray-300 text-black rounded-xl w-fit max-w-[80%]">
                        <Loader2 className="animate-spin inline-block mr-2" /> Typing...
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input & Send Button */}
            <div className="w-full max-w-lg flex items-center space-x-2 mt-4">
                <input
                    type="text"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Send />}
                    Send
                </button>
            </div>
        </div>
    );
}
