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
import { ChemicalFlaskLoader } from "@/components/ui/chemical-flask-loader";

// Possible issues in essay
type IssueType = 'error' | 'suggestion' | 'good';

interface SentenceIssue {
  type: IssueType;
  original: string;
  correction?: string;
  reason?: string;
  issueDetail?: string;
}

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
  context?: "writing-practice" | "essay-grading";
}

export function FeedbackInterface({
  essayContent,
  onTryAgain,
  onNextPractice,
  context = "writing-practice",
}: FeedbackInterfaceProps) {
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Example sustainable development essay - 300 words
  const sampleEssay = `In recent years, sustainable development has become one of the most critical issues facing governments worldwide.
While some people argue that economic growth should be the primary focus, others believe environmental protection must take priority.
This essay will examine both perspectives and present my own viewpoint.
On one hand, supporters of economic growth argue that development is essential for improving living standards and reducing poverty.
They believe that industrial expansion create jobs and generate income, which allow people to meet their basic needs.
For example, developing countries like China and India have achieved significant economic progress through manufacturing and industrialization.
These nations has lifted millions of people out of poverty and improved infrastructure substantially.
Moreover, proponents claim that wealthier societies are better equipped to invest in clean technologies and environmental solutions.
On the other hand, environmentalists contend that unchecked economic growth leads to serious ecological problems.
They argue that industrial activities cause pollution, deforestation, and climate change, which threaten the planet's future.
For instance, excessive carbon emissions from factories and vehicles has contributed to global warming and extreme weather events.
Many scientists warn that without immediate action, the environmental damage will be irreversible and affect future generations severely.
Furthermore, they suggest that sustainable practices can actually boost long-term economic benefits through green technologies.
In my opinion, I believe both economic development and environmental protection are equally important for society's well-being.
However, I think governments should prioritize sustainable growth over rapid expansion.
Countries must invest in renewable energy, promote eco-friendly industries, and implement strict environmental regulations.
This approach ensures that economic progress does not compromise the planet's health for future generations.
To conclude, while economic growth remains important for human development, it must be balanced with environmental sustainability.
Only through careful planning and responsible policies can societies achieve prosperity without destroying the natural world that supports all life.`;

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
      totalWords: sampleEssay.split(/\s+/).filter(Boolean).length || 299,
      completionTime: "35:22",
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
        "In recent years, sustainable development has become one of the most critical issues facing governments worldwide.": {
          type: 'good',
          original: "In recent years, sustainable development has become one of the most critical issues facing governments worldwide."
        },
        "This essay will examine both perspectives and present my own viewpoint.": {
          type: 'good',
          original: "This essay will examine both perspectives and present my own viewpoint."
        },
        "They believe that industrial expansion create jobs and generate income, which allow people to meet their basic needs.": {
          type: 'error',
          original: "They believe that industrial expansion create jobs and generate income, which allow people to meet their basic needs.",
          correction: "They believe that industrial expansion creates jobs and generates income, which allows people to meet their basic needs.",
          reason: "Subject-verb agreement errors affect the overall grammatical accuracy score. The singular subject 'industrial expansion' requires the verbs 'creates' and 'generates' rather than 'create' and 'generate'.",
          issueDetail: "Grammar - subject-verb agreement error (expansion creates, not create)"
        },
        "These nations has lifted millions of people out of poverty and improved infrastructure substantially.": {
          type: 'error',
          original: "These nations has lifted millions of people out of poverty and improved infrastructure substantially.",
          correction: "These nations have lifted millions of people out of poverty and improved infrastructure substantially.",
          reason: "The plural subject 'These nations' requires the plural auxiliary verb 'have' rather than the singular 'has'. This is a fundamental grammar rule that affects the overall accuracy score.",
          issueDetail: "Grammar - incorrect auxiliary verb (nations have, not has)"
        },
        "For instance, excessive carbon emissions from factories and vehicles has contributed to global warming and extreme weather events.": {
          type: 'error',
          original: "For instance, excessive carbon emissions from factories and vehicles has contributed to global warming and extreme weather events.",
          correction: "For instance, excessive carbon emissions from factories and vehicles have contributed to global warming and extreme weather events.",
          reason: "The plural subject 'emissions' requires the plural auxiliary verb 'have' rather than the singular 'has'. This grammatical error affects sentence clarity and scoring.",
          issueDetail: "Grammar - plural subject needs plural verb (emissions have, not has)"
        },
        "Many scientists warn that without immediate action, the environmental damage will be irreversible and affect future generations severely.": {
          type: 'suggestion',
          original: "Many scientists warn that without immediate action, the environmental damage will be irreversible and affect future generations severely.",
          correction: "Many scientists warn that without immediate action, environmental damage will be irreversible and severely affect future generations.",
          reason: "Repositioning 'severely' improves sentence flow and sounds more natural. Academic writing benefits from varied sentence structures and natural word order.",
          issueDetail: "The adverb placement could be more natural"
        },
        "However, I think governments should prioritize sustainable growth over rapid expansion.": {
          type: 'good',
          original: "However, I think governments should prioritize sustainable growth over rapid expansion."
        }
      }
    }
  };



  // Enhanced highlighting data - 2 sentences per color type
  const highlightMapping: Record<string, HighlightData> = {
    // Red highlights (errors with tooltips)
    "They believe that industrial expansion create jobs and generate income, which allow people to meet their basic needs.": {
      type: 'red',
      tooltip: {
        category: 'Verb Tense OR Sentence Structure',
        original: 'industrial expansion create jobs and generate income',
        corrected: 'industrial expansion creates jobs and generates income',
        explanation: 'Singular subjects like "industrial expansion" require singular verbs. Use "creates" and "generates" instead of "create" and "generate".',
        rule: 'Singular subjects take singular verbs',
        severity: 'High'
      }
    },
    "These nations has lifted millions of people out of poverty and improved infrastructure substantially.": {
      type: 'red',
      tooltip: {
        category: 'Verb Tense OR Sentence Structure',
        original: 'These nations has lifted',
        corrected: 'These nations have lifted',
        explanation: 'Plural subjects like "These nations" require plural auxiliary verbs. Use "have" instead of "has".',
        rule: 'Plural subjects take plural verbs',
        severity: 'High'
      }
    },
    
    // Yellow highlights (vocabulary enhancement with tooltips)
    "For example, developing countries like China and India have achieved significant economic progress through manufacturing and industrialization.": {
      type: 'yellow',
      tooltip: {
        category: 'Vocabulary Enhancement',
        original: 'achieved significant economic progress',
        improved: 'attained substantial economic advancement',
        explanation: 'Using more sophisticated vocabulary improves the academic tone of the writing.',
        bandImpact: 'Improves Lexical Resource to Band 7+'
      }
    },
    "Many scientists warn that without immediate action, the environmental damage will be irreversible and affect future generations severely.": {
      type: 'yellow',
      tooltip: {
        category: 'Vocabulary Enhancement',
        original: 'environmental damage will be irreversible',
        improved: 'ecological deterioration will be irremediable',
        explanation: 'Academic synonyms enhance the sophistication and precision of environmental vocabulary.',
        bandImpact: 'Improves Lexical Resource to Band 7+'
      }
    },
    
    // Green highlights (good examples with suggestions)
    "In recent years, sustainable development has become one of the most critical issues facing governments worldwide.": {
      type: 'green',
      tooltip: {
        category: 'Introduction Phrasing',
        original: 'In recent years, sustainable development has become',
        improved: 'Over the past decade, sustainable development has emerged as OR In contemporary society, sustainable development represents',
        explanation: 'This opening effectively establishes the topic\'s relevance and timeliness, creating a strong foundation for the essay.',
        bandImpact: 'Improves Task Response and Coherence/Cohesion'
      }
    },
    "Only through careful planning and responsible policies can societies achieve prosperity without destroying the natural world that supports all life.": {
      type: 'green',
      tooltip: {
        category: 'Conclusion Phrasing',
        original: 'Only through careful planning and responsible policies',
        improved: 'Through strategic planning and accountable governance OR Via comprehensive planning and sustainable policies',
        explanation: 'This conclusion effectively synthesizes the main arguments while providing a clear recommendation for future action.',
        bandImpact: 'Improves Task Response and Coherence/Cohesion'
      }
    }
  };

  // Helper function to highlight sentences with multi-color system
  const highlightEssay = (text: string) => {
    if (!text) return null;

    // Split text into sentences
    const sentences = text.split(/(?<=[.!?])\s+/);
    const result: JSX.Element[] = [];

    sentences.forEach((sentence, index) => {
      const trimmedSentence = sentence.trim();
      const highlightData = highlightMapping[trimmedSentence];
      
      if (highlightData) {
        let className = "";
        let bgColor = "";
        
        // Apply color based on highlight type
        switch (highlightData.type) {
          case 'red':
            className = "inline cursor-pointer hover:opacity-80 transition-opacity px-1 rounded";
            bgColor = "bg-[#ffcdd2] text-[#c62828]";
            break;
          case 'yellow':
            className = "inline cursor-pointer hover:opacity-80 transition-opacity px-1 rounded";
            bgColor = "bg-[#fef9c3] text-[#92400e]";
            break;
          case 'green':
            className = "inline cursor-pointer hover:opacity-80 transition-opacity px-1 rounded";
            bgColor = "bg-[#dcfce7] text-[#166534]";
            break;
        }

        // Add tooltip for all highlight types
        if (highlightData.tooltip) {
          let tooltipContent;
          
          if (highlightData.type === 'red') {
            // Red highlight tooltip structure
            tooltipContent = (
              <div className="max-w-sm space-y-3">
                <div>
                  <div className="font-semibold text-sm mb-1 text-red-400">Category:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.category}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-yellow-400">Original:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.original}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-green-400">Corrected:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.corrected}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-blue-400">Explanation:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.explanation}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-purple-400">Rule:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.rule}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-orange-400">Severity:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.severity}
                  </div>
                </div>
              </div>
            );
          } else {
            // Yellow and green highlight tooltip structure
            tooltipContent = (
              <div className="max-w-sm space-y-3">
                <div>
                  <div className="font-semibold text-sm mb-1 text-yellow-400">Category:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.category}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-red-400">Original:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.original}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-green-400">
                    {highlightData.type === 'green' ? 'Suggested:' : 'Improved:'}
                  </div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.improved}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-blue-400">Explanation:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.explanation}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-purple-400">Band Impact:</div>
                  <div className="text-xs text-gray-200">
                    {highlightData.tooltip.bandImpact}
                  </div>
                </div>
              </div>
            );
          }

          result.push(
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <span className={`${className} ${bgColor}`}>
                  {sentence}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-800 text-white p-4 max-w-md">
                {tooltipContent}
              </TooltipContent>
            </Tooltip>
          );
        } else {
          // Non-tooltip highlights (red highlights or highlights without tooltip data)
          result.push(
            <span key={index} className={`${className} ${bgColor}`}>
              {sentence}
            </span>
          );
        }
        
        // Add space after sentence if not last
        if (index < sentences.length - 1) {
          result.push(<span key={`space-${index}`}> </span>);
        }
      } else {
        // No highlight
        result.push(<span key={index}>{sentence}</span>);
        
        // Add space after sentence if not last
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
          onClick={() => context === "essay-grading" ? onNextPractice() : setShowExitDialog(true)}
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


            {/* Score Breakdown */}
            <div className="box border border-gray-300 rounded-lg p-3 h-full flex flex-col bg-white">
              <h2 className="text-lg font-bold mb-3">Score Breakdown</h2>

              <div className="flex flex-col justify-between flex-1 gap-3">
                {/* Task Response */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Task Response</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[18px]">
                    <div className="bg-[#44b9b0] h-[18px] rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                {/* Coherence & Cohesion */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Coherence & Cohesion</span>
                    <span className="text-[#44b9b0] font-bold">8.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[18px]">
                    <div className="bg-[#44b9b0] h-[18px] rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                {/* Lexical Resource */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Lexical Resource</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[18px]">
                    <div className="bg-[#44b9b0] h-[18px] rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                {/* Grammatical Range & Accuracy */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Grammatical Range & Accuracy</span>
                    <span className="text-[#44b9b0] font-bold">7.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[18px]">
                    <div className="bg-[#44b9b0] h-[18px] rounded-full" style={{ width: '70%' }}></div>
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
            <div className="box border border-gray-300 rounded-lg bg-white p-4 h-auto">
              <h2 className="text-xl font-bold mt-0 mb-2">Overall Assessment:</h2>
              <div className="overflow-y-auto h-64 custom-scrollbar pr-1">
                <Accordion type="single" collapsible className="w-full space-y-1">
                  <AccordionItem value="summary" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100">
                      <span className="text-gray-800">Summary</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        This essay effectively addresses the prompt, presenting both views and a clear, well-supported opinion. The lexical resource and grammatical range and accuracy are strong, demonstrating good control over language. However, the most significant limitation is the complete lack of paragraphing. Presenting the entire essay as a single block of text severely impacts the Coherence and Cohesion score, making the logical progression harder for the reader to follow, despite the ideas being logically ordered.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="specific-suggestions" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-orange-50 to-transparent hover:from-orange-100">
                      <span className="text-gray-800">Specific Suggestions</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <ul className="text-gray-700 leading-relaxed space-y-1 text-sm">
                        <li>• The absolute top priority for improvement is to format the essay into clear, distinct paragraphs. This is fundamental for IELTS writing.</li>
                        <li>• Practice paragraphing: write topic sentences for each body paragraph that clearly state its main idea.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  

                  

                  <AccordionItem value="next-steps" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline bg-gradient-to-r from-green-50 to-transparent hover:from-green-100">
                      <span className="text-gray-800">Next Steps</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <ul className="text-gray-700 leading-relaxed space-y-1 text-sm">
                        <li>• Master Paragraphing: Practice writing essays where you consciously separate your introduction, each body paragraph, and conclusion.</li>
                        <li>• Essay Structure Drills: For future essays, outline your paragraph structure before writing (e.g., Paragraph 1: Intro. Paragraph 2: View 1. Paragraph 3: View 2. Paragraph 4: Opinion/Conclusion).</li>
                        <li>• Review Band Descriptors: Pay close attention to the Coherence and Cohesion band descriptors, specifically how paragraphing impacts clarity and logical progression.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Writing Statistic */}
            <div className="box border border-gray-300 rounded-lg bg-white p-4">
              <h2 className="text-xl font-bold mt-0 mb-2 text-center">Writing Statistic</h2>
              <div className="stat-row flex justify-around mt-2">
                <div className="text-center">
                  <div className="stat-label font-bold">Word Count</div>
                  <div className={`stat-value font-bold text-2xl mt-1 ${feedbackData.stats.totalWords < 250 ? 'text-red-500' : ''}`}>
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

      {/* Detailed Feedback Section */}
      <div className="container max-w-[1100px] mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>
        
        <Tabs defaultValue="task-response" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 bg-white border border-gray-300 rounded-lg h-12 p-1">
            <TabsTrigger 
              value="task-response" 
              className="data-[state=active]:bg-[#64c4bc] data-[state=active]:text-white data-[state=active]:shadow-sm bg-transparent text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 font-medium text-sm"
            >
              Task Response
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
              value="grammar-accuracy" 
              className="data-[state=active]:bg-[#64c4bc] data-[state=active]:text-white data-[state=active]:shadow-sm bg-transparent text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 font-medium text-sm"
            >
              Grammar & Accuracy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="task-response" className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="space-y-4">
              {/* Feedback Overview */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-600">Feedback</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The essay addresses all parts of the prompt, discussing both views and providing a clear opinion. The arguments for both sides are relevant and supported with valid points and examples (e.g., "reduce commute times, encourage more people to use public transit, and ultimately reduce traffic congestion and air pollution" for public transport, and "underfunded hospitals and overcrowded schools" for other priorities). The opinion, "governments should strike a balance," is clear and logically supported. However, the essay's presentation as a single continuous paragraph impacts how effectively the position is presented throughout, making it less clear to the reader where one argument ends and another begins.
                </p>
              </div>

              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Clearly addresses all parts of the prompt: discusses both views and states an opinion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Develops relevant and supported arguments for both perspectives, such as "efficient transportation can enhance productivity and improve quality of life for millions."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Provides a nuanced and well-reasoned opinion: "governments should strike a balance."</span>
                  </li>
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-600">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>While content is present, the lack of distinct paragraphs hinders the clear presentation and development of each idea.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>The overall structure, being one long paragraph, makes it less effective in demonstrating full task achievement regarding organization.</span>
                  </li>
                </ul>
              </div>

              {/* Specific Suggestions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-600">Specific Suggestions</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Break the essay into clear, distinct paragraphs: an introduction, a body paragraph for the first view, a body paragraph for the second view, and a conclusion that restates your opinion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>For example, separate the discussion of "Some people argue..." into one paragraph and "On the other hand, others think..." into another.</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="coherence-cohesion" className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="space-y-4">
              {/* Feedback Overview */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-600">Feedback</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The essay presents information and ideas logically to some extent, with a clear progression from discussing the first view, to the second, and then stating an opinion. A range of cohesive devices ('Some people argue that...', 'On the other hand,', 'For instance,', 'In my opinion,', 'Ultimately,') are used appropriately. However, the most significant weakness is the complete lack of paragraphing, as the entire essay is written as one continuous block of text. This severely impedes readability and makes it difficult for the reader to follow the logical flow and distinguish between separate ideas, thereby impacting the overall cohesion and clarity.
                </p>
              </div>

              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Uses appropriate cohesive devices such as 'On the other hand,' and 'In my opinion,' to connect ideas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Ideas progress logically from one viewpoint to the next, then to the personal opinion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Referencing like 'They believe' and 'These people argue' is used correctly.</span>
                  </li>
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-600">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>The complete absence of clear paragraph breaks is a major weakness, making the essay appear as a single block of text.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Despite logical progression of ideas, the lack of physical separation creates a barrier to easy comprehension.</span>
                  </li>
                </ul>
              </div>

              {/* Specific Suggestions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-600">Specific Suggestions</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Crucially, separate your essay into at least four distinct paragraphs: Introduction, Body Paragraph 1 (for the first view), Body Paragraph 2 (for the second view), and Conclusion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Introduce the topic and outline the essay in the first paragraph. Dedicate the second paragraph to the arguments for investing in faster public transportation. The third paragraph should focus on the arguments for other priorities. The final paragraph should present your opinion and a summary.</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lexical-resource" className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="space-y-4">
              {/* Feedback Overview */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-600">Feedback</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The essay demonstrates a good range of vocabulary used flexibly and accurately. There is a sufficient range of less common lexical items, such as "significantly reduce commute times," "enhance productivity," "pressing issues," "underfunded hospitals," "overcrowded schools," "national development," "strike a balance," "allocating resources wisely," and "planning holistically for sustainable development."
                  There are very few minor errors in word choice or form, which do not impede communication. The vocabulary is appropriate for the topic and helps convey the meaning precisely.
                </p>
              </div>

              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Uses a good range of topic-specific vocabulary accurately (e.g., "traffic congestion", "air pollution", "commute times").</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Includes less common lexical items like "enhance productivity" and "strike a balance" effectively.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Vocabulary is precise and contributes to clear meaning.</span>
                  </li>
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-600">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>While generally strong, consider incorporating a wider range of sophisticated synonyms to avoid minor repetitions, though this is not a significant issue here.</span>
                  </li>
                </ul>
              </div>

              {/* Vocabulary Enhancement */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-600">Vocabulary Enhancement</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>"invest" could sometimes be varied with "allocate funds to" or "channel resources into".</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>"basic services" could occasionally be "essential amenities" or "fundamental provisions".</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grammar-accuracy" className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="space-y-4">
              {/* Feedback Overview */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-600">Feedback</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The essay uses a good range of complex sentence structures with a high level of accuracy. Examples include conditional sentences ("In large cities where daily commuting takes hours, efficient transportation can enhance productivity...") and sentences with multiple clauses ("They believe that improving transport speed can significantly reduce commute times, encourage more people to use public transit, and ultimately reduce traffic congestion and air pollution."). There are very few grammatical errors, and punctuation is generally correct. Errors are minor and do not prevent communication.
                </p>
              </div>

              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Demonstrates consistent control over complex sentence structures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>High level of grammatical accuracy with very few errors (e.g., correct use of apostrophe in "government's limited budget").</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Punctuation is largely correct and supports clarity.</span>
                  </li>
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-600">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>No significant grammatical errors to highlight for improvement; maintaining this high level of accuracy is key.</span>
                  </li>
                </ul>
              </div>

              {/* Grammar Focus */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-indigo-600">Grammar Focus</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Continue practicing constructing varied complex and compound sentences to further enhance grammatical range.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Ensure consistent use of parallel structures when listing items (e.g., "reduce commute times, encourage more people to use public transit, and ultimately reduce traffic congestion and air pollution" – this is already well done).</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Question Section */}
      <div className="container max-w-[1100px] mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-4">Question</h2>
        <div className="border border-gray-300 rounded-lg p-6 mb-4 bg-white">
          <div className="font-bold text-sm mb-3" style={{ color: '#1fb2aae6' }}>IELTS Writing Task 2:</div>
          <div className="text-gray-800 text-sm leading-relaxed">
            In recent years, sustainable development has become one of the most critical issues facing governments worldwide. While some people argue that economic growth should be the primary focus, others believe environmental protection must take priority.
            <br /><br />
            Discuss both views and give your own opinion.
          </div>
        </div>
      </div>

      {/* Grammar Checker Section */}
      <div className="container max-w-[1100px] mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-4">Grammar Checker</h2>
        


        
        
        {/* Essay with highlighted sections - display immediately */}
        {highlightEssay(sampleEssay)}



      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          variant="outline" 
          className="flex items-center"
        >
          <Download className="mr-2 h-4 w-4" /> Download Feedback
        </Button>

        {context === "essay-grading" ? (
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={onNextPractice}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            Quay lại Progress Tracking
          </Button>
        ) : (
          <>
            <Button 
              variant="secondary"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={onTryAgain}
            >
              <Pen className="mr-2 h-4 w-4" /> 
              Try Again
            </Button>

            <Button 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={onNextPractice}
            >
              <ArrowRight className="mr-2 h-4 w-4" /> 
              Next Practice
            </Button>
          </>
        )}
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
            <AlertDialogAction onClick={onTryAgain}>
              Thoát
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </TooltipProvider>
  );
}