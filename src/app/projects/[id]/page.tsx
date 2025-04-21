// src/app/projects/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "@/app/data/projects";

export default function ProjectDetail({ params }: { params: { id: string } }) {
    const project = PROJECTS.find(p => p.id === params.id);

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-950 flex items-center justify-center px-4">
                <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl text-white text-center shadow-lg w-full max-w-md">
                    <h1 className="text-2xl sm:text-4xl font-extrabold mb-4">Project Not Found</h1>
                    <Link href="/#projects" className="mt-4 inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back to projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-950 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
                <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mt-6">
                    <div className="h-56 sm:h-72 bg-blue-800 flex items-center justify-center text-center px-4">
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{project.title}</h1>
                    </div>

                    <div className="p-6 sm:p-10">
                        {/* Project Image */}
                        {project.images && project.images.length > 0 && (
                            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                            {project.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-900 text-blue-200 rounded-full text-xs sm:text-sm shadow-md">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">{project.description}</p>

                        {/* Project Details */}
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Project Details</h2>
                            <p className="text-gray-300 text-base sm:text-lg">{project.details}</p>
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Features</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-300 text-base sm:text-lg">
                                {project.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        ✅ {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technologies Used */}
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Technologies Used</h2>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 text-white rounded-lg text-xs sm:text-sm shadow-md">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Links */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md text-center"
                            >
                                🚀 Live Demo
                            </a>
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all shadow-md text-center"
                            >
                                📂 GitHub Repository
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}