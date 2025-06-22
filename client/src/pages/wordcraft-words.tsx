import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Search, Settings, Star, BookOpen, Users, Plus, Edit, Volume2, X, ChevronDown } from "lucide-react";
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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newWord, setNewWord] = useState({
    word: "",
    pronunciation: "",
    partOfSpeech: "",
    definition: "",
    vietnamese: "",
    example: "",
    exampleVietnamese: ""
  });
  const queryClient = useQueryClient();

  const resetForm = () => {
    setNewWord({
      word: "",
      pronunciation: "",
      partOfSpeech: "",
      definition: "",
      vietnamese: "",
      example: "",
      exampleVietnamese: ""
    });
  };

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

  const addWordMutation = useMutation({
    mutationFn: async (wordData: any) => {
      return await apiRequest("POST", "/api/vocabulary-words", {
        ...wordData,
        cardId: parseInt(cardId!)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/vocabulary-cards/${cardId}/words`] });
      queryClient.invalidateQueries({ queryKey: [`/api/vocabulary-cards/${cardId}`] });
      setIsAddDialogOpen(false);
      resetForm();
    }
  });

  const handleFavoriteToggle = () => {
    const newFavoriteState = !card?.isFavorited;
    favoriteMutation.mutate(newFavoriteState);
  };

  const handleAddWord = () => {
    if (!newWord.word.trim() || !newWord.definition.trim()) {
      return;
    }
    addWordMutation.mutate(newWord);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    resetForm();
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
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-sm relative">
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
              
              {/* Statistics Row */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-blue-200">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-1 text-blue-600" />
                  <span className="font-medium">{card.wordCount || filteredWords.length}</span>
                  <span className="ml-1">từ vựng</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1 text-green-600" />
                  <span className="font-medium">{card.studyCount || 7}</span>
                  <span className="ml-1">lần đã học</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Search Bar and Action Buttons - Only show in list view */}
      {viewMode === "list" && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm từ mô tả bạn muốn ôn lại"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20 h-9"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Search className="h-3 w-3 mr-1" />
              Tìm
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleViewDetail}
              variant="outline" 
              size="sm" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 h-9 text-sm px-3"
              disabled={filteredWords.length === 0}
            >
              Xem chi tiết
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 h-9 text-sm px-3">
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm từ vựng
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-900">Thêm từ vựng mới</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {/* Row 1: Word, Pronunciation, Part of Speech */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="word" className="text-sm font-medium">
                        Từ vựng <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="word"
                        value={newWord.word}
                        onChange={(e) => setNewWord({...newWord, word: e.target.value})}
                        placeholder="Nhập từ vựng"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pronunciation" className="text-sm font-medium">Phiên âm</Label>
                      <Input
                        id="pronunciation"
                        value={newWord.pronunciation}
                        onChange={(e) => setNewWord({...newWord, pronunciation: e.target.value})}
                        placeholder="/ˈwɜːrd/"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partOfSpeech" className="text-sm font-medium">Loại từ</Label>
                      <Select value={newWord.partOfSpeech} onValueChange={(value) => setNewWord({...newWord, partOfSpeech: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại từ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N">Danh từ (N)</SelectItem>
                          <SelectItem value="V">Động từ (V)</SelectItem>
                          <SelectItem value="Adj">Tính từ (Adj)</SelectItem>
                          <SelectItem value="Adv">Trạng từ (Adv)</SelectItem>
                          <SelectItem value="Prep">Giới từ (Prep)</SelectItem>
                          <SelectItem value="Conj">Liên từ (Conj)</SelectItem>
                          <SelectItem value="Phrase">Cụm từ (Phrase)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 2: Definition */}
                  <div className="space-y-2">
                    <Label htmlFor="definition" className="text-sm font-medium">
                      Định nghĩa (Tiếng Anh) <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="definition"
                      value={newWord.definition}
                      onChange={(e) => setNewWord({...newWord, definition: e.target.value})}
                      placeholder="Nhập định nghĩa tiếng Anh"
                      rows={3}
                      className="w-full"
                    />
                  </div>

                  {/* Row 3: Vietnamese Definition */}
                  <div className="space-y-2">
                    <Label htmlFor="vietnamese" className="text-sm font-medium">Định nghĩa (Tiếng Việt)</Label>
                    <Textarea
                      id="vietnamese"
                      value={newWord.vietnamese}
                      onChange={(e) => setNewWord({...newWord, vietnamese: e.target.value})}
                      placeholder="Nhập định nghĩa tiếng Việt"
                      rows={2}
                      className="w-full"
                    />
                  </div>

                  {/* Row 4: Example */}
                  <div className="space-y-2">
                    <Label htmlFor="example" className="text-sm font-medium">Ví dụ (Tiếng Anh)</Label>
                    <Textarea
                      id="example"
                      value={newWord.example}
                      onChange={(e) => setNewWord({...newWord, example: e.target.value})}
                      placeholder="Nhập ví dụ tiếng Anh"
                      rows={2}
                      className="w-full"
                    />
                  </div>

                  {/* Row 5: Vietnamese Example */}
                  <div className="space-y-2">
                    <Label htmlFor="exampleVietnamese" className="text-sm font-medium">Ví dụ (Tiếng Việt)</Label>
                    <Textarea
                      id="exampleVietnamese"
                      value={newWord.exampleVietnamese}
                      onChange={(e) => setNewWord({...newWord, exampleVietnamese: e.target.value})}
                      placeholder="Nhập ví dụ tiếng Việt"
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Dialog Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={handleDialogClose}
                    className="px-4 py-2"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleAddWord}
                    disabled={!newWord.word.trim() || !newWord.definition.trim() || addWordMutation.isPending}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {addWordMutation.isPending ? "Đang thêm..." : "Thêm từ vựng"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
      {/* Words Content - List or Detail View */}
      {viewMode === "list" ? (
        /* Words Accordion Cards */
        (<div className="space-y-2">
          <Accordion type="multiple" className="w-full">
            {filteredWords.map((word, index) => (
              <AccordionItem 
                key={word.id} 
                value={`word-${word.id}`}
                className="border border-gray-200 rounded-lg mb-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 [&>svg]:h-4 [&>svg]:w-4">
                  <div className="flex items-center justify-between w-full pr-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 min-w-[2rem]">#{index + 1}</span>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-semibold text-gray-900">{word.word}</h3>
                        <span className="text-gray-400 hover:text-blue-500 p-1 cursor-pointer">
                          <Volume2 className="h-3 w-3" />
                        </span>
                        <span className="text-sm text-gray-600 italic">{word.pronunciation}</span>
                        <Badge variant="secondary" className={`text-xs ${getPartOfSpeechColor(word.partOfSpeech)}`}>
                          {word.partOfSpeech}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-gray-400 hover:text-yellow-500 p-1 cursor-pointer">
                      <Star className="h-4 w-4" />
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-4">
                    {/* English Definition */}
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2 text-sm">Định nghĩa 1: Tiếng Anh</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {word.definition || "Định nghĩa sẽ được cập nhật sau"}
                      </p>
                    </div>
                    
                    {/* Vietnamese Definition */}
                    {word.vietnamese && (
                      <div>
                        <h4 className="font-medium text-green-900 mb-2 text-sm">Định nghĩa 2: Tiếng Việt</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {word.vietnamese}
                        </p>
                      </div>
                    )}
                    
                    {/* Example */}
                    {word.example && (
                      <div>
                        <h4 className="font-medium text-purple-900 mb-2 text-sm">Ví dụ</h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            "{word.example}"
                          </p>
                          {word.exampleVietnamese && (
                            <p className="text-gray-600 italic text-sm mt-1">
                              ({word.exampleVietnamese})
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>)
      ) : (
        /* Word Detail View */
        (<div className="w-full mx-auto">
          {/* Action Buttons for Detail View */}
          <div className="mb-4 flex items-center justify-end gap-2">
            <Button 
              onClick={handleBackToList}
              variant="outline" 
              size="sm" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 h-9 text-sm px-3"
            >
              Xem danh sách từ
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 h-9 text-sm px-3">
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm từ vựng
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-900">Thêm từ vựng mới</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {/* Row 1: Word, Pronunciation, Part of Speech */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="word" className="text-sm font-medium">
                        Từ vựng <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="word"
                        value={newWord.word}
                        onChange={(e) => setNewWord({...newWord, word: e.target.value})}
                        placeholder="Nhập từ vựng"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pronunciation" className="text-sm font-medium">Phiên âm</Label>
                      <Input
                        id="pronunciation"
                        value={newWord.pronunciation}
                        onChange={(e) => setNewWord({...newWord, pronunciation: e.target.value})}
                        placeholder="/ˈwɜːrd/"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partOfSpeech" className="text-sm font-medium">Loại từ</Label>
                      <Select value={newWord.partOfSpeech} onValueChange={(value) => setNewWord({...newWord, partOfSpeech: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại từ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N">Danh từ (N)</SelectItem>
                          <SelectItem value="V">Động từ (V)</SelectItem>
                          <SelectItem value="Adj">Tính từ (Adj)</SelectItem>
                          <SelectItem value="Adv">Trạng từ (Adv)</SelectItem>
                          <SelectItem value="Prep">Giới từ (Prep)</SelectItem>
                          <SelectItem value="Conj">Liên từ (Conj)</SelectItem>
                          <SelectItem value="Phrase">Cụm từ (Phrase)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 2: Definition */}
                  <div className="space-y-2">
                    <Label htmlFor="definition" className="text-sm font-medium">
                      Định nghĩa (Tiếng Anh) <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="definition"
                      value={newWord.definition}
                      onChange={(e) => setNewWord({...newWord, definition: e.target.value})}
                      placeholder="Nhập định nghĩa tiếng Anh"
                      rows={3}
                      className="w-full"
                    />
                  </div>

                  {/* Row 3: Vietnamese Definition */}
                  <div className="space-y-2">
                    <Label htmlFor="vietnamese" className="text-sm font-medium">Định nghĩa (Tiếng Việt)</Label>
                    <Textarea
                      id="vietnamese"
                      value={newWord.vietnamese}
                      onChange={(e) => setNewWord({...newWord, vietnamese: e.target.value})}
                      placeholder="Nhập định nghĩa tiếng Việt"
                      rows={2}
                      className="w-full"
                    />
                  </div>

                  {/* Row 4: Example */}
                  <div className="space-y-2">
                    <Label htmlFor="example" className="text-sm font-medium">Ví dụ (Tiếng Anh)</Label>
                    <Textarea
                      id="example"
                      value={newWord.example}
                      onChange={(e) => setNewWord({...newWord, example: e.target.value})}
                      placeholder="Nhập ví dụ tiếng Anh"
                      rows={2}
                      className="w-full"
                    />
                  </div>

                  {/* Row 5: Vietnamese Example */}
                  <div className="space-y-2">
                    <Label htmlFor="exampleVietnamese" className="text-sm font-medium">Ví dụ (Tiếng Việt)</Label>
                    <Textarea
                      id="exampleVietnamese"
                      value={newWord.exampleVietnamese}
                      onChange={(e) => setNewWord({...newWord, exampleVietnamese: e.target.value})}
                      placeholder="Nhập ví dụ tiếng Việt"
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Dialog Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={handleDialogClose}
                    className="px-4 py-2"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleAddWord}
                    disabled={!newWord.word.trim() || !newWord.definition.trim() || addWordMutation.isPending}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {addWordMutation.isPending ? "Đang thêm..." : "Thêm từ vựng"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-stretch gap-2 md:gap-4">
            {/* Left Navigation Arrow */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => navigateToWord("prev")}
                disabled={currentWordIndex <= 0}
                className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center hover:opacity-70 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-white rounded-full shadow-md border border-gray-200 hover:shadow-lg"
              >
                <img 
                  src={leftArrowIcon} 
                  alt="Previous" 
                  className="w-5 h-5 md:w-8 md:h-8 object-contain"
                />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-lg border-2 border-gray-200 shadow-sm overflow-hidden">
              <div className="p-0">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg md:text-2xl font-bold text-gray-900">{currentWord?.word || "Resilience"}</h2>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-500 p-1">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <span className="text-sm md:text-base text-gray-600 italic">{currentWord?.pronunciation || "/rɪˈzɪljəns/"}</span>
                    <Badge variant="secondary" className={getPartOfSpeechColor(currentWord?.partOfSpeech || "N")}>
                      {currentWord?.partOfSpeech || "N"}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mb-2 md:mb-3">
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
                  <div className="flex items-center justify-center flex-1">
                    <div className="text-sm font-semibold text-gray-700">
                      {currentWordIndex + 1}/{filteredWords.length}
                    </div>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-7 h-7 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-md transition-all duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Navigation Arrow */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => navigateToWord("next")}
                disabled={currentWordIndex >= filteredWords.length - 1}
                className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center hover:opacity-70 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-white rounded-full shadow-md border border-gray-200 hover:shadow-lg"
              >
                <img 
                  src={rightArrowIcon} 
                  alt="Next" 
                  className="w-5 h-5 md:w-8 md:h-8 object-contain"
                />
              </button>
            </div>
          </div>
        </div>)
      )}
    </div>
  );
}