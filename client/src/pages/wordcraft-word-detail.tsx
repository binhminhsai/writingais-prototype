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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Link href={`/wordcraft/${cardId}/words`}>
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Trở về
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="ml-auto">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-48 h-32 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-4xl text-gray-400">✕</div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h1>
            <p className="text-gray-600 mb-4">{card.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-600">Chủ đề:</span>
              <Badge variant="secondary">{card.category}</Badge>
              <Badge variant="secondary" className="ml-2">{card.difficulty}</Badge>
            </div>

            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Học từ vựng
            </Button>
          </div>
        </div>
      </div>

      {/* Word Detail Card */}
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-900">{currentWord.word}</h2>
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-600 mb-2">({currentWord.partOfSpeech}) (C1)</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {currentWord.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tiếng Anh:</h3>
                <p className="text-gray-700 leading-relaxed">{currentWord.definition}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tiếng Việt:</h3>
                <p className="text-gray-700 leading-relaxed">{currentWord.vietnamese}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Example:</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-gray-700">{currentWord.example}</p>
                  <p className="text-gray-600 text-sm italic">({currentWord.exampleVietnamese})</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-8">
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigateToWord("prev")}
                disabled={currentWordIndex <= 0}
                className="flex items-center"
              >
                <ChevronLeft className="h-6 w-6 mr-2" />
              </Button>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {currentWordIndex + 1}/{totalWords}
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigateToWord("next")}
                disabled={currentWordIndex >= totalWords - 1}
                className="flex items-center"
              >
                <ChevronRight className="h-6 w-6 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-gray-600">
              <BookOpen className="h-4 w-4 mr-1" />
              Số từ vựng: {card.wordCount}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              Số lần học: {card.studyCount}
            </div>
          </div>

          <div className="flex space-x-2">
            <Link href={`/wordcraft/${cardId}/words`}>
              <Button variant="outline">
                Xem chi tiết
              </Button>
            </Link>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm từ vựng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}