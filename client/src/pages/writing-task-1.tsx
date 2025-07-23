import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Info } from "lucide-react";

export default function WritingTask1() {
  const [questionType, setQuestionType] = useState("");
  const [bandLevel, setBandLevel] = useState("");
  const [timeLimit, setTimeLimit] = useState("20 minutes");
  const [question, setQuestion] = useState("");
  const [dragActive, setDragActive] = useState(false);

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
      // Handle file upload logic here
      console.log("File dropped:", e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload logic here
      console.log("File selected:", e.target.files[0]);
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
              <SelectValue placeholder="Bar charts" />
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
              <SelectValue placeholder="Band 6.0" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="band-5.0">Band 5.0</SelectItem>
              <SelectItem value="band-6.0">Band 6.0</SelectItem>
              <SelectItem value="band-7.0">Band 7.0</SelectItem>
              <SelectItem value="band-8.0">Band 8.0</SelectItem>
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
          placeholder="- Enter any relevant information related to the topic, question type,... and then use the Generate question button to create a question.
- Enter your own question and select the Using my question button to use your question."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[80px] text-sm text-gray-600"
        />
      </div>

      {/* Image Upload Area */}
      <div className="mb-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
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
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
            <p className="text-gray-600 mb-1">Chọn ảnh biểu đồ hoặc kéo và thả hình ảnh vào đây</p>
            <p className="text-sm text-gray-500">Accepted file types: image. Max file size: 5 MB</p>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          ✨ Generate question
        </Button>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          Use my question
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          🎲 Random question
        </Button>
      </div>

      {/* Time Limit and Start Writing */}
      <div className="flex items-center justify-between">
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Limit (optional)
          </label>
          <Select value={timeLimit} onValueChange={setTimeLimit}>
            <SelectTrigger>
              <SelectValue />
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