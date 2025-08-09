import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Mock data for tasks
const TASK_DATA = {
  part1: {
    title: "Part 1",
    instruction: "You should spend about 20 minutes on this task. Write at least 150 words.",
    prompt: {
      text: "The table below shows the percentage of students attending four different types of schools in 2000, 2005, and 2010.\n\nSummarize the information by selecting and reporting the main features, and make comparisons where relevant.",
      hasChart: true,
      chartDescription: "A table showing school attendance percentages across three years"
    }
  },
  part2: {
    title: "Part 2", 
    instruction: "You should spend about 40 minutes on this task. Write at least 250 words.",
    prompt: {
      text: "Some people believe that governments should invest more in public transportation to reduce traffic congestion and pollution. Others argue that individuals should take responsibility for their own transportation choices (e.g., using bicycles or electric cars).\n\nDiscuss both views and give your own opinion.",
      hasChart: false,
      chartDescription: ""
    }
  }
};

export default function VirtualExam() {
  const [activeTab, setActiveTab] = useState("part1");
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [part1Text, setPart1Text] = useState("");
  const [part2Text, setPart2Text] = useState("");
  
  // Simple word count function
  const countWords = (text: string): number => {
    const trimmedText = text.trim();
    return trimmedText ? trimmedText.split(/\s+/).length : 0;
  };
  
  // Current text and word count based on active tab
  const currentText = activeTab === "part1" ? part1Text : part2Text;
  const currentWordCount = activeTab === "part1" ? countWords(part1Text) : countWords(part2Text);
  const currentTask = activeTab === "part1" ? TASK_DATA.part1 : TASK_DATA.part2;
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes left`;
  };

  const handleTextChange = (value: string) => {
    if (activeTab === "part1") {
      setPart1Text(value);
    } else {
      setPart2Text(value);
    }
  };

  const handleSubmit = () => {
    // Handle exam submission
    console.log("Exam submitted", { part1Text, part2Text });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with timer and submit button */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1"></div>
          
          {/* Timer - centered */}
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {formatTime(timeLeft)}
            </h1>
          </div>

          {/* Submit button - right aligned */}
          <div className="flex-1 flex justify-end">
            <Button 
              onClick={handleSubmit}
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm px-6 py-2 rounded-lg"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tab navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger 
              value="part1" 
              className="flex-1 py-3 text-base font-medium rounded-md bg-white text-gray-900 data-[state=active]:bg-[#1fb2aae6] data-[state=active]:text-white"
            >
              PART 1
            </TabsTrigger>
            <TabsTrigger 
              value="part2" 
              className="flex-1 py-3 text-base font-medium rounded-md bg-white text-gray-900 data-[state=active]:bg-[#1fb2aae6] data-[state=active]:text-white"
            >
              PART 2
            </TabsTrigger>
          </TabsList>

          {/* Task instruction bar */}
          <div className="mb-4 bg-gray-100 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {currentTask.title}
            </h2>
            <p className="text-gray-700">
              {currentTask.instruction}
            </p>
          </div>

          {/* Main exam content */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-[600px] lg:h-[650px]">
            <TabsContent value="part1" className="mt-0 h-full">
              <ExamContent
                task={TASK_DATA.part1}
                text={part1Text}
                onTextChange={setPart1Text}
                wordCount={countWords(part1Text)}
              />
            </TabsContent>
            
            <TabsContent value="part2" className="mt-0 h-full">
              <ExamContent
                task={TASK_DATA.part2}
                text={part2Text}
                onTextChange={setPart2Text}
                wordCount={countWords(part2Text)}
              />
            </TabsContent>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-end mt-4 space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveTab("part1")}
              disabled={activeTab === "part1"}
              className="rounded-full p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveTab("part2")}
              disabled={activeTab === "part2"}
              className="rounded-full p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

// Individual exam content component
interface ExamContentProps {
  task: typeof TASK_DATA.part1;
  text: string;
  onTextChange: (value: string) => void;
  wordCount: number;
}

function ExamContent({ task, text, onTextChange, wordCount }: ExamContentProps) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 h-full">
      {/* Left side - Task prompt */}
      <div className="space-y-4 mb-6 lg:mb-0">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-line text-gray-800 leading-relaxed">
            {task.prompt.text}
          </div>
        </div>
        
        {/* Chart placeholder for Part 1 */}
        {task.prompt.hasChart && (
          <div className="border-2 border-gray-300 rounded-lg p-8 bg-gray-50 flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">{task.prompt.chartDescription}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side - Writing area */}
      <div className="relative flex-1 flex flex-col lg:h-full">
        <Textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Type your essay here"
          className="flex-1 resize-none text-base leading-relaxed border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 pb-10 min-h-[300px] lg:min-h-0"
          style={{ paddingBottom: '40px' }}
        />
        
        {/* Word count - positioned at bottom-left with responsive positioning */}
        <div className="absolute bottom-2 left-3 z-10">
          <span className="text-sm text-gray-600 bg-white/90 px-1 rounded">
            Word count: {wordCount}
          </span>
        </div>
      </div>
    </div>
  );
}