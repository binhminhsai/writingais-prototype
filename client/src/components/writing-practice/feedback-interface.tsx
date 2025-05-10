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
      
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Overall Score */}
        <div className="box border border-2 border-gray-800 rounded-lg p-4 bg-white">
          <h2 className="text-xl font-bold mt-0">Overall Band Score:</h2>
          <p className="text-4xl font-bold m-0" style={{ color: "#44b9b0" }}>
            {feedbackData.scores.overall.toFixed(1)}
          </p>
        </div>

        {/* Writing Statistics */}
        <div className="box border border-2 border-gray-800 rounded-lg p-4 bg-white">
          <h2 className="text-xl font-bold mt-0">Writing Statistic</h2>
          <div className="stat flex justify-between font-bold mt-2">
            <span>Word Count</span>
            <span className={feedbackData.stats.totalWords < 250 ? 'text-red-500' : ''}>
              {feedbackData.stats.totalWords}
            </span>
          </div>
          <div className="stat flex justify-between font-bold mt-2">
            <span>Completion Time</span>
            <span>{feedbackData.stats.completionTime}</span>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="box border border-2 border-gray-800 rounded-lg p-4 bg-white">
          <h2 className="text-xl font-bold mt-0">Score Breakdown:</h2>
          
          <div className="score-row flex justify-between font-bold mt-4 whitespace-nowrap">
            <span>Task Achievement</span>
            <span style={{ color: "#44b9b0" }}>{feedbackData.scores.taskAchievement.toFixed(1)}</span>
          </div>
          <ul className="subcriteria pl-3 font-normal mt-1 mb-0 list-disc ml-4">
            <li>Relevance to Topic 7.5</li>
            <li>Position Clarity 6.5</li>
            <li>Ideas Development 7.0</li>
            <li>
              Sufficient Length{' '}
              {feedbackData.stats.totalWords >= 250 ? (
                <span className="text-green-500">✓</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </li>
          </ul>

          <div className="score-row flex justify-between font-bold mt-4 whitespace-nowrap">
            <span>Coherence & Cohesion</span>
            <span style={{ color: "#44b9b0" }}>{feedbackData.scores.coherenceCohesion.toFixed(1)}</span>
          </div>
          <ul className="subcriteria pl-3 font-normal mt-1 mb-0 list-disc ml-4">
            <li>Paragraph Unity 7.0</li>
            <li>Logical Progression 7.0</li>
            <li>Cohesive Use 7.0</li>
          </ul>

          <div className="score-row flex justify-between font-bold mt-4 whitespace-nowrap">
            <span>Lexical Resource</span>
            <span style={{ color: "#44b9b0" }}>{feedbackData.scores.lexicalResource.toFixed(1)}</span>
          </div>
          <ul className="subcriteria pl-3 font-normal mt-1 mb-0 list-disc ml-4">
            <li>Vocabulary Range 7.0</li>
            <li>Word Choice 7.0</li>
            <li>Collocation Use 7.0</li>
          </ul>

          <div className="score-row flex justify-between font-bold mt-4 whitespace-nowrap">
            <span>Grammatical Range & Accuracy</span>
            <span style={{ color: "#44b9b0" }}>{feedbackData.scores.grammar.toFixed(1)}</span>
          </div>
          <ul className="subcriteria pl-3 font-normal mt-1 mb-0 list-disc ml-4">
            <li>Grammatical Range 7.5</li>
            <li>Grammatical Accuracy 6.5</li>
            <li>Clarity of Communication 7.0</li>
          </ul>
        </div>

        {/* Overall Feedback */}
        <div className="box border border-2 border-gray-800 rounded-lg p-4 bg-white">
          <h2 className="text-xl font-bold mt-0">Overall Feedback:</h2>
          <p>
            Your essay effectively addresses the task and presents a clear position throughout.
            The ideas are generally well-developed and supported, though some explanations could benefit from further elaboration.
            Paragraphing is logical, and your use of cohesive devices is appropriate, though occasionally repetitive.
            Your vocabulary is varied and mostly accurate, with some effective word choices.
            Grammar is handled well, with a good range of sentence structures and only a few minor errors that do not affect understanding.
            To reach a higher band, focus on refining idea depth, enhancing lexical precision, and reducing small grammatical slips.
          </p>
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
