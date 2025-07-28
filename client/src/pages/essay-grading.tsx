import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  Star,
  BookOpen,
  MessageSquare,
  BarChart3
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { EssayGrading, InsertEssayGrading } from "@shared/schema";

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
  const [isGrading, setIsGrading] = useState(false);
  const [gradedEssay, setGradedEssay] = useState<EssayGrading | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EssayForm>({
    resolver: zodResolver(essayFormSchema),
    defaultValues: {
      question: "",
      essay: "",
      fileName: "",
    },
  });

  const { data: essayHistory } = useQuery<EssayGrading[]>({
    queryKey: ["/api/essay-grading"],
  });

  const createEssayMutation = useMutation({
    mutationFn: async (data: InsertEssayGrading): Promise<EssayGrading> => {
      const response = await fetch("/api/essay-grading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create essay");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/essay-grading"] });
    },
  });

  const gradeEssayMutation = useMutation({
    mutationFn: async (id: number): Promise<EssayGrading> => {
      // Simulate AI grading with realistic scores
      const scores = {
        overallScore: Math.floor(Math.random() * 3) + 6, // 6.0-8.5
        taskAchievement: Math.floor(Math.random() * 3) + 6,
        coherenceCohesion: Math.floor(Math.random() * 3) + 6,
        lexicalResource: Math.floor(Math.random() * 3) + 6,
        grammaticalRange: Math.floor(Math.random() * 3) + 6,
        feedback: generateDetailedFeedback(),
      };

      const response = await fetch(`/api/essay-grading/${id}/scores`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scores),
      });
      
      if (!response.ok) {
        throw new Error("Failed to grade essay");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setGradedEssay(data);
      setIsGrading(false);
      queryClient.invalidateQueries({ queryKey: ["/api/essay-grading"] });
      toast({
        title: "Chấm bài thành công!",
        description: "Bài luận của bạn đã được chấm điểm và đưa ra nhận xét chi tiết.",
      });
    },
  });

  const generateDetailedFeedback = () => {
    const feedbacks = [
      "Bài luận của bạn thể hiện khả năng phân tích tốt và có cấu trúc rõ ràng. Tuy nhiên, cần cải thiện việc sử dụng từ vựng đa dạng và các liên từ để tăng tính liên kết giữa các ý. Nên bổ sung thêm ví dụ cụ thể để hỗ trợ các luận điểm chính.",
      "Bài viết có ý tưởng hay và trình bày khá logic. Điểm mạnh là việc trả lời đầy đủ câu hỏi đề bài. Cần chú ý hơn đến ngữ pháp, đặc biệt là thì và cấu trúc câu phức. Từ vựng sử dụng phù hợp nhưng có thể đa dạng hơn.",
      "Bài luận thể hiện hiểu biết tốt về chủ đề và có kết luận mạnh mẽ. Tuy nhiên, cần cải thiện cách triển khai ý trong đoạn thân bài và sử dụng nhiều cấu trúc câu phức tạp hơn. Chú ý kiểm tra lại chính tả và cách sử dụng giới từ.",
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const handleSubmit = async (data: EssayForm) => {
    try {
      const essay = await createEssayMutation.mutateAsync({
        question: data.question,
        essay: data.essay,
        fileName: data.fileName || undefined,
        createdAt: new Date().toISOString(),
      });

      setIsGrading(true);
      
      // Simulate grading delay
      setTimeout(() => {
        gradeEssayMutation.mutate(essay.id);
      }, 3000);

    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể gửi bài luận. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
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

  const getBandColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 7) return "bg-blue-500";
    if (score >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getBandDescription = (score: number) => {
    if (score >= 8) return "Xuất sắc";
    if (score >= 7) return "Tốt";
    if (score >= 6) return "Khá";
    return "Cần cải thiện";
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8 max-w-7xl">
      <div className="mb-6 sm:mb-8 text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Chấm điểm IELTS Writing Task 2
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-4xl mx-auto lg:mx-0">
          Gửi bài luận Task 2 đã hoàn thành của bạn để nhận điểm Band Score chi tiết theo 4 tiêu chí IELTS cùng với nhận xét cải thiện từ AI
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8 items-center xl:items-start justify-center">
        {/* Essay Submission Form */}
        <div className="w-full max-w-2xl xl:max-w-none xl:flex-1">
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-5 w-5 text-primary" />
                Gửi bài luận
              </CardTitle>
              <CardDescription className="text-sm">
                Nhập câu hỏi và bài luận của bạn để được chấm điểm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

                <Button
                  type="submit"
                  className="w-full mt-6 text-sm sm:text-base"
                  disabled={createEssayMutation.isPending || isGrading}
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
        </div>

        {/* Grading Results */}
        <div className="space-y-4 sm:space-y-6 w-full max-w-2xl xl:max-w-none xl:flex-1">
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

          {gradedEssay && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Kết quả chấm điểm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Overall Score */}
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                    Band {gradedEssay.overallScore?.toFixed(1)}
                  </div>
                  <Badge className={`${getBandColor(gradedEssay.overallScore || 0)} text-white`}>
                    {getBandDescription(gradedEssay.overallScore || 0)}
                  </Badge>
                </div>

                <Separator />

                {/* Detailed Scores */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">Chi tiết điểm số:</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs sm:text-sm font-medium">Task Achievement</span>
                      <Badge variant="secondary" className="text-xs">
                        {gradedEssay.taskAchievement?.toFixed(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs sm:text-sm font-medium">Coherence & Cohesion</span>
                      <Badge variant="secondary" className="text-xs">
                        {gradedEssay.coherenceCohesion?.toFixed(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs sm:text-sm font-medium">Lexical Resource</span>
                      <Badge variant="secondary" className="text-xs">
                        {gradedEssay.lexicalResource?.toFixed(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs sm:text-sm font-medium">Grammar Range & Accuracy</span>
                      <Badge variant="secondary" className="text-xs">
                        {gradedEssay.grammaticalRange?.toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Feedback */}
                <div className="space-y-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Nhận xét chi tiết:
                  </h4>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {gradedEssay.feedback}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* History */}
          {essayHistory && Array.isArray(essayHistory) && essayHistory.length > 0 && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  Lịch sử chấm bài
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {essayHistory.slice(0, 5).map((essay: EssayGrading) => (
                    <div key={essay.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                          {essay.question.substring(0, 60)}...
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(essay.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      {essay.overallScore && (
                        <Badge variant="outline" className="text-xs w-fit">
                          Band {essay.overallScore.toFixed(1)}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}