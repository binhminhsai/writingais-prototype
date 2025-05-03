import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateRandomTopic } from "@/data/topics";

export type WritingTestType = 
  | "ielts-task2" 
  | "toefl" 
  | "general" 
  | "business";

export type DifficultyLevel = 
  | "easy" 
  | "medium" 
  | "hard" 
  | "expert";

interface TestSetupProps {
  onStart: (config: {
    testType: WritingTestType;
    difficulty: DifficultyLevel;
    topic: string;
    timeLimit: number;
  }) => void;
}

export function TestSetup({ onStart }: TestSetupProps) {
  const [testType, setTestType] = useState<WritingTestType>("ielts-task2");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("medium");
  const [topic, setTopic] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);

  const handleGenerateTopic = () => {
    const textareaValue = (document.getElementById('topic') as HTMLTextAreaElement).value;
    // Sử dụng với 2 tham số vì hàm generateRandomTopic chỉ nhận 2 tham số
    const randomTopic = generateRandomTopic(testType, difficulty);
    setTopic(randomTopic);
  };

  const handleStartWriting = () => {
    if (!topic.trim()) {
      alert("Please enter a topic or generate a random one.");
      return;
    }

    onStart({
      testType,
      difficulty,
      topic,
      timeLimit,
    });
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-2xl font-semibold mb-6">English Writing Practice</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="writing-type" className="mb-3 block">
            Select Writing Test Type
          </Label>
          <Select 
            value={testType} 
            onValueChange={(val) => setTestType(val as WritingTestType)}
          >
            <SelectTrigger id="writing-type">
              <SelectValue placeholder="Select writing test type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ielts-task2">IELTS Writing Task 2</SelectItem>
              <SelectItem value="toefl">TOEFL Independent Writing</SelectItem>
              <SelectItem value="general">General Essay</SelectItem>
              <SelectItem value="business">Business Writing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="difficulty" className="mb-3 block">
            Difficulty Level
          </Label>
          <Select 
            value={difficulty} 
            onValueChange={(val) => setDifficulty(val as DifficultyLevel)}
          >
            <SelectTrigger id="difficulty">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">IELTS 5.0</SelectItem>
              <SelectItem value="medium">IELTS 6.0</SelectItem>
              <SelectItem value="hard">IELTS 7.0</SelectItem>
              <SelectItem value="expert">IELTS 8.0</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-6">
        <Label htmlFor="topic" className="mb-3 block">
          Topic/Question
        </Label>
        <Textarea
          id="topic"
          onChange={(e) => e.target.value = e.target.value}
          placeholder="- Enter any relevant information related to the topic, question type,... and then use the Generate question button to create a question.
- Enter your own question and select the Using my question button to use your question."
          className="h-24"
        />
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white w-[180px] h-9 flex items-center justify-center gap-2 px-6"
            onClick={handleGenerateTopic}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-sm">Generate question</span>
          </Button>
          <Button 
            variant="secondary"
            size="sm" 
            className="mt-2 w-[180px] h-9 bg-[#20B2AA] hover:bg-[#1ca19a] text-white flex items-center justify-center px-6"
            onClick={() => {
              const textareaValue = (document.getElementById('topic') as HTMLTextAreaElement).value;
              if (textareaValue.trim()) {
                setTopic(textareaValue);
              }
            }}
          >
            <span className="text-sm">Using my question</span>
          </Button>
        </div>
        {topic && (
          <div className="mt-4 p-4 bg-teal-50 rounded-md border-2 border-teal-200 shadow-sm">
            <Label className="text-teal-700 font-medium">Question:</Label>
            <p className="mt-2 text-sm text-gray-800">{topic}</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div>
          <Label htmlFor="time-limit" className="mb-3 block">
            Time Limit (optional)
          </Label>
          <Select 
            value={timeLimit.toString()} 
            onValueChange={(val) => setTimeLimit(parseInt(val, 10))}
          >
            <SelectTrigger id="time-limit" className="w-36">
              <SelectValue placeholder="Select time limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No limit</SelectItem>
              <SelectItem value="20">20 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="40">40 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          size="lg" 
          onClick={handleStartWriting}
          className="bg-primary hover:opacity-90 text-white"
        >
          Start Writing
        </Button>
      </div>
    </div>
  );
}
