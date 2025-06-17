import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, BookOpen, Users, Star } from "lucide-react";
import type { VocabularyCard } from "@shared/schema";

export default function Wordcraft() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: cards = [], isLoading } = useQuery<VocabularyCard[]>({
    queryKey: ["/api/vocabulary-cards"],
  });

  const categories = ["Environment", "Business", "Company", "Technology", "Idioms"];

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm tên bộ thẻ bạn muốn ôn lại"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Bộ thẻ từ vựng
            </Button>
            <Button variant="outline" size="sm">
              Từ vựng đã lưu
            </Button>
          </div>
          <Button variant="outline" size="sm">
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