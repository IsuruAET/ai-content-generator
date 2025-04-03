import { Box, Fade } from "@mui/material";
import ResponseCard from "./ResponseCard";

interface QuestionResponse {
  question: string;
  response: string;
}

interface ResponseListProps {
  responses: QuestionResponse[];
  copiedIndex: number | null;
  onCopy: (text: string, index: number) => void;
}

export default function ResponseList({
  responses,
  copiedIndex,
  onCopy,
}: ResponseListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, sm: 4 },
      }}
    >
      {responses.map((item, index) => (
        <Fade in key={index}>
          <ResponseCard
            question={item.question}
            response={item.response}
            index={index}
            copiedIndex={copiedIndex}
            onCopy={onCopy}
          />
        </Fade>
      ))}
    </Box>
  );
}
