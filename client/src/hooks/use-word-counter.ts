import { useState, useCallback } from "react";

type WordCountConfig = {
  minWords?: number;
  maxWords?: number;
  onChange?: (count: number, isValid: boolean) => void;
};

export const useWordCounter = ({
  minWords = 50,
  maxWords = 500,
  onChange,
}: WordCountConfig = {}) => {
  const [wordCount, setWordCount] = useState(0);
  const [isValid, setIsValid] = useState(true);

  const countWords = useCallback(
    (text: string) => {
      const trimmedText = text.trim();
      const count = trimmedText ? trimmedText.split(/\s+/).length : 0;
      const valid = count >= minWords && count <= maxWords;
      
      setWordCount(count);
      setIsValid(valid);
      
      onChange?.(count, valid);
      
      return { count, isValid: valid };
    },
    [minWords, maxWords, onChange]
  );

  return {
    wordCount,
    isValid,
    countWords,
    minWords,
    maxWords,
  };
};
