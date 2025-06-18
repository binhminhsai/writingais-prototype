import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Settings, Star, BookOpen, Users, Plus, Edit } from "lucide-react";
import leftArrowIcon from "@assets/left-arrow_1750231743172.png";
import rightArrowIcon from "@assets/right-arrow_1750231743193.png";
import type { VocabularyCard, VocabularyWord } from "@shared/schema";

export default function WordcraftWords() {
  const { cardId } = useParams<{ cardId: string }>();
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Check URL params for initial view mode
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialViewMode = urlParams.get('view') === 'detail' ? 'detail' : 'list';
  
  const [viewMode, setViewMode] = useState<"list" | "detail">(initialViewMode);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("definition");
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

  const currentWord = filteredWords[currentWordIndex];

  const navigateToWord = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentWordIndex - 1 : currentWordIndex + 1;
    if (newIndex >= 0 && newIndex < filteredWords.length) {
      setCurrentWordIndex(newIndex);
    }
  };

  const handleViewDetail = () => {
    setViewMode("detail");
    setCurrentWordIndex(0);
  };

  const handleBackToList = () => {
    setViewMode("list");
    setCurrentWordIndex(0);
  };

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

      {/* Search and Word Count - Only show in list view */}
      {viewMode === "list" && (
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
      )}

      {/* Words Content - List or Detail View */}
      {viewMode === "list" ? (
        /* Words Table */
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
      ) : (
        /* Word Detail View */
        <div className="w-full mx-auto relative">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => navigateToWord("prev")}
            disabled={currentWordIndex <= 0}
            className="absolute left-[-60px] md:left-[-100px] top-[180px] w-12 md:w-20 h-72 flex items-center justify-center hover:opacity-70 transition-opacity duration-200 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img 
              src={leftArrowIcon} 
              alt="Previous" 
              className="w-8 h-8 md:w-12 md:h-12 object-contain"
            />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => navigateToWord("next")}
            disabled={currentWordIndex >= filteredWords.length - 1}
            className="absolute right-[-60px] md:right-[-100px] top-[180px] w-12 md:w-20 h-72 flex items-center justify-center hover:opacity-70 transition-opacity duration-200 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img 
              src={rightArrowIcon} 
              alt="Next" 
              className="w-8 h-8 md:w-12 md:h-12 object-contain"
            />
          </button>

          <div className="bg-white rounded-lg border-2 border-gray-200 shadow-sm overflow-hidden mx-2 md:mx-0">
            <div className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900">{currentWord?.word || "Từ vựng"}</h2>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-2 md:mb-3">
                <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3">({currentWord?.partOfSpeech || "N"}) {currentWord?.pronunciation && `${currentWord.pronunciation}`}</p>
                
                {/* Tab Navigation */}
                <div className="flex items-center justify-between border-b border-gray-200">
                  <div className="flex gap-1 overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("definition")}
                      className={`px-2 md:px-3 py-1 md:py-2 rounded-t-lg font-medium text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
                        activeTab === "definition"
                          ? "bg-green-100 text-green-800 border-b-2 border-green-500"
                          : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                      }`}
                    >
                      Định nghĩa
                    </button>
                    <button
                      onClick={() => setActiveTab("etymology")}
                      className={`px-2 md:px-3 py-1 md:py-2 rounded-t-lg font-medium text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
                        activeTab === "etymology"
                          ? "bg-purple-100 text-purple-800 border-b-2 border-purple-500"
                          : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                      }`}
                    >
                      Nguồn gốc
                    </button>
                    <button
                      onClick={() => setActiveTab("phrases")}
                      className={`px-2 md:px-3 py-1 md:py-2 rounded-t-lg font-medium text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
                        activeTab === "phrases"
                          ? "bg-orange-100 text-orange-800 border-b-2 border-orange-500"
                          : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Cụm từ thường gặp
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 mb-1 md:mb-2">
                    <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="relative min-h-[300px] mt-4">
                {activeTab === "definition" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Định nghĩa</h3>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Tiếng Anh:</h4>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {currentWord?.definition || "Định nghĩa sẽ được cập nhật sau"}
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-2">Tiếng Việt:</h4>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {currentWord?.vietnamese || "Nghĩa tiếng Việt sẽ được cập nhật sau"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Ví dụ</h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="space-y-2">
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {currentWord?.example ? (
                              <>
                                "{currentWord.example}"
                              </>
                            ) : (
                              "Ví dụ sẽ được cập nhật sau"
                            )}
                          </p>
                          {currentWord?.exampleVietnamese && (
                            <p className="text-gray-600 italic text-sm">
                              ({currentWord.exampleVietnamese})
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "etymology" && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Nguồn gốc từ vựng</h3>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                          <div>
                            <strong className="text-purple-900 text-sm">Gốc Latin:</strong>
                            <span className="text-gray-700 ml-2 text-sm">"resilire" có nghĩa là "nhảy trở lại" hoặc "bật trở lại"</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                          <div>
                            <strong className="text-purple-900 text-sm">Tiền tố:</strong>
                            <span className="text-gray-700 ml-2 text-sm">"re-" (trở lại) + "salire" (nhảy)</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                          <div>
                            <strong className="text-purple-900 text-sm">Xuất hiện:</strong>
                            <span className="text-gray-700 ml-2 text-sm">Thế kỷ 17, ban đầu được sử dụng trong vật lý học để mô tả tính chất đàn hồi của vật liệu</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                          <div>
                            <strong className="text-purple-900 text-sm">Mở rộng nghĩa:</strong>
                            <span className="text-gray-700 ml-2 text-sm">Thế kỷ 20, được áp dụng vào tâm lý học và khoa học xã hội</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "phrases" && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Cụm từ thường gặp</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="font-semibold text-blue-900 mb-1 text-sm">Emotional resilience</p>
                        <p className="text-xs text-blue-700">Sức bền cảm xúc</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="font-semibold text-green-900 mb-1 text-sm">Build resilience</p>
                        <p className="text-xs text-green-700">Xây dựng sức bền/khả năng phục hồi</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="font-semibold text-purple-900 mb-1 text-sm">Resilience training</p>
                        <p className="text-xs text-purple-700">Đào tạo khả năng phục hồi</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="font-semibold text-orange-900 mb-1 text-sm">Mental resilience</p>
                        <p className="text-xs text-orange-700">Sức bền tinh thần</p>
                      </div>
                      <div className="bg-pink-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="font-semibold text-pink-900 mb-1 text-sm">Show remarkable resilience</p>
                        <p className="text-xs text-pink-700">Thể hiện khả năng phục hồi đáng kinh ngạc</p>
                      </div>
                      <div className="bg-indigo-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="font-semibold text-indigo-900 mb-1 text-sm">Economic resilience</p>
                        <p className="text-xs text-indigo-700">Sức bền kinh tế</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Word Counter and Edit Button */}
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-200 px-2 md:px-3">
                <div></div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs font-medium text-gray-600">
                    {currentWordIndex + 1}/{filteredWords.length}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-6 h-6 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-3 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-600 font-medium">
            <Users className="h-3 w-3 mr-1 text-blue-600" />
            Đã học: <span className="text-blue-600 font-semibold ml-1">{card.studyCount || 0}</span> lần
          </div>

          <div className="flex space-x-2">
            {viewMode === "list" ? (
              <Button 
                onClick={handleViewDetail}
                variant="outline" 
                size="sm" 
                className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 h-7 text-xs px-2"
                disabled={filteredWords.length === 0}
              >
                Xem chi tiết
              </Button>
            ) : (
              <Button 
                onClick={handleBackToList}
                variant="outline" 
                size="sm" 
                className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 h-7 text-xs px-2"
              >
                Quay lại danh sách
              </Button>
            )}
            <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 h-7 text-xs px-2">
              <Plus className="h-3 w-3 mr-1" />
              Thêm từ vựng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}