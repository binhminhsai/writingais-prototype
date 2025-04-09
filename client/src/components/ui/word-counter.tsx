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
      className={`flex items-center bg-gray-100 px-3 py-1 rounded-md ${
        isValid ? "text-gray-600" : "text-red-600"
      }`}
    >
      <FileType className="mr-2 h-4 w-4" />
      <span className="font-mono">{count}/{maxWords}</span>
    </div>
  );
}
