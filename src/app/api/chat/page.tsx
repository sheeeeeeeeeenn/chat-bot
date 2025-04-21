"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function ChatPage() {
    const [messages, setMessages] = useState([
        {
            role: "bot",
            content: "👋 Hi there! I'm Shenmar's AI assistant. How can I help you today?"
        }
    ]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const resetChat = () => {
        setMessages([
            {
                role: "bot",
                content: "Chat reset. How can I help you today?"
            }
        ]);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
    }, [messages]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 pt-16">
            <div className="container mx-auto px-4 py-8 flex-grow">
                <div className="max-w-4xl mx-auto">

                    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        <div className="bg-gray-700 p-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <Bot className="text-blue-400 mr-2" />
                                <h1 className="text-xl font-bold text-white">AI Assistant</h1>
                            </div>
                            <button
                                onClick={resetChat}
                                className="text-gray-400 hover:text-white"
                                title="Reset conversation"
                            >
                                New Chat
                            </button>
                        </div>

                        <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "bot" && (
                                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                                            <Bot size={18} className="text-white" />
                                        </div>
                                    )}

                                    <div
                                        className={`p-3 rounded-lg max-w-[80%] ${msg.role === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-700 text-white"
                                            }`}
                                    >
                                        <ReactMarkdown
                                            className="prose prose-invert max-w-none"
                                            components={{
                                                pre: ({ node, ...props }) => (
                                                    <div className="bg-gray-900 p-2 rounded my-2 overflow-auto">
                                                        <pre {...props} />
                                                    </div>
                                                ),
                                                code: ({ node, inline, ...props }: { node?: any; inline?: boolean;[key: string]: any }) =>
                                                    inline ? (
                                                        <code className="bg-gray-900 px-1 py-0.5 rounded text-sm" {...props} />
                                                    ) : (
                                                        <code {...props} />
                                                    )
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>

                                    {msg.role === "user" && (
                                        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center ml-2">
                                            <User size={18} className="text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                                        <Bot size={18} className="text-white" />
                                    </div>
                                    <div className="p-3 bg-gray-700 text-white rounded-lg">
                                        <Loader2 className="animate-spin" />
                                    </div>
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-600">
                            <div className="flex space-x-2">
                                <textarea
                                    ref={inputRef}
                                    className="flex-1 p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    onKeyDown={handleKeyDown}
                                    rows={2}
                                ></textarea>
                                <button
                                    onClick={sendMessage}
                                    disabled={loading || !message.trim()}
                                    className={`px-4 py-2 rounded-lg flex items-center justify-center ${loading || !message.trim()
                                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Send />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Press Enter to send, Shift+Enter for a new line
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-900 text-gray-400 py-4 mt-8">
                <div className="container mx-auto px-4 text-center">
                    <p>© {new Date().getFullYear()} Shenmar Bonifacio. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}