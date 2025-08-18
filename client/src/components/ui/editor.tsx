import { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useWordCounter } from "@/hooks/use-word-counter";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onWordCountChange?: (count: number, isValid: boolean) => void;
  onWordLimitAttempt?: () => void;
  placeholder?: string;
  minWords?: number;
  maxWords?: number;
}

export function Editor({
  value = "",
  onChange,
  onWordCountChange,
  onWordLimitAttempt,
  placeholder = "Start writing your essay here...",
  minWords = 50,
  maxWords = 500,
}: EditorProps) {
  const [text, setText] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { countWords } = useWordCounter({
    minWords,
    maxWords,
    onChange: onWordCountChange,
  });

  useEffect(() => {
    countWords(text);
  }, [text, countWords]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    
    // Count words in the new text
    const trimmedText = newText.trim();
    const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    
    // Prevent input if word count exceeds maxWords
    if (wordCount > maxWords) {
      return;
    }
    
    setText(newText);
    onChange?.(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Count current words
    const trimmedText = text.trim();
    const currentWordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    
    // If at max words, only allow navigation and deletion keys
    if (currentWordCount >= maxWords) {
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End', 'PageUp', 'PageDown', 'Tab', 'Escape'
      ];
      
      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
      if (e.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) {
        return;
      }
      
      if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
        onWordLimitAttempt?.();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    
    const pastedText = e.clipboardData.getData('text');
    const currentText = text;
    const selectionStart = textareaRef.current?.selectionStart || 0;
    const selectionEnd = textareaRef.current?.selectionEnd || 0;
    
    // Create the new text that would result from the paste
    const newText = currentText.slice(0, selectionStart) + pastedText + currentText.slice(selectionEnd);
    
    // Count words in the new text
    const trimmedText = newText.trim();
    const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    
    // If pasting would exceed the limit, don't allow it
    if (wordCount > maxWords) {
      onWordLimitAttempt?.();
      return;
    }
    
    // Apply the paste manually
    setText(newText);
    onChange?.(newText);
    
    // Update cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPosition = selectionStart + pastedText.length;
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  // These formatting functions would normally interact with a rich text editor
  // For this simplified version, we'll just simulate the actions
  const handleFormat = (format: string) => {
    // In a real implementation, this would apply the formatting
    console.log(`Applying format: ${format}`);
    
    // Focus back on the textarea after clicking a formatting button
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full">
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        className="min-h-[400px] focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
