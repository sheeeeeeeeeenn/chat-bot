"use client";

import React from "react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { FaHtml5, FaCss3Alt, FaJs, FaJava, FaPhp, FaPython, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker, FaDatabase, FaFigma, FaCuttlefish } from "react-icons/fa";
import { SiTypescript, SiDotnet, SiTailwindcss, SiBootstrap, SiFirebase, SiMongodb, SiMysql, SiNextdotjs } from "react-icons/si";
import { SiAdobe } from "react-icons/si";





export default function Home() {
    const [messages, setMessages] = useState([
        { role: "bot", content: "👋 Hi there! I'm Shenmar's AI assistant. How can I help you today?" }
    ]);
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
        <main className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-900">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    <span className="text-blue-400">Full Stack</span> Developer Portfolio
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
                    Building applications, website projects with LLM technologies
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="#projects"
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Projects
                    </Link>
                    <a
                        href="#chat"
                        className="px-8 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Try My AI Assistant
                    </a>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2 bg-gray-700 p-6 rounded-lg">
                            <div className="aspect-square rounded-full bg-blue-500 mx-auto w-64 flex items-center justify-center text-6xl">
                                SB
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 text-gray-300">
                            <p className="text-xl mb-4">
                                I'm Shenmar Bonifacio, a developer focused on creating intelligent applications using the latest language models.
                            </p>
                            <p className="text-xl mb-4">
                                I am a Full Stack Developer skilled in building responsive, scalable web applications. With experience in both front-end and back-end technologies, I focus on delivering efficient, user-friendly solutions.
                            </p>
                            <p className="text-xl mb-4">
                                With expertise in Next.js, React, Php and large language model APIs like Groq and OpenAI, I build practical AI solutions that solve real-world problems.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Education</h2>
                    <div className="flex flex-col gap-8">
                        {/* Bachelor's Degree */}
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-2">Bachelor of Science in Computer Science</h3>
                            <p className="text-blue-400">St. Clare College of Caloocan (Scholar) | 2021 - Present</p>
                            <p className="text-gray-300 mt-2">
                                I am currently studying Bachelor of Science in Computer Science at St. Clare College of Caloocan.
                                The program has provided me with a well-rounded education, covering both theoretical foundations
                                and practical applications of computer science.
                            </p>
                            <p className="text-gray-300 mt-2"><strong>Position:</strong> SCC Departmental Treasurer (Present)</p>
                        </div>

                        {/* Senior High School - STEM */}
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-2">Science, Technology, Engineering and Mathematics (STEM)</h3>
                            <p className="text-blue-400">Metro Manila College | 2019 - 2021</p>
                            <p className="text-gray-300 mt-2"><strong>Achievements:</strong> With High Honors</p>
                        </div>

                        {/* Junior High School */}
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-2">Junior High School</h3>
                            <p className="text-blue-400">Bagumbong High School | 2015 - 2019</p>
                            <p className="text-gray-300 mt-2"><strong>Positions:</strong></p>
                            <ul className="list-disc list-inside text-gray-300">
                                <li>SSG President</li>
                                <li>CACHET President</li>
                                <li>SVO Representative</li>
                                <li>Science Club Vice President</li>
                                <li>TLE Club Representative</li>
                            </ul>
                            <p className="text-gray-300 mt-2"><strong>Achievements:</strong> Academic Awardee, Leadership Awardee, Many to mention</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Skills Section */}
            <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills & Technologies</h2>

                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Programming Languages</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { name: "HTML5", level: "Expert", icon: <FaHtml5 className="w-8 h-8 mb-3 mx-auto text-orange-500" /> },
                                { name: "CSS3", level: "Expert", icon: <FaCss3Alt className="w-8 h-8 mb-3 mx-auto text-blue-500" /> },
                                { name: "JavaScript", level: "Expert", icon: <FaJs className="w-8 h-8 mb-3 mx-auto text-yellow-500" /> },
                                { name: "TypeScript", level: "Expert", icon: <SiTypescript className="w-8 h-8 mb-3 mx-auto text-blue-400" /> },
                                { name: "C++", level: "Intermediate", icon: <FaCuttlefish className="w-8 h-8 mb-3 mx-auto text-blue-400" /> },
                                { name: "Java", level: "Intermediate", icon: <FaJava className="w-8 h-8 mb-3 mx-auto text-red-500" /> },
                                { name: "PHP", level: "Expert", icon: <FaPhp className="w-8 h-8 mb-3 mx-auto text-purple-500" /> },
                                { name: "React Native", level: "Expert", icon: <FaReact className="w-8 h-8 mb-3 mx-auto text-cyan-500" /> }
                            ].map((skill, i) => (
                                <div key={i} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center">
                                    {skill.icon}
                                    <h3 className="text-xl font-bold text-white mb-2 text-center">{skill.name}</h3>
                                    <p className="text-blue-400">{skill.level}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Frameworks & Libraries</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { name: "React", level: "Advanced", icon: <FaReact className="w-8 h-8 mb-3 mx-auto text-blue-400" /> },
                                { name: "Next.js", level: "Expert", icon: <SiNextdotjs className="w-8 h-8 mb-3 mx-auto text-black" /> },
                                { name: "Tailwind CSS", level: "Expert", icon: <SiTailwindcss className="w-8 h-8 mb-3 mx-auto text-teal-400" /> },
                                { name: "Bootstrap", level: "Advanced", icon: <SiBootstrap className="w-8 h-8 mb-3 mx-auto text-purple-500" /> }
                            ].map((skill, i) => (
                                <div key={i} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center">
                                    {skill.icon}
                                    <h3 className="text-xl font-bold text-white mb-2 text-center">{skill.name}</h3>
                                    <p className="text-blue-400">{skill.level}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Tools & Technologies</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { name: "Git", level: "Advanced", icon: <FaGitAlt className="w-8 h-8 mb-3 mx-auto text-red-500" /> },
                                { name: "GitHub", level: "Advanced", icon: <FaGithub className="w-8 h-8 mb-3 mx-auto text-white" /> },
                                { name: "Docker", level: "Intermediate", icon: <FaDocker className="w-8 h-8 mb-3 mx-auto text-blue-400" /> },
                                { name: "Firebase", level: "Intermediate", icon: <SiFirebase className="w-8 h-8 mb-3 mx-auto text-yellow-500" /> },
                                { name: "MongoDB", level: "Intermediate", icon: <SiMongodb className="w-8 h-8 mb-3 mx-auto text-green-500" /> },
                                { name: "MySQL", level: "Expert", icon: <SiMysql className="w-8 h-8 mb-3 mx-auto text-blue-500" /> },
                                { name: "Figma", level: "Advanced", icon: <FaFigma className="w-8 h-8 mb-3 mx-auto text-purple-500" /> },
                                { name: "Photoshop", level: "Expert", icon: <SiAdobe className="w-8 h-8 mb-3 mx-auto text-red-500" /> }

                            ].map((skill, i) => (
                                <div key={i} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center">
                                    {skill.icon}
                                    <h3 className="text-xl font-bold text-white mb-2 text-center">{skill.name}</h3>
                                    <p className="text-blue-400">{skill.level}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white mb-4 text-center">Featured Projects</h2>
                    <p className="text-blue-400 text-center mb-12 text-lg">Explore my recent work</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                id: "Career and Program Assessement",
                                title: "Program Recommendation System ( THESIS )",
                                description: "Discover Your Ideal Program with the Holland Code (RIASEC) Test",
                                tags: ["PHP", "HTML", "CSS", "JAVASCRIPT", "MySQL"],
                                link: "/projects/recommendation",
                                image: "/img/img.png"

                            },
                            {
                                id: "Food App",
                                title: "Shen Food Delivery App",
                                description: "Real Time Food Delivery Application",
                                tags: ["React Native", "Supabase", "Tailwind", "Expo"],
                                link: "/projects/foodapp",
                                image: "/img/icon.png" 
                            },
                            {
                                id: "realestate",
                                title: "Real Estate Platform",
                                description: "A full-stack real estate platform with property listings, interactive maps, secure authentication, and an admin dashboard for efficient management.",
                                tags: ["MERN Stack", "TypeScript", "Mapbox", "Cloudinary", "Admin Dashboard"],
                                link: "/projects/realestate",
                                image: "/img/real.png"
                            }

                        ].map((project, i) => (
                            <div key={i} className="group bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-blue-500">
                                <Link href={project.link} className="block">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                        <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full text-xs font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-blue-400 font-medium transition-all group-hover:translate-x-2">
                                            View Project Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            href="/projects"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Chat Demo Section */}
            <section id="chat" className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Try My AI Assistant</h2>

                    <div className="max-w-3xl mx-auto">
                        {/* Chat Container */}
                        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                            <div className="bg-gray-700 p-4 border-b border-gray-600">
                                <h3 className="text-xl font-bold text-white">Lumina A.I</h3>
                            </div>

                            <div className="h-96 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`${msg.role === "user" ? "ml-auto" : "mr-auto"} 
                                        p-3 rounded-xl w-fit max-w-[80%] ${msg.role === "user"
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-700 text-white"
                                            }`}
                                    >
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="p-3 bg-gray-700 text-white rounded-xl w-fit max-w-[80%]">
                                        <Loader2 className="animate-spin inline-block" />
                                    </div>
                                )}

                                <div ref={chatEndRef} />
                            </div>

                            {/* Input & Send Button */}
                            <div className="p-4 border-t border-gray-600">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        className="flex-1 p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Ask me anything..."
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={loading}
                                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <Send />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-blue-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        I'm open to freelance projects, collaborations, and full-time opportunities.
                    </p>
                    <a
                        href="mailto:contact@example.com"
                        className="px-8 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors inline-block"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>© {new Date().getFullYear()} Shenmar Bonifacio. All Rights Reserved.</p>
                </div>
            </footer>
        </main>
    );
}