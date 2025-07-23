import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Info, Sparkles, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WritingTask1() {
  const [questionType, setQuestionType] = useState("");
  const [bandLevel, setBandLevel] = useState("");
  const [timeLimit, setTimeLimit] = useState("20 minutes");
  const [question, setQuestion] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  
  const { toast } = useToast();



  // Button handler functions
  const handleGenerateQuestion = () => {
    if (!questionType) {
      toast({
        title: "Question Type Required",
        description: "Please select a question type first.",
        variant: "destructive",
      });
      return;
    }
    
    const sampleQuestions = {
      "bar-charts": "The bar chart below shows the percentage of students who passed their high school competency exams, by subject and gender, during the period 2010-2011. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "line-charts": "The line graph below shows the consumption of fish and some different kinds of meat in a European country between 1979 and 2004. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "tables": "The table below shows the percentage of mobile phone owners using various mobile phone features. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "pie-charts": "The pie charts below show the comparison of different kinds of energy production of France in two years. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "process-diagrams": "The diagram below shows the process of making soft cheese. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "maps": "The maps below show the changes in the town of Denham from 1986 to the present day. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "combinations": "The charts below show the proportions of British students at one university in England who were able to speak other languages in addition to English, in 2000 and 2010. Summarise the information by selecting and reporting the main features and make comparisons where relevant."
    };
    
    setPreviewQuestion(`**IELTS Writing Task 1:** ${sampleQuestions[questionType as keyof typeof sampleQuestions]}`);
    setShowPreview(true);
  };

  const handleUseMyQuestion = () => {
    // Check if both question text and image are provided
    if (!question.trim() || !uploadedImage) {
      toast({
        title: "Missing Requirements",
        description: "Please enter your question and upload an image.",
        variant: "destructive",
      });
      return;
    }
    
    setPreviewQuestion(`**IELTS Writing Task 1:** ${question.trim()}`);
    setShowPreview(true);
  };

  const handleRandomQuestion = () => {
    const randomQuestions = [
      "The diagram below shows the process of making soft cheese. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The bar chart below shows the percentage of students who passed their high school competency exams, by subject and gender, during the period 2010-2011. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The line graph below shows the consumption of fish and some different kinds of meat in a European country between 1979 and 2004. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The table below shows the percentage of mobile phone owners using various mobile phone features. Summarise the information by selecting and reporting the main features and make comparisons where relevant.",
      "The pie charts below show the comparison of different kinds of energy production of France in two years. Summarise the information by selecting and reporting the main features and make comparisons where relevant."
    ];
    
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    setPreviewQuestion(`**IELTS Writing Task 1:** ${randomQuestions[randomIndex]}`);
    setShowPreview(true);
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">English Writing Practice</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Select Question Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Question Type
          </label>
          <Select value={questionType} onValueChange={setQuestionType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select question type">
                {questionType === "bar-charts" && "Bar Charts"}
                {questionType === "line-charts" && "Line Charts"}
                {questionType === "tables" && "Tables"}
                {questionType === "pie-charts" && "Pie Charts"}
                {questionType === "process-diagrams" && "Process Diagrams"}
                {questionType === "maps" && "Maps"}
                {questionType === "combinations" && "Combinations"}
                {!questionType && "Select question type"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar-charts">Bar Charts</SelectItem>
              <SelectItem value="line-charts">Line Charts</SelectItem>
              <SelectItem value="tables">Tables</SelectItem>
              <SelectItem value="pie-charts">Pie Charts</SelectItem>
              <SelectItem value="process-diagrams">Process Diagrams</SelectItem>
              <SelectItem value="maps">Maps</SelectItem>
              <SelectItem value="combinations">Combinations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Band Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Band Level
            <Info className="inline-block ml-1 h-4 w-4 text-gray-400" />
          </label>
          <Select value={bandLevel} onValueChange={setBandLevel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select band level">
                {bandLevel === "5.0" && "Band 5.0"}
                {bandLevel === "6.0" && "Band 6.0"}
                {bandLevel === "7.0" && "Band 7.0"}
                {bandLevel === "8.0" && "Band 8.0"}
                {!bandLevel && "Select band level"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5.0">Band 5.0</SelectItem>
              <SelectItem value="6.0">Band 6.0</SelectItem>
              <SelectItem value="7.0">Band 7.0</SelectItem>
              <SelectItem value="8.0">Band 8.0</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Topic/Question */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Topic/Question
        </label>
        <Textarea
          placeholder="Enter your Task 1 question here. Once you've added content, the 'Use my question' button will become available."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[80px] text-sm text-gray-600"
        />
      </div>

      {/* Image Upload Area */}
      <div className="mb-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-400 bg-blue-50" : uploadedImage ? "border-green-400 bg-green-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
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
              <>
                <div className="mx-auto h-8 w-8 bg-green-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-green-700 mb-1 font-medium">Image uploaded: {uploadedImage.name}</p>
                <p className="text-sm text-green-600">Click to change or drag another image</p>
              </>
            ) : (
              <>
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                <p className="text-gray-600 mb-1">Chọn ảnh biểu đồ hoặc kéo và thả hình ảnh vào đây</p>
                <p className="text-sm text-gray-500">Accepted file types: image. Max file size: 5 MB</p>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          className="text-white"
          style={{ backgroundColor: '#4338ca' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3730a3'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
          onClick={handleGenerateQuestion}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate question
        </Button>
        <Button 
          className="text-white"
          style={{ backgroundColor: '#1ca19a' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1ca19a'}
          onClick={handleUseMyQuestion}
        >
          Use my question
        </Button>
        <Button 
          className="text-white"
          style={{ backgroundColor: '#ea580c' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c2410c'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
          onClick={handleRandomQuestion}
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Random question
        </Button>
      </div>

      {/* Question Preview */}
      {showPreview && (
        <div className="mb-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            {/* Question Text */}
            <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-gray-800 leading-relaxed">
                {previewQuestion.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                )}
              </p>
            </div>
            
            {/* Diagram Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center" style={{ height: '300px' }}>
              <div className="text-center">
                <div className="text-6xl text-gray-400 mb-2">✕</div>
                <p className="text-gray-500 text-sm">Diagram/Chart/Table will appear here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Limit and Start Writing */}
      <div className="flex items-center justify-between">
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Limit (optional)
          </label>
          <Select value={timeLimit} onValueChange={setTimeLimit}>
            <SelectTrigger>
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

        <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8">
          Start Writing
        </Button>
      </div>
    </div>
  );
}