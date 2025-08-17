import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Upload, Info, Shuffle, HelpCircle, Database, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { ChemicalFlaskLoader } from "@/components/ui/chemical-flask-loader";
import { useTutorial } from "@/hooks/use-tutorial";
import { TutorialOverlay } from "@/components/ui/tutorial-overlay";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

// Chart component for Task 1 preview
function Task1PreviewChart() {
  const chartData = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015'],
    datasets: [
      {
        label: 'Mathematics (Male)',
        data: [65, 68, 72, 75, 78, 82],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Mathematics (Female)',
        data: [62, 66, 70, 74, 77, 80],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Science (Male)',
        data: [58, 61, 65, 68, 71, 75],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Science (Female)',
        data: [55, 59, 63, 66, 69, 73],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.1,
      },
      {
        label: 'English (Male)',
        data: [72, 74, 76, 78, 80, 83],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'High School Competency Exam Pass Rates by Subject and Gender (2010-2015)',
        font: {
          size: 12
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            size: 10
          }
        },
        title: {
          display: true,
          text: 'Pass Rate (%)',
          font: {
            size: 11
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        },
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 11
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 shadow-sm" style={{ height: '300px', padding: '16px' }}>
      <div style={{ height: '268px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default function WritingTask1() {
  const [questionType, setQuestionType] = useState("line-graph");
  const [bandLevel, setBandLevel] = useState("6.0");
  const [timeLimit, setTimeLimit] = useState("20 minutes");
  const [question, setQuestion] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [hasGeneratedChart, setHasGeneratedChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<'use-my-question' | 'random-question' | 'random-button' | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  
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
  } = useTutorial();

  // Tooltip state for help icons
  const [showBandLevelTooltip, setShowBandLevelTooltip] = useState(false);
  const [showQuestionTypeTooltip, setShowQuestionTypeTooltip] = useState(false);
  const [showEnterQuestionTooltip, setShowEnterQuestionTooltip] = useState(false);
  const [showUploadImageTooltip, setShowUploadImageTooltip] = useState(false);
  const [showTimeLimitTooltip, setShowTimeLimitTooltip] = useState(false);



  // Button handler functions
  const handleUseMyQuestion = () => {
    // Check if both question text and image are provided
    if (!question.trim() || !uploadedImage) {
      setErrorMessage('Please enter your question and upload an image of the task before clicking the "Use my question" button.');
      return;
    }
    
    setErrorMessage("");
    setLoadingAction('use-my-question');
    setIsLoading(true);
  };

  const handleCompleteUseMyQuestion = () => {
    setPreviewQuestion(`**IELTS Writing Task 1:** ${question.trim()}`);
    setShowPreview(true);
    setHasGeneratedChart(false); // This is from user input, not generated
    setIsLoading(false);
  };

  const handleRandomQuestion = () => {
    setErrorMessage("");
    setLoadingAction('random-question');
    setIsLoading(true);
  };

  const handleRandomButton = () => {
    setErrorMessage("");
    setLoadingAction('random-button');
    setIsLoading(true);
  };

  const handleCompleteRandomQuestion = () => {
    const randomQuestions = [
      "The diagram below shows the process of making soft cheese. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The bar chart below shows the percentage of students who passed their high school competency exams, by subject and gender, during the period 2010-2015. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The line graph below shows the consumption of fish and some different kinds of meat in a European country between 1979 and 2004. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The table below shows the percentage of mobile phone owners using various mobile phone features. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The pie charts below show the comparison of different kinds of energy production of France in two years. Summarise the information by selecting and reporting the main features and make comparisons where relevant."
    ];
    
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    const selectedQuestion = randomQuestions[randomIndex];
    
    // DO NOT fill the question into the textarea - keep it empty for user input
    // Only set the preview question and display the chart
    setPreviewQuestion(`**IELTS Writing Task 1:** ${selectedQuestion}`);
    setShowPreview(true);
    setHasGeneratedChart(true);
    setIsLoading(false);
    
    // DO NOT set uploadedImage - keep upload box in default state
    
    toast({
      title: "Question and chart generated",
      description: "Random Task 1 question with corresponding chart is ready for practice.",
    });
  };

  const handleCompleteRandomButton = () => {
    const randomQuestions = [
      "The diagram below shows the process of making soft cheese. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The bar chart below shows the percentage of students who passed their high school competency exams, by subject and gender, during the period 2010-2015. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The line graph below shows the consumption of fish and some different kinds of meat in a European country between 1979 and 2004. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The table below shows the percentage of mobile phone owners using various mobile phone features. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The pie charts below show the comparison of different kinds of energy production of France in two years. Summarise the information by selecting and reporting the main features and make comparisons where relevant."
    ];
    
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    const selectedQuestion = randomQuestions[randomIndex];
    
    setPreviewQuestion(`**IELTS Writing Task 1:** ${selectedQuestion}`);
    setShowPreview(true);
    setHasGeneratedChart(true);
    setIsLoading(false);
    
    toast({
      title: "Random question generated",
      description: "Random Task 1 question with corresponding chart is ready for practice.",
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedImage(file);
        toast({
          title: "Image uploaded successfully",
          description: `${file.name} has been uploaded.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedImage(file);
        toast({
          title: "Image uploaded successfully",
          description: `${file.name} has been uploaded.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleStartWriting = () => {
    // Check if we have a valid preview with either uploaded image or generated chart
    if (!showPreview || !previewQuestion.trim() || (!uploadedImage && !hasGeneratedChart)) {
      toast({
        title: "Required fields missing",
        description: "Please enter your Task 1 question and either upload an image or generate a random question with chart.",
        variant: "destructive",
      });
      return;
    }

    // Save configuration to sessionStorage
    const config = {
      question: previewQuestion,
      questionType: questionType || "general",
      bandLevel: bandLevel || "6.0",
      timeLimit: timeLimit,
      hasGeneratedChart: hasGeneratedChart
    };
    
    sessionStorage.setItem('task1WritingConfig', JSON.stringify(config));
    
    // Navigate to writing interface
    setLocation('/writing-task-1/practice');
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header with Tutorial Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">IELTS Writing Task 1 Practice</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={startTutorial}
          className="text-[#1fb2aa] border-[#1fb2aa] hover:bg-[#1fb2aa] hover:text-white transition-all duration-200"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Help & Tutorial
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Select Question Type */}
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
                    <h4 className="font-semibold text-gray-900">Select Question Type</h4>
                    <p className="text-sm text-gray-600">
                      Choose the type of chart or diagram you want to practice with. Different types require different writing approaches.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </span>
          </label>
          <Select value={questionType} onValueChange={setQuestionType}>
            <SelectTrigger className="w-full" data-testid="select-question-type">
              <SelectValue placeholder="Select question type">
                {questionType === "line-graph" && "Line Graph"}
                {questionType === "bar-chart" && "Bar Chart"}
                {questionType === "pie-chart" && "Pie Chart"}
                {questionType === "process-diagram" && "Process Diagram"}
                {questionType === "table" && "Table"}
                {questionType === "map" && "Map"}
                {questionType === "multiple-graphs" && "Multiple Graphs"}
                {!questionType && "Select question type"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line-graph">Line Graph</SelectItem>
              <SelectItem value="bar-chart">Bar Chart</SelectItem>
              <SelectItem value="pie-chart">Pie Chart</SelectItem>
              <SelectItem value="process-diagram">Process Diagram</SelectItem>
              <SelectItem value="table">Table</SelectItem>
              <SelectItem value="map">Map</SelectItem>
              <SelectItem value="multiple-graphs">Multiple Graphs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Band Level */}
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
                  <h4 className="font-semibold text-gray-900">Band Level Guide</h4>
                  <p className="text-sm text-gray-600">
                    Choose the band level you aim for. We'll tailor vocabulary and writing guidance to match that level.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            </span>
          </label>
          <Select value={bandLevel} onValueChange={setBandLevel}>
            <SelectTrigger className="w-full" data-testid="select-band-level">
              <SelectValue placeholder="Select band level">
                {bandLevel === "5.0" && "Band 5.0"}
                {bandLevel === "5.5" && "Band 5.5"}
                {bandLevel === "6.0" && "Band 6.0"}
                {bandLevel === "6.5" && "Band 6.5"}
                {bandLevel === "7.0" && "Band 7.0"}
                {bandLevel === "7.5" && "Band 7.5"}
                {bandLevel === "8.0" && "Band 8.0"}
                {bandLevel === "8.5" && "Band 8.5"}
                {!bandLevel && "Select band level"}
              </SelectValue>
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
      {/* Topic/Question */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="flex items-center">
            Enter Your Question
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
                <h4 className="font-semibold text-gray-900">Enter Your Question</h4>
                <p className="text-sm text-gray-600">
                  If you want to use your own question, this is where you enter it. After that, upload an image and select 'Use my question'.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
          </span>
        </label>
        <Textarea
          placeholder="- Select a question type and band level, then click the 'Get question' button to get your question.
- Enter your own question and upload an image of the task (chart, graph, table, etc.), then click the 'Use my question' button to continue."
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            // If user manually edits the question, reset generated chart state
            if (hasGeneratedChart && e.target.value !== question) {
              setHasGeneratedChart(false);
              setShowPreview(false);
            }
          }}
          className="h-[110px] text-sm text-gray-600 resize-none overflow-hidden"
          data-testid="textarea-question"
        />
      </div>
      {/* Upload Image */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="flex items-center">
            Upload Image
            <Tooltip open={showUploadImageTooltip} onOpenChange={setShowUploadImageTooltip}>
              <TooltipTrigger asChild>
                <button
                  className="inline-flex ml-1 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUploadImageTooltip(!showUploadImageTooltip);
                  }}
                >
                  <HelpCircle className="h-4 w-4 text-[#1fb2aa] hover:text-[#0d9488] transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm p-4 bg-white border-2 border-[#1fb2aa] shadow-lg rounded-lg">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Upload Image</h4>
                  <p className="text-sm text-gray-600">
                    If you want to use your own question, upload the corresponding image (line graph, pie chart, table,…) here before proceeding.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </span>
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
            dragActive ? "border-blue-400 bg-blue-50" : uploadedImage ? "border-green-400 bg-green-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          data-testid="upload-image-area"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            {uploadedImage ? (
              <div className="flex items-center justify-center gap-3">
                <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div className="text-center">
                  <p className="text-green-700 font-medium">Image uploaded: {uploadedImage.name}</p>
                  <p className="text-sm text-green-600">Click to change or drag another image</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Upload className="h-5 w-5 text-gray-400" />
                <p className="text-gray-500 text-sm">Accepted file types: PNG, JPG. Maximum size: 5 MB</p>
              </div>
            )}
          </label>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-all duration-200 min-w-[140px] h-10"
          onClick={handleRandomQuestion}
          data-testid="button-generate-question"
        >
          <Database className="w-4 h-4 mr-2" />
          Get question
        </Button>
        <Button 
          className="bg-[#1fb2aa] hover:bg-[#0d9488] text-white transition-all duration-200 min-w-[140px] h-10"
          onClick={handleUseMyQuestion}
          data-testid="button-use-my-question"
        >
          Use my question
        </Button>
        <Button 
          className="bg-[#EA580C] hover:bg-[#dc2626] text-white transition-all duration-200 min-w-[140px] h-10"
          onClick={handleRandomButton}
          data-testid="button-random-question"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Random question
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
          } else if (loadingAction === 'random-button') {
            handleCompleteRandomButton();
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
            {/* Question Text */}
            <div className="mb-4 p-6 border-2 border-teal-200 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50">
              <div className="font-bold text-sm mb-3 text-[#0f766e]">IELTS Writing Task 1:</div>
              <p className="text-gray-800 text-sm leading-relaxed">
                {previewQuestion.replace(/^\*\*IELTS Writing Task 1:\*\*\s*/, '').trim()}
              </p>
            </div>
            
            {/* Chart Preview - Only show for generated charts */}
            {hasGeneratedChart && <Task1PreviewChart />}
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
                    <h4 className="font-semibold text-gray-900">Time Limit (Optional)</h4>
                    <p className="text-sm text-gray-600">
                      Set a time limit for your writing practice. In the real IELTS exam, you should have 20 minutes for Task 1.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </span>
          </label>
          <Select value={timeLimit} onValueChange={setTimeLimit}>
            <SelectTrigger data-testid="select-time-limit">
              <SelectValue placeholder="Select time limit">
                {timeLimit === "15 minutes" && "15 minutes"}
                {timeLimit === "20 minutes" && "20 minutes"}
                {timeLimit === "25 minutes" && "25 minutes"}
                {timeLimit === "30 minutes" && "30 minutes"}
                {timeLimit === "no-limit" && "No limit"}
                {!timeLimit && "Select time limit"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15 minutes">15 minutes</SelectItem>
              <SelectItem value="20 minutes">20 minutes</SelectItem>
              <SelectItem value="25 minutes">25 minutes</SelectItem>
              <SelectItem value="30 minutes">30 minutes</SelectItem>
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
      </div>
    </TooltipProvider>
  );
}