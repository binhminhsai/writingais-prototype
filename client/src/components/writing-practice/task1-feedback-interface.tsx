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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Link } from "wouter";

// Enhanced highlighting types
type HighlightType = 'red' | 'yellow' | 'green';

interface HighlightData {
  type: HighlightType;
  tooltip?: {
    category: string;
    original: string;
    improved?: string;
    corrected?: string;
    explanation: string;
    bandImpact?: string;
    rule?: string;
    severity?: string;
  };
}

// Task 1 feedback data interface
interface Task1FeedbackData {
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

interface Task1FeedbackInterfaceProps {
  essayContent: string;
  onTryAgain: () => void;
  onNextPractice: () => void;
}

export function Task1FeedbackInterface({
  essayContent,
  onTryAgain,
  onNextPractice,
}: Task1FeedbackInterfaceProps) {
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Sample Task 1 essay about energy consumption
  const sampleEssay = `The line graph illustrates the consumption of energy by source in the USA from 1980 to 2030, with projections for the future period.
Overall, petroleum remains the dominant energy source throughout the entire period, while natural gas shows significant growth, especially after 2008.
Renewables demonstrate the most dramatic increase in the projected period, while nuclear energy remains relatively stable.
Looking at the details, petroleum consumption started at approximately 35 quadrillion BTU in 1980 and maintains its position as the largest energy source.
Although it experiences some fluctuations, particularly a decline around 2008, it is projected to return to around 37 quadrillion BTU by 2030.
Natural gas consumption shows steady growth from about 20 quadrillion BTU in 1980 to 24 quadrillion BTU in 2008.
The most significant change occur in the projected period, where natural gas consumption is expected to rise sharply to 32 quadrillion BTU by 2030.
Coal demonstrates gradual increase from 15 quadrillion BTU in 1980 to 22 quadrillion BTU in 2008, with projections showing continued growth to the same level by 2030.
Nuclear energy consumption remains relatively stable throughout the period, fluctuating around 8 quadrillion BTU with minimal variation.
The most notable trend is seen in renewables, which start at just 3 quadrillion BTU in 1980 and remain low until 2008 at 7 quadrillion BTU.
However, renewable energy sources is projected to experience substantial growth, reaching 12 quadrillion BTU by 2030, making it the third-largest energy source.`;

  // Task 1 specific feedback data - using same structure as Task 2
  const feedbackData: Task1FeedbackData = {
    scores: {
      taskAchievement: 7.0,
      coherenceCohesion: 8.0,
      lexicalResource: 7.0,
      grammar: 7.0,
      overall: 7.5,
    },
    stats: {
      totalWords: 307,
      completionTime: "35:22",
      vocabularyRange: "Good",
      grammarAccuracy: "Good",
    },
    feedback: {
      strengths: [
        "Clear overview paragraph identifying main trends",
        "Good use of data and specific figures from the graph",
        "Appropriate Task 1 language for describing trends",
        "Logical organization with introduction and body paragraphs",
      ],
      improvements: [
        "Some grammatical errors affect clarity",
        "Could provide more precise comparisons between energy sources",
        "Paragraphing could be improved for better coherence",
        "Some sentences are repetitive and could be more varied",
      ],
    }
  };

  // Task 1 specific highlighting data
  const highlightMapping: Record<string, HighlightData> = {
    // Red highlights (errors)
    "The most significant change occur in the projected period, where natural gas consumption is expected to rise sharply to 32 quadrillion BTU by 2030.": {
      type: 'red',
      tooltip: {
        category: 'Verb Tense OR Sentence Structure',
        original: 'change occur',
        corrected: 'change occurs',
        explanation: 'Singular subjects like "change" require singular verbs. Use "occurs" instead of "occur".',
        rule: 'Singular subjects take singular verbs',
        severity: 'High'
      }
    },
    "However, renewable energy sources is projected to experience substantial growth, reaching 12 quadrillion BTU by 2030, making it the third-largest energy source.": {
      type: 'red',
      tooltip: {
        category: 'Verb Tense OR Sentence Structure',
        original: 'renewable energy sources is projected',
        corrected: 'renewable energy sources are projected',
        explanation: 'Plural subjects like "renewable energy sources" require plural verbs. Use "are" instead of "is".',
        rule: 'Plural subjects take plural verbs',
        severity: 'High'
      }
    },
    
    // Yellow highlights (vocabulary enhancement)
    "Natural gas consumption shows steady growth from about 20 quadrillion BTU in 1980 to 24 quadrillion BTU in 2008.": {
      type: 'yellow',
      tooltip: {
        category: 'Vocabulary Enhancement',
        original: 'shows steady growth',
        improved: 'demonstrates consistent upward trend',
        explanation: 'Using more sophisticated vocabulary improves the academic tone of Task 1 writing.',
        bandImpact: 'Improves Lexical Resource to Band 7+'
      }
    },
    "Coal demonstrates gradual increase from 15 quadrillion BTU in 1980 to 22 quadrillion BTU in 2008": {
      type: 'yellow',
      tooltip: {
        category: 'Vocabulary Enhancement',
        original: 'gradual increase',
        improved: 'steady upward trajectory',
        explanation: 'Varied vocabulary for describing trends enhances the lexical resource score.',
        bandImpact: 'Shows good range of trend vocabulary'
      }
    },
    
    // Green highlights (good examples)
    "Overall, petroleum remains the dominant energy source throughout the entire period, while natural gas shows significant growth, especially after 2008.": {
      type: 'green',
      tooltip: {
        category: 'Task Achievement',
        original: 'Overall, petroleum remains the dominant energy source throughout the entire period',
        explanation: 'Excellent overview statement that identifies the main trend clearly.',
        bandImpact: 'Strong overview contributes to Band 6+ Task Achievement'
      }
    },
    "The line graph illustrates the consumption of energy by source in the USA from 1980 to 2030, with projections for the future period.": {
      type: 'green',
      tooltip: {
        category: 'Task Achievement',
        original: 'The line graph illustrates the consumption of energy by source in the USA from 1980 to 2030',
        explanation: 'Good paraphrasing of the question and clear introduction of the chart.',
        bandImpact: 'Effective paraphrasing supports Task Achievement'
      }
    }
  };

  // Create highlighted essay with tooltips - exactly matching Task 2 implementation
  const createHighlightedEssay = () => {
    const sentences = sampleEssay.split(/(?<=[.!?])\s+/);
    const result: React.ReactNode[] = [];

    sentences.forEach((sentence, index) => {
      const matchingEntry = Object.entries(highlightMapping).find(([key, _]) => 
        sentence.includes(key) || key.includes(sentence)
      );

      if (matchingEntry) {
        const [_, data] = matchingEntry;
        const bgColor = data.type === 'red' ? 'bg-[#ffcdd2]' : 
                       data.type === 'yellow' ? 'bg-[#fef9c3]' : 
                       'bg-[#dcfce7]';

        if (data.tooltip) {
          const tooltipContent = (
            <div className="space-y-2 text-left">
              <div className="font-semibold text-sm">{data.tooltip.category}</div>
              <div className="space-y-1">
                <div><span className="font-medium">Original:</span> {data.tooltip.original}</div>
                {data.tooltip.corrected && (
                  <div><span className="font-medium">Corrected:</span> {data.tooltip.corrected}</div>
                )}
                {data.tooltip.improved && (
                  <div><span className="font-medium">Improved:</span> {data.tooltip.improved}</div>
                )}
                <div><span className="font-medium">Explanation:</span> {data.tooltip.explanation}</div>
                {data.tooltip.rule && (
                  <div><span className="font-medium">Rule:</span> {data.tooltip.rule}</div>
                )}
                {data.tooltip.severity && (
                  <div><span className="font-medium">Severity:</span> {data.tooltip.severity}</div>
                )}
                {data.tooltip.bandImpact && (
                  <div><span className="font-medium">Band Impact:</span> {data.tooltip.bandImpact}</div>
                )}
              </div>
            </div>
          );

          result.push(
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <span className={`cursor-help rounded px-1 ${bgColor}`}>
                  {sentence}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-800 text-white p-4 max-w-md">
                {tooltipContent}
              </TooltipContent>
            </Tooltip>
          );
        } else {
          result.push(
            <span key={index} className={`rounded px-1 ${bgColor}`}>
              {sentence}
            </span>
          );
        }
        
        if (index < sentences.length - 1) {
          result.push(<span key={`space-${index}`}> </span>);
        }
      } else {
        result.push(<span key={index}>{sentence}</span>);
        
        if (index < sentences.length - 1) {
          result.push(<span key={`space-${index}`}> </span>);
        }
      }
    });

    return (
      <div className="highlight-section bg-[#fdfdfd] border border-gray-300 rounded-lg p-6">
        <div className="mb-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#ffcdd2] rounded"></span>
              <span>Error</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#fef9c3] rounded"></span>
              <span>Improvement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#dcfce7] rounded"></span>
              <span>Suggestion</span>
            </div>
          </div>
        </div>
        <p className="text-base leading-relaxed">
          {result}
        </p>
      </div>
    );
  };

  const getScorePercentage = (score: number) => {
    return (score / 9) * 100;
  };

  return (
    <TooltipProvider>
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
        <h2 className="text-xl font-semibold mb-2">Your essay has been evaluated based on the IELTS Task 1 criteria!</h2>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-[1100px] mx-auto">
        {/* Left Column */}
        <div className="column flex flex-col gap-4">
            {/* Score Breakdown */}
            <div className="box bg-[#FAFAFA] rounded-lg border border-black p-3 h-full flex flex-col">
              <h2 className="text-lg font-bold mb-3">Score Breakdown</h2>

              <div className="flex flex-col justify-between flex-1 gap-3">
                {/* Task Achievement */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Task Achievement</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[18px]">
                    <div className="bg-[#44b9b0] h-[18px] rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                {/* Coherence & Cohesion */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Coherence & Cohesion</span>
                    <span className="text-[#44b9b0] font-bold">8.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[18px]">
                    <div className="bg-[#44b9b0] h-[18px] rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>

                {/* Lexical Resource */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Lexical Resource</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[18px]">
                    <div className="bg-[#44b9b0] h-[18px] rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                {/* Grammatical Range & Accuracy */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Grammatical Range & Accuracy</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[18px]">
                    <div className="bg-[#44b9b0] h-[18px] rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Overall Band Score</span>
                  <span className="text-[#44b9b0] text-4xl font-extrabold">7.5</span>
                </div>
              </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="column flex flex-col gap-4">
            {/* Overall Feedback */}
            <div className="box bg-[#FAFAFA] border border-black rounded-lg p-4 h-auto">
              <h2 className="text-xl font-bold mt-0 mb-2">Overall Assessment:</h2>
              <div className="overflow-y-auto h-64 custom-scrollbar pr-1">
                <Accordion type="single" collapsible className="w-full space-y-1">
                  <AccordionItem value="summary" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100">
                      <span className="text-gray-800">Summary</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        This Task 1 response effectively addresses the prompt requirements with a clear overview and detailed analysis. The essay demonstrates good understanding of data interpretation and includes relevant supporting figures. The coherence is strong with logical progression, though minor grammatical errors occasionally impact clarity.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="specific-suggestions" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-orange-50 to-transparent hover:from-orange-100">
                      <span className="text-gray-800">Specific Suggestions</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <ul className="text-gray-700 leading-relaxed space-y-1 text-sm">
                        <li>• Include more detailed comparisons between different energy sources to enhance analysis</li>
                        <li>• Use a wider range of vocabulary for describing trends and changes in the data</li>
                        <li>• Improve paragraph transitions to create smoother flow between ideas</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vocabulary-enhancement" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-purple-50 to-transparent hover:from-purple-100">
                      <span className="text-gray-800">Vocabulary Enhancement</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <ul className="text-gray-700 leading-relaxed space-y-1 text-sm">
                        <li>• For describing trends: fluctuated, peaked, plateaued, surged, plummeted</li>
                        <li>• Replace simple words: substantial, marginal, considerable, negligible, pronounced</li>
                        <li>• Comparison phrases: in contrast, conversely, whereas, similarly, likewise</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="grammar-focus" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-indigo-50 to-transparent hover:from-indigo-100">
                      <span className="text-gray-800">Grammar Focus</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <ul className="text-gray-700 leading-relaxed space-y-1 text-sm">
                        <li>• Subject-verb agreement: check singular/plural forms carefully</li>
                        <li>• Past tense consistency when describing historical data trends</li>
                        <li>• Complex sentence structures for sophisticated data comparisons</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Writing Statistic */}
            <div className="box bg-[#FAFAFA] border border-black rounded-lg p-4">
              <h2 className="text-xl font-bold mt-0 mb-2 text-center">Writing Statistic</h2>
              <div className="stat-row flex justify-around mt-2">
                <div className="text-center">
                  <div className="stat-label font-bold">Word Count</div>
                  <div className={`stat-value font-bold text-2xl mt-1 ${feedbackData.stats.totalWords < 150 ? 'text-red-500' : ''}`}>
                    {feedbackData.stats.totalWords}
                  </div>
                </div>
                <div className="text-center">
                  <div className="stat-label font-bold">Completion Time</div>
                  <div className="stat-value font-bold text-2xl mt-1">
                    {feedbackData.stats.completionTime}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Interactive Essay Analysis Section */}
      <div className="container max-w-[1100px] mx-auto mb-6">
        {createHighlightedEssay()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={onTryAgain} variant="outline" className="px-6">
          <Pen className="h-4 w-4 mr-2" />
          Try Again
        </Button>
        <Button onClick={onNextPractice} className="px-6 bg-primary hover:opacity-90">
          <ArrowRight className="h-4 w-4 mr-2" />
          Next Practice
        </Button>
        <Button variant="outline" className="px-6">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Task 1 Practice?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Your progress will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue</AlertDialogCancel>
            <Link href="/writing-task-1">
              <AlertDialogAction>
                Exit
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </TooltipProvider>
  );
}