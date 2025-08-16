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
import { useTutorial } from "@/hooks/use-tutorial";
import { TutorialOverlay } from "@/components/ui/tutorial-overlay";

export type WritingTestType = 
  | "all"
  | "opinion" 
  | "discussion" 
  | "problem-solution" 
  | "advantage-disadvantage"
  | "two-part-question";

export type DifficultyLevel = 
  | "all"
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
  const [testType, setTestType] = useState<WritingTestType>("all");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("all");
  const [topic, setTopic] = useState("");
  const [fixedTestType, setFixedTestType] = useState<WritingTestType | null>(null);
  const [timeLimit, setTimeLimit] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<'generate' | 'use-my-question' | 'random-question' | null>(null);
  
  // Tooltip state management
  const [openTooltips, setOpenTooltips] = useState({
    questionType: false,
    bandLevel: false,
    topicQuestion: false,
    timeLimit: false
  });

  const toggleTooltip = (tooltipKey: keyof typeof openTooltips) => {
    setOpenTooltips(prev => ({
      ...prev,
      [tooltipKey]: !prev[tooltipKey]
    }));
  };

  // Tutorial state
  const {
    isActive: isTutorialActive,
    currentStep,
    currentStepData,
    totalSteps,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    completeTutorial
  } = useTutorial('task2');

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
    <TooltipProvider>
    <div className="p-6 border-b border-gray-200 bg-white">
      {/* Header with Tutorial Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">IELTS Writing Task 2 Practice</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={startTutorial}
          className="text-[#1fb2aa] border-[#1fb2aa] hover:bg-[#1fb2aa] hover:text-white transition-all duration-200"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Help & Tutorial
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="writing-type" className="mb-3 block flex items-center gap-2">
            Select Question Type
            <Tooltip open={openTooltips.questionType} onOpenChange={(open) => setOpenTooltips(prev => ({ ...prev, questionType: open }))}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-[#e6f7f6] rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleTooltip('questionType');
                  }}
                >
                  <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top"
                className="max-w-xs p-3 bg-white border-2 border-[#1fb2aa] rounded-lg shadow-lg text-sm text-gray-700"
              >
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">Question Type Guide</div>
                  <div>Choose the type of essay question you want to practice. Each type requires different writing approaches and structures.</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Select 
            value={testType} 
            onValueChange={(val) => setTestType(val as WritingTestType)}
          >
            <SelectTrigger id="writing-type" data-testid="select-question-type">
              <SelectValue>
                {testType === "all" && "All"}
                {testType === "opinion" && "Opinion"}
                {testType === "discussion" && "Discussion"}
                {testType === "problem-solution" && "Problem – Solution"}
                {testType === "advantage-disadvantage" && "Advantage – Disadvantage"}
                {testType === "two-part-question" && "Two-part question"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
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
            <Tooltip open={openTooltips.bandLevel} onOpenChange={(open) => setOpenTooltips(prev => ({ ...prev, bandLevel: open }))}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-[#e6f7f6] rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleTooltip('bandLevel');
                  }}
                >
                  <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top"
                className="max-w-xs p-3 bg-white border-2 border-[#1fb2aa] rounded-lg shadow-lg text-sm text-gray-700"
              >
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">Band Level Guide</div>
                  <div>Choose the band level you aim for. We'll tailor vocabulary and writing guidance to match that level.</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Select 
            value={difficulty} 
            onValueChange={(val) => setDifficulty(val as DifficultyLevel)}
          >
            <SelectTrigger id="difficulty" data-testid="select-band-level">
              <SelectValue>
                {difficulty === "all" && "All"}
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
              <SelectItem value="all">All</SelectItem>
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
        <Label htmlFor="topic" className="mb-3 block flex items-center gap-2">
          Topic/Question
          <Tooltip open={openTooltips.topicQuestion} onOpenChange={(open) => setOpenTooltips(prev => ({ ...prev, topicQuestion: open }))}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-[#e6f7f6] rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  toggleTooltip('topicQuestion');
                }}
              >
                <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent 
              side="top"
              className="max-w-xs p-3 bg-white border-2 border-[#1fb2aa] rounded-lg shadow-lg text-sm text-gray-700"
            >
              <div className="space-y-1">
                <div className="font-medium text-gray-900">Topic/Question Guide</div>
                <div>You can generate a random question, create your own, or get a custom question based on your preferences and requirements.</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </Label>
        <Textarea
          id="topic"
          onChange={(e) => e.target.value = e.target.value}
          placeholder="- Enter any relevant information related to the topic, question type,...and then use the 'Generate question' button to create a question.
- Enter your own question and select the 'Use my question' button to use your question."
          className="h-24"
          data-testid="topic-question-area"
        />
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="secondary" 
            size="sm"
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white w-[180px] h-9 flex items-center justify-center gap-2 px-6"
            onClick={handleGenerateTopic}
            data-testid="button-generate-question"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-sm">Generate question</span>
          </Button>
          <Button 
            variant="secondary"
            size="sm" 
            className="mt-2 w-[180px] h-9 bg-[#20B2AA] hover:bg-[#1ca19a] text-white flex items-center justify-center px-6"
            onClick={handleUseMyQuestion}
            data-testid="button-use-my-question"
          >
            <span className="text-sm">Use my question</span>
          </Button>
          <Button 
            variant="secondary"
            size="sm" 
            className="mt-2 w-[180px] h-9 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 px-6"
            onClick={handleRandomQuestion}
            data-testid="button-random-question"
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
              {testType === "all" ? "Random Question Type:" :
               testType === "opinion" ? "Opinion:" : 
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
          <Label htmlFor="time-limit" className="mb-3 block flex items-center gap-2">
            Time Limit (optional)
            <Tooltip open={openTooltips.timeLimit} onOpenChange={(open) => setOpenTooltips(prev => ({ ...prev, timeLimit: open }))}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-[#e6f7f6] rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleTooltip('timeLimit');
                  }}
                >
                  <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top"
                className="max-w-xs p-3 bg-white border-2 border-[#1fb2aa] rounded-lg shadow-lg text-sm text-gray-700"
              >
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">Time Limit Guide</div>
                  <div>Set a time limit to practice under exam conditions. For IELTS Task 2, the recommended time is 40 minutes.</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Select 
            value={timeLimit.toString()} 
            onValueChange={(val) => setTimeLimit(parseInt(val, 10))}
          >
            <SelectTrigger id="time-limit" className="w-36" data-testid="select-time-limit">
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
          data-testid="button-start-writing"
        >
          Start Writing
        </Button>
      </div>
    </div>

    {/* Tutorial Overlay */}
    {isTutorialActive && currentStepData && (
      <TutorialOverlay
        isActive={isTutorialActive}
        currentStep={currentStepData}
        currentStepIndex={currentStep}
        totalSteps={totalSteps}
        onNext={nextStep}
        onPrev={prevStep}
        onSkip={skipTutorial}
        onComplete={completeTutorial}
      />
    )}
    </TooltipProvider>
  );
}
