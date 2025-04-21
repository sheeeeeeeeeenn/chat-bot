// src/app/components/ProjectsSection.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/app/data/projects";

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-20 bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white mb-4 text-center">Featured Projects</h2>
                <p className="text-blue-400 text-center mb-12 text-lg">Explore my recent work</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, i) => (
                        <div
                            key={project.id}
                            className="group bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-blue-500"
                        >
                            <Link href={`/projects/${project.id}`} className="block">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.images[0] || '/placeholder-image.png'}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 mb-4 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full text-xs font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center text-blue-400 font-medium transition-all group-hover:translate-x-2">
                                        View Project Details
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}