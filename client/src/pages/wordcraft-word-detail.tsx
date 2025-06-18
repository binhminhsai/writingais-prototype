import { useState } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Settings, Star, BookOpen, Users, Plus, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import type { VocabularyCard, VocabularyWord } from "@shared/schema";

export default function WordcraftWordDetail() {
  const { cardId, wordId } = useParams<{ cardId: string; wordId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: card, isLoading: cardLoading } = useQuery<VocabularyCard>({
    queryKey: ["/api/vocabulary-cards", cardId],
    enabled: !!cardId,
  });

  const { data: words = [], isLoading: wordsLoading } = useQuery<VocabularyWord[]>({
    queryKey: ["/api/vocabulary-cards", cardId, "words"],
    enabled: !!cardId,
  });

  const { data: currentWord, isLoading: wordLoading } = useQuery<VocabularyWord>({
    queryKey: ["/api/vocabulary-words", wordId],
    enabled: !!wordId,
  });

  const totalWords = words.length;
  const currentWordIndex = words.findIndex(w => w.id === parseInt(wordId || "0"));

  const navigateToWord = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentWordIndex - 1 : currentWordIndex + 1;
    if (newIndex >= 0 && newIndex < words.length) {
      const newWordId = words[newIndex].id;
      window.location.href = `/wordcraft/${cardId}/words/${newWordId}/detail`;
    }
  };

  const getPartOfSpeechColor = (pos: string) => {
    switch (pos) {
      case "N": return "bg-blue-100 text-blue-800";
      case "V": return "bg-green-100 text-green-800";
      case "Adj": return "bg-purple-100 text-purple-800";
      case "Adv": return "bg-orange-100 text-orange-800";
      case "Idiom": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (cardLoading || wordsLoading || wordLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!card || !currentWord) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy từ vựng</h2>
          <Link href="/wordcraft">
            <Button>Quay lại danh sách</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Link href={`/wordcraft/${cardId}/words`}>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Trở về
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="hover:bg-gray-50">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Card Info with beautiful design */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-6">
            {/* Placeholder for image */}
            <div className="w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">✕</div>
                <div className="text-sm">Hình ảnh</div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{card.title}</h1>
                <span className="text-sm text-gray-600 font-medium">20/04</span>
              </div>
              
              {card.description && (
                <p className="text-gray-700 mb-4 leading-relaxed">{card.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Chủ đề:</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1">
                    {card.category}
                  </Badge>
                </div>
                
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Học từ vựng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Word Detail Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border-2 border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-900">Resilience</h2>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                  <Star className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-600 mb-4">(Idiom) (C1)</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  Hình ảnh
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  Định nghĩa
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                  Nguồn gốc
                </Badge>
                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                  Cụm từ thường gặp
                </Badge>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Định nghĩa</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Tiếng Anh:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      The capacity to recover quickly from difficulties; toughness. The ability to withstand or recover quickly from difficult conditions, setbacks, or trauma.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Tiếng Việt:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Khả năng phục hồi nhanh chóng sau khó khăn; sức bền. Khả năng chịu đựng hoặc phục hồi nhanh chóng từ những điều kiện khó khăn, thất bại, hoặc chấn thương.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Nguồn gốc</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Gốc Latin:</strong> "resilire" có nghĩa là "nhảy trở lại" hoặc "bật trở lại"</li>
                    <li><strong>Tiền tố:</strong> "re-" (trở lại) + "salire" (nhảy)</li>
                    <li><strong>Xuất hiện:</strong> Thế kỷ 17, ban đầu được sử dụng trong vật lý học để mô tả tính chất đàn hồi của vật liệu</li>
                    <li><strong>Mở rộng nghĩa:</strong> Thế kỷ 20, được áp dụng vào tâm lý học và khoa học xã hội</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Cụm từ thường gặp</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900">Emotional resilience</p>
                    <p className="text-sm text-blue-700">Sức bền cảm xúc</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-medium text-green-900">Build resilience</p>
                    <p className="text-sm text-green-700">Xây dựng sức bền/khả năng phục hồi</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="font-medium text-purple-900">Resilience training</p>
                    <p className="text-sm text-purple-700">Đào tạo khả năng phục hồi</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="font-medium text-orange-900">Mental resilience</p>
                    <p className="text-sm text-orange-700">Sức bền tinh thần</p>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <p className="font-medium text-pink-900">Show remarkable resilience</p>
                    <p className="text-sm text-pink-700">Thể hiện khả năng phục hồi đáng kinh ngạc</p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="font-medium text-indigo-900">Economic resilience</p>
                    <p className="text-sm text-indigo-700">Sức bền kinh tế</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Example:</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    "After losing her job, Sarah showed incredible resilience by starting her own business within six months."
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    (Sau khi mất việc, Sarah đã thể hiện khả năng phục hồi đáng kinh ngạc khi bắt đầu kinh doanh riêng trong vòng sáu tháng.)
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigateToWord("prev")}
                disabled={currentWordIndex <= 0}
                className="flex items-center hover:bg-blue-50"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  2/12
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigateToWord("next")}
                disabled={currentWordIndex >= totalWords - 1}
                className="flex items-center hover:bg-blue-50"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-700 font-medium">
                <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                Số từ vựng: <span className="text-blue-600 font-semibold ml-1">12</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 font-medium">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                Số lần học: <span className="text-blue-600 font-semibold ml-1">7</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Link href={`/wordcraft/${cardId}/words`}>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200">
                  Xem chi tiết
                </Button>
              </Link>
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Thêm từ vựng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}