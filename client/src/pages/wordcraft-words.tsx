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
import { ArrowLeft, Search, Settings, Star, BookOpen, Users, Plus, Edit, Volume2, X, ChevronDown, ChevronUp, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VocabularyCard, VocabularyWord, InsertVocabularyWord } from "@shared/schema";

import leftArrowIcon from "@assets/left-arrow_1750231743172.png";
import rightArrowIcon from "@assets/right-arrow_1750231743193.png";

export default function WordcraftWords() {
  const { cardId } = useParams<{ cardId: string }>();
  const [location] = useLocation();
  
  // Check URL params for initial view mode
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialViewMode = urlParams.get('view') === 'detail' ? 'detail' : 'list';
  
  const [viewMode, setViewMode] = useState<"list" | "detail">(initialViewMode);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("definition");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCreatingVocab, setIsCreatingVocab] = useState(false);
  const [creationProgress, setCreationProgress] = useState(0);
  const [vocabularyEntries, setVocabularyEntries] = useState([
    {
      id: 1,
      word: "",
      pronunciation: "",
      partOfSpeech: "",
      englishDefinition: "",
      vietnameseDefinition: "",
      example: "",
      content: "",
      isExpanded: false
    }
  ]);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addVocabularyEntry = () => {
    const newId = Math.max(...vocabularyEntries.map(v => v.id)) + 1;
    setVocabularyEntries([...vocabularyEntries, {
      id: newId,
      word: "",
      pronunciation: "",
      partOfSpeech: "",
      englishDefinition: "",
      vietnameseDefinition: "",
      example: "",
      content: "",
      isExpanded: false
    }]);
  };

  const removeVocabularyEntry = (id: number) => {
    if (vocabularyEntries.length > 1) {
      setVocabularyEntries(vocabularyEntries.filter(v => v.id !== id));
    }
  };

  const updateVocabularyEntry = (id: number, field: string, value: string) => {
    setVocabularyEntries(vocabularyEntries.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const toggleEntryExpansion = (id: number) => {
    setVocabularyEntries(vocabularyEntries.map(v => 
      v.id === id ? { ...v, isExpanded: !v.isExpanded } : v
    ));
  };

  const resetForm = () => {
    setVocabularyEntries([{
      id: 1,
      word: "",
      pronunciation: "",
      partOfSpeech: "",
      englishDefinition: "",
      vietnameseDefinition: "",
      example: "",
      content: "",
      isExpanded: false
    }]);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const { data: card } = useQuery<VocabularyCard>({
    queryKey: [`/api/vocabulary-cards/${cardId}`],
    enabled: !!cardId,
  });

  const favoriteMutation = useMutation({
    mutationFn: async (isFavorited: boolean) => {
      const response = await apiRequest("PATCH", `/api/vocabulary-cards/${cardId}/favorite`, {
        isFavorited
      });
      return response.json();
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
    }
  });

  const handleAddVocabularies = async () => {
    const validEntries = vocabularyEntries.filter(entry => entry.word.trim());
    
    if (validEntries.length === 0) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng nhập ít nhất một từ vựng.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingVocab(true);
    setCreationProgress(0);

    const progressInterval = setInterval(() => {
      setCreationProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      for (let i = 0; i < validEntries.length; i++) {
        const entry = validEntries[i];
        const vocabToCreate = {
          word: entry.word,
          pronunciation: entry.pronunciation || "",
          partOfSpeech: entry.partOfSpeech || "N",
          definition: entry.content || entry.word,
          vietnamese: entry.vietnameseDefinition || entry.word,
          example: entry.example || `Example: ${entry.word}`,
          exampleVietnamese: `Ví dụ: ${entry.word}`,
          tags: []
        };

        await addWordMutation.mutateAsync(vocabToCreate);
      }

      clearInterval(progressInterval);
      setCreationProgress(100);
      
      setTimeout(() => {
        toast({
          title: "Thành công!",
          description: `Đã thêm ${validEntries.length} từ vựng thành công.`,
        });
        
        resetForm();
        setIsAddDialogOpen(false);
        setIsCreatingVocab(false);
        setCreationProgress(0);
      }, 500);
      
    } catch (error) {
      clearInterval(progressInterval);
      setIsCreatingVocab(false);
      setCreationProgress(0);
    }
  };

  const handleFavoriteToggle = () => {
    const newFavoriteState = !card?.isFavorited;
    favoriteMutation.mutate(newFavoriteState);
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

  const getPartOfSpeechColor = (pos: string) => {
    switch (pos) {
      case "N": return "bg-blue-100 text-blue-800";
      case "V": return "bg-green-100 text-green-800";
      case "Adj": return "bg-purple-100 text-purple-800";
      case "Adv": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (wordsLoading) {
    return <div className="flex items-center justify-center p-8">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/wordcraft">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold">{card?.title || "Từ vựng Kinh doanh Cơ bản"}</h1>
                <p className="text-xs text-blue-100">{card?.description || "Học từ vựng kinh doanh cơ bản"}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-xs text-blue-100">
                {filteredWords.length} từ vựng
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 p-1"
                onClick={handleFavoriteToggle}
                disabled={favoriteMutation.isPending}
              >
                <Star className={`h-4 w-4 ${card?.isFavorited ? 'fill-current text-yellow-300' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons and Search - Only in List View */}
      {viewMode === "list" && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm từ vựng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            
            <Button 
              onClick={() => setViewMode("detail")}
              variant="outline" 
              size="sm" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 h-9 text-sm px-3"
              disabled={filteredWords.length === 0}
            >
              Xem chi tiết
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => !isCreatingVocab && setIsAddDialogOpen(open)}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 h-9 text-sm px-3">
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm từ vựng
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b">
                  <DialogTitle className="text-lg font-semibold">Thêm từ vựng</DialogTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full hover:bg-gray-100" 
                    onClick={() => !isCreatingVocab && setIsAddDialogOpen(false)}
                    disabled={isCreatingVocab}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </DialogHeader>

                {isCreatingVocab ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-600 font-medium">Đang tạo thẻ từ vựng: {Math.round(creationProgress)}%</p>
                  </div>
                ) : (
                  <div className="space-y-4 pt-4">
                    {/* Vocabulary Entries */}
                    <div className="space-y-3">
                      {vocabularyEntries.map((entry, index) => (
                        <div key={entry.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-sm font-medium">
                                {index + 1}
                              </div>
                              <span className="text-sm font-medium text-gray-700">Từ vựng</span>
                              <div className="flex items-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => toggleEntryExpansion(entry.id)}
                                >
                                  {entry.isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeVocabularyEntry(entry.id)}
                              disabled={vocabularyEntries.length === 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Input
                            value={entry.word}
                            onChange={(e) => updateVocabularyEntry(entry.id, 'word', e.target.value)}
                            placeholder="illuminate"
                            className="mb-2 bg-white"
                          />

                          {entry.isExpanded && (
                            <div className="space-y-3 mt-3 pt-3 border-t border-gray-200">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                                <Textarea
                                  value={entry.content}
                                  onChange={(e) => updateVocabularyEntry(entry.id, 'content', e.target.value)}
                                  placeholder="Nhập nội dung chi tiết..."
                                  rows={4}
                                  className="bg-white text-sm resize-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add More Button */}
                    <Button 
                      variant="outline" 
                      onClick={addVocabularyEntry}
                      className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 py-6"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Thêm từ
                    </Button>

                    {/* Bottom Section */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bộ thẻ:</label>
                            <span className="text-sm text-gray-900">{card?.title || "Từ vựng Kinh doanh Cơ bản"}</span>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Số từ:</label>
                            <span className="text-sm text-gray-900">
                              {vocabularyEntries.filter(e => e.word.trim()).length} từ
                            </span>
                          </div>
                        </div>
                        <Button 
                          onClick={handleAddVocabularies}
                          disabled={vocabularyEntries.filter(e => e.word.trim()).length === 0}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                        >
                          Thêm từ vựng
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
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
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setViewMode("list")}
                variant="outline" 
                size="sm" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 h-9 text-sm px-3"
              >
                Quay lại danh sách
              </Button>
              
              <div className="flex items-center space-x-2">
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => !isCreatingVocab && setIsAddDialogOpen(open)}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 h-9 text-sm px-3">
                      <Plus className="h-4 w-4 mr-1" />
                      Thêm từ vựng
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" onPointerDownOutside={(e) => e.preventDefault()}>
                    <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b">
                      <DialogTitle className="text-lg font-semibold">Thêm từ vựng</DialogTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full hover:bg-gray-100" 
                        onClick={() => !isCreatingVocab && setIsAddDialogOpen(false)}
                        disabled={isCreatingVocab}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </DialogHeader>

                    {isCreatingVocab ? (
                      <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-600 font-medium">Đang tạo thẻ từ vựng: {Math.round(creationProgress)}%</p>
                      </div>
                    ) : (
                      <div className="space-y-4 pt-4">
                        {/* Vocabulary Entries */}
                        <div className="space-y-3">
                          {vocabularyEntries.map((entry, index) => (
                            <div key={entry.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-sm font-medium">
                                    {index + 1}
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">Từ vựng</span>
                                  <div className="flex items-center space-x-1">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-6 w-6 p-0"
                                      onClick={() => toggleEntryExpansion(entry.id)}
                                    >
                                      {entry.isExpanded ? (
                                        <ChevronUp className="h-4 w-4" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => removeVocabularyEntry(entry.id)}
                                  disabled={vocabularyEntries.length === 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </div>

                              <Input
                                value={entry.word}
                                onChange={(e) => updateVocabularyEntry(entry.id, 'word', e.target.value)}
                                placeholder="illuminate"
                                className="mb-2 bg-white"
                              />

                              {entry.isExpanded && (
                                <div className="space-y-3 mt-3 pt-3 border-t border-gray-200">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                                    <Textarea
                                      value={entry.content}
                                      onChange={(e) => updateVocabularyEntry(entry.id, 'content', e.target.value)}
                                      placeholder="Nhập nội dung chi tiết..."
                                      rows={4}
                                      className="bg-white text-sm resize-none"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Add More Button */}
                        <Button 
                          variant="outline" 
                          onClick={addVocabularyEntry}
                          className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 py-6"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Thêm từ
                        </Button>

                        {/* Bottom Section */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bộ thẻ:</label>
                                <span className="text-sm text-gray-900">{card?.title || "Từ vựng Kinh doanh Cơ bản"}</span>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Số từ:</label>
                                <span className="text-sm text-gray-900">
                                  {vocabularyEntries.filter(e => e.word.trim()).length} từ
                                </span>
                              </div>
                            </div>
                            <Button 
                              onClick={handleAddVocabularies}
                              disabled={vocabularyEntries.filter(e => e.word.trim()).length === 0}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                            >
                              Thêm từ vựng
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 h-9 text-sm px-3"
                >
                  Xem danh sách từ
                </Button>
              </div>
            </div>
          </div>

          {/* Word Detail Content */}
          {currentWord && (
            <div className="p-0">
              {/* Header with word info and navigation */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-bold">{currentWord.word}</h2>
                    <span className="text-blue-200 text-sm italic">{currentWord.pronunciation}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {currentWord.partOfSpeech}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-200">
                      {currentWordIndex + 1}/{filteredWords.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToWord("prev")}
                  disabled={currentWordIndex === 0}
                  className="bg-white shadow-lg hover:bg-gray-50 p-2"
                >
                  <img src={leftArrowIcon} alt="Previous" className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToWord("next")}
                  disabled={currentWordIndex === filteredWords.length - 1}
                  className="bg-white shadow-lg hover:bg-gray-50 p-2"
                >
                  <img src={rightArrowIcon} alt="Next" className="w-5 h-5" />
                </Button>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200 bg-white px-4">
                <div className="flex space-x-6">
                  {["definition", "etymology", "phrases"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab === "definition" && "Định nghĩa"}
                      {tab === "etymology" && "Từ nguyên"}
                      {tab === "phrases" && "Cụm từ phổ biến"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 min-h-[250px]">
                {activeTab === "definition" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Định nghĩa</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Tiếng Anh</h4>
                          <p className="text-gray-700 leading-relaxed">
                            {currentWord.definition || "Định nghĩa sẽ được cập nhật sau"}
                          </p>
                        </div>
                        
                        {currentWord.vietnamese && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-medium text-green-900 mb-2">Tiếng Việt</h4>
                            <p className="text-gray-700 leading-relaxed">
                              {currentWord.vietnamese}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {currentWord.example && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ví dụ</h3>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-gray-700 leading-relaxed mb-2">
                            "{currentWord.example}"
                          </p>
                          {currentWord.exampleVietnamese && (
                            <p className="text-gray-600 italic">
                              ({currentWord.exampleVietnamese})
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "etymology" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Từ nguyên</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">
                        Từ "{currentWord.word}" có nguồn gốc từ tiếng Latin, được sử dụng rộng rãi trong ngữ cảnh kinh doanh và học thuật.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "phrases" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Cụm từ phổ biến</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="font-medium text-gray-900">Common {currentWord.word.toLowerCase()}</p>
                        <p className="text-gray-600 text-sm">Cụm từ thường gặp với "{currentWord.word}"</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="font-medium text-gray-900">{currentWord.word} approach</p>
                        <p className="text-gray-600 text-sm">Phương pháp tiếp cận liên quan đến "{currentWord.word}"</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with statistics and edit button */}
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Học từ vựng</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Số lần đã học: 7 lần
                  </div>
                </div>
              </div>

              {/* Edit Button - Fixed Position */}
              <Button 
                size="sm" 
                className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-full p-3 z-20"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>)
      )}
    </div>
  );
}