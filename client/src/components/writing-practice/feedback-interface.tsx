import { Download, Pen, ArrowRight, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Check, X, Info } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "wouter";

// Possible issues in essay
type IssueType = 'error' | 'suggestion' | 'good';

interface SentenceIssue {
  type: IssueType;
  original: string;
  correction?: string;
  reason?: string;
  issueDetail?: string;
}

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
  analysis?: {
    sentences: Record<string, SentenceIssue>;
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
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  const [showCorrectionDialog, setShowCorrectionDialog] = useState(false);

  // Example animal welfare essay as shown in the screenshot
  const sampleEssay = `In recent years, the way humans treat animals has become a big problem in many societies.
Some people believe animals should have equal rights as humans, while others say human needs are more important.
This essay will look at both sides and give my opinion.
On one hand, many people think that animals have feelings like pain, fear and happiness, so they should be protected like humans.
They say animals should not be killed for food, used for testing, or kept in small cages.
For example, testing makeup on animals can hurt them and it is not fair.
People also believe that animals in zoos or farms live in poor condition and this is not right.
On the other hand, other people argue that humans must come first.
They think animals can be used for food, clothes or research, especially when it help humans survive or be healthy.
Some important medicine was tested on animals before used for people.
In some countries, eating meat is a part of culture and tradition, so it cannot be avoided easily.
In my opinion, I believe animals should be treated well, but sometimes human needs are more necessary.
We should try to reduce animal suffering, but not forget that people also have needs to live.
To conclude, both views are reasonable, and the best way is to find a balance between human needs and animal protection.`;

  // This would normally come from an API based on essay analysis
  // Using sample data that follows the design in the screenshots
  const feedbackData: FeedbackData = {
    scores: {
      taskAchievement: 7.0,
      coherenceCohesion: 7.0,
      lexicalResource: 7.0,
      grammar: 7.0,
      overall: 7.0,
    },
    stats: {
      totalWords: sampleEssay.split(/\s+/).filter(Boolean).length || 267,
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
    analysis: {
      sentences: {
        "In recent years, the way humans treat animals has become a big problem in many societies.": {
          type: 'good',
          original: "In recent years, the way humans treat animals has become a big problem in many societies."
        },
        "Some people believe animals should have equal rights as humans, while others say human needs are more important.": {
          type: 'good',
          original: "Some people believe animals should have equal rights as humans, while others say human needs are more important."
        },
        "This essay will look at both sides and give my opinion.": {
          type: 'good',
          original: "This essay will look at both sides and give my opinion."
        },
        "For example, testing makeup on animals can hurt them and it is not fair.": {
          type: 'suggestion',
          original: "For example, testing makeup on animals can hurt them and it is not fair.",
          correction: "For example, testing cosmetics on animals causes them pain and raises serious ethical concerns.",
          reason: "The phrase 'can hurt them and it is not fair' is somewhat informal and vague. The suggested correction uses more academic language and expresses the ethical dimension more clearly.",
          issueDetail: "The phrase 'mainly focus on' can be seen as vague and could be more assertive."
        },
        "Some important medicine was tested on animals before used for people.": {
          type: 'error',
          original: "Some important medicine was tested on animals before used for people.",
          correction: "Some important medicine was tested on animals before it was used for people.",
          reason: "Correcting the grammar improves clarity and coherence, which are important for achieving a higher IELTS score.",
          issueDetail: "Grammar issue (missing 'it was' or 'being')"
        }
      }
    }
  };

  // Get current issue details based on selectedSentence
  const getCurrentIssue = () => {
    if (!selectedSentence || !feedbackData.analysis?.sentences[selectedSentence]) {
      return null;
    }
    return feedbackData.analysis.sentences[selectedSentence];
  };

  const currentIssue = getCurrentIssue();

  // Helper function to highlight sentences based on their analysis
  const highlightEssay = (text: string) => {
    if (!text) return null;

    // Regex to split into sentences - handles basic sentence endings with . ! ?
    const sentenceRegex = /([^.!?]+[.!?]+)/g;
    const sentences = text.match(sentenceRegex) || [];

    return (
      <div className="highlight-section bg-[#fdfdfd] border border-gray-300 rounded-lg p-4">
        {sentences.map((sentence, index) => {
          const trimmedSentence = sentence.trim();
          const issue = feedbackData.analysis?.sentences[trimmedSentence];

          let className = "sentence block mb-2 p-2 rounded-md"; 
          let handleClick = () => {};

          if (issue) {
            switch (issue.type) {
              case 'good':
                className += " green bg-[#e1f5e8] text-[#2e7d32]";
                break;
              case 'error':
                className += " red bg-[#ffcdd2] text-[#c62828] cursor-pointer";
                handleClick = () => {
                  setSelectedSentence(trimmedSentence);
                  setShowCorrectionDialog(true);
                };
                break;
              case 'suggestion':
                className += " yellow bg-[#fff9c4] text-[#f9a825] cursor-pointer";
                handleClick = () => {
                  setSelectedSentence(trimmedSentence);
                  setShowCorrectionDialog(true);
                };
                break;
            }
          }

          return (
            <div 
              key={index} 
              className={className}
              onClick={handleClick}
            >
              {sentence}
            </div>
          );
        })}
      </div>
    );
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

      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-[1100px] mx-auto">
        {/* Left Column */}
        <div className="column flex flex-col gap-4">
            {/* Overall Band Score */}
            <div className="box bg-[#FAFAFA] border border-black rounded-lg p-4">
              <div className="score-header flex justify-between text-2xl font-bold">
                <span>Overall Band Score:</span>
                <span className="score-value text-3xl" style={{ color: '#44b9b0' }}>
                  {feedbackData.scores.overall.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="box bg-[#FAFAFA] rounded-lg border border-gray-200 p-4">
              <h2 className="text-2xl font-bold mb-6">Score Breakdown</h2>

              <div className="flex flex-col gap-6">
                {/* Task Response */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Task Response</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#44b9b0] h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                {/* Coherence & Cohesion */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Coherence & Cohesion</span>
                    <span className="text-[#44b9b0] font-bold">8.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#44b9b0] h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                {/* Lexical Resource */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Lexical Resource</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#44b9b0] h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                {/* Grammatical Range & Accuracy */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Grammatical Range & Accuracy</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#44b9b0] h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="column flex flex-col gap-4">
            {/* Overall Feedback */}
            <div className="box bg-[#FAFAFA] border border-black rounded-lg p-4">
              <h2 className="text-xl font-bold mt-0 mb-2">Overall Feedback:</h2>
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
            <div className="box bg-[#FAFAFA] border border-black rounded-lg p-4">
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

      {/* Essay Analysis & Highlights Section */}
      <div className="container max-w-[1100px] mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-4">Essay Analysis & Highlights</h2>

        {/* Legend for color coding */}
        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Good</Badge>
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Error</Badge>
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Suggestion</Badge>
        </div>

        {/* Essay with highlighted sections */}
        {highlightEssay(sampleEssay)}
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

      {/* Sentence Correction Dialog */}
      <Dialog open={showCorrectionDialog} onOpenChange={setShowCorrectionDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {currentIssue?.type === 'error' && (
            <DialogHeader>
              <DialogTitle className="flex items-center text-[#c62828] mb-2">
                <XCircle className="h-5 w-5 mr-2" /> Errors & Corrections
              </DialogTitle>
            </DialogHeader>
          )}

          {currentIssue?.type === 'suggestion' && (
            <DialogHeader>
              <DialogTitle className="flex items-center text-[#f9a825] mb-2">
                <AlertTriangle className="h-5 w-5 mr-2" /> Suggestions for Improvement
              </DialogTitle>
            </DialogHeader>
          )}

          {currentIssue && (
            <div className="py-2">
              <div className="mb-4">
                <h4 className="font-semibold mb-1">Original:</h4>
                <p className={`p-2 rounded-md ${
                  currentIssue.type === 'error' 
                    ? 'bg-[#ffcdd2] text-[#c62828]' 
                    : 'bg-[#fff9c4] text-[#f9a825]'
                }`}>
                  {currentIssue.original}
                </p>
              </div>

              {currentIssue.type === 'error' && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Error:</h4>
                  <p className="text-[#c62828]">
                    {currentIssue.issueDetail}
                  </p>
                </div>
              )}

              {currentIssue.type === 'suggestion' && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Issue:</h4>
                  <p className="text-[#f9a825]">
                    {currentIssue.issueDetail}
                  </p>
                </div>
              )}

              {currentIssue.correction && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">
                    {currentIssue.type === 'error' ? 'Correction:' : 'Improved:'}
                  </h4>
                  <p className="p-2 bg-[#e1f5e8] text-[#2e7d32] rounded-md">
                    {currentIssue.correction}
                  </p>
                </div>
              )}

              {currentIssue.reason && (
                <div>
                  <h4 className="font-semibold mb-1">Reason:</h4>
                  <p>
                    {currentIssue.reason}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCorrectionDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}