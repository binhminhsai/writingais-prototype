import { FileType } from "lucide-react";

interface WordCounterProps {
  count: number;
  maxWords?: number;
  isValid?: boolean;
  minWords?: number;
}

export function WordCounter({
  count,
  maxWords = 500,
  isValid = true,
  minWords = 250,
}: WordCounterProps) {
  // Check if count is less than minWords (default 250)
  const isCountValid = count >= minWords;
  // Check if count is 50 or over for color change
  const isOverFifty = count >= 50;
  // Check if count has reached the maximum limit
  const hasReachedMaxLimit = count >= maxWords;
  
  return (
    <div
      className={`flex items-center bg-gray-100 px-2 py-0.5 rounded-md h-6 ${
        hasReachedMaxLimit ? "text-red-600" : isOverFifty ? "text-[#4b5563]" : !isCountValid ? "text-red-600" : isValid ? "text-gray-600" : "text-red-600"
      }`}
    >
      <FileType className="mr-1.5 h-3.5 w-3.5" />
      <span className="font-mono text-sm">{count}/{maxWords}</span>
    </div>
  );
}
