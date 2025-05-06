import { FileType } from "lucide-react";

interface WordCounterProps {
  count: number;
  maxWords?: number;
  isValid?: boolean;
}

export function WordCounter({
  count,
  maxWords = 500,
  isValid = true,
}: WordCounterProps) {
  return (
    <div
      className={`flex items-center bg-gray-100 px-2 py-0.5 rounded-md h-6 ${
        isValid ? "text-gray-600" : "text-red-600"
      }`}
    >
      <FileType className="mr-1.5 h-3.5 w-3.5" />
      <span className="font-mono text-sm">{count}/{maxWords}</span>
    </div>
  );
}
