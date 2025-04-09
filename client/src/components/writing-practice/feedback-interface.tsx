import { Download, Pen, ArrowRight, ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
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
      coherenceCohesion: 7.5,
      lexicalResource: 6.5,
      grammar: 7.0,
      overall: 7.0,
    },
    stats: {
      totalWords: essayContent.split(/\s+/).filter(Boolean).length || 285,
      completionTime: "24:36",
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
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowExitDialog(true)}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Writing Assessment</h2>
          <p className="text-gray-600">
            Your essay has been evaluated based on the IELTS Task 2 criteria.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <h3 className="font-medium text-lg">Score Breakdown</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Task Achievement</span>
                  <span className="text-sm font-medium">
                    {feedbackData.scores.taskAchievement.toFixed(1)}
                  </span>
                </div>
                <Progress value={getScorePercentage(feedbackData.scores.taskAchievement)} className="bg-gray-200" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Coherence & Cohesion</span>
                  <span className="text-sm font-medium">
                    {feedbackData.scores.coherenceCohesion.toFixed(1)}
                  </span>
                </div>
                <Progress value={getScorePercentage(feedbackData.scores.coherenceCohesion)} className="bg-gray-200" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Lexical Resource</span>
                  <span className="text-sm font-medium">
                    {feedbackData.scores.lexicalResource.toFixed(1)}
                  </span>
                </div>
                <Progress value={getScorePercentage(feedbackData.scores.lexicalResource)} className="bg-gray-200" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Grammatical Range & Accuracy</span>
                  <span className="text-sm font-medium">
                    {feedbackData.scores.grammar.toFixed(1)}
                  </span>
                </div>
                <Progress value={getScorePercentage(feedbackData.scores.grammar)} className="bg-gray-200" />
              </div>
              
              <div className="pt-3 mt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Overall Band Score</span>
                  <span className="font-bold text-xl text-primary">
                    {feedbackData.scores.overall.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <h3 className="font-medium text-lg">Writing Statistics</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Total Words</p>
                <p className="text-xl font-medium">{feedbackData.stats.totalWords}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Completion Time</p>
                <p className="text-xl font-medium">{feedbackData.stats.completionTime}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Vocabulary Range</p>
                <p className="text-xl font-medium">{feedbackData.stats.vocabularyRange}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Grammar Accuracy</p>
                <p className="text-xl font-medium">{feedbackData.stats.grammarAccuracy}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Two-column detailed feedback */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <h3 className="font-medium text-lg">Detailed Feedback</h3>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <h4 className="font-medium text-gray-800">Strengths</h4>
              </div>
              <ul className="mt-2 space-y-1 text-gray-600 pl-5 list-disc">
                {feedbackData.feedback.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <h4 className="font-medium text-gray-800">Areas for Improvement</h4>
              </div>
              <ul className="mt-2 space-y-1 text-gray-600 pl-5 list-disc">
                {feedbackData.feedback.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Essay with highlights */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <h3 className="font-medium text-lg">Your Essay with Annotations</h3>
          <div className="flex flex-wrap gap-3 mt-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-100 border border-green-500 mr-1"></div>
              <span>Excellent sections</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-400 mr-1"></div>
              <span>Grammar issues</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-100 border border-red-400 mr-1"></div>
              <span>Vocabulary issues</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-200 rounded-md p-4 bg-white">
            {essayContent.length > 0 
              ? highlightEssay(essayContent)
              : highlightEssay("Technology has revolutionized the way we live and work in the modern world. \n\nWhile it has brought many benefits to society, some people argue that it has made our lives more complicated and stressful. This essay will discuss both viewpoints and provide my own opinion on the matter. \n\nOn the one hand, technology has greatly improved the human condition in numerous ways. Medical advances have extended our lifespans and improved the quality of life for many people suffering from illnesses. Communication technology allows us to connect with people around the world instantly, strengthening relationships and fostering global understanding.")}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-wrap gap-4">
        <Button 
          variant="outline" 
          className="flex items-center"
        >
          <Download className="mr-2 h-4 w-4" /> Download Feedback
        </Button>
        
        <Button 
          variant="secondary"
          className="bg-primary hover:opacity-90 text-white"
          onClick={onTryAgain}
        >
          <Pen className="mr-2 h-4 w-4" /> Try Again
        </Button>
        
        <Button 
          className="bg-primary hover:opacity-90 text-white"
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
