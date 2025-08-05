import { useState } from "react";
import { Sparkles, Shuffle, AlertTriangle, HelpCircle } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generateRandomTopic } from "@/data/topics";
import { ChemicalFlaskLoader } from "@/components/ui/chemical-flask-loader";

export type WritingTestType = 
  | "opinion" 
  | "discussion" 
  | "problem-solution" 
  | "advantage-disadvantage"
  | "two-part-question";

export type DifficultyLevel = 
  | "band-5.0"
  | "band-5.5" 
  | "band-6.0"
  | "band-6.5" 
  | "band-7.0"
  | "band-7.5"
  | "band-8.0"
  | "band-8.5";

interface TestSetupProps {
  onStart: (config: {
    testType: WritingTestType;
    difficulty: DifficultyLevel;
    topic: string;
    timeLimit: number;
  }) => void;
}

export function TestSetup({ onStart }: TestSetupProps) {
  const [testType, setTestType] = useState<WritingTestType>("opinion");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("band-6.0");
  const [topic, setTopic] = useState("");
  const [fixedTestType, setFixedTestType] = useState<WritingTestType | null>(null);
  const [timeLimit, setTimeLimit] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<'generate' | 'use-my-question' | 'random-question' | null>(null);

  const handleGenerateTopic = () => {
    const textareaValue = (document.getElementById('topic') as HTMLTextAreaElement).value;
    if (!textareaValue.trim()) {
      setErrorMessage('Please enter your topic or question before clicking the "Generate question" button.');
      return;
    }
    setErrorMessage("");
    setLoadingAction('generate');
    setIsLoading(true);
  };

  const handleCompleteGenerateTopic = () => {
    // Sử dụng với 2 tham số vì hàm generateRandomTopic chỉ nhận 2 tham số
    const randomTopic = generateRandomTopic(testType, difficulty);
    setTopic(randomTopic);
    setFixedTestType(testType);
    setIsLoading(false);
  };

  const handleRandomQuestion = () => {
    // Tạo câu hỏi random hoàn toàn không cần input từ user
    setErrorMessage("");
    setLoadingAction('random-question');
    setIsLoading(true);
  };

  const handleCompleteRandomQuestion = () => {
    const randomTopic = generateRandomTopic(testType, difficulty);
    setTopic(randomTopic);
    setFixedTestType(testType);
    setIsLoading(false);
  };

  const handleUseMyQuestion = () => {
    const textareaValue = (document.getElementById('topic') as HTMLTextAreaElement).value;
    const wordCount = textareaValue.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    if (!textareaValue.trim()) {
      setErrorMessage("Vui lòng nhập câu hỏi của bạn trước khi nhấn nút Use my question");
      return;
    }
    
    if (wordCount < 15) {
      setErrorMessage("Vui lòng nhập câu hỏi của bạn trước khi nhấn nút Use my question");
      return;
    }
    
    setErrorMessage("");
    setLoadingAction('use-my-question');
    setIsLoading(true);
  };

  const handleCompleteUseMyQuestion = () => {
    const textareaValue = (document.getElementById('topic') as HTMLTextAreaElement).value;
    setTopic(textareaValue);
    setIsLoading(false);
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
    <div className="p-6 border-b border-gray-200 bg-white">
      <h2 className="text-2xl font-semibold mb-6">IELTS Writing Task 2 Practice</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="writing-type" className="mb-3 block">
            Select Question Type
          </Label>
          <Select 
            value={testType} 
            onValueChange={(val) => setTestType(val as WritingTestType)}
          >
            <SelectTrigger id="writing-type">
              <SelectValue>
                {testType === "opinion" && "Opinion"}
                {testType === "discussion" && "Discussion"}
                {testType === "problem-solution" && "Problem – Solution"}
                {testType === "advantage-disadvantage" && "Advantage – Disadvantage"}
                {testType === "two-part-question" && "Two-part question"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opinion">Opinion</SelectItem>
              <SelectItem value="discussion">Discussion</SelectItem>
              <SelectItem value="problem-solution">Problem – Solution</SelectItem>
              <SelectItem value="advantage-disadvantage">Advantage – Disadvantage</SelectItem>
              <SelectItem value="two-part-question">Two-part question</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="difficulty" className="mb-3 block flex items-center gap-2">
            Band Level
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-gray-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent 
                  side="top"
                  className="max-w-xs p-3 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-gray-700"
                >
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">Band Level Guide</div>
                    <div>Choose the band level you aim for. We'll tailor vocabulary and writing guidance to match that level.</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Select 
            value={difficulty} 
            onValueChange={(val) => setDifficulty(val as DifficultyLevel)}
          >
            <SelectTrigger id="difficulty">
              <SelectValue>
                {difficulty === "band-5.0" && "Band 5.0"}
                {difficulty === "band-5.5" && "Band 5.5"}
                {difficulty === "band-6.0" && "Band 6.0"}
                {difficulty === "band-6.5" && "Band 6.5"}
                {difficulty === "band-7.0" && "Band 7.0"}
                {difficulty === "band-7.5" && "Band 7.5"}
                {difficulty === "band-8.0" && "Band 8.0"}
                {difficulty === "band-8.5" && "Band 8.5"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="band-5.0">Band 5.0</SelectItem>
              <SelectItem value="band-5.5">Band 5.5</SelectItem>
              <SelectItem value="band-6.0">Band 6.0</SelectItem>
              <SelectItem value="band-6.5">Band 6.5</SelectItem>
              <SelectItem value="band-7.0">Band 7.0</SelectItem>
              <SelectItem value="band-7.5">Band 7.5</SelectItem>
              <SelectItem value="band-8.0">Band 8.0</SelectItem>
              <SelectItem value="band-8.5">Band 8.5</SelectItem>
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
          placeholder="- Enter any relevant information related to the topic, question type,...and then use the 'Generate question' button to create a question.
- Enter your own question and select the 'Use my question' button to use your question."
          className="h-24"
        />
        <div className="flex gap-2 flex-wrap">
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
            onClick={handleUseMyQuestion}
          >
            <span className="text-sm">Use my question</span>
          </Button>
          <Button 
            variant="secondary"
            size="sm" 
            className="mt-2 w-[180px] h-9 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 px-6"
            onClick={handleRandomQuestion}
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="text-sm">Random question</span>
          </Button>
        </div>
        
        {/* Chemical Flask Loader */}
        <ChemicalFlaskLoader 
          isVisible={isLoading} 
          onComplete={() => {
            if (loadingAction === 'generate') {
              handleCompleteGenerateTopic();
            } else if (loadingAction === 'use-my-question') {
              handleCompleteUseMyQuestion();
            } else if (loadingAction === 'random-question') {
              handleCompleteRandomQuestion();
            }
            setLoadingAction(null);
          }}
        />
        
        {/* Error Message */}
        {errorMessage && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {errorMessage}
            </p>
          </div>
        )}
        
        {topic && (
          <div className="mt-4 p-4 bg-teal-50 rounded-md border-2 border-teal-200 shadow-sm">
            <Label className="text-teal-700 font-medium">
              {testType === "opinion" ? "Opinion:" : 
               testType === "discussion" ? "Discussion:" :
               testType === "problem-solution" ? "Problem – Solution:" :
               testType === "advantage-disadvantage" ? "Advantage – Disadvantage:" :
               "Two-part question:"}
            </Label>
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
              <SelectValue>
                {timeLimit === 0 && "No limit"}
                {timeLimit === 20 && "20 minutes"}
                {timeLimit === 30 && "30 minutes"}
                {timeLimit === 40 && "40 minutes"}
                {timeLimit === 60 && "60 minutes"}
              </SelectValue>
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
