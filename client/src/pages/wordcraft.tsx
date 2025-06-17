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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredCards.map((card) => (
          <Card key={card.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-full h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                <div className="text-4xl text-gray-400">✕</div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className={getDifficultyColor(card.difficulty)}>
                  {card.difficulty}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 mr-1" />
                  {card.studyCount}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-lg mb-2">{card.title}</CardTitle>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {card.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Users className="h-4 w-4 mr-1" />
                Số từ vựng: {card.wordCount}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <BookOpen className="h-4 w-4 mr-1" />
                Số lần học: {card.studyCount}
              </div>
            </CardContent>
            <CardFooter className="pt-3 space-x-2">
              <Link href={`/wordcraft/${card.id}/words`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Xem từ vựng
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Học
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add New Card */}
        <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thêm bộ thẻ từ vựng</h3>
            <p className="text-sm text-gray-500">Tạo bộ thẻ từ vựng của riêng bạn</p>
          </div>
        </Card>
      </div>
    </div>
  );
}