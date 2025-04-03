import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

interface QuestionResponse {
  question: string;
  response: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generateContent = async () => {
    try {
      setLoading(true);
      setError("");

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;

      // Add new question-response to the beginning of the array
      setResponses((prev) => [
        {
          question: prompt,
          response: response.text(),
        },
        ...prev,
      ]);

      // Clear the input
      setPrompt("");
    } catch (err) {
      setError("Failed to generate content. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 mb-4">
            AI Content Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your ideas into engaging content with the power of AI
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading && prompt) {
                    generateContent();
                  }
                }}
                placeholder="Enter your prompt here..."
                className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-lg
                  ${
                    error
                      ? "border-red-300 focus:border-red-300 focus:ring-red-100 bg-red-50"
                      : "border-gray-100 focus:border-blue-300 focus:ring-blue-100 bg-white"
                  }
                  ${loading ? "bg-gray-50" : ""}
                  placeholder-gray-400 text-gray-800`}
                disabled={loading}
              />
              {loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="animate-pulse flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={generateContent}
              disabled={loading || !prompt}
              className={`px-6 py-4 rounded-xl transform transition-all duration-200 font-semibold shadow-lg cursor-pointer
                ${
                  loading || !prompt
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:from-blue-500 hover:to-indigo-600 hover:scale-105"
                }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate"
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-300 rounded-lg text-red-700 animate-shake flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {responses.length > 0 && (
            <div className="space-y-8">
              {responses.map((item, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-blue-600">
                      Q: {item.question}
                    </h3>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-lg relative">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 mb-2 [&>li]:mb-0.5">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 mb-2 [&>li]:mb-0.5">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="pl-1 leading-tight">{children}</li>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-gray-50 p-3 rounded-lg mb-2 overflow-x-auto">
                              {children}
                            </pre>
                          ),
                          code: ({ children }) => (
                            <code className="bg-gray-50 px-1 py-0.5 rounded">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {item.response}
                      </ReactMarkdown>
                    </div>
                    <button
                      onClick={() => handleCopy(item.response, index)}
                      className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
