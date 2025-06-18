import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Settings, Star, BookOpen, Users, Plus } from "lucide-react";
import type { VocabularyCard, VocabularyWord } from "@shared/schema";

export default function WordcraftWords() {
  const { cardId } = useParams<{ cardId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const { data: card, isLoading: cardLoading } = useQuery<VocabularyCard>({
    queryKey: [`/api/vocabulary-cards/${cardId}`],
    enabled: !!cardId,
  });

  const favoriteMutation = useMutation({
    mutationFn: async (isFavorited: boolean) => {
      return await apiRequest("PATCH", `/api/vocabulary-cards/${cardId}/favorite`, { isFavorited });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/vocabulary-cards/${cardId}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/vocabulary-cards"] });
    }
  });

  const handleFavoriteToggle = () => {
    const newFavoriteState = !card?.isFavorited;
    favoriteMutation.mutate(newFavoriteState);
  };

  const { data: words = [], isLoading: wordsLoading } = useQuery<VocabularyWord[]>({
    queryKey: [`/api/vocabulary-cards/${cardId}/words`],
    enabled: !!cardId,
  });

  const filteredWords = words.filter(word => 
    word.word?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.definition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.vietnamese?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPartOfSpeechColor = (pos: string) => {
    switch (pos) {
      case "N": return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 shadow-sm font-medium";
      case "V": return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm font-medium";
      case "Adj": return "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-sm font-medium";
      case "Adv": return "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 shadow-sm font-medium";
      case "Idiom": return "bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 border border-pink-300 shadow-sm font-medium";
      default: return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 shadow-sm font-medium";
    }
  };

  if (cardLoading || wordsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bộ thẻ</h2>
          <p className="text-gray-600 mb-4">Card ID: {cardId}</p>
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
          <Link href="/wordcraft">
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Trở về
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFavoriteToggle}
              disabled={favoriteMutation.isPending}
              className={`hover:bg-yellow-50 ${card?.isFavorited ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-400'}`}
            >
              <Star className={`h-4 w-4 ${card?.isFavorited ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-50">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Card Info with beautiful design */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {card.title}
              </h1>
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

      {/* Search and Word Count */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm từ mô tả bạn muốn ôn lại"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BookOpen className="h-4 w-4 mr-1" />
          {card.wordCount} từ vựng
        </div>
      </div>

      {/* Words Table */}
      <div className="bg-white rounded-lg border-2 border-gray-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <TableHead className="w-12 font-semibold text-gray-700">STT</TableHead>
              <TableHead className="font-semibold text-gray-700">Từ vựng</TableHead>
              <TableHead className="font-semibold text-gray-700">Phiên âm</TableHead>
              <TableHead className="font-semibold text-gray-700">Loại từ</TableHead>
              <TableHead className="font-semibold text-gray-700">Định nghĩa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWords.map((word, index) => (
              <TableRow 
                key={word.id} 
                className={index === 4 ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-300" : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200"}
              >
                <TableCell className="font-medium text-gray-800">{index + 1}</TableCell>
                <TableCell className="font-semibold text-gray-900">{word.word}</TableCell>
                <TableCell className="text-gray-600 italic">{word.pronunciation}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getPartOfSpeechColor(word.partOfSpeech)}>
                    {word.partOfSpeech}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="line-clamp-2 text-gray-700">{word.definition}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-700 font-medium">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            Đã học: <span className="text-blue-600 font-semibold ml-1">{card.studyCount || 0}</span> lần
          </div>

          <div className="flex space-x-3">
            <Link href={`/wordcraft/${cardId}/words/${filteredWords[0]?.id || 1}/detail`}>
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
  );
}