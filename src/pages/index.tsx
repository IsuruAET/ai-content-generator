import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Alert } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
import Layout from "components/Layout";
import PromptInput from "components/ai-content-generator/PromptInput";
import ResponseList from "components/ai-content-generator/ResponseList";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

interface QuestionResponse {
  question: string;
  response: string;
}

export default function Home() {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generateContent = async (prompt: string) => {
    try {
      setLoading(true);
      setError("");

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;

      setResponses((prev) => [
        {
          question: prompt,
          response: response.text(),
        },
        ...prev,
      ]);
    } catch (err) {
      setError("Failed to generate content. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="AI Content Generator"
      subtitle="Transform your ideas into engaging content with the power of AI"
    >
      <PromptInput
        onGenerate={generateContent}
        loading={loading}
        error={!!error}
      />

      {error && (
        <Alert
          severity="error"
          icon={<ErrorIcon />}
          sx={{ mb: 4, borderRadius: 2 }}
        >
          {error}
        </Alert>
      )}

      {responses.length > 0 && (
        <ResponseList
          responses={responses}
          copiedIndex={copiedIndex}
          onCopy={handleCopy}
        />
      )}
    </Layout>
  );
}
