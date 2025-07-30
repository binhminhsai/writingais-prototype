import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Image
} from "lucide-react";
import { FeedbackInterface } from "@/components/writing-practice/feedback-interface";

const essayFormSchema = z.object({
  taskType: z.enum(["task1", "task2"]),
  question: z.string().refine(
    (val) => val.trim().length >= 10,
    "Vui lòng nhập câu hỏi"
  ),
  chartType: z.string().optional(),
  chartImage: z.any().optional(),
  essay: z.string().refine(
    (val) => val.trim().length > 0,
    "Vui lòng nhập bài luận cần chấm"
  ),
  fileName: z.string().optional(),
});

type EssayForm = z.infer<typeof essayFormSchema>;

export default function EssayGrading() {
  const [currentView, setCurrentView] = useState<"form" | "feedback">("form");
  const [submittedEssay, setSubmittedEssay] = useState<{ question: string; essay: string; taskType: string } | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [taskType, setTaskType] = useState<"task1" | "task2">("task2");
  const [chartImage, setChartImage] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const form = useForm<EssayForm>({
    resolver: zodResolver(essayFormSchema),
    defaultValues: {
      taskType: taskType,
      question: "",
      chartType: "",
      essay: "",
      fileName: "",
    },
  });

  // Simplified submit handler - just go to feedback
  const handleSubmitEssay = async (data: EssayForm) => {
    setIsGrading(true);
    setSubmittedEssay({ question: data.question, essay: data.essay, taskType: data.taskType });
    
    // Simulate grading time
    setTimeout(() => {
      setIsGrading(false);
      setCurrentView("feedback");
      toast({
        title: "Chấm bài thành công!",
        description: "Bài luận của bạn đã được chấm điểm và đưa ra nhận xét chi tiết.",
      });
    }, 3000);
  };

  // Functions for feedback interface
  const handleTryAgain = () => {
    setCurrentView("form");
    setSubmittedEssay(null);
    setChartImage(null);
    form.reset({
      taskType: taskType,
      question: "",
      chartType: "",
      essay: "",
      fileName: "",
    });
  };

  const handleNextPractice = () => {
    setCurrentView("form");
    setSubmittedEssay(null);
    setChartImage(null);
    form.reset({
      taskType: taskType,
      question: "",
      chartType: "",
      essay: "",
      fileName: "",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        form.setValue("fileName", file.name);
        toast({
          title: "File uploaded",
          description: `File ${file.name} đã được tải lên thành công.`,
        });
      } else {
        toast({
          title: "File không hợp lệ",
          description: "Chỉ chấp nhận file PDF hoặc Word (.docx).",
          variant: "destructive",
        });
      }
    }
  };

  // Chart image upload handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setChartImage(file);
      form.setValue("chartImage", file);
      toast({
        title: "Chart uploaded successfully",
        description: `Chart "${file.name}" has been uploaded.`,
      });
    }
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
      if (file.type.startsWith("image/")) {
        setChartImage(file);
        form.setValue("chartImage", file);
        toast({
          title: "Chart uploaded successfully",
          description: `Chart "${file.name}" has been uploaded.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file for the chart.",
          variant: "destructive",
        });
      }
    }
  };

  const handleTaskTypeChange = (newTaskType: "task1" | "task2") => {
    setTaskType(newTaskType);
    form.setValue("taskType", newTaskType);
    form.reset({
      taskType: newTaskType,
      question: "",
      chartType: "",
      essay: "",
      fileName: "",
    });
    setChartImage(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {currentView === "form" && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="task-type" className="text-white/90 font-medium mb-3 block text-base">
                      📝 Chọn loại bài thi IELTS Writing
                    </Label>
                    <Select value={taskType} onValueChange={handleTaskTypeChange}>
                      <SelectTrigger className="bg-white/95 border-white/20 text-gray-800 font-medium shadow-lg">
                        <SelectValue>
                          {taskType === "task1" && "📊 Chấm điểm IELTS Writing Task 1"}
                          {taskType === "task2" && "✍️ Chấm điểm IELTS Writing Task 2"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="task1">📊 Chấm điểm IELTS Writing Task 1</SelectItem>
                        <SelectItem value="task2">✍️ Chấm điểm IELTS Writing Task 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <form onSubmit={form.handleSubmit(handleSubmitEssay)} className="space-y-8">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                    <Label htmlFor="question" className="text-gray-700 font-semibold mb-3 block text-base flex items-center gap-2">
                      ❓ Câu hỏi đề bài
                    </Label>
                    <Textarea
                      id="question"
                      placeholder={taskType === "task1" ? "Nhập câu hỏi IELTS Writing Task 1..." : "Nhập câu hỏi IELTS Writing Task 2..."}
                      className="min-h-[100px] text-sm border-0 bg-white/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg resize-none"
                      {...form.register("question")}
                    />
                    {form.formState.errors.question && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        ⚠️ {form.formState.errors.question.message}
                      </p>
                    )}
                  </div>

                  {taskType === "task1" && (
                    <>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 shadow-sm">
                        <Label htmlFor="chart-type" className="text-gray-700 font-semibold mb-3 block text-base flex items-center gap-2">
                          📊 Loại biểu đồ
                        </Label>
                        <Select onValueChange={(value) => form.setValue("chartType", value)}>
                          <SelectTrigger className="border-0 bg-white/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-lg">
                            <SelectValue placeholder="Chọn loại biểu đồ..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="line-graph">📈 Line Graph</SelectItem>
                            <SelectItem value="bar-chart">📊 Bar Chart</SelectItem>
                            <SelectItem value="pie-chart">🥧 Pie Chart</SelectItem>
                            <SelectItem value="process-diagram">🔄 Process Diagram</SelectItem>
                            <SelectItem value="table">📋 Table</SelectItem>
                            <SelectItem value="map">🗺️ Map</SelectItem>
                            <SelectItem value="multiple-graphs">📈📊 Multiple Graphs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100 shadow-sm">
                        <Label className="text-gray-700 font-semibold mb-3 block text-base flex items-center gap-2">
                          🖼️ Tải ảnh biểu đồ
                        </Label>
                        <div
                          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                            dragActive
                              ? "border-amber-400 bg-amber-100/50 scale-105"
                              : chartImage
                              ? "border-green-400 bg-green-100/50"
                              : "border-amber-300 hover:border-amber-400 hover:bg-amber-50/50"
                          }`}
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        >
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="space-y-3">
                            <div className="w-16 h-16 mx-auto bg-white/70 rounded-full flex items-center justify-center shadow-lg">
                              <Image className="h-8 w-8 text-amber-600" />
                            </div>
                            {chartImage ? (
                              <div>
                                <p className="text-green-700 font-semibold text-base">
                                  ✅ {chartImage.name}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  Click để thay đổi hoặc kéo ảnh mới vào đây
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p className="text-gray-700 font-medium">
                                  Chọn ảnh biểu đồ hoặc kéo vào đây
                                </p>
                                <p className="text-gray-500 text-sm">
                                  Hỗ trợ: JPG, PNG, GIF • Tối đa 5 MB
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100 shadow-sm">
                    <Label htmlFor="essay" className="text-gray-700 font-semibold mb-3 block text-base flex items-center gap-2">
                      ✍️ Bài luận
                    </Label>
                    <Textarea
                      id="essay"
                      placeholder={taskType === "task1" 
                        ? "Nhập bài luận của bạn (tối thiểu 150 từ)..." 
                        : "Nhập bài luận của bạn (tối thiểu 250 từ)..."
                      }
                      className="min-h-[250px] text-sm border-0 bg-white/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg resize-none"
                      {...form.register("essay")}
                    />
                    {form.formState.errors.essay && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        ⚠️ {form.formState.errors.essay.message}
                      </p>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
                    <Label htmlFor="file" className="text-gray-700 font-semibold mb-3 block text-base flex items-center gap-2">
                      📎 Hoặc tải file Word/PDF
                    </Label>
                    <div className="space-y-3">
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full text-sm bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:bg-white hover:shadow-xl transition-all duration-300 rounded-lg py-3"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        <Upload className="h-5 w-5 mr-2 text-indigo-600" />
                        <span className="font-medium">Gửi file Word/PDF</span>
                      </Button>
                      {form.watch("fileName") && (
                        <div className="p-3 bg-green-100/80 backdrop-blur-sm rounded-lg border border-green-200">
                          <p className="text-green-700 font-medium flex items-center gap-2">
                            ✅ File đã chọn: {form.watch("fileName")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isGrading && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200 shadow-lg">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <BarChart3 className="h-10 w-10 text-white animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">🔍 Đang phân tích bài luận...</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Hệ thống AI đang đánh giá bài viết của bạn theo tiêu chuẩn IELTS với 4 tiêu chí chính
                        </p>
                        <Progress value={66} className="w-full max-w-sm mx-auto h-3 bg-white/50" />
                        <p className="text-sm text-gray-500">Ước tính thời gian: 2-3 phút</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                      disabled={isGrading}
                      size="lg"
                    >
                      {isGrading ? (
                        <>
                          <Clock className="h-5 w-5 mr-3 animate-spin" />
                          Đang chấm bài...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5 mr-3" />
                          🚀 Bắt đầu chấm bài
                        </>
                      )}
                    </Button>
                  </div>
            </form>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === "feedback" && submittedEssay && (
          <FeedbackInterface
            essayContent={submittedEssay.essay}
            onTryAgain={handleTryAgain}
            onNextPractice={handleNextPractice}
            context="essay-grading"
          />
        )}
      </div>
    </main>
  );
}