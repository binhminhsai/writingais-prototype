import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  Calendar,
  FileText,
  Target,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Star
} from "lucide-react";

// Format IELTS score to proper display format
const formatIELTSScore = (score: number): string => {
  const rounded = Math.round(score * 2) / 2;
  return rounded.toFixed(1);
};

// Sample essay data - this would come from props or API in real implementation
const sampleEssayData = {
  id: "essay-1",
  topic: "Some people believe that students should be taught how to manage money at school",
  taskType: "Task 2" as const,
  essayType: "Opinion",
  date: "25/06/25",
  time: "43 min",
  score: 8.0,
  isMarked: false,
  question: "Some people believe that students should be taught how to manage money as part of their school curriculum. To what extent do you agree or disagree with this opinion?",
  essayContent: `In today's consumer-driven society, financial literacy has become increasingly important, and some argue that schools should incorporate money management into their curriculum. I completely agree with this view, as it equips young people with essential life skills and prevents future financial pitfalls.

Firstly, teaching students about money management at school would provide them with foundational knowledge that many lack when entering adulthood. For instance, concepts such as budgeting, saving, and understanding interest rates are rarely covered in traditional subjects like mathematics or history. Without this education, young adults often face challenges like accumulating debt from credit cards or poor investment decisions. By integrating these topics into the school syllabus, students would be better prepared to make informed financial decisions throughout their lives.

Moreover, schools are an ideal environment for imparting impartial and structured financial education. Parents may not always have the time or expertise to teach these matters effectively, and external sources like online resources can be unreliable or biased. In contrast, a school-based program ensures that all students, regardless of their background, receive consistent and accurate information. For example, countries like Australia have implemented financial literacy courses in their national curriculum, resulting in improved financial awareness among young adults.

In conclusion, I strongly support the idea of teaching money management in schools, as it fosters independence and long-term financial stability. Implementing this would benefit individuals and society as a whole.`,
  wordCount: 268,
  scores: {
    taskResponse: 8.0,
    coherenceCohesion: 8.0,
    lexicalResource: 8.0,
    grammaticalRange: 8.0,
    overall: 8.0
  },
  feedback: {
    strengths: [
      "Clear position throughout the essay with strong agreement",
      "Well-developed arguments with specific examples (Australia curriculum)",
      "Good use of linking devices and paragraph structure",
      "Appropriate academic vocabulary and varied sentence structures"
    ],
    improvements: [
      "Could include a counterargument to show broader perspective",
      "Some sentences could be more concise for better clarity",
      "Consider adding more specific statistics or research data"
    ],
    detailedFeedback: {
      taskResponse: "Excellent response to the question with clear position and well-developed arguments. All parts of the task are fully addressed.",
      coherenceCohesion: "Logical progression of ideas with effective paragraphing. Good use of cohesive devices throughout.",
      lexicalResource: "Wide range of vocabulary used naturally and appropriately. Few minor errors that don't impede communication.",
      grammaticalRange: "Good variety of complex structures used accurately. Minor errors don't reduce clarity."
    }
  }
};

export default function EssayDetail() {
  const [match] = useRoute("/essay/:id");
  const essayId = match?.id;
  
  // In a real app, you would fetch essay data based on the ID
  const essay = sampleEssayData;

  const getBandColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 7) return "text-blue-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getBandBgColor = (score: number) => {
    if (score >= 8) return "bg-green-50 border-green-200";
    if (score >= 7) return "bg-blue-50 border-blue-200";
    if (score >= 6) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/progress-tracking">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Progress Tracking
            </Button>
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Essay Details</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {essay.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {essay.time}
                </div>
                <Badge variant="outline">{essay.taskType}</Badge>
                <Badge variant="secondary">{essay.essayType}</Badge>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Overall Band Score</div>
              <div className={`text-4xl font-bold ${getBandColor(essay.scores.overall)}`}>
                {formatIELTSScore(essay.scores.overall)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{essay.question}</p>
              </CardContent>
            </Card>

            {/* Essay Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Your Essay
                  </div>
                  <div className="text-sm text-gray-600">
                    {essay.wordCount} words
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {essay.essayContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Detailed Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Strengths */}
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {essay.feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Areas for Improvement */}
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {essay.feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Band Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Band Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries({
                  "Task Response": essay.scores.taskResponse,
                  "Coherence & Cohesion": essay.scores.coherenceCohesion,
                  "Lexical Resource": essay.scores.lexicalResource,
                  "Grammatical Range": essay.scores.grammaticalRange,
                }).map(([criterion, score]) => (
                  <div key={criterion} className={`p-3 rounded-lg border ${getBandBgColor(score)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{criterion}</span>
                      <span className={`text-lg font-bold ${getBandColor(score)}`}>
                        {formatIELTSScore(score)}
                      </span>
                    </div>
                    <Progress 
                      value={(score / 9) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Criterion-specific Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Criterion Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries({
                  "Task Response": essay.feedback.detailedFeedback.taskResponse,
                  "Coherence & Cohesion": essay.feedback.detailedFeedback.coherenceCohesion,
                  "Lexical Resource": essay.feedback.detailedFeedback.lexicalResource,
                  "Grammatical Range": essay.feedback.detailedFeedback.grammaticalRange,
                }).map(([criterion, feedback]) => (
                  <div key={criterion} className="space-y-2">
                    <h4 className="font-medium text-gray-900">{criterion}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{feedback}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}