import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, HelpCircle, Database, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { TutorialOverlay } from "@/components/ui/tutorial-overlay";
import { useTutorial } from "@/hooks/use-tutorial";
import { ChemicalFlaskLoader } from "@/components/ui/chemical-flask-loader";
import { DrawingCanvas } from "@/components/ui/drawing-canvas";

export default function WritingTask2() {
  const [questionType, setQuestionType] = useState("opinion");
  const [bandLevel, setBandLevel] = useState("6.0");
  const [timeLimit, setTimeLimit] = useState("40 minutes");
  const [question, setQuestion] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<'use-my-question' | 'random-question' | 'generate' | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isStartWritingLoading, setIsStartWritingLoading] = useState(false);
  
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Tutorial state
  const {
    isActive: isTutorialActive,
    currentStep,
    currentStepData,
    totalSteps,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    completeTutorial
  } = useTutorial('task2');

  // Tooltip state for help icons
  const [showBandLevelTooltip, setShowBandLevelTooltip] = useState(false);
  const [showQuestionTypeTooltip, setShowQuestionTypeTooltip] = useState(false);
  const [showEnterQuestionTooltip, setShowEnterQuestionTooltip] = useState(false);
  const [showTimeLimitTooltip, setShowTimeLimitTooltip] = useState(false);

  // Generate random topic based on question type and band level
  const generateRandomTopic = (type: string, level: string) => {
    const topics: Record<string, string[]> = {
      opinion: [
        "Some people believe that social media has had a positive impact on society, while others argue it has been harmful. Discuss both views and give your own opinion.",
        "Many people think that money is the key to happiness. To what extent do you agree or disagree?",
        "Some argue that the government should spend more money on public transportation instead of building new roads. Do you agree or disagree?",
        "It is often said that governments spend too much money on projects to protect wildlife. Do you agree or disagree?",
        "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?"
      ],
      discussion: [
        "Some people prefer to live in a house, while others feel that there are more advantages to living in an apartment. Discuss both views and give your opinion.",
        "Some people think that parents should teach children how to be good members of society. Others believe that schools should take this responsibility. Discuss both views and give your own opinion.",
        "Some people believe that it is best to accept a bad situation, while others feel that you should try to improve such situations. Discuss both views and give your own opinion.",
        "Some people say that the main environmental problem of our time is the loss of particular species of plants and animals. Others say that there are more important environmental problems. Discuss both views and give your own opinion.",
        "Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future. Discuss both views and give your own opinion."
      ],
      "problem-solution": [
        "In many countries, the amount of crime is increasing. What do you think are the main causes of crime? How can we deal with those causes?",
        "Many working people get little or no exercise either during the working day or in their free time, and have health problems as a result. Why do many working people not get enough exercise? What can be done about this problem?",
        "Despite a large number of gyms, a sedentary lifestyle is gaining popularity in the contemporary world. What problems are associated with this? What solutions can you suggest?",
        "The number of people who are at risk of serious health problems due to being overweight is increasing. What is the reason for the growth in overweight people in society? How can this problem be solved?",
        "In some areas of the US, a 'curfew' is imposed, in which teenagers are not allowed to be out of doors after a particular time at night unless they are accompanied by an adult. What are the advantages and disadvantages of this?"
      ],
      "advantage-disadvantage": [
        "Some experts believe that it is better for children to begin learning a foreign language at primary school rather than secondary school. Do the advantages of this outweigh the disadvantages?",
        "In a number of countries, some people think it is necessary to spend large sums of money on constructing new railway lines for very fast trains between cities. Others believe the money should be spent on improving existing public transport. What are the advantages and disadvantages of new railway lines?",
        "Some people say that now we can see films on our phones or tablets there is no need to go to the cinema. Others say that to be fully enjoyed, films need to be seen in a cinema. What are the advantages and disadvantages of each view?",
        "More and more people are using computers and electric devices to access information, so there is no need for printed books, magazines and newspapers on paper. To what extent do you agree or disagree?",
        "Some people believe that allowing children to make their own choices on everyday matters is likely to result in a society of individuals who only think about their own wishes. Others believe that it is important for children to make decisions about matters that affect them. What are the advantages and disadvantages of each approach?"
      ],
      "two-part-question": [
        "Nowadays many people choose to be self-employed, rather than to work for a company or organisation. Why might this be the case? What could be the disadvantages of being self-employed?",
        "In some cultures, children are often told that they can achieve anything if they try hard enough. What are the advantages and disadvantages of giving children this message?",
        "In many countries, paying for things using mobile phone apps is becoming increasingly common. Why is this happening? Is this a positive or negative development?",
        "In recent years, more and more people are choosing to read e-books rather than paper books. Why is this happening? Is this a positive or negative trend?",
        "Many museums charge for admission while others are free. Do you think the advantages of charging people for admission to museums outweigh the disadvantages?"
      ]
    };

    const typeTopics = topics[type] || topics.opinion;
    return typeTopics[Math.floor(Math.random() * typeTopics.length)];
  };

  // Button handler functions
  const handleUseMyQuestion = () => {
    // Check if question text is provided
    if (!question.trim()) {
      setErrorMessage('Please enter your question before clicking the "Use my question" button.');
      return;
    }

    // Check word count
    const wordCount = question.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 15) {
      setErrorMessage('Please enter a longer question (at least 15 words) before clicking the "Use my question" button.');
      return;
    }

    setErrorMessage("");
    setLoadingAction('use-my-question');
    setIsLoading(true);
  };

  const handleCompleteUseMyQuestion = () => {
    setPreviewQuestion(question);
    setShowPreview(true);
    setIsLoading(false);
  };

  const handleRandomQuestion = () => {
    setErrorMessage("");
    setLoadingAction('random-question');
    setIsLoading(true);
  };

  const handleCompleteRandomQuestion = () => {
    const randomTopic = generateRandomTopic(questionType, bandLevel);
    setQuestion(randomTopic);
    setPreviewQuestion(randomTopic);
    setShowPreview(true);
    setIsLoading(false);
  };

  const handleGenerateQuestion = () => {
    setErrorMessage("");
    setLoadingAction('generate');
    setIsLoading(true);
  };

  const handleCompleteGenerate = () => {
    const generatedTopic = generateRandomTopic(questionType, bandLevel);
    setQuestion(generatedTopic);
    setPreviewQuestion(generatedTopic);
    setShowPreview(true);
    setIsLoading(false);
  };

  const handleStartWriting = () => {
    if (!question.trim()) {
      setErrorMessage("Please enter a question or generate one before starting.");
      return;
    }

    // Save configuration to session storage for the practice page
    const config = {
      taskType: 'task2',
      questionType,
      bandLevel,
      timeLimit,
      question: previewQuestion || question,
      timestamp: Date.now()
    };

    sessionStorage.setItem('writingTask2Config', JSON.stringify(config));

    // Start 40-second loading process
    setIsStartWritingLoading(true);
  };

  const handleStartWritingComplete = () => {
    // Navigate to the practice page after loading completes
    setLocation("/writing-task-2/practice");
  };

  const handleStartTutorial = () => {
    startTutorial();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                IELTS Writing Task 2 Practice
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Practice essay writing with AI-powered feedback and band score analysis
              </CardDescription>
            </div>
            <Button 
              onClick={handleStartTutorial}
              variant="outline" 
              className="border-[#1fb2aa] text-[#1fb2aa] hover:bg-[#1fb2aa] hover:text-white transition-all duration-200"
              data-testid="button-help-tutorial"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Tutorial
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Type and Band Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  Select Question Type
                  <Tooltip open={showQuestionTypeTooltip} onOpenChange={setShowQuestionTypeTooltip}>
                    <TooltipTrigger asChild>
                      <button
                        className="inline-flex ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowQuestionTypeTooltip(!showQuestionTypeTooltip);
                        }}
                      >
                        <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488] transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm p-4 bg-white border-2 border-[#1fb2aa] shadow-lg rounded-lg">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Question Types</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li><strong>Opinion:</strong> Give your opinion on a topic</li>
                          <li><strong>Discussion:</strong> Discuss both sides of an argument</li>
                          <li><strong>Problem-Solution:</strong> Identify problems and suggest solutions</li>
                          <li><strong>Advantage-Disadvantage:</strong> Discuss pros and cons</li>
                          <li><strong>Two-Part Question:</strong> Answer two related questions</li>
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </span>
              </label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger data-testid="select-question-type">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opinion">Opinion</SelectItem>
                  <SelectItem value="discussion">Discussion</SelectItem>
                  <SelectItem value="problem-solution">Problem-Solution</SelectItem>
                  <SelectItem value="advantage-disadvantage">Advantage-Disadvantage</SelectItem>
                  <SelectItem value="two-part-question">Two-Part Question</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  Band Level
                  <Tooltip open={showBandLevelTooltip} onOpenChange={setShowBandLevelTooltip}>
                    <TooltipTrigger asChild>
                      <button
                        className="inline-flex ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowBandLevelTooltip(!showBandLevelTooltip);
                        }}
                      >
                        <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488] transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm p-4 bg-white border-2 border-[#1fb2aa] shadow-lg rounded-lg">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">IELTS Band Levels</h4>
                        <p className="text-sm text-gray-600">Select your target band score to get appropriate feedback and vocabulary suggestions.</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li><strong>5.0-5.5:</strong> Basic level</li>
                          <li><strong>6.0-6.5:</strong> Competent level</li>
                          <li><strong>7.0-7.5:</strong> Good level</li>
                          <li><strong>8.0-8.5:</strong> Very good level</li>
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </span>
              </label>
              <Select value={bandLevel} onValueChange={setBandLevel}>
                <SelectTrigger data-testid="select-band-level">
                  <SelectValue placeholder="Select band level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5.0">Band 5.0</SelectItem>
                  <SelectItem value="5.5">Band 5.5</SelectItem>
                  <SelectItem value="6.0">Band 6.0</SelectItem>
                  <SelectItem value="6.5">Band 6.5</SelectItem>
                  <SelectItem value="7.0">Band 7.0</SelectItem>
                  <SelectItem value="7.5">Band 7.5</SelectItem>
                  <SelectItem value="8.0">Band 8.0</SelectItem>
                  <SelectItem value="8.5">Band 8.5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Enter Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                Enter Question
                <Tooltip open={showEnterQuestionTooltip} onOpenChange={setShowEnterQuestionTooltip}>
                  <TooltipTrigger asChild>
                    <button
                      className="inline-flex ml-1 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowEnterQuestionTooltip(!showEnterQuestionTooltip);
                      }}
                    >
                      <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488] transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white border-2 border-[#1fb2aa] shadow-lg rounded-lg">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">How to Use</h4>
                      <p className="text-sm text-gray-600">
                        You can either enter your own essay question here or use the buttons below to generate one automatically.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </span>
            </label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your Task 2 essay question here, or use the buttons below to generate one..."
              className="min-h-[120px] resize-none"
              data-testid="topic-question-area"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-all duration-200 min-w-[140px] h-10"
              onClick={handleGenerateQuestion}
              data-testid="button-generate-question"
            >
              <Database className="w-4 h-4 mr-2" />
              Generate Question
            </Button>
            <Button 
              className="bg-[#1fb2aa] hover:bg-[#0d9488] text-white transition-all duration-200 min-w-[140px] h-10"
              onClick={handleUseMyQuestion}
              data-testid="button-use-my-question"
            >
              Use My Question
            </Button>
            <Button 
              className="bg-[#EA580C] hover:bg-[#dc2626] text-white transition-all duration-200 min-w-[140px] h-10"
              onClick={handleRandomQuestion}
              data-testid="button-random-question"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Random Question
            </Button>
          </div>

          {/* Chemical Flask Loader */}
          <ChemicalFlaskLoader 
            isVisible={isLoading} 
            onComplete={() => {
              if (loadingAction === 'use-my-question') {
                handleCompleteUseMyQuestion();
              } else if (loadingAction === 'random-question') {
                handleCompleteRandomQuestion();
              } else if (loadingAction === 'generate') {
                handleCompleteGenerate();
              }
              setLoadingAction(null);
            }}
          />
          
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {errorMessage}
              </p>
            </div>
          )}
          
          {/* Question Preview */}
          {showPreview && (
            <div className="mb-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                <div className="p-6 border-2 border-teal-200 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50">
                  <div className="font-bold text-sm mb-3 text-[#0f766e]">IELTS Writing Task 2:</div>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {previewQuestion}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Time Limit and Start Writing */}
          <div className="flex items-center justify-between">
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  Time Limit (optional)
                  <Tooltip open={showTimeLimitTooltip} onOpenChange={setShowTimeLimitTooltip}>
                    <TooltipTrigger asChild>
                      <button
                        className="inline-flex ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowTimeLimitTooltip(!showTimeLimitTooltip);
                        }}
                      >
                        <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488] transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm p-4 bg-white border-2 border-[#1fb2aa] shadow-lg rounded-lg">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Time Limit Guide</h4>
                        <p className="text-sm text-gray-600">Set a time limit to practice under exam conditions. For IELTS Task 2, the recommended time is 40 minutes.</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </span>
              </label>
              <Select value={timeLimit} onValueChange={setTimeLimit}>
                <SelectTrigger data-testid="select-time-limit">
                  <SelectValue placeholder="Select time limit">
                    {timeLimit === "20 minutes" && "20 minutes"}
                    {timeLimit === "30 minutes" && "30 minutes"}
                    {timeLimit === "40 minutes" && "40 minutes"}
                    {timeLimit === "60 minutes" && "60 minutes"}
                    {timeLimit === "no-limit" && "No limit"}
                    {!timeLimit && "Select time limit"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20 minutes">20 minutes</SelectItem>
                  <SelectItem value="30 minutes">30 minutes</SelectItem>
                  <SelectItem value="40 minutes">40 minutes</SelectItem>
                  <SelectItem value="60 minutes">60 minutes</SelectItem>
                  <SelectItem value="no-limit">No limit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="bg-[#1fb2aa] hover:bg-[#0d9488] text-white px-8 transition-all duration-200"
              onClick={handleStartWriting}
              data-testid="button-start-writing"
            >
              Start Writing
            </Button>
          </div>
          
          {/* Start Writing Full-Page Loading Screen */}
          {isStartWritingLoading && (
            <div className="fixed inset-0 bg-gradient-to-br from-white to-gray-50 z-50 animate-in fade-in duration-700">
              {/* Drawing Canvas - Behind main content */}
              <DrawingCanvas 
                isActive={isStartWritingLoading}
                onClear={handleStartWritingComplete}
              />
              
              {/* Drawing instruction hint */}
              <div className="absolute top-6 right-6 z-20 animate-in fade-in duration-1000 delay-1000 pointer-events-none">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200 animate-pulse">
                  <p className="text-sm text-gray-600 font-medium">Draw while you wait ✏️</p>
                </div>
              </div>

              {/* Main loading content - Above canvas */}
              <div className="relative z-10 flex items-center justify-center h-full pointer-events-none">
                <div className="text-center animate-in slide-in-from-bottom-4 duration-700 delay-150">
                  <h1 className="text-4xl font-bold text-gray-900 mb-12 tracking-tight">
                    Preparing your writing environment...
                  </h1>
                  <ChemicalFlaskLoader 
                    isVisible={true}
                    onComplete={handleStartWritingComplete}
                    duration={40}
                    messages={[
                      "Setting up your writing workspace...",
                      "Loading question analysis tools...",
                      "Preparing writing templates and guides...",
                      "Calibrating timer and assessment tools...",
                      "Optimizing your practice environment...",
                      "Almost ready to begin writing..."
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tutorial Overlay */}
          <TutorialOverlay
            isActive={isTutorialActive}
            currentStep={currentStepData}
            currentStepIndex={currentStep}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={skipTutorial}
            onComplete={completeTutorial}
          />
        </CardContent>
      </Card>
    </div>
  );
}