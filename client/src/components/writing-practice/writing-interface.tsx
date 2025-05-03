import React, { useState, useEffect } from "react";
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
import { Save, Layers, ArrowLeft, Eye, EyeOff, Smile } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getOutline } from "@/data/outlines";
import { getVocabulary } from "@/data/vocabulary";
import { getPhrases } from "@/data/phrases";
import { WritingTestType, DifficultyLevel } from "./test-setup";
import { Link } from "wouter";

// Outline component with toggle visibility
function OutlineSection({ testType, topic }: { testType: WritingTestType, topic: string }) {
  const [showOutline, setShowOutline] = useState(true);
  const outline = getOutline(testType, topic);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gray-50">
        <h3 className="font-medium">Suggested Outline</h3>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title={showOutline ? "Hide Outline" : "Show Outline"}
            onClick={() => setShowOutline(!showOutline)}
          >
            {showOutline ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        {showOutline ? (
          <ul className="space-y-2 text-sm">
            {outline.map((section, index) => (
              <li key={index}>
                <span className="font-medium">{section.title}:</span>
                <ul className="pl-4 mt-1 space-y-1 list-disc">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-[200px]">
            <p className="text-gray-700 font-medium text-2xl mb-3 text-center">Hãy cố gắng hết mình nhé!</p>
            <p className="text-primary font-medium text-xl text-center">Good things take time. 😉</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Vocabulary and Phrases component
function ResourcesSection({ testType, topic }: { testType: WritingTestType, topic: string }) {
  const [activeTab, setActiveTab] = useState("vocabulary");
  const allVocabulary = getVocabulary(testType, topic);
  const phrases = getPhrases(testType);
  
  // Flatten all vocabulary words across categories
  const allWords = allVocabulary.flatMap(category => 
    category.words.map(word => ({ ...word, type: category.type }))
  );
  
  // State for displayed word count
  const [displayCount, setDisplayCount] = useState(14);
  
  // Handle loading more words
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };
  
  // Words to display based on current count limit
  const displayedWords = allWords.slice(0, displayCount);
  
  // Check if there are more words to load
  const hasMoreWords = displayCount < allWords.length;

  return (
    <Card className="mt-8">
      <Tabs 
        defaultValue="vocabulary" 
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="phrases">Useful Phrases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vocabulary" className="p-4">
          {/* Grid layout with 1 column on small screens, 2 columns on medium screens and above */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Group words in pairs to handle equal heights */}
            {/* Map each word directly instead of using React.Fragment */}
            {displayedWords.map((word, index) => (
              <div 
                key={`word-${index}`}
                className="p-3 rounded-md border bg-blue-50 border-blue-200 h-full"
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-medium">{word.word}</span>
                  <Badge className="text-xs">
                    {word.partOfSpeech}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {word.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Meaning:</span> {word.meaning}
                </p>
                <p className="text-sm text-gray-600 italic">
                  <span className="font-medium not-italic">Example:</span> {word.example}
                </p>
              </div>
            ))}
            
            {/* Fill in empty cell if odd number of words */}
            {displayedWords.length % 2 !== 0 && (
              <div className="hidden md:block" />
            )}
          </div>
          
          {/* Load more button */}
          {hasMoreWords && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={handleLoadMore}
                className="text-primary"
              >
                Load More Words
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="phrases" className="p-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-wrap gap-2">
              {phrases.flatMap(category => 
                category.phrases.map((phrase, phraseIndex) => (
                  <Badge 
                    key={`${category.name}-${phraseIndex}`} 
                    variant="outline"
                    className="bg-gray-50 whitespace-normal text-wrap my-1 p-2"
                  >
                    {phrase}
                  </Badge>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

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
      <div className="flex mb-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowExitDialog(true)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="lg:w-3/5">
          <div className="bg-gray-50 rounded-md p-4 mb-4 border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">Topic:</h3>
            <p className="text-gray-700">{topic}</p>
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
          
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:opacity-90"
            >
              Submit Essay <Layers className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:block lg:w-2/5 lg:pl-4">
          <OutlineSection 
            testType={testType} 
            topic={topic} 
          />
        </div>
      </div>
      
      <div className="mt-8 lg:hidden">
        <OutlineSection 
          testType={testType} 
          topic={topic} 
        />
      </div>
      
      {/* Resources Section Below */}
      <ResourcesSection 
        testType={testType} 
        topic={topic} 
      />
      
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
