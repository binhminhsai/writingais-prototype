import { Download, Pen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

  const getScorePercentage = (score: number) => {
    return (score / 9) * 100;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Writing Assessment</h2>
        <p className="text-gray-600">
          Your essay has been evaluated based on the IELTS Task 2 criteria.
        </p>
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
                <Progress value={getScorePercentage(feedbackData.scores.taskAchievement)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Coherence & Cohesion</span>
                  <span className="text-sm font-medium">
                    {feedbackData.scores.coherenceCohesion.toFixed(1)}
                  </span>
                </div>
                <Progress value={getScorePercentage(feedbackData.scores.coherenceCohesion)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Lexical Resource</span>
                  <span className="text-sm font-medium">
                    {feedbackData.scores.lexicalResource.toFixed(1)}
                  </span>
                </div>
                <Progress value={getScorePercentage(feedbackData.scores.lexicalResource)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Grammatical Range & Accuracy</span>
                  <span className="text-sm font-medium">
                    {feedbackData.scores.grammar.toFixed(1)}
                  </span>
                </div>
                <Progress value={getScorePercentage(feedbackData.scores.grammar)} />
              </div>
              
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Overall Band Score</span>
                  <span className="font-medium">
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
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <h3 className="font-medium text-lg">Detailed Feedback</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800">Strengths</h4>
              <ul className="mt-2 space-y-1 text-gray-600 pl-5 list-disc">
                {feedbackData.feedback.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800">Areas for Improvement</h4>
              <ul className="mt-2 space-y-1 text-gray-600 pl-5 list-disc">
                {feedbackData.feedback.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex space-x-4">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Download Feedback
        </Button>
        
        <Button 
          variant="secondary"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={onTryAgain}
        >
          <Pen className="mr-2 h-4 w-4" /> Try Again
        </Button>
        
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onNextPractice}
        >
          <ArrowRight className="mr-2 h-4 w-4" /> Next Practice
        </Button>
      </div>
    </div>
  );
}
