import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, BookOpen, Users, Star, Filter, ChevronDown, ChevronUp, Minus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { VocabularyCard, InsertVocabularyCard, InsertVocabularyWord } from "@shared/schema";

export default function Wordcraft() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [isAddVocabOpen, setIsAddVocabOpen] = useState(false);
  const queryClient = useQueryClient();
  const [newTopicName, setNewTopicName] = useState("");
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [newCardData, setNewCardData] = useState({
    title: "",
    description: "",
    categories: [] as string[]
  });
  const [vocabEntries, setVocabEntries] = useState([
    {
      id: 1,
      word: "",
      content: "",
      isExpanded: false
    }
  ]);
  const [isVocabLoading, setIsVocabLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { toast } = useToast();

  const { data: cards = [], isLoading } = useQuery<VocabularyCard[]>({
    queryKey: ["/api/vocabulary-cards"],
  });

  const createCardMutation = useMutation({
    mutationFn: async (cardData: InsertVocabularyCard) => {
      const response = await apiRequest("POST", "/api/vocabulary-cards", cardData);
      return response.json() as Promise<VocabularyCard>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vocabulary-cards"] });
      toast({
        title: "Thành công!",
        description: "Bộ thẻ từ vựng đã được tạo thành công.",
      });
      setNewCardData({ title: "", description: "", categories: [] });
      setIsAddCardOpen(false);
    },
    onError: () => {
      toast({
        title: "Lỗi!",
        description: "Không thể tạo bộ thẻ từ vựng. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: async ({ cardId, isFavorited }: { cardId: number; isFavorited: boolean }) => {
      return await apiRequest("PATCH", `/api/vocabulary-cards/${cardId}/favorite`, { isFavorited });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vocabulary-cards"] });
    }
  });

  const createVocabMutation = useMutation({
    mutationFn: async (vocabData: InsertVocabularyWord) => {
      const response = await apiRequest("POST", "/api/vocabulary-words", vocabData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vocabulary-cards"] });
      toast({
        title: "Thành công!",
        description: "Từ vựng đã được thêm thành công.",
      });
      // Reset vocabulary entries
      setIsAddVocabOpen(false);
      setSelectedCardId(null);
    },
    onError: () => {
      toast({
        title: "Lỗi!",
        description: "Có lỗi xảy ra khi thêm từ vựng.",
        variant: "destructive",
      });
    }
  });

  const handleFavoriteToggle = (cardId: number, currentFavoriteState: number | null, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavoriteState = !currentFavoriteState;
    favoriteMutation.mutate({ cardId, isFavorited: newFavoriteState });
  };

  const categories = ["Environment", "Business", "Company", "Technology", "Idioms"];

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(card.category);
    return matchesSearch && matchesCategory;
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSelectAllCategories = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...categories]);
    }
  };

  const getFilterButtonText = () => {
    if (selectedCategories.length === 0) return "Tất cả chủ đề";
    if (selectedCategories.length === 1) return selectedCategories[0];
    return "Đang chọn nhiều chủ đề";
  };

  const handleAddTopic = () => {
    if (newTopicName.trim()) {
      // Here you would normally add the topic to your data store
      console.log("Adding new topic:", newTopicName);
      setNewTopicName("");
      setIsAddTopicOpen(false);
    }
  };

  const handleCategoryToggleForCard = (category: string) => {
    setNewCardData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSelectAllCategoriesForCard = () => {
    setNewCardData(prev => ({
      ...prev,
      categories: prev.categories.length === categories.length ? [] : [...categories]
    }));
  };

  const handleAddCard = () => {
    if (newCardData.title.trim()) {
      const cardToCreate: InsertVocabularyCard = {
        title: newCardData.title.trim(),
        category: newCardData.categories.length > 0 ? newCardData.categories.join(", ") : "Uncategorized",
        difficulty: "Intermediate", // Default difficulty
        wordCount: 0, // Start with 0 words
        createdAt: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        description: newCardData.description.trim() || null,
      };
      createCardMutation.mutate(cardToCreate);
    }
  };

  const addVocabEntry = () => {
    const newId = Math.max(...vocabEntries.map(entry => entry.id)) + 1;
    setVocabEntries(prev => [...prev, {
      id: newId,
      word: "",
      content: "",
      isExpanded: false
    }]);
  };

  const removeVocabEntry = (id: number) => {
    if (vocabEntries.length > 1) {
      setVocabEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const toggleVocabExpansion = (id: number) => {
    setVocabEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, isExpanded: !entry.isExpanded } : entry
    ));
  };

  const updateVocabEntry = (id: number, field: string, value: string) => {
    setVocabEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleAddVocab = async () => {
    if (!selectedCardId) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng chọn bộ thẻ.",
        variant: "destructive",
      });
      return;
    }

    const validEntries = vocabEntries.filter(entry => entry.word.trim());
    if (validEntries.length === 0) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng nhập ít nhất một từ vựng.",
        variant: "destructive",
      });
      return;
    }

    setIsVocabLoading(true);
    setLoadingProgress(0);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + 5;
      });
    }, 100);

    try {
      for (const entry of validEntries) {
        const vocabToCreate: InsertVocabularyWord = {
          cardId: selectedCardId,
          word: entry.word,
          pronunciation: "",
          partOfSpeech: "N",
          englishDefinition: entry.content || "",
          vietnameseDefinition: "",
          example: "",
          tags: []
        };
        await createVocabMutation.mutateAsync(vocabToCreate);
      }
      
      setLoadingProgress(100);
      setTimeout(() => {
        setIsVocabLoading(false);
        setIsAddVocabOpen(false);
        setVocabEntries([{ id: 1, word: "", content: "", isExpanded: false }]);
        setSelectedCardId(null);
        setLoadingProgress(0);
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setIsVocabLoading(false);
      setLoadingProgress(0);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Khám phá Wordcraft nào!</h1>
        <p className="text-gray-600">Học từ vựng hiệu quả với các bộ thẻ được tuyển chọn kỹ lưỡng</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm tên bộ thẻ bạn muốn ôn lại"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Site Toggle Buttons */}
          <div className="flex">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-none border-r-0"
            >
              Bộ thẻ từ vựng
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-l-none hover:bg-gray-50"
            >
              Từ vựng đã lưu
            </Button>
          </div>
        </div>

        {/* Category Filter and Add Button */}
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full h-9 px-4 min-w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                {getFilterButtonText()}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuCheckboxItem
                checked={selectedCategories.length === categories.length}
                onCheckedChange={handleSelectAllCategories}
                onSelect={(e) => e.preventDefault()}
              >
                Tất cả chủ đề
              </DropdownMenuCheckboxItem>
              {categories.map(category => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex space-x-2">
            <Dialog open={isAddTopicOpen} onOpenChange={setIsAddTopicOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm chủ đề
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Thêm chủ đề mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label htmlFor="topic-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Tên chủ đề:
                    </label>
                    <Input
                      id="topic-name"
                      value={newTopicName}
                      onChange={(e) => setNewTopicName(e.target.value)}
                      placeholder="Nhập tên chủ đề mới"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleAddTopic} disabled={!newTopicName.trim()}>
                      Thêm chủ đề mới
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddVocabOpen} onOpenChange={(open) => {
              if (!isVocabLoading) {
                setIsAddVocabOpen(open);
                if (!open) {
                  setVocabEntries([{ id: 1, word: "", content: "", isExpanded: false }]);
                  setSelectedCardId(null);
                }
              }
            }}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2 text-white" />
                  Thêm từ vựng
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden" onPointerDownOutside={(e) => e.preventDefault()}>
                {isVocabLoading ? (
                  // Loading State
                  <div className="flex flex-col items-center justify-center p-8 space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-900">Đang tạo thẻ từ vựng: {loadingProgress}%</p>
                    </div>
                  </div>
                ) : (
                  // Main Content
                  <>
                    <DialogHeader className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-gray-900">Thêm từ vựng</DialogTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => setIsAddVocabOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {/* Vocabulary Entry Cards */}
                      <div className="space-y-3">
                        {vocabEntries.map((entry, index) => (
                          <div key={entry.id} className="border border-gray-200 rounded-lg bg-gray-50">
                            {/* Entry Header */}
                            <div className="flex items-center gap-3 p-4">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Từ vựng {index === 0 ? <span className="text-red-500">*</span> : ""}
                                </label>
                                <Input
                                  value={entry.word}
                                  onChange={(e) => updateVocabEntry(entry.id, "word", e.target.value)}
                                  placeholder="illuminate"
                                  className="bg-white"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-gray-200"
                                  onClick={() => toggleVocabExpansion(entry.id)}
                                >
                                  {entry.isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                  onClick={() => removeVocabEntry(entry.id)}
                                  disabled={vocabEntries.length === 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Expanded Content */}
                            {entry.isExpanded && (
                              <div className="px-4 pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Nội dung <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                  value={entry.content}
                                  onChange={(e) => updateVocabEntry(entry.id, "content", e.target.value)}
                                  placeholder="Nhập định nghĩa và ví dụ..."
                                  rows={4}
                                  className="bg-white"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add Word Button */}
                      <Button
                        variant="outline"
                        onClick={addVocabEntry}
                        className="w-auto flex items-center gap-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
                      >
                        <Plus className="h-4 w-4" />
                        Thêm từ
                      </Button>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        {/* Card Selection */}
                        <div className="flex items-center gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bộ thẻ <span className="text-red-500">*</span>
                            </label>
                            <Select 
                              value={selectedCardId?.toString() || ""} 
                              onValueChange={(value) => {
                                if (value === "new") {
                                  // Handle new card creation
                                  setSelectedCardId(null);
                                } else {
                                  setSelectedCardId(Number(value));
                                }
                              }}
                            >
                              <SelectTrigger className="w-64">
                                <SelectValue placeholder="Chưa chọn bộ thẻ" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">Bộ thẻ mới</SelectItem>
                                {cards.map((card) => (
                                  <SelectItem key={card.id} value={card.id.toString()}>
                                    {card.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="text-sm text-gray-600">
                            Số từ: {vocabEntries.filter(entry => entry.word.trim()).length} từ
                          </div>
                        </div>

                        {/* Submit Button */}
                        <Button 
                          onClick={handleAddVocab}
                          disabled={!selectedCardId || vocabEntries.filter(entry => entry.word.trim()).length === 0}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6"
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
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {filteredCards.map((card) => (
          <Link key={card.id} href={`/wordcraft/${card.id}/words?view=detail`} className="block">
            <Card className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              {/* Image Area with Title Overlay and Star */}
              <div className="relative h-32 bg-gray-100 flex items-center justify-center">
                <div className="text-4xl text-gray-400">✕</div>
                
                {/* Favorite Star - Top Right */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-1 right-1 h-6 w-6 p-0 hover:bg-white/80 z-10"
                  onClick={(e) => handleFavoriteToggle(card.id, card.isFavorited, e)}
                  disabled={favoriteMutation.isPending}
                >
                  <Star className={`h-4 w-4 ${card.isFavorited ? 'text-yellow-500 fill-current' : 'text-gray-400 hover:text-yellow-400'}`} />
                </Button>
                
                {/* Title - Bottom Left */}
                <div className="absolute bottom-2 left-2">
                  <h3 className="text-xs font-medium text-gray-900 bg-white px-2 py-1 rounded shadow-sm">
                    {card.title}
                  </h3>
                </div>
              </div>
              
              {/* Word Count and Actions */}
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {card.wordCount} từ vựng
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 z-10"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="text-sm">⋯</span>
                  </Button>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs h-7"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = `/wordcraft/${card.id}/words`;
                    }}
                  >
                    Danh sách từ vựng
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-7 px-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    Học
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}

        {/* Add New Card */}
        <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
          <DialogTrigger asChild>
            <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
              <div className="relative h-32 bg-gray-50 flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <div className="p-2">
                <div className="text-center">
                  <h3 className="text-xs font-medium text-gray-700">Thêm bộ thẻ từ vựng</h3>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo thẻ từ vựng</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label htmlFor="card-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Tên bộ thẻ mới
                </label>
                <Input
                  id="card-title"
                  value={newCardData.title}
                  onChange={(e) => setNewCardData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nhập tên bộ thẻ từ vựng"
                />
              </div>
              
              <div>
                <label htmlFor="card-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <Textarea
                  id="card-description"
                  value={newCardData.description}
                  onChange={(e) => setNewCardData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả cho bộ thẻ từ vựng"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between h-10 px-3 py-2 text-left"
                    >
                      <div className="flex flex-wrap gap-1 overflow-hidden">
                        {newCardData.categories.length === 0 ? (
                          <span className="text-gray-500">Chọn chủ đề</span>
                        ) : newCardData.categories.length <= 2 ? (
                          newCardData.categories.map(category => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))
                        ) : (
                          <>
                            <Badge variant="secondary" className="text-xs">
                              {newCardData.categories[0]}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              +{newCardData.categories.length - 1} khác
                            </Badge>
                          </>
                        )}
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuCheckboxItem
                      checked={newCardData.categories.length === categories.length}
                      onCheckedChange={handleSelectAllCategoriesForCard}
                      onSelect={(e) => e.preventDefault()}
                    >
                      Tất cả chủ đề
                    </DropdownMenuCheckboxItem>
                    {categories.map(category => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={newCardData.categories.includes(category)}
                        onCheckedChange={() => handleCategoryToggleForCard(category)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleAddCard} 
                  disabled={!newCardData.title.trim() || createCardMutation.isPending}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  {createCardMutation.isPending ? "Đang tạo..." : "Tạo bộ thẻ mới"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}