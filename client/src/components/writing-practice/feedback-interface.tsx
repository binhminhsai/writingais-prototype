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

// Enhanced highlighting types
type HighlightType = 'red' | 'yellow' | 'green';

interface HighlightData {
  type: HighlightType;
  tooltip?: {
    category: string;
    original: string;
    improved: string;
    explanation: string;
    bandImpact: string;
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
}

export function FeedbackInterface({
  essayContent,
  onTryAgain,
  onNextPractice,
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
    // Red highlights (errors)
    "They believe that industrial expansion create jobs and generate income, which allow people to meet their basic needs.": {
      type: 'red'
    },
    "These nations has lifted millions of people out of poverty and improved infrastructure substantially.": {
      type: 'red'
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
    
    // Green highlights (good examples)
    "In recent years, sustainable development has become one of the most critical issues facing governments worldwide.": {
      type: 'green'
    },
    "Only through careful planning and responsible policies can societies achieve prosperity without destroying the natural world that supports all life.": {
      type: 'green'
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

        // Add tooltip for yellow highlights
        if (highlightData.type === 'yellow' && highlightData.tooltip) {
          const tooltipContent = (
            <div className="max-w-sm space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1 text-yellow-400">Category:</h4>
                <p className="text-xs text-gray-200">
                  {highlightData.tooltip.category}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 text-red-400">Original:</h4>
                <p className="text-xs text-gray-200">
                  {highlightData.tooltip.original}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 text-green-400">Improved:</h4>
                <p className="text-xs text-gray-200">
                  {highlightData.tooltip.improved}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 text-blue-400">Explanation:</h4>
                <p className="text-xs text-gray-200">
                  {highlightData.tooltip.explanation}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 text-purple-400">Band Impact:</h4>
                <p className="text-xs text-gray-200">
                  {highlightData.tooltip.bandImpact}
                </p>
              </div>
            </div>
          );

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
          // Non-yellow highlights (no tooltip)
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
          <h3 className="text-lg font-semibold mb-2">Interactive Essay Analysis</h3>
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
        <h2 className="text-xl font-semibold mb-2">Your essay has been evaluated based on the IELTS Task 2 criteria!</h2>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-[1100px] mx-auto">
        {/* Left Column */}
        <div className="column flex flex-col gap-4">
            {/* Overall Band Score */}


            {/* Score Breakdown */}
            <div className="box bg-[#FAFAFA] rounded-lg border border-black p-3 h-full flex flex-col">
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
              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>The essay addresses the prompt by discussing both the advantages and disadvantages of economic growth, stating that 'economic development brings undeniable advantages, such as higher employment rates and better infrastructure.'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>The writer presents a clear position, concluding that 'although economic growth improves overall prosperity, its benefits are not equally distributed.'</span>
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
                    <span>Some ideas are not fully developed, such as the mention of 'social problems' without specific examples or elaboration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>The essay could benefit from a more explicit discussion of the extent to which the writer agrees or disagrees with the statement, as it remains somewhat vague.</span>
                  </li>
                </ul>
              </div>

              
            </div>
          </TabsContent>

          <TabsContent value="coherence-cohesion" className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="space-y-4">
              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Clear logical progression with well-organized paragraphs that follow a coherent structure from introduction to conclusion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Effective use of linking words and phrases such as "however," "furthermore," and "in conclusion" to connect ideas.</span>
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
                    <span>Some cohesive devices are overused or repetitive, which can make the writing feel mechanical.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Transitions between some ideas could be smoother to enhance the overall flow of the essay.</span>
                  </li>
                </ul>
              </div>

              
            </div>
          </TabsContent>

          <TabsContent value="lexical-resource" className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="space-y-4">
              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Good range of vocabulary with some sophisticated word choices like "undeniable advantages" and "infrastructure."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Appropriate use of topic-specific vocabulary related to economics and social issues.</span>
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
                    <span>Some word choices could be more precise and academic to enhance the overall lexical sophistication.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Occasional repetition of certain words and phrases that could be varied for better lexical diversity.</span>
                  </li>
                </ul>
              </div>

              
            </div>
          </TabsContent>

          <TabsContent value="grammar-accuracy" className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="space-y-4">
              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Good range of sentence structures including complex sentences with subordinate clauses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Generally accurate grammar with only minor errors that do not impede understanding.</span>
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
                    <span>Some minor grammatical errors in complex sentence constructions that could be refined.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm">•</span>
                    <span>Occasional issues with article usage and preposition selection in advanced structures.</span>
                  </li>
                </ul>
              </div>

              
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Grammar Checker Section */}
      <div className="container max-w-[1100px] mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-4">Grammar Checker</h2>

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

      </div>
    </TooltipProvider>
  );
}