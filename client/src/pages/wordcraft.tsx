import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Plus, BookOpen, Users, Star, Filter, ChevronDown } from "lucide-react";
import type { VocabularyCard } from "@shared/schema";

export default function Wordcraft() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: cards = [], isLoading } = useQuery<VocabularyCard[]>({
    queryKey: ["/api/vocabulary-cards"],
  });

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

  const getFilterButtonText = () => {
    if (selectedCategories.length === 0) return "Tất cả chủ đề";
    if (selectedCategories.length === 1) return selectedCategories[0];
    return "Đang chọn nhiều chủ đề";
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
              <Button variant="outline" className="rounded-full h-9 px-4">
                <Filter className="h-4 w-4 mr-2" />
                {getFilterButtonText()}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {categories.map(category => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" className="ml-4">
            <Plus className="h-4 w-4 mr-2" />
            Thêm chủ đề
          </Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {filteredCards.map((card) => (
          <Card key={card.id} className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Area with Title Overlay and Star */}
            <div className="relative h-32 bg-gray-100 flex items-center justify-center">
              <div className="text-4xl text-gray-400">✕</div>
              
              {/* Favorite Star - Top Right */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-1 right-1 h-6 w-6 p-0 hover:bg-white/80"
              >
                <Star className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
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
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                  <span className="text-sm">⋯</span>
                </Button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-1">
                <Link href={`/wordcraft/${card.id}/words`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs h-7">
                    Xem từ vựng
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                  Học
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Add New Card */}
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
      </div>
    </div>
  );
}