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
    <main className="container mx-auto px-4 py-8">
      {currentView === "form" && (
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader className="pb-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="task-type" className="text-sm font-medium mb-2 block">
                  Chọn loại bài thi
                </Label>
                <Select value={taskType} onValueChange={handleTaskTypeChange}>
                  <SelectTrigger>
                    <SelectValue>
                      {taskType === "task1" && "Chấm điểm IELTS Writing Task 1"}
                      {taskType === "task2" && "Chấm điểm IELTS Writing Task 2"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="task1">Chấm điểm IELTS Writing Task 1</SelectItem>
                    <SelectItem value="task2">Chấm điểm IELTS Writing Task 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              

            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <form onSubmit={form.handleSubmit(handleSubmitEssay)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question" className="text-sm font-medium">
                  Câu hỏi đề bài
                </Label>
                <Textarea
                  id="question"
                  placeholder={taskType === "task1" ? "Nhập câu hỏi IELTS Writing Task 1..." : "Nhập câu hỏi IELTS Writing Task 2..."}
                  className="min-h-[80px] sm:min-h-[100px] text-sm"
                  {...form.register("question")}
                />
                {form.formState.errors.question && (
                  <p className="text-xs sm:text-sm text-red-600">
                    {form.formState.errors.question.message}
                  </p>
                )}
              </div>

              {taskType === "task1" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="chart-type" className="text-sm font-medium">
                      Loại biểu đồ
                    </Label>
                    <Select onValueChange={(value) => form.setValue("chartType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại biểu đồ" />
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

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Tải ảnh biểu đồ
                    </Label>
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive
                          ? "border-primary bg-primary/5"
                          : chartImage
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
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
                      <div className="space-y-2">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        {chartImage ? (
                          <div>
                            <p className="text-sm text-green-600 font-medium">
                              ✓ {chartImage.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Click để thay đổi hoặc kéo ảnh mới vào đây
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-gray-600">
                              Chọn ảnh biểu đồ hoặc kéo vào đây
                            </p>
                            <p className="text-xs text-gray-500">
                              Accepted file types: image. Max file size: 5 MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="essay" className="text-sm font-medium">
                  Bài luận
                </Label>
                <Textarea
                  id="essay"
                  placeholder={taskType === "task1" 
                    ? "Nhập bài luận của bạn (tối thiểu 150 từ)..." 
                    : "Nhập bài luận của bạn (tối thiểu 250 từ)..."
                  }
                  className="min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] text-sm"
                  {...form.register("essay")}
                />
                {form.formState.errors.essay && (
                  <p className="text-xs sm:text-sm text-red-600">
                    {form.formState.errors.essay.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="file" className="text-sm font-medium">
                  Hoặc tải file Word/PDF
                </Label>
                <div className="space-y-2">
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
                    className="w-full text-sm"
                    onClick={() => document.getElementById("file")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Gửi file Word/PDF
                  </Button>
                  {form.watch("fileName") && (
                    <p className="text-xs sm:text-sm text-green-600 p-2 bg-green-50 rounded">
                      File đã chọn: {form.watch("fileName")}
                    </p>
                  )}
                </div>
              </div>

              {isGrading && (
                <Card>
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="text-center space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold">Đang phân tích bài luận...</h3>
                      <p className="text-sm text-gray-600">
                        Hệ thống AI đang đánh giá bài viết của bạn theo tiêu chuẩn IELTS
                      </p>
                      <Progress value={66} className="w-full max-w-md mx-auto" />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                type="submit"
                className="w-full mt-6 text-sm sm:text-base"
                disabled={isGrading}
                size="lg"
              >
                {isGrading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Đang chấm bài...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Bắt đầu chấm bài
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {currentView === "feedback" && submittedEssay && (
        <FeedbackInterface
          essayContent={submittedEssay.essay}
          onTryAgain={handleTryAgain}
          onNextPractice={handleNextPractice}
          context="essay-grading"
        />
      )}
    </main>
  );
}