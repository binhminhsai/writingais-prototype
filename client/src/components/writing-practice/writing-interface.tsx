import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/ui/word-counter";
import { useTimer } from "@/hooks/use-timer";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Save, Layers, ArrowLeft } from "lucide-react";
import { SupportingResources } from "./supporting-resources";
import { WritingTestType, DifficultyLevel } from "./test-setup";
import { Link } from "wouter";

interface WritingInterfaceProps {
  testType: WritingTestType;
  difficulty: DifficultyLevel;
  topic: string;
  timeLimit: number;
  onSubmit: (essayContent: string) => void;
}

export function WritingInterface({
  testType,
  difficulty,
  topic,
  timeLimit,
  onSubmit,
}: WritingInterfaceProps) {
  const [essayContent, setEssayContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isWordCountValid, setIsWordCountValid] = useState(true);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  
  const { formattedTime, isRunning, startTimer, updateTimer } = useTimer({
    initialMinutes: timeLimit,
    onTimeUp: () => setShowTimeUpDialog(true),
    autoStart: timeLimit > 0,
  });

  // Start timer when component mounts if time limit is set
  useEffect(() => {
    if (timeLimit > 0) {
      startTimer();
    }
  }, [timeLimit, startTimer]);

  const handleTimeSelect = (minutes: number) => {
    updateTimer(minutes);
    if (minutes > 0) {
      startTimer();
    }
  };

  const handleWordCountChange = (count: number, isValid: boolean) => {
    setWordCount(count);
    setIsWordCountValid(isValid);
  };

  const handleSubmit = () => {
    if (!isWordCountValid) {
      setShowErrorDialog(true);
      return;
    }
    onSubmit(essayContent);
  };

  const handleSaveDraft = () => {
    // Save to localStorage
    localStorage.setItem('essayDraft', essayContent);
    localStorage.setItem('essayTopic', topic);
    alert('Draft saved successfully');
  };

  const [showExitDialog, setShowExitDialog] = useState(false);
  
  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="lg:w-2/3">
          <div className="flex items-center mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowExitDialog(true)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <div className="bg-gray-50 rounded-md p-4 flex-grow border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Topic:</h3>
              <p className="text-gray-700">{topic}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <Timer 
              time={formattedTime()} 
              onTimeSelect={handleTimeSelect}
              isRunning={isRunning}
            />
            <WordCounter
              count={wordCount}
              maxWords={500}
              isValid={isWordCountValid}
            />
          </div>
          
          <Editor
            value={essayContent}
            onChange={setEssayContent}
            onWordCountChange={handleWordCountChange}
          />
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
            >
              <Save className="mr-2 h-4 w-4" /> Save Draft
            </Button>
            
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:opacity-90"
            >
              Submit Essay <Layers className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <SupportingResources 
            testType={testType} 
            topic={topic}
          />
        </div>
      </div>
      
      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thoát khỏi bài tập?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn thoát khỏi quá trình làm bài? Tiến trình làm bài của bạn sẽ không được lưu lại.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tiếp tục làm bài</AlertDialogCancel>
            <Link href="/writing-practice">
              <AlertDialogAction>
                Thoát
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time's Up Dialog */}
      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your allocated time for this essay has ended. Would you like to submit your work now or continue writing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Writing</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowTimeUpDialog(false);
              handleSubmit();
            }}>
              Submit Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Word Count Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Word Count Error</AlertDialogTitle>
            <AlertDialogDescription>
              Word limit requirement not met. Your essay should be between 50 and 500 words.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
