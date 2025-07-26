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

  // Task 1 specific feedback data
  const feedbackData: Task1FeedbackData = {
    scores: {
      taskAchievement: 6.5,
      coherenceCohesion: 6.0,
      lexicalResource: 6.5,
      grammar: 6.0,
      overall: 6.0,
    },
    stats: {
      totalWords: sampleEssay.split(/\s+/).filter(Boolean).length || 180,
      completionTime: "18:45",
      vocabularyRange: "Adequate",
      grammarAccuracy: "Adequate",
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

  // Create highlighted essay with tooltips
  const createHighlightedEssay = () => {
    let result = sampleEssay;
    
    Object.entries(highlightMapping).forEach(([sentence, data]) => {
      const colorClass = data.type === 'red' ? 'bg-[#ffcdd2]' : 
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
        
        result = result.replace(
          sentence,
          `<span class="tooltip-trigger ${colorClass} cursor-help rounded px-1" data-tooltip="${encodeURIComponent(JSON.stringify(data.tooltip))}">${sentence}</span>`
        );
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
        <p className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: result }}></p>
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

        {/* Overall Score Section */}
        <div className="container max-w-[1100px] mx-auto mb-6">
          <h2 className="text-2xl font-bold mb-4">Overall Band Score</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="column flex flex-col gap-4">
              {/* Band Score Card */}
              <div className="box bg-[#FAFAFA] border border-black rounded-lg p-4 h-auto">
                <h2 className="text-xl font-bold mt-0 mb-2">Band Score: {feedbackData.scores.overall}</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Task Achievement</p>
                    <div className="relative">
                      <Progress 
                        value={getScorePercentage(feedbackData.scores.taskAchievement)} 
                        className="h-3 bg-gray-200"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
                        {feedbackData.scores.taskAchievement}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Coherence & Cohesion</p>
                    <div className="relative">
                      <Progress 
                        value={getScorePercentage(feedbackData.scores.coherenceCohesion)} 
                        className="h-3 bg-gray-200"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
                        {feedbackData.scores.coherenceCohesion}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Lexical Resource</p>
                    <div className="relative">
                      <Progress 
                        value={getScorePercentage(feedbackData.scores.lexicalResource)} 
                        className="h-3 bg-gray-200"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
                        {feedbackData.scores.lexicalResource}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Grammar</p>
                    <div className="relative">
                      <Progress 
                        value={getScorePercentage(feedbackData.scores.grammar)} 
                        className="h-3 bg-gray-200"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
                        {feedbackData.scores.grammar}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="mt-4 pt-3 border-t border-gray-300">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Words:</span>
                      <span className="font-medium">{feedbackData.stats.totalWords}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{feedbackData.stats.completionTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vocabulary:</span>
                      <span className="font-medium">{feedbackData.stats.vocabularyRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grammar:</span>
                      <span className="font-medium">{feedbackData.stats.grammarAccuracy}</span>
                    </div>
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
                          This Task 1 response demonstrates a solid understanding of the chart requirements with a clear overview and appropriate data selection. The essay effectively identifies main trends and provides specific figures from the graph. However, some grammatical errors and inconsistent paragraphing affect the overall coherence. The vocabulary is adequate for Task 1 but could be more varied for describing trends and changes.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="strengths" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-green-50 to-transparent hover:from-green-100">
                        <span className="text-gray-800">Strengths</span>
                      </AccordionTrigger>
                      <AccordionContent className="p-3 bg-white">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {feedbackData.feedback.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="improvements" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-orange-50 to-transparent hover:from-orange-100">
                        <span className="text-gray-800">Areas for Improvement</span>
                      </AccordionTrigger>
                      <AccordionContent className="p-3 bg-white">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {feedbackData.feedback.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Feedback Section */}
        <div className="container max-w-[1100px] mx-auto mb-6">
          <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>
          
          <Tabs defaultValue="task-achievement" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4 bg-white border border-gray-300 rounded-lg h-12 p-1">
              <TabsTrigger 
                value="task-achievement" 
                className="data-[state=active]:bg-[#64c4bc] data-[state=active]:text-white data-[state=active]:shadow-sm bg-transparent text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 font-medium text-sm"
              >
                Task Achievement
              </TabsTrigger>
              <TabsTrigger 
                value="coherence-cohesion" 
                className="data-[state=active]:bg-[#64c4bc] data-[state=active]:text-white data-[state=active]:shadow-sm bg-transparent text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 font-medium text-sm"
              >
                Coherence & Cohesion
              </TabsTrigger>
              <TabsTrigger 
                value="lexical-resource" 
                className="data-[state=active]:bg-[#64c4bc] data-[state=active]:text-white data-[state=active]:shadow-sm bg-transparent text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 font-medium text-sm"
              >
                Lexical Resource
              </TabsTrigger>
              <TabsTrigger 
                value="grammar" 
                className="data-[state=active]:bg-[#64c4bc] data-[state=active]:text-white data-[state=active]:shadow-sm bg-transparent text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 font-medium text-sm"
              >
                Grammar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="task-achievement">
              <Card className="border border-gray-300">
                <CardHeader className="bg-[#FAFAFA] border-b border-gray-300">
                  <h3 className="text-lg font-semibold">Task Achievement - Band {feedbackData.scores.taskAchievement}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                      <strong>Assessment:</strong> The response appropriately addresses the task requirements by providing an overview and describing the main features of the chart. Key trends are identified and specific data is included to support the description.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Points:</p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                        <li>Clear overview identifying petroleum as dominant source and natural gas growth</li>
                        <li>Appropriate selection of main features and trends</li>
                        <li>Good use of specific data and figures from the chart</li>
                        <li>Could include more comparative analysis between energy sources</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coherence-cohesion">
              <Card className="border border-gray-300">
                <CardHeader className="bg-[#FAFAFA] border-b border-gray-300">
                  <h3 className="text-lg font-semibold">Coherence & Cohesion - Band {feedbackData.scores.coherenceCohesion}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                      <strong>Assessment:</strong> The essay has a logical structure with clear overview and body paragraphs. However, paragraphing could be improved and some transitions between ideas need strengthening.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Points:</p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                        <li>Clear introduction and overview paragraph</li>
                        <li>Logical progression from overview to specific details</li>
                        <li>Some paragraphing issues affect text organization</li>
                        <li>Good use of cohesive devices like "Overall" and "However"</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lexical-resource">
              <Card className="border border-gray-300">
                <CardHeader className="bg-[#FAFAFA] border-b border-gray-300">
                  <h3 className="text-lg font-semibold">Lexical Resource - Band {feedbackData.scores.lexicalResource}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                      <strong>Assessment:</strong> Adequate vocabulary for Task 1 with appropriate use of trend language. Some repetition and limited range in describing changes and comparisons.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Points:</p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                        <li>Appropriate Task 1 vocabulary for describing charts</li>
                        <li>Good use of trend language: "growth", "increase", "fluctuations"</li>
                        <li>Some repetitive language that could be varied</li>
                        <li>Could benefit from more sophisticated comparative expressions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grammar">
              <Card className="border border-gray-300">
                <CardHeader className="bg-[#FAFAFA] border-b border-gray-300">
                  <h3 className="text-lg font-semibold">Grammatical Range and Accuracy - Band {feedbackData.scores.grammar}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                      <strong>Assessment:</strong> Generally good grammatical control with some errors in subject-verb agreement that affect clarity. Complex structures attempted but not always successful.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Points:</p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                        <li>Good range of sentence structures for Task 1</li>
                        <li>Some subject-verb agreement errors that need attention</li>
                        <li>Generally appropriate use of passive voice and tenses</li>
                        <li>Complex sentences generally well-formed</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Interactive Essay Analysis */}
        <div className="container max-w-[1100px] mx-auto mb-6">
          <h2 className="text-2xl font-bold mb-4">Essay Analysis</h2>
          {createHighlightedEssay()}
        </div>

        {/* Action Buttons */}
        <div className="container max-w-[1100px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onTryAgain} variant="outline" className="flex items-center gap-2">
              <Pen className="h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={onNextPractice} className="flex items-center gap-2 bg-[#64c4bc] hover:bg-[#58b3ab]">
              Next Practice
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Exit Dialog */}
        <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Leave Feedback?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to go back? Your feedback will still be available in your practice history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay Here</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link to="/writing-task-1-practice">
                  <Button variant="destructive">Go Back</Button>
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}