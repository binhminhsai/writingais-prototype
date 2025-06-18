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
      case "N": return "bg-blue-100 text-blue-800";
      case "V": return "bg-green-100 text-green-800";
      case "Adj": return "bg-purple-100 text-purple-800";
      case "Adv": return "bg-orange-100 text-orange-800";
      case "Idiom": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
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
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <Link href="/wordcraft">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Trở về
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFavoriteToggle}
              disabled={favoriteMutation.isPending}
              className={`${card?.isFavorited ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-400'}`}
            >
              <Star className={`h-4 w-4 ${card?.isFavorited ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              {card.title}
            </h1>
            {card.description && (
              <p className="text-sm text-gray-600 mb-3">{card.description}</p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Chủ đề:</span>
                  <Badge variant="secondary" className="text-xs">{card.category}</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {card.wordCount} từ
                </div>
              </div>
              
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                <BookOpen className="h-4 w-4 mr-2" />
                Học từ vựng
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm từ mô tả bạn muốn ôn lại"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>

      {/* Words Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">STT</TableHead>
              <TableHead>Từ vựng</TableHead>
              <TableHead>Phiên âm</TableHead>
              <TableHead>Loại từ</TableHead>
              <TableHead>Định nghĩa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWords.map((word, index) => (
              <TableRow 
                key={word.id} 
                className={index === 4 ? "bg-blue-50" : "hover:bg-gray-50"}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{word.word}</TableCell>
                <TableCell className="text-gray-600">{word.pronunciation}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getPartOfSpeechColor(word.partOfSpeech)}>
                    {word.partOfSpeech}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="line-clamp-2">{word.definition}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-1" />
          Đã học: {card.studyCount || 0} lần
        </div>

        <div className="flex space-x-2">
          <Link href={`/wordcraft/${cardId}/words/${filteredWords[0]?.id || 1}/detail`}>
            <Button variant="outline" size="sm">
              Xem chi tiết
            </Button>
          </Link>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Thêm từ vựng
          </Button>
        </div>
      </div>
    </div>
  );
}