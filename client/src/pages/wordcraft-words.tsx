import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Search, Settings, Star, BookOpen, Users, Plus, Edit, Volume2, X, ChevronDown, Minus } from "lucide-react";
import closeIcon from "@assets/close_1750834202412.png";
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
  
  // Vocabulary entries for accordion-style popup
  const [vocabEntries, setVocabEntries] = useState([
    { id: 1, word: "", content: "", isExpanded: false }
  ]);
  
  const queryClient = useQueryClient();

  const resetVocabForm = () => {
    setVocabEntries([{ id: 1, word: "", content: "", isExpanded: false }]);
  };

  const addVocabEntry = () => {
    const newId = Math.max(...vocabEntries.map(e => e.id)) + 1;
    setVocabEntries([...vocabEntries, { id: newId, word: "", content: "", isExpanded: false }]);
  };

  const removeVocabEntry = (id: number) => {
    if (vocabEntries.length > 1) {
      setVocabEntries(vocabEntries.filter(entry => entry.id !== id));
    }
  };

  const updateVocabEntry = (id: number, field: string, value: string) => {
    setVocabEntries(vocabEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const toggleVocabExpansion = (id: number) => {
    setVocabEntries(vocabEntries.map(entry => 
      entry.id === id ? { ...entry, isExpanded: !entry.isExpanded } : entry
    ));
  };

  const resetForm = () => {
    resetVocabForm();
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
    mutationFn: async (wordEntries: any[]) => {
      const promises = wordEntries.map(entry => 
        apiRequest("POST", "/api/vocabulary-words", {
          word: entry.word,
          definition: entry.content || "",
          vietnamese: "",
          example: "",
          exampleVietnamese: "",
          pronunciation: "",
          partOfSpeech: "N",
          cardId: parseInt(cardId!)
        })
      );
      return Promise.all(promises);
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

  const handleAddVocab = () => {
    const validEntries = vocabEntries.filter(entry => entry.word.trim());
    if (validEntries.length === 0) return;
    
    addWordMutation.mutate(validEntries);
  };

  const { data: words = [], isLoading: wordsLoading } = useQuery<VocabularyWord[]>({
    queryKey: [`/api/vocabulary-cards/${cardId}/words`],
    enabled: !!cardId,
  });

  const filteredWords = words.filter(word =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentWord = filteredWords[currentWordIndex];

  const navigateToWord = (direction: "prev" | "next") => {
    if (direction === "prev" && currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    } else if (direction === "next" && currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handleDetailViewClick = () => {
    if (filteredWords.length > 0) {
      setViewMode("detail");
      setCurrentWordIndex(0);
    }
  };

  const handleBackToList = () => {
    setViewMode("list");
  };

  const getPartOfSpeechColor = (partOfSpeech: string) => {
    const colors: { [key: string]: string } = {
      "N": "bg-blue-100 text-blue-800 border-blue-200",
      "V": "bg-green-100 text-green-800 border-green-200",
      "Adj": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Adv": "bg-purple-100 text-purple-800 border-purple-200",
      "Prep": "bg-pink-100 text-pink-800 border-pink-200",
      "Conj": "bg-gray-100 text-gray-800 border-gray-200",
      "Phrase": "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[partOfSpeech] || colors["N"];
  };

  if (cardLoading || wordsLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-3">
        {/* Header - Back Button */}
        <div className="mb-4">
          <Link href="/wordcraft">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Button>
          </Link>
        </div>

        {/* Card Info Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            {/* Card Title and Star */}
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-900">{card?.title || "Tên bộ thẻ"}</h1>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-yellow-500 p-1"
                onClick={handleFavoriteToggle}
                disabled={favoriteMutation.isPending}
              >
                <Star className={`h-5 w-5 ${card?.isFavorited ? 'text-yellow-500 fill-current' : ''}`} />
              </Button>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-700 mb-3 text-sm leading-relaxed">
            {card?.description || "Mô tả bộ thẻ sẽ được cập nhật sau"}
          </p>
          
          {/* Info Row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              {/* Topic */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-500">Chủ đề:</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  {card?.category || "Business"}
                </Badge>
              </div>
              
              {/* Word Count */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-500">Số từ:</span>
                <span className="font-medium text-gray-900">{filteredWords.length} từ vựng</span>
              </div>
            </div>
            
            {/* Study Count */}
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">Đã học:</span>
              <span className="font-medium text-gray-900">{card?.studyCount || 4} lần</span>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        {viewMode === "list" && (
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm từ vựng..."
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
                onClick={handleDetailViewClick}
                variant="outline" 
                size="sm" 
                className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 h-9 text-sm px-3"
                disabled={filteredWords.length === 0}
              >
                Xem chi tiết
              </Button>
              
              <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                if (!addWordMutation.isPending) {
                  setIsAddDialogOpen(open);
                  if (open) {
                    resetForm();
                  }
                }
              }}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 h-9 text-sm px-3">
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm từ vựng
                  </Button>
                </DialogTrigger>
                <DialogContent 
                  className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0"
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => {
                    if (!addWordMutation.isPending) {
                      setIsAddDialogOpen(false);
                      resetForm();
                    }
                  }}
                >
                  {/* Header - Fixed */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
                    <h2 className="text-lg font-semibold text-gray-900">Thêm từ vựng</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-100"
                      onClick={() => {
                        if (!addWordMutation.isPending) {
                          setIsAddDialogOpen(false);
                          resetForm();
                        }
                      }}
                    >
                      <img src={closeIcon} alt="Close" className="h-4 w-4" />
                    </Button>
                  </div>

                  {addWordMutation.isPending ? (
                    /* Loading State */
                    <div className="flex flex-col items-center justify-center p-8 space-y-4">
                      <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                      <p className="text-emerald-700 font-medium">Đang thêm từ vựng...</p>
                      <p className="text-emerald-600 text-sm">
                        {Math.round((100 / vocabEntries.filter(e => e.word.trim()).length) * 50)}%
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Content - Scrollable */}
                      <div className="flex-1 overflow-y-auto p-3">
                        <div className="space-y-2">
                          {vocabEntries.map((entry, index) => (
                            <div key={entry.id} className="flex items-start gap-2">
                              {/* Sequence number outside card - left */}
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium mt-2 flex-shrink-0 shadow-sm">
                                {index + 1}
                              </span>
                              
                              {/* Card content */}
                              <div className="flex-1 border border-emerald-200 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                                <div className="p-0">
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <label className="block text-xs font-medium text-emerald-700">
                                        Từ vựng <span className="text-red-500">*</span>
                                      </label>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-1 h-5 px-1 hover:bg-emerald-100 flex-shrink-0"
                                        onClick={() => toggleVocabExpansion(entry.id)}
                                      >
                                        <span className="text-xs text-emerald-600">Thêm nội dung</span>
                                        {entry.isExpanded ? (
                                          <div className="h-3 w-3 bg-emerald-600" style={{
                                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                                          }}></div>
                                        ) : (
                                          <div className="h-3 w-3 bg-emerald-600" style={{
                                            clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)'
                                          }}></div>
                                        )}
                                      </Button>
                                    </div>
                                    <Input
                                      value={entry.word}
                                      onChange={(e) => updateVocabEntry(entry.id, "word", e.target.value)}
                                      placeholder="Nhập từ vựng ở đây (Ví dụ: illuminate)"
                                      className="bg-white h-8 text-sm border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
                                    />
                                  </div>

                                  {/* Expanded Content */}
                                  {entry.isExpanded && (
                                    <div className="mt-3">
                                      <label className="block text-xs font-medium text-emerald-700 mb-2">
                                        Nội dung
                                      </label>
                                      <Textarea
                                        value={entry.content}
                                        onChange={(e) => updateVocabEntry(entry.id, "content", e.target.value)}
                                        placeholder="Nhập nội dung liên quan đến từ vựng ở đây như định nghĩa, ví dụ,...."
                                        rows={3}
                                        className="bg-white text-sm border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Delete button outside card - right */}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full mt-2 flex-shrink-0"
                                onClick={() => removeVocabEntry(entry.id)}
                                disabled={vocabEntries.length === 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Add Word Button */}
                        <Button
                          variant="outline"
                          onClick={addVocabEntry}
                          className="w-auto flex items-center gap-2 border-dashed border-emerald-300 text-emerald-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 h-8 text-sm transition-colors mt-2"
                        >
                          <Plus className="h-3 w-3" />
                          Thêm từ
                        </Button>
                      </div>

                      {/* Footer - Fixed */}
                      <div className="border-t border-emerald-200 p-3 flex-shrink-0 bg-gradient-to-r from-emerald-50 to-teal-50">
                        <div className="flex items-end justify-between">
                          {/* Word Count - Center */}
                          <div className="text-xs text-emerald-700 font-medium self-end pb-1">
                            Số từ: {vocabEntries.filter(entry => entry.word.trim()).length} từ
                          </div>

                          {/* Submit Button - Right */}
                          <Button 
                            onClick={handleAddVocab}
                            disabled={vocabEntries.filter(entry => entry.word.trim()).length === 0}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 h-8 text-sm shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            Thêm từ vựng
                          </Button>
                        </div>
                      </div>
                    </>
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
            <div className="mb-4 flex items-center justify-end gap-2">
              <Button 
                onClick={handleBackToList}
                variant="outline" 
                size="sm" 
                className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 h-9 text-sm px-3"
              >
                Xem danh sách từ
              </Button>
              
              <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                if (!addWordMutation.isPending) {
                  setIsAddDialogOpen(open);
                  if (open) {
                    resetForm();
                  }
                }
              }}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 h-9 text-sm px-3">
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm từ vựng
                  </Button>
                </DialogTrigger>
                <DialogContent 
                  className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0"
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => {
                    if (!addWordMutation.isPending) {
                      setIsAddDialogOpen(false);
                      resetForm();
                    }
                  }}
                >
                  {/* Header - Fixed */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
                    <h2 className="text-lg font-semibold text-gray-900">Thêm từ vựng</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-100"
                      onClick={() => {
                        if (!addWordMutation.isPending) {
                          setIsAddDialogOpen(false);
                          resetForm();
                        }
                      }}
                    >
                      <img src={closeIcon} alt="Close" className="h-4 w-4" />
                    </Button>
                  </div>

                  {addWordMutation.isPending ? (
                    /* Loading State */
                    <div className="flex flex-col items-center justify-center p-8 space-y-4">
                      <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                      <p className="text-emerald-700 font-medium">Đang thêm từ vựng...</p>
                      <p className="text-emerald-600 text-sm">
                        {Math.round((100 / vocabEntries.filter(e => e.word.trim()).length) * 50)}%
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Content - Scrollable */}
                      <div className="flex-1 overflow-y-auto p-3">
                        <div className="space-y-2">
                          {vocabEntries.map((entry, index) => (
                            <div key={entry.id} className="flex items-start gap-2">
                              {/* Sequence number outside card - left */}
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium mt-2 flex-shrink-0 shadow-sm">
                                {index + 1}
                              </span>
                              
                              {/* Card content */}
                              <div className="flex-1 border border-emerald-200 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                                <div className="p-0">
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <label className="block text-xs font-medium text-emerald-700">
                                        Từ vựng <span className="text-red-500">*</span>
                                      </label>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-1 h-5 px-1 hover:bg-emerald-100 flex-shrink-0"
                                        onClick={() => toggleVocabExpansion(entry.id)}
                                      >
                                        <span className="text-xs text-emerald-600">Thêm nội dung</span>
                                        {entry.isExpanded ? (
                                          <div className="h-3 w-3 bg-emerald-600" style={{
                                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                                          }}></div>
                                        ) : (
                                          <div className="h-3 w-3 bg-emerald-600" style={{
                                            clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)'
                                          }}></div>
                                        )}
                                      </Button>
                                    </div>
                                    <Input
                                      value={entry.word}
                                      onChange={(e) => updateVocabEntry(entry.id, "word", e.target.value)}
                                      placeholder="Nhập từ vựng ở đây (Ví dụ: illuminate)"
                                      className="bg-white h-8 text-sm border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
                                    />
                                  </div>

                                  {/* Expanded Content */}
                                  {entry.isExpanded && (
                                    <div className="mt-3">
                                      <label className="block text-xs font-medium text-emerald-700 mb-2">
                                        Nội dung
                                      </label>
                                      <Textarea
                                        value={entry.content}
                                        onChange={(e) => updateVocabEntry(entry.id, "content", e.target.value)}
                                        placeholder="Nhập nội dung liên quan đến từ vựng ở đây như định nghĩa, ví dụ,...."
                                        rows={3}
                                        className="bg-white text-sm border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Delete button outside card - right */}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full mt-2 flex-shrink-0"
                                onClick={() => removeVocabEntry(entry.id)}
                                disabled={vocabEntries.length === 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Add Word Button */}
                        <Button
                          variant="outline"
                          onClick={addVocabEntry}
                          className="w-auto flex items-center gap-2 border-dashed border-emerald-300 text-emerald-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 h-8 text-sm transition-colors mt-2"
                        >
                          <Plus className="h-3 w-3" />
                          Thêm từ
                        </Button>
                      </div>

                      {/* Footer - Fixed */}
                      <div className="border-t border-emerald-200 p-3 flex-shrink-0 bg-gradient-to-r from-emerald-50 to-teal-50">
                        <div className="flex items-end justify-between">
                          {/* Word Count - Center */}
                          <div className="text-xs text-emerald-700 font-medium self-end pb-1">
                            Số từ: {vocabEntries.filter(entry => entry.word.trim()).length} từ
                          </div>

                          {/* Submit Button - Right */}
                          <Button 
                            onClick={handleAddVocab}
                            disabled={vocabEntries.filter(entry => entry.word.trim()).length === 0}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 h-8 text-sm shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            Thêm từ vựng
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
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
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "phrases" && (
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">Cụm từ thường gặp</h3>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <div className="space-y-2">
                            <p className="text-gray-700 text-sm">• Show resilience - Thể hiện sự kiên cường</p>
                            <p className="text-gray-700 text-sm">• Build resilience - Xây dựng khả năng phục hồi</p>
                            <p className="text-gray-700 text-sm">• Emotional resilience - Sự kiên cường về cảm xúc</p>
                          </div>
                        </div>
                      </div>
                    )}
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

            {/* Footer for Detail View */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{currentWordIndex + 1}/{filteredWords.length} từ vựng</span>
              </div>
              <Button
                variant="outline"
                className="text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400"
              >
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
}