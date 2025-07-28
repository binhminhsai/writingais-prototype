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
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  BarChart3
} from "lucide-react";
import { FeedbackInterface } from "@/components/writing-practice/feedback-interface";

const essayFormSchema = z.object({
  question: z.string().refine(
    (val) => val.trim().length >= 10,
    "Vui lòng nhập câu hỏi IELTS Task 2"
  ),
  essay: z.string().refine(
    (val) => val.trim().length > 0,
    "Vui lòng nhập bài luận cần chấm"
  ),
  fileName: z.string().optional(),
});

type EssayForm = z.infer<typeof essayFormSchema>;

export default function EssayGrading() {
  const [currentView, setCurrentView] = useState<"form" | "feedback">("form");
  const [submittedEssay, setSubmittedEssay] = useState<{ question: string; essay: string } | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const { toast } = useToast();

  const form = useForm<EssayForm>({
    resolver: zodResolver(essayFormSchema),
    defaultValues: {
      question: "",
      essay: "",
      fileName: "",
    },
  });

  // Simplified submit handler - just go to feedback
  const handleSubmitEssay = async (data: EssayForm) => {
    setIsGrading(true);
    setSubmittedEssay({ question: data.question, essay: data.essay });
    
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
    form.reset();
  };

  const handleNextPractice = () => {
    setCurrentView("form");
    setSubmittedEssay(null);
    form.reset();
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

  return (
    <main className="container mx-auto px-4 py-8">
      {currentView === "form" && (
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Chấm điểm IELTS Writing Task 2
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600">
              Gửi bài luận Task 2 đã hoàn thành của bạn để nhận điểm Band Score chi tiết theo 4 tiêu chí IELTS cùng với nhận xét cải thiện từ AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <form onSubmit={form.handleSubmit(handleSubmitEssay)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question" className="text-sm font-medium">
                  Câu hỏi đề bài
                </Label>
                <Textarea
                  id="question"
                  placeholder="Nhập câu hỏi IELTS Writing Task 2..."
                  className="min-h-[80px] sm:min-h-[100px] text-sm"
                  {...form.register("question")}
                />
                {form.formState.errors.question && (
                  <p className="text-xs sm:text-sm text-red-600">
                    {form.formState.errors.question.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="essay" className="text-sm font-medium">
                  Bài luận
                </Label>
                <Textarea
                  id="essay"
                  placeholder="Nhập bài luận của bạn (tối thiểu 250 từ)..."
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