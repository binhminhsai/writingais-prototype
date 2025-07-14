import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/ui/word-counter";
import { useTimer } from "@/hooks/use-timer";
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
import { Save, Layers, ArrowLeft, Eye, EyeOff, Smile } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getOutline } from "@/data/outlines";
import { getVocabulary } from "@/data/vocabulary";
import { getPhrases, getStructuredPhrases, phraseCategories } from "@/data/phrases";
import { WritingTestType, DifficultyLevel } from "./test-setup";
import { Link } from "wouter";

// Outline component with tabs for outline and useful expressions
function OutlineSection({ testType, topic }: { testType: WritingTestType, topic: string }) {
  const [showOutline, setShowOutline] = useState(true);
  const outline = getOutline(testType, topic);

  return (
    <div className="h-full flex flex-col">
      {showOutline ? (
        <Tabs defaultValue="outline" className="w-full h-full flex flex-col">
          <div className="mb-4 relative">
            <TabsList className="w-full flex gap-1 bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
              <TabsTrigger 
                value="outline" 
                className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                        hover:bg-gray-50
                        data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold"
              >
                <Layers className="h-4 w-4" />
                Suggested Outline
              </TabsTrigger>
              <TabsTrigger 
                value="expressions" 
                className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                        hover:bg-gray-50
                        data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold"
              >
                <Smile className="h-4 w-4" />
                Writing Guide
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent 
            value="outline" 
            className="flex-1 overflow-y-auto mt-0 rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-4 shadow-md"
            style={{ height: '500px' }}
          >
            <div>
              <h4 className="font-semibold text-primary mb-3 text-sm flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                Suggested Outline - Đề xuất cấu trúc bài viết
              </h4>
              <p className="text-xs mb-4 text-gray-600 italic bg-gray-50 p-2 rounded-md border border-gray-100">
                Cấu trúc đề xuất giúp bạn tổ chức ý tưởng và viết bài tốt hơn
              </p>

              <div className="overflow-y-auto" style={{ maxHeight: '430px' }}>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {/* Overall Outline as the first item */}
                  <AccordionItem 
                    value="overall-outline"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          1
                        </span>
                        Overall Outline
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="space-y-3">
                        <div className="p-3 rounded-md border border-blue-100 bg-[#f9fafb] text-[#374151]">
                          <p className="mb-2 text-[#1fb2aa] font-bold text-[12px]">Introduction (2 câu)</p>
                          <ul className="text-xs space-y-1 list-disc pl-4 text-[#374151]">
                            <li><strong>Câu 1:</strong> Giới thiệu vấn đề và paraphrase đề.</li>
                            <li><strong>Câu 2:</strong> Thesis Statement – nêu 2 quan điểm và khẳng định lập trường.</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded-md border border-green-100 bg-[#f9fafb]">
                          <p className="text-xs mb-2 font-bold text-[#1fb2aa]">Body Paragraph 1 – Quan điểm thứ nhất</p>
                          <ul className="text-xs space-y-1 list-disc pl-4 text-[#374151] font-normal">
                            <li className="font-normal"><strong>Topic Sentence.</strong></li>
                            <li><strong>Giải thích lý do, nêu lợi ích, ví dụ cụ thể.</strong></li>
                            <li><strong>Gợi ý từ nối:</strong> Firstly, Moreover, For instance...</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
                          <p className="text-xs font-medium text-purple-800 mb-2">📖 Body Paragraph 2 – Quan điểm thứ hai</p>
                          <ul className="text-xs text-purple-700 space-y-1 list-disc pl-4">
                            <li><strong>Topic Sentence.</strong></li>
                            <li><strong>Phân tích sâu, lợi ích dài hạn, ví dụ kỹ năng mềm.</strong></li>
                            <li><strong>Gợi ý từ nối:</strong> Conversely, Primarily, Furthermore...</li>
                          </ul>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
                          <p className="text-xs font-medium text-orange-800 mb-2">✅ Conclusion (2 câu)</p>
                          <ul className="text-xs text-orange-700 space-y-1 list-disc pl-4">
                            <li><strong>Tóm tắt lại 2 quan điểm đã nêu.</strong></li>
                            <li><strong>Tái khẳng định quan điểm cá nhân, thêm 1 câu khuyến nghị nếu cần.</strong></li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {outline.slice(0, 3).map((section, index) => (
                    <AccordionItem 
                      key={`outline-${index}`} 
                      value={`section-${index}`}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      <AccordionTrigger 
                        className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                            {index + 2}
                          </span>
                          {section.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="p-3 bg-white">
                        {index === 0 && (
                          <div className="mt-3 space-y-3">
                            <div className="p-3 bg-gray-50 rounded-md border border-gray-100 text-xs text-gray-700">
                              <p className="mb-2 font-medium text-primary">Hướng dẫn:</p>
                              <p className="mb-2">Mở bài 2 câu – paraphrase đề + thesis statement</p>
                            </div>
                            
                            <div className="p-3 rounded-md border border-blue-100 text-xs text-blue-700 bg-[#f9fafb]">
                              <p className="mb-2 font-medium text-[#1fb2aa]">Câu 1 – Paraphrase đề bài</p>
                              <p className="mb-2 text-[#374151]">• <strong>Mục đích:</strong> Paraphrase vấn đề chính trong câu hỏi</p>
                              <p className="mb-2 text-[#374151]">• <strong>Ví dụ:</strong> "The financial remuneration of elite sports professionals often far surpasses that of individuals in crucial societal roles, such as healthcare providers and educators, a phenomenon that sparks considerable debate regarding its fairness."</p>
                            </div>
                            
                            <div className="p-3 rounded-md border border-green-100 text-xs text-green-700 bg-[#f9fafb]">
                              <p className="mb-2 font-medium text-[#1fb2aa]">Câu 2 – Thesis Statement</p>
                              <p className="mb-2 text-[#374151]">• <strong>Mục đích:</strong> Thesis statement phù hợp với Opinion essay – To what extent agree/disagree (Bài luận nêu quan điểm cá nhân về mức độ đồng ý/không đồng ý).</p>
                              <p className="mb-2 text-[#374151]">• <strong>Ví dụ:</strong> "While I acknowledge the market-driven forces that inflate athletes' incomes, I largely contend that this significant disparity is fundamentally inequitable when considering the indispensable societal contributions of other professions."</p>
                            </div>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="mt-3 space-y-3">
                            <div className="p-3 rounded-md border border-blue-100 text-xs text-blue-700 bg-[#f9fafb]">
                              <p className="mb-2 font-bold text-[#1fb2aa]">Topic Sentence</p>
                              <p className="mb-2 text-[#374151]">• <strong>Content:</strong> Dịch và cải tiến topic sentence này sang tiếng Anh: "On the one hand, there are compelling arguments to suggest that the exorbitant salaries of top athletes are indeed justified, primarily due to the unique nature of their profession and the entertainment value they provide."</p>
                              <p className="mb-2 text-[#374151]">• <strong>Ví dụ:</strong> On the one hand, there are compelling arguments to suggest that the exorbitant salaries of top athletes are indeed justified, primarily due to the unique nature of their profession and the entertainment value they provide.</p>
                            </div>
                            
                            <div className="p-3 rounded-md border border-green-100 text-xs text-green-700 bg-[#f9fafb]">
                              <p className="mb-2 text-[#1fb2aa] font-bold">Supporting Idea 1</p>
                              <p className="mb-2 text-[#374151]">• <strong>Idea:</strong> Scarcity of exceptional talent and short career span</p>
                              <p className="mb-2 text-[#374151]">• <strong>Ví dụ cụ thể:</strong> Athletes like Lionel Messi or Serena Williams possess a rare combination of physical prowess, mental fortitude, and dedication, making them truly one in a million. Their peak performance window is often limited to a decade or so.</p>
                              <p className="mb-2 text-[#374151]">• <strong>Development:</strong> This extreme scarcity of top-tier talent, combined with a brief professional lifespan, means that their market value is inherently high. Consequently, they must earn a substantial amount during their active years to secure their financial future after retirement.</p>
                            </div>
                            
                            <div className="p-3 bg-purple-50 rounded-md border border-purple-100 text-xs text-purple-700">
                              <p className="mb-2 font-medium text-purple-800">Supporting Idea 2</p>
                              <p className="mb-2">• <strong>Idea:</strong> Massive revenue generation and global entertainment appeal</p>
                              <p className="mb-2">• <strong>Ví dụ cụ thể:</strong> Major sporting events, such as the FIFA World Cup or the Olympic Games, attract billions of viewers worldwide, leading to colossal revenues from broadcasting rights, sponsorships, merchandise sales, and ticket revenues. Top athletes are central to this multi-billion dollar industry.</p>
                              <p className="mb-2">• <strong>Development:</strong> These professionals are not merely players; they are global brands and entertainers who drive immense commercial success for leagues, teams, and related businesses. Their salaries, while large, often represent a fraction of the total revenue they help generate for various stakeholders, justifying their earnings through their direct economic impact.</p>
                            </div>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="mt-3 space-y-3">
                            <div className="p-3 rounded-md border border-orange-100 text-xs text-orange-700 bg-[#f9fafb]">
                              <p className="mb-2 text-[#1fb2aa] font-bold">Topic Sentence</p>
                              <p className="mb-2 text-[#374151]">• <strong>Content:</strong> Dịch và cải tiến topic sentence này sang tiếng Anh: "However, it is equally understandable why many people perceive this disparity as unfair, given the vital contributions of professions such as nursing, medicine, and teaching to the fundamental well-being and development of society."</p>
                              <p className="mb-2 text-[#374151]">• <strong>Ví dụ:</strong> However, it is equally understandable why many people perceive this disparity as unfair, given the vital contributions of professions such as nursing, medicine, and teaching to the fundamental well-being and development of society.</p>
                            </div>
                            
                            <div className="p-3 bg-red-50 rounded-md border border-red-100 text-xs text-red-700">
                              <p className="mb-2 font-medium text-red-800">Supporting Idea 1</p>
                              <p className="mb-2">• <strong>Idea:</strong> Direct and indispensable impact on human welfare and societal progress</p>
                              <p className="mb-2">• <strong>Ví dụ cụ thể:</strong> Nurses provide critical frontline care, often working long, gruelling shifts to save lives and alleviate suffering, as evidenced profoundly during the COVID-19 pandemic. Doctors diagnose and treat diseases, while teachers educate and shape the minds of future generations, fostering societal knowledge and innovation.</p>
                              <p className="mb-2">• <strong>Development:</strong> Unlike the entertainment value offered by sports, these professions directly impact human health, safety, and intellectual growth. Their work is fundamental to the very fabric of society, yet their compensation often fails to reflect the profound positive externalities they create.</p>
                            </div>
                            
                            <div className="p-3 bg-indigo-50 rounded-md border border-indigo-100 text-xs text-indigo-700">
                              <p className="mb-2 font-medium text-indigo-800">Supporting Idea 2</p>
                              <p className="mb-2">• <strong>Idea:</strong> Extensive training, high responsibility, and demanding working conditions</p>
                              <p className="mb-2">• <strong>Ví dụ cụ thể:</strong> Medical professionals undergo a decade or more of rigorous academic and practical training, accumulating significant debt, before assuming roles with immense responsibility for human lives. Similarly, teachers manage large classes, diverse learning needs, and administrative burdens, often sacrificing personal time for student development.</p>
                              <p className="mb-2">• <strong>Development:</strong> The substantial investment in education, coupled with the emotional and physical toll of dealing with life-and-death situations or challenging educational environments, contrasts sharply with the often lower financial rewards. This imbalance suggests a societal undervaluation of critical services over entertainment.</p>
                            </div>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  
                  {/* Conclusion section as the 5th item */}
                  <AccordionItem 
                    value="conclusion"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          5
                        </span>
                        Conclusion
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="mt-3 space-y-3">
                        <div className="p-3 bg-gray-50 rounded-md border border-gray-100 text-xs text-gray-700">
                          <p className="mb-2 font-medium text-primary">Hướng dẫn</p>
                          <p className="mb-2">Kết bài 2 câu – summary + recommendation</p>
                        </div>
                        
                        <div className="p-3 bg-blue-50 rounded-md border border-blue-100 text-xs text-blue-700">
                          <p className="mb-2 font-medium text-blue-800">Câu 1 – Summary</p>
                          <p className="mb-2">• <strong>Mục đích:</strong> Tóm tắt cả 2 phần body và main topic, không nêu quan điểm mới</p>
                          <p className="mb-2">• <strong>Ví dụ:</strong> In conclusion, while the immense earnings of top athletes can be attributed to their unique talent and the vast commercial machinery of global sports, it is equally compelling to argue that the remuneration for professions pivotal to societal welfare, such as nursing and teaching, is disproportionately low.</p>
                        </div>
                        
                        <div className="p-3 bg-emerald-50 rounded-md border border-emerald-100 text-xs text-emerald-700">
                          <p className="mb-2 font-medium text-emerald-800">Câu 2 – Final Recommendation</p>
                          <p className="mb-2">• <strong>Mục đích:</strong> Final recommendation về giải pháp hoặc quan điểm bền vững liên quan đến: "Successful sports professionals can earn much more than those in other important professions, like nurses, doctors, and teachers. Some people think it is fully justified, while others believe it is unfair. To what extent do you agree or disagree?"</p>
                          <p className="mb-2">• <strong>Ví dụ:</strong> Ultimately, I believe this disparity highlights a problematic imbalance in societal values, suggesting a greater need to acknowledge and justly reward those who contribute directly to the fundamental well-being and progress of humanity.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>

          <TabsContent 
            value="expressions" 
            className="flex-1 overflow-y-auto mt-0 rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-4 shadow-md"
            style={{ height: '500px' }}
          >
            <div>
              <h4 className="font-semibold text-primary mb-3 text-sm flex items-center gap-1.5">
                <Smile className="h-4 w-4" />
                Writing Guide - Hướng dẫn cách viết
              </h4>
              <p className="text-xs mb-4 text-gray-600 italic bg-gray-50 p-2 rounded-md border border-gray-100">
                Những hướng dẫn cụ thể giúp bạn viết bài hiệu quả hơn
              </p>

              <div className="overflow-y-auto" style={{ maxHeight: '430px' }}>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {/* Accordion 1: Highlight Keywords */}
                  <AccordionItem 
                    value="highlight-keywords"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          1
                        </span>
                        Highlight Keywords
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                          <p className="text-xs font-medium text-blue-800 mb-2">Context & Reason:</p>
                          <p className="text-xs text-blue-700">
                            Nhiều thành phố trên thế giới đang trải qua sự gia tăng dân số nhanh chóng, dẫn đến các vấn đề như đông đúc, tắc nghẽn giao thông và thiếu hụt nhà ở.
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-md border border-green-100">
                          <p className="text-xs font-medium text-green-800 mb-2">Main Subject:</p>
                          <p className="text-xs text-green-700">
                            Sự gia tăng dân số tại các thành phố và những vấn đề liên quan.
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
                          <p className="text-xs font-medium text-purple-800 mb-2">Perspectives:</p>
                          <ul className="text-xs text-purple-700 space-y-1 list-disc pl-4">
                            <li>Quan điểm 1: Nguyên nhân của sự gia tăng dân số (tăng trưởng kinh tế, di cư từ nông thôn ra thành phố)</li>
                            <li>Quan điểm 2: Các biện pháp chính phủ có thể thực hiện (xây dựng cơ sở hạ tầng, quy hoạch đô thị)</li>
                          </ul>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
                          <p className="text-xs font-medium text-orange-800 mb-2">Main Task:</p>
                          <p className="text-xs text-orange-700">
                            Yêu cầu cụ thể: Phân tích nguyên nhân và biện pháp giải quyết các vấn đề do sự gia tăng dân số.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 2: Identify Essay Type */}
                  <AccordionItem 
                    value="essay-type"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          2
                        </span>
                        Identify Essay Type
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="space-y-3">
                        <div className="bg-red-50 p-3 rounded-md border border-red-100">
                          <p className="text-xs font-medium text-red-800 mb-2">Essay Type: Problem-Solution</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
                          <p className="text-xs font-medium text-yellow-800 mb-2">Tips for Band 6.5:</p>
                          <ul className="text-xs text-yellow-700 space-y-1 list-disc pl-4">
                            <li><strong>Task Response:</strong> Trả lời đủ 2 phần: Phân tích nguyên nhân + Đề xuất biện pháp cụ thể. Ý tưởng phát triển khá đủ, có giải thích/ví dụ.</li>
                            <li><strong>Coherence & Cohesion:</strong> Bố cục rõ ràng (4 đoạn). Dùng nhiều từ nối/liên kết. Bài viết dễ theo dõi.</li>
                            <li><strong>Lexical Resource:</strong> Từ vựng đủ rộng cho chủ đề. Paraphrase tốt. Ít lỗi từ vựng/chính tả không gây khó hiểu.</li>
                            <li><strong>Grammatical Range:</strong> Dùng đa dạng cấu trúc ngữ pháp. Mắc lỗi ngữ pháp nhưng không gây khó hiểu.</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 3: Main Topic Aspects */}
                  <AccordionItem 
                    value="main-topic"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          3
                        </span>
                        Main Topic Aspects
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="space-y-3">
                        <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
                          <p className="text-xs font-medium text-indigo-800 mb-2">Main Idea:</p>
                          <p className="text-xs text-indigo-700">
                            Sự gia tăng dân số tại các thành phố đang tạo ra nhiều vấn đề nghiêm trọng, bao gồm đông đúc, tắc nghẽn giao thông và thiếu nhà ở.
                          </p>
                        </div>
                        <div className="bg-teal-50 p-3 rounded-md border border-teal-100">
                          <p className="text-xs font-medium text-teal-800 mb-2">Supporting Sentences:</p>
                          <ul className="text-xs text-teal-700 space-y-1 list-disc pl-4">
                            <li>Một trong những nguyên nhân chính dẫn đến sự gia tăng dân số tại các thành phố là sự phát triển kinh tế mạnh mẽ, thu hút người dân từ các vùng nông thôn đến tìm kiếm cơ hội việc làm.</li>
                            <li>Để giải quyết các vấn đề do sự gia tăng dân số gây ra, chính phủ cần thực hiện các biện pháp như đầu tư vào cơ sở hạ tầng và quy hoạch đô thị hợp lý.</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 4: Tasks To Do */}
                  <AccordionItem 
                    value="tasks-todo"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          4
                        </span>
                        Tasks To Do
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="bg-pink-50 p-3 rounded-md border border-pink-100">
                        <ul className="text-xs text-pink-700 space-y-2 list-disc pl-4">
                          <li><strong>Task 1:</strong> Phân tích nguyên nhân của sự gia tăng dân số, bao gồm các yếu tố kinh tế và xã hội.</li>
                          <li><strong>Task 2:</strong> Đề xuất các biện pháp mà chính phủ có thể thực hiện để giải quyết các vấn đề như đông đúc và thiếu nhà ở.</li>
                          <li><strong>Task 3:</strong> Cung cấp ví dụ cụ thể về các thành phố đã thành công trong việc giải quyết vấn đề này.</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 5: Suggested Viewpoint */}
                  <AccordionItem 
                    value="suggested-viewpoint"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          5
                        </span>
                        Suggested Viewpoint
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="space-y-3">
                        <div className="bg-emerald-50 p-3 rounded-md border border-emerald-100">
                          <p className="text-xs font-medium text-emerald-800 mb-2">Suggested View:</p>
                          <p className="text-xs text-emerald-700">
                            Cần có sự can thiệp từ chính phủ để giải quyết vấn đề này một cách hiệu quả.
                          </p>
                        </div>
                        <div className="bg-cyan-50 p-3 rounded-md border border-cyan-100">
                          <p className="text-xs font-medium text-cyan-800 mb-2">Reason:</p>
                          <p className="text-xs text-cyan-700">
                            Chính phủ có vai trò quan trọng trong việc quản lý sự phát triển đô thị và có thể áp dụng các chính sách hợp lý để giảm thiểu các vấn đề do sự gia tăng dân số gây ra, như xây dựng nhà ở giá rẻ và cải thiện giao thông công cộng.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <Button
            variant="outline"
            size="sm"
            className="mb-4 bg-white hover:bg-gray-50 shadow-sm border-gray-200 px-4"
            onClick={() => setShowOutline(true)}
          >
            <Eye className="h-3.5 w-3.5 mr-2 text-primary" /> Show Support
          </Button>
          <p className="text-gray-700 font-medium text-base mb-2 text-center">Hãy cố gắng hết mình nhé!</p>
          <p className="text-primary font-medium text-sm text-center">Good things take time. 😉</p>
        </div>
      )}
    </div>
  );
}

// Vocabulary and Phrases component
function ResourcesSection({ testType, topic }: { testType: WritingTestType, topic: string }) {
  const [activeTab, setActiveTab] = useState("vocabulary");
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);
  const [showWordBank, setShowWordBank] = useState(false);
  const allVocabulary = getVocabulary(testType, topic);
  const phrases = getPhrases(testType);

  // Filter vocabulary for each tab
  const vocabularyWords = allVocabulary.flatMap(category => 
    category.words
      .filter(word => ["N", "V", "Adj", "Adv"].includes(word.partOfSpeech))
      .map(word => ({ ...word, type: category.type }))
  );

  // Additional vocabulary data
  const additionalVocabulary = [
    {
      word: "Sustainable",
      partOfSpeech: "Adj",
      difficulty: "B2",
      meaning: "Có thể duy trì được lâu dài, bền vững",
      example: "Companies are trying to develop more sustainable business practices.",
      type: "positive"
    },
    {
      word: "Resilience",
      partOfSpeech: "N",
      difficulty: "C1",
      meaning: "Khả năng phục hồi, sức bền",
      example: "The community showed remarkable resilience in the face of economic hardship.",
      type: "positive"
    },
    {
      word: "Implement",
      partOfSpeech: "V",
      difficulty: "B2",
      meaning: "Thực hiện, triển khai",
      example: "The government plans to implement new environmental regulations next year.",
      type: "neutral"
    },
    {
      word: "Unprecedented",
      partOfSpeech: "Adj",
      difficulty: "C1",
      meaning: "Chưa từng có trước đây, chưa từng thấy",
      example: "The pandemic caused unprecedented disruption to global supply chains.",
      type: "neutral"
    },
    {
      word: "Detrimental",
      partOfSpeech: "Adj",
      difficulty: "C1",
      meaning: "Có hại, gây tổn hại",
      example: "Excessive screen time can be detrimental to children's development.",
      type: "negative"
    },
    {
      word: "Mitigate",
      partOfSpeech: "V",
      difficulty: "C1",
      meaning: "Làm giảm, làm dịu bớt",
      example: "Companies are taking steps to mitigate their environmental impact.",
      type: "positive"
    },
    {
      word: "Profound",
      partOfSpeech: "Adj",
      difficulty: "C1",
      meaning: "Sâu sắc, to lớn",
      example: "Technology has had a profound effect on how we communicate with each other.",
      type: "neutral"
    },
    {
      word: "Advocate",
      partOfSpeech: "V",
      difficulty: "C1",
      meaning: "Ủng hộ, biện hộ",
      example: "Many scientists advocate for stronger climate change policies.",
      type: "neutral"
    }
  ];

  // Combine vocabulary words
  const allVocabularyWords = [...vocabularyWords, ...additionalVocabulary];

  // Get phrase words from vocabulary data
  const phraseWords = allVocabulary.flatMap(category => 
    category.words
      .filter(word => word.partOfSpeech === "Phrase")
      .map(word => ({ ...word, type: category.type }))
  );

  // Additional collocations data
  const additionalCollocations = [
    {
      word: "Public health crisis",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Khủng hoảng sức khỏe cộng đồng",
      example: "The rise in heroin use has led to a public health crisis in many regions.",
      type: "neutral"
    },
    {
      word: "Climate change impact",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Tác động của biến đổi khí hậu",
      example: "Researchers are studying the climate change impact on coastal communities.",
      type: "neutral"
    },
    {
      word: "Sustainable development goals",
      partOfSpeech: "Collocations",
      difficulty: "C1",
      meaning: "Mục tiêu phát triển bền vững",
      example: "Many countries are working to meet the sustainable development goals set by the United Nations.",
      type: "positive"
    },
    {
      word: "Digital literacy skills",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Kỹ năng sử dụng công nghệ số",
      example: "Schools are focusing more on teaching digital literacy skills to prepare students for modern workplaces.",
      type: "positive"
    },
    {
      word: "Economic inequality gap",
      partOfSpeech: "Collocations",
      difficulty: "C1",
      meaning: "Khoảng cách bất bình đẳng kinh tế",
      example: "The economic inequality gap has widened in many developed countries over the past decade.",
      type: "negative"
    },
    {
      word: "Demographic shift",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Sự thay đổi nhân khẩu học",
      example: "The demographic shift toward an aging population has implications for healthcare systems worldwide.",
      type: "neutral"
    },
    {
      word: "Renewable energy sources",
      partOfSpeech: "Collocations",
      difficulty: "B1",
      meaning: "Các nguồn năng lượng tái tạo",
      example: "Investing in renewable energy sources is essential for reducing carbon emissions.",
      type: "positive"
    },
    {
      word: "Global supply chain",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Chuỗi cung ứng toàn cầu",
      example: "The pandemic has revealed vulnerabilities in global supply chains across many industries.",
      type: "neutral"
    }
  ];

  // Combine phrase words with additional collocations
  const allPhraseWords = [...phraseWords, ...additionalCollocations];

  // State for displayed word counts and loading states
  const [vocabDisplayCount, setVocabDisplayCount] = useState(10);
  const [phraseDisplayCount, setPhraseDisplayCount] = useState(8);
  const [isLoadingVocab, setIsLoadingVocab] = useState(false);
  const [isLoadingPhrases, setIsLoadingPhrases] = useState(false);

  // Handle loading more words
  const handleLoadMoreVocab = () => {
    setIsLoadingVocab(true);
    // Simulate loading delay
    setTimeout(() => {
      setVocabDisplayCount(prevCount => prevCount + 10);
      setIsLoadingVocab(false);
    }, 600);
  };

  const handleLoadMorePhrases = () => {
    setIsLoadingPhrases(true);
    // Simulate loading delay
    setTimeout(() => {
      setPhraseDisplayCount(prevCount => prevCount + 10);
      setIsLoadingPhrases(false);
    }, 600);
  };

  // Handle unified word bank button
  const handleExploreWordBank = () => {
    setShowWordBank(true);
    setShowVocabulary(true);
    setShowPhrases(true);
  };

  // Words to display based on current count limits
  const displayedVocabWords = allVocabularyWords.slice(0, vocabDisplayCount);
  const displayedPhraseWords = allPhraseWords.slice(0, phraseDisplayCount);

  // Check if there are more words to load
  const hasMoreVocab = vocabDisplayCount < allVocabularyWords.length;
  const hasMorePhrases = phraseDisplayCount < allPhraseWords.length;

  return (
    <Card className="mt-6 p-0 border-0 bg-transparent shadow-none">
      <Tabs 
        defaultValue="vocabulary" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative"
      >
        <div className="mb-4 relative">
          <TabsList className="w-full flex gap-1 bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
            <TabsTrigger 
              value="vocabulary" 
              className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                      hover:bg-gray-50
                      data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 20V4"></path><path d="M20 8h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"></path><path d="M4 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4"></path>
              </svg>
              Vocabulary
            </TabsTrigger>
            <TabsTrigger 
              value="phrases" 
              className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                      hover:bg-gray-50
                      data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Useful collocations
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="vocabulary" className="p-0 min-h-[200px]">
          {!showWordBank ? (
            <div className="flex flex-col justify-center items-center h-full w-full bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-lg p-8 shadow-sm min-h-[200px]">
              <Button
                variant="outline"
                size="sm"
                className="mb-4 bg-white hover:bg-gray-50 shadow-sm border-gray-200 px-4"
                onClick={handleExploreWordBank}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-2 text-primary">
                  <path d="M12 20V4"></path><path d="M20 8h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"></path><path d="M4 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4"></path>
                </svg>
                Explore Word Bank
              </Button>
              <p className="text-gray-700 font-medium text-base mb-2 text-center">Click to explore helpful vocabulary!</p>
              <p className="text-primary font-medium text-sm text-center">Build your writing skills with relevant words. 😉</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Vocabulary Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M12 20V4"></path><path d="M20 8h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"></path><path d="M4 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4"></path>
                  </svg>
                  Vocabulary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {displayedVocabWords.map((word, index) => (
                      <div 
                        key={`word-${index}`}
                        className="p-2.5 rounded-lg border border-primary/30 bg-primary/5 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <span className="font-semibold text-sm text-primary">{word.word}</span>
                          <div className="text-xs font-medium px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded-full">
                            {word.partOfSpeech}
                          </div>
                          <div className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {word.difficulty}
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 mb-1">
                          <span className="font-medium">Meaning:</span> {word.meaning}
                        </p>
                        <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-1 mt-1">
                          <span className="font-medium not-italic">Example:</span> {word.example}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Load more button for vocabulary */}
                {hasMoreVocab && (
                  <div className="flex justify-center mt-4 mb-2">
                    <Button 
                      variant="outline" 
                      onClick={handleLoadMoreVocab}
                      className="text-primary border-primary/30 hover:border-primary text-xs px-6 py-1.5 h-auto shadow-sm"
                      size="sm"
                      disabled={isLoadingVocab}
                    >
                      {isLoadingVocab ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-2">
                            <path d="M12 8v8"></path><path d="M8 12h8"></path>
                          </svg>
                          Load More Words
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              
            </div>
          )}
        </TabsContent>

        <TabsContent value="phrases" className="p-0 min-h-[200px]">
          {!showWordBank ? (
            <div className="flex flex-col justify-center items-center h-full w-full bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-lg p-8 shadow-sm min-h-[200px]">
              <Button
                variant="outline"
                size="sm"
                className="mb-4 bg-white hover:bg-gray-50 shadow-sm border-gray-200 px-4"
                onClick={handleExploreWordBank}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-2 text-primary">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Explore Word Bank
              </Button>
              <p className="text-gray-700 font-medium text-base mb-2 text-center">Click to explore useful collocations!</p>
              <p className="text-primary font-medium text-sm text-center">Master natural word combinations. 😉</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {displayedPhraseWords.map((phrase, index) => (
                    <div 
                      key={`phrase-${index}`}
                      className="p-2.5 rounded-lg border border-primary/30 bg-primary/5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        <span className="font-semibold text-sm text-primary">{phrase.word}</span>
                        <div className="text-xs font-medium px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                          Collocation
                        </div>
                        <div className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {phrase.difficulty}
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-1">
                        <span className="font-medium">Meaning:</span> {phrase.meaning}
                      </p>
                      <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-1 mt-1">
                        <span className="font-medium not-italic">Example:</span> {phrase.example}
                      </p>
                    </div>
                  )
                )}

                {/* Fill in empty cell if odd number of phrases */}
                {displayedPhraseWords.length % 2 !== 0 && (
                  <div className="hidden md:block" />
                )}
              </div>

              {/* Load more button for phrases */}
              {hasMorePhrases && (
                <div className="flex justify-center mt-4 mb-2">
                  <Button 
                    variant="outline" 
                    onClick={handleLoadMorePhrases}
                    className="text-primary border-primary/30 hover:border-primary text-xs px-6 py-1.5 h-auto shadow-sm"
                    size="sm"
                    disabled={isLoadingPhrases}
                  >
                    {isLoadingPhrases ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-2">
                          <path d="M12 8v8"></path><path d="M8 12h8"></path>
                        </svg>
                        Load More Phrases
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}

interface WritingInterfaceProps {
  testType: WritingTestType;
  difficulty: DifficultyLevel;
  topic: string;
  timeLimit: number;
  onSubmit: (essayContent: string) => void;
}

export function WritingInterface({
  testType,
  difficulty,
  topic,
  timeLimit,
  onSubmit,
}: WritingInterfaceProps) {
  const [essayContent, setEssayContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isWordCountValid, setIsWordCountValid] = useState(true);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const { formattedTime, isRunning, startTimer, updateTimer } = useTimer({
    initialMinutes: timeLimit,
    onTimeUp: () => setShowTimeUpDialog(true),
    autoStart: timeLimit > 0,
  });

  // Start timer when component mounts if time limit is set
  useEffect(() => {
    if (timeLimit > 0) {
      startTimer();
    }
  }, [timeLimit, startTimer]);

  const handleTimeSelect = (minutes: number) => {
    updateTimer(minutes);
    if (minutes > 0) {
      startTimer();
    }
  };

  const handleWordCountChange = (count: number, isValid: boolean) => {
    setWordCount(count);
    setIsWordCountValid(isValid);
  };

  const handleSubmit = () => {
    if (!isWordCountValid) {
      setShowErrorDialog(true);
      return;
    }
    onSubmit(essayContent);
  };

  const handleSaveDraft = () => {
    // Save to localStorage
    localStorage.setItem('essayDraft', essayContent);
    localStorage.setItem('essayTopic', topic);
    alert('Draft saved successfully');
  };

  const [showExitDialog, setShowExitDialog] = useState(false);

  return (
    <div className="p-4">
      <div className="flex mb-2">
        <Button 
          variant="outline" 
          size="sm"
          className="h-7 text-xs"
          onClick={() => setShowExitDialog(true)}
        >
          <ArrowLeft className="h-3 w-3 mr-1" /> Back
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="lg:w-3/5">
          <div className="bg-cyan-50 rounded-md p-4 mb-3 border-2 border-cyan-200 shadow-sm">
            <div className="text-cyan-700 font-medium mb-1">Question:</div>
            <div className="text-gray-700 text-sm">{topic}</div>
          </div>

          <div className="flex items-center justify-between mb-2 h-8">
            <Timer 
              time={formattedTime()} 
              onTimeSelect={handleTimeSelect}
              isRunning={isRunning}
            />
            <WordCounter
              count={wordCount}
              maxWords={500}
              isValid={isWordCountValid}
            />
          </div>

          <Editor
            value={essayContent}
            onChange={setEssayContent}
            onWordCountChange={handleWordCountChange}
          />

          <div className="flex justify-end mt-3">
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:opacity-90 h-8 text-xs"
            >
              Submit Essay <Layers className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="hidden lg:block lg:w-2/5 lg:pl-3 lg:flex lg:flex-col" style={{ minHeight: '500px' }}>
          <OutlineSection 
            testType={testType} 
            topic={topic} 
          />
        </div>
      </div>

      <div className="mt-4 lg:hidden">
        <OutlineSection 
          testType={testType} 
          topic={topic} 
        />
      </div>

      {/* Resources Section Below */}
      <ResourcesSection 
        testType={testType} 
        topic={topic} 
      />

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thoát khỏi bài tập?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn thoát khỏi quá trình làm bài? Tiến trình làm bài của bạn sẽ không được lưu lại.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tiếp tục làm bài</AlertDialogCancel>
            <Link href="/writing-practice">
              <AlertDialogAction>
                Thoát
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time's Up Dialog */}
      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your allocated time for this essay has ended. Would you like to submit your work now or continue writing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Writing</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowTimeUpDialog(false);
              handleSubmit();
            }}>
              Submit Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Word Count Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Word Count Error</AlertDialogTitle>
            <AlertDialogDescription>
              Word limit requirement not met. Your essay should be between 50 and 500 words.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}