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

      <div className="grid-container grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 items-start">
        {/* Cột trái */}
        <div className="left-col flex flex-col gap-2">
            {/* Overall Band Score */}
            <div className="box border border-black rounded-lg p-3" style={{ backgroundColor: "#fafafa" }}>
              <div className="score-align flex items-center justify-between">
                <div className="score-label font-bold text-2xl">Overall Band Score:</div>
                <div className="score-value text-3xl font-bold" style={{ color: "#44b9b0" }}>
                  {feedbackData.scores.overall.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="box border border-black rounded-lg p-3" style={{ backgroundColor: "#fafafa" }}>
            <h2 className="text-xl font-bold mt-0 mb-2.5">Score Breakdown:</h2>
            
            <div className="score-group grid grid-cols-[auto_40px] gap-y-1 mb-2.5">
              <div className="score-title font-bold text-lg mb-1">Task Achievement</div>
              <div className="score-number text-right text-lg font-bold" style={{ color: "#44b9b0" }}>
                {feedbackData.scores.taskAchievement.toFixed(1)}
              </div>

              <div className="criteria-label pl-4">• Relevance to Topic</div>
              <div className="score-number text-right">7.5</div>

              <div className="criteria-label pl-4">• Position Clarity</div>
              <div className="score-number text-right">6.5</div>

              <div className="criteria-label pl-4">• Ideas Development</div>
              <div className="score-number text-right">7.0</div>

              <div className="criteria-label pl-4">• Sufficient Length</div>
              <div className="score-number text-right">
                {feedbackData.stats.totalWords >= 250 ? (
                  <span className="text-green-500">✓</span>
                ) : (
                  <span className="text-red-500">✗</span>
                )}
              </div>
            </div>

            <div className="score-group grid grid-cols-[auto_40px] gap-y-1 mb-2.5">
              <div className="score-title font-bold text-lg mb-1">Coherence & Cohesion</div>
              <div className="score-number text-right text-lg font-bold" style={{ color: "#44b9b0" }}>
                {feedbackData.scores.coherenceCohesion.toFixed(1)}
              </div>

              <div className="criteria-label pl-4">• Paragraph Unity</div>
              <div className="score-number text-right">7.0</div>

              <div className="criteria-label pl-4">• Logical Progression</div>
              <div className="score-number text-right">7.0</div>

              <div className="criteria-label pl-4">• Cohesive Use</div>
              <div className="score-number text-right">7.0</div>
            </div>

            <div className="score-group grid grid-cols-[auto_40px] gap-y-1 mb-2.5">
              <div className="score-title font-bold text-lg mb-1">Lexical Resource</div>
              <div className="score-number text-right text-lg font-bold" style={{ color: "#44b9b0" }}>
                {feedbackData.scores.lexicalResource.toFixed(1)}
              </div>

              <div className="criteria-label pl-4">• Vocabulary Range</div>
              <div className="score-number text-right">7.0</div>

              <div className="criteria-label pl-4">• Word Choice</div>
              <div className="score-number text-right">7.0</div>

              <div className="criteria-label pl-4">• Collocation Use</div>
              <div className="score-number text-right">7.0</div>
            </div>

            <div className="score-group grid grid-cols-[auto_40px] gap-y-1">
              <div className="score-title font-bold text-lg mb-1">Grammatical Range & Accuracy</div>
              <div className="score-number text-right text-lg font-bold" style={{ color: "#44b9b0" }}>
                {feedbackData.scores.grammar.toFixed(1)}
              </div>

              <div className="criteria-label pl-4">• Grammatical Range</div>
              <div className="score-number text-right">7.5</div>

              <div className="criteria-label pl-4">• Grammatical Accuracy</div>
              <div className="score-number text-right">6.5</div>

              <div className="criteria-label pl-4">• Clarity of Communication</div>
              <div className="score-number text-right">7.0</div>
            </div>
          </div>
        </div>

        {/* Cột phải */}
        <div className="right-col flex flex-col gap-3">
            {/* Overall Feedback */}
            <div className="box border border-black rounded-lg p-3" style={{ backgroundColor: "#fafafa" }}>
              <h2 className="text-xl font-bold mt-0 mb-2.5">Overall Feedback:</h2>
              <p className="mt-0">
                Your essay effectively addresses the task and presents a clear position throughout.
                The ideas are generally well-developed and supported, though some explanations could benefit from further elaboration.
                Paragraphing is logical, and your use of cohesive devices is appropriate, though occasionally repetitive.
                Your vocabulary is varied and mostly accurate, with some effective word choices.
                Grammar is handled well, with a good range of sentence structures and only a few minor errors that do not affect understanding.
                To reach a higher band, focus on refining idea depth, enhancing lexical precision, and reducing small grammatical slips.
              </p>
            </div>

            {/* Writing Statistic */}
            <div className="stat-box border border-black rounded-lg p-3" style={{ backgroundColor: "#fafafa", textAlign: "center", marginBottom: "0" }}>
              <h2 className="text-xl font-bold mt-0 mb-2">Writing Statistic</h2>
              <div className="stat-row flex justify-around mt-2">
                <div>
                  <div className="stat-label font-bold">Word Count</div>
                  <div className={`stat-value font-bold text-2xl mt-1 ${feedbackData.stats.totalWords < 250 ? 'text-red-500' : ''}`}>
                    {feedbackData.stats.totalWords}
                  </div>
                </div>
                <div>
                  <div className="stat-label font-bold">Completion Time</div>
                  <div className="stat-value font-bold text-2xl mt-1">
                    {feedbackData.stats.completionTime}
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