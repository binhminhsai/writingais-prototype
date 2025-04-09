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
  placeholder?: string;
  minWords?: number;
  maxWords?: number;
}

export function Editor({
  value = "",
  onChange,
  onWordCountChange,
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
    setText(newText);
    onChange?.(newText);
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
      <div className="flex items-center space-x-1 border border-gray-300 rounded-t-md p-2 bg-gray-50">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormat("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormat("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormat("underline")}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormat("align-left")}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormat("align-center")}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormat("align-right")}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormat("bullet-list")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormat("numbered-list")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="min-h-[400px] rounded-t-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
