import { Download, Pen, ArrowRight, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { useState } from "react";
import { Link } from "wouter";

// Mock feedback data
interface FeedbackData {
  scores: {
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammar: number;
    overall: number;
  };
  stats: {
    totalWords: number;
    completionTime: string;
    vocabularyRange: string;
    grammarAccuracy: string;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
  };
}

interface FeedbackInterfaceProps {
  essayContent: string;
  onTryAgain: () => void;
  onNextPractice: () => void;
}

export function FeedbackInterface({
  essayContent,
  onTryAgain,
  onNextPractice,
}: FeedbackInterfaceProps) {
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // This would normally come from an API based on essay analysis
  // Using mock data for frontend-only implementation
  const feedbackData: FeedbackData = {
    scores: {
      taskAchievement: 7.0,
      coherenceCohesion: 7.0,
      lexicalResource: 7.0,
      grammar: 7.0,
      overall: 7.0,
    },
    stats: {
      totalWords: essayContent.split(/\s+/).filter(Boolean).length || 267,
      completionTime: "30:43",
      vocabularyRange: "Good",
      grammarAccuracy: "Good",
    },
    feedback: {
      strengths: [
        "Strong introduction that clearly presents both viewpoints",
        "Good use of topic sentences and paragraph structure",
        "Effective use of transition words to connect ideas",
        "Clear personal opinion in the conclusion",
      ],
      improvements: [
        "Some examples could be more specific and developed",
        "A few grammar errors in complex sentences",
        "Consider expanding your vocabulary range for academic contexts",
        "Some sentences are too long and could be broken down for clarity",
      ],
    },
  };

  // Helper function to highlight parts of essay
  const highlightEssay = (text: string) => {
    // In a real implementation, this would use API response data to highlight
    // For demo, we'll use simple patterns
    const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
    
    return paragraphs.map((paragraph, index) => {
      // Highlight first paragraph green (good)
      if (index === 0) {
        return <p key={index} className="mb-2 p-2 bg-green-50 border-l-4 border-green-500">{paragraph}</p>;
      }
      
      // Add some yellow highlights for grammar issues (random words for demo)
      if (index === 1) {
        const words = paragraph.split(' ');
        return (
          <p key={index} className="mb-2">
            {words.map((word, i) => {
              // Randomly highlight some words as grammar issues for demo
              if (i === 3 || i === 10) {
                return <span key={i} className="bg-yellow-100 border-b border-yellow-400">{word} </span>;
              }
              return <span key={i}>{word} </span>;
            })}
          </p>
        );
      }
      
      // Add some red highlights for vocabulary issues (random words for demo)
      if (index === 2) {
        const words = paragraph.split(' ');
        return (
          <p key={index} className="mb-2">
            {words.map((word, i) => {
              // Randomly highlight some words as vocabulary issues for demo
              if (i === 5 || i === 8) {
                return <span key={i} className="bg-red-100 border-b border-red-400">{word} </span>;
              }
              return <span key={i}>{word} </span>;
            })}
          </p>
        );
      }
      
      return <p key={index} className="mb-2">{paragraph}</p>;
    });
  };

  const getScorePercentage = (score: number) => {
    return (score / 9) * 100;
  };

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

      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Your essay has been evaluated based on the IELTS Task 2 criteria!</h2>
      </div>
      
      <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Score breakdown */}
          <div className="p-6 border-r border-b border-gray-300">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold">Overall Band Score:</h3>
              <span className="text-4xl font-bold" style={{ color: "#44b9b0" }}>
                {feedbackData.scores.overall.toFixed(1)}
              </span>
            </div>
            
            <h3 className="text-lg font-bold mb-4">Score Breakdown:</h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-1/2">
                  <div className="font-medium">Task Achievement</div>
                  <ul className="list-disc pl-6 text-sm">
                    <li>Relevance to Topic</li>
                    <li>Position Clarity</li>
                    <li>Ideas Development</li>
                    <li>Sufficient Length</li>
                  </ul>
                </div>
                <div className="w-1/2 text-right flex items-center justify-end">
                  <span className="font-bold text-xl pr-3" style={{ color: "#44b9b0" }}>
                    {feedbackData.scores.taskAchievement.toFixed(1)}
                  </span>
                  <div>
                    <div className="text-right text-sm">7.5</div>
                    <div className="text-right text-sm">6.5</div>
                    <div className="text-right text-sm">7.0</div>
                    {feedbackData.stats.totalWords >= 250 ? (
                      <div className="text-right text-sm text-green-500 flex items-center justify-end">
                        <Check className="h-4 w-4 mr-1" />
                      </div>
                    ) : (
                      <div className="text-right text-sm text-red-500 flex items-center justify-end">
                        <X className="h-4 w-4 mr-1" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-1/2">
                  <div className="font-medium">Coherence & Cohesion</div>
                  <ul className="list-disc pl-6 text-sm">
                    <li>Paragraph Unity</li>
                    <li>Logical Progression</li>
                    <li>Cohesive Use</li>
                  </ul>
                </div>
                <div className="w-1/2 text-right flex items-center justify-end">
                  <span className="font-bold text-xl pr-3" style={{ color: "#44b9b0" }}>
                    {feedbackData.scores.coherenceCohesion.toFixed(1)}
                  </span>
                  <div>
                    <div className="text-right text-sm">7.0</div>
                    <div className="text-right text-sm">7.0</div>
                    <div className="text-right text-sm">7.0</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-1/2">
                  <div className="font-medium">Lexical Resource</div>
                  <ul className="list-disc pl-6 text-sm">
                    <li>Vocabulary Range</li>
                    <li>Word Choice</li>
                    <li>Collocation Use</li>
                  </ul>
                </div>
                <div className="w-1/2 text-right flex items-center justify-end">
                  <span className="font-bold text-xl pr-3" style={{ color: "#44b9b0" }}>
                    {feedbackData.scores.lexicalResource.toFixed(1)}
                  </span>
                  <div>
                    <div className="text-right text-sm">7.0</div>
                    <div className="text-right text-sm">7.0</div>
                    <div className="text-right text-sm">7.0</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-1/2">
                  <div className="font-medium">Grammatical Range & Accuracy</div>
                  <ul className="list-disc pl-6 text-sm">
                    <li>Grammatical Range</li>
                    <li>Grammatical Accuracy</li>
                    <li>Clarity of Communication</li>
                  </ul>
                </div>
                <div className="w-1/2 text-right flex items-center justify-end">
                  <span className="font-bold text-xl pr-3" style={{ color: "#44b9b0" }}>
                    {feedbackData.scores.grammar.toFixed(1)}
                  </span>
                  <div>
                    <div className="text-right text-sm">7.5</div>
                    <div className="text-right text-sm">6.5</div>
                    <div className="text-right text-sm">7.0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Overall Feedback and Writing Statistics */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-3">Overall Feedback:</h3>
              <p className="text-gray-700">
                Your essay effectively addresses the task and presents a clear position throughout. The 
                ideas are generally well-developed and supported, though some explanations could 
                benefit from further elaboration. Paragraphing is logical, and your use of cohesive devices is 
                appropriate, though occasionally repetitive. Your vocabulary is varied and mostly 
                accurate, with some effective word choices. Grammar is handled well, with a good range 
                of sentence structures and only a few minor errors that do not affect understanding. To 
                reach a higher band, focus on refining idea depth, enhancing lexical precision, and 
                reducing small grammatical slips.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-3">Writing Statistic</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold mb-1">Word Count</div>
                  <div className={`text-2xl font-bold ${feedbackData.stats.totalWords < 250 ? 'text-red-500' : 'text-black'}`}>
                    {feedbackData.stats.totalWords}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold mb-1">Completion Time</div>
                  <div className="text-2xl font-bold">
                    {feedbackData.stats.completionTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          variant="outline" 
          className="flex items-center"
        >
          <Download className="mr-2 h-4 w-4" /> Download Feedback
        </Button>
        
        <Button 
          variant="secondary"
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={onTryAgain}
        >
          <Pen className="mr-2 h-4 w-4" /> Try Again
        </Button>
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={onNextPractice}
        >
          <ArrowRight className="mr-2 h-4 w-4" /> Next Practice
        </Button>
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thoát khỏi phần đánh giá?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn thoát khỏi phần đánh giá bài viết và quay lại trang thiết lập bài tập không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tiếp tục xem đánh giá</AlertDialogCancel>
            <Link href="/writing-practice">
              <AlertDialogAction>
                Thoát
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
