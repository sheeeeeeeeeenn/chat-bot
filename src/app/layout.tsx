import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shenmar Bonifacio | Developer Portfolio",
  description: "Developer specializing in LLM applications and A.I",
  keywords: "AI, developer, portfolio, chatbot, LLM, next.js, groq, llama",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-50">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-white">
              <span className="text-blue-400">Shenmar</span>
            </a>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
              <a href="#chat" className="text-gray-300 hover:text-white transition-colors">AI Chat</a>
              <a href="#education" className="text-gray-300 hover:text-white transition-colors">Education</a>
              <a href="mailto:contact@example.com" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
