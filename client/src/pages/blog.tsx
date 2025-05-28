import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Brain, 
  Target, 
  Zap,
  Star,
  TrendingUp,
  Award
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "7 Mẹo Tự Học IELTS Writing Hiệu Quả Với ChatGPT và AI",
    excerpt: "Khám phá cách sử dụng ChatGPT và các công cụ AI khác để cải thiện kỹ năng IELTS Writing của bạn với chi phí gần như bằng 0.",
    content: "Trong thời đại công nghệ 4.0, việc học IELTS không còn phụ thuộc hoàn toàn vào các khóa học đắt đỏ...",
    author: "Mai Linh",
    date: "2024-01-15",
    readTime: "8 phút",
    category: "IELTS Writing",
    tags: ["ChatGPT", "AI", "Tự học", "Writing"],
    featured: true,
    image: "📝"
  },
  {
    id: 2,
    title: "Lộ Trình Tự Học IELTS 6.5+ Trong 3 Tháng Với Công Cụ AI",
    excerpt: "Hướng dẫn chi tiết lộ trình tự học IELTS từ 0 lên 6.5+ với sự hỗ trợ của các công cụ AI miễn phí và trả phí.",
    content: "Bạn có thể đạt IELTS 6.5+ chỉ trong 3 tháng mà không cần tốn hàng chục triệu cho các khóa học...",
    author: "Tuấn Anh",
    date: "2024-01-12",
    readTime: "12 phút",
    category: "Lộ trình học",
    tags: ["Lộ trình", "AI Tools", "IELTS 6.5", "Tự học"],
    featured: true,
    image: "🎯"
  },
  {
    id: 3,
    title: "Top 10 Công Cụ AI Miễn Phí Cho Người Học Tiếng Anh",
    excerpt: "Danh sách các công cụ AI tốt nhất để hỗ trợ việc học tiếng Anh, từ phát âm đến ngữ pháp và từ vựng.",
    content: "Công nghệ AI đã thay đổi hoàn toàn cách chúng ta học ngoại ngữ. Dưới đây là 10 công cụ tuyệt vời...",
    author: "Hồng Nhung",
    date: "2024-01-10",
    readTime: "6 phút",
    category: "Công cụ AI",
    tags: ["AI Tools", "Miễn phí", "Tiếng Anh", "Công nghệ"],
    featured: false,
    image: "🤖"
  },
  {
    id: 4,
    title: "Cách Sử Dụng Claude AI Để Luyện Speaking IELTS Hiệu Quả",
    excerpt: "Hướng dẫn chi tiết cách tận dụng Claude AI để cải thiện kỹ năng Speaking IELTS thông qua mô phỏng cuộc thi thực tế.",
    content: "Claude AI là một trong những công cụ mạnh mẽ nhất để luyện tập Speaking IELTS...",
    author: "Minh Đức",
    date: "2024-01-08",
    readTime: "10 phút",
    category: "IELTS Speaking",
    tags: ["Claude AI", "Speaking", "Mô phỏng", "IELTS"],
    featured: false,
    image: "🎙️"
  },
  {
    id: 5,
    title: "Chiến Lược Học Từ Vựng IELTS Thông Minh Với Spaced Repetition",
    excerpt: "Áp dụng thuật toán Spaced Repetition kết hợp AI để ghi nhớ từ vựng IELTS lâu dài và hiệu quả.",
    content: "Spaced Repetition là phương pháp khoa học được chứng minh hiệu quả trong việc ghi nhớ...",
    author: "Thu Hà",
    date: "2024-01-05",
    readTime: "7 phút",
    category: "Từ vựng",
    tags: ["Từ vựng", "Spaced Repetition", "AI", "Ghi nhớ"],
    featured: false,
    image: "📚"
  },
  {
    id: 6,
    title: "Bí Quyết Đạt Band 8.0 IELTS Writing Task 2 Với AI Coaching",
    excerpt: "Phân tích chi tiết cách sử dụng AI như một coach cá nhân để đạt điểm cao trong IELTS Writing Task 2.",
    content: "Để đạt Band 8.0 IELTS Writing Task 2, bạn cần có một coach giỏi. AI có thể đóng vai trò này...",
    author: "Quang Huy",
    date: "2024-01-03",
    readTime: "15 phút",
    category: "IELTS Writing",
    tags: ["Band 8.0", "Task 2", "AI Coaching", "Chiến lược"],
    featured: true,
    image: "🏆"
  }
];

const categories = ["Tất cả", "IELTS Writing", "Lộ trình học", "Công cụ AI", "IELTS Speaking", "Từ vựng"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Tất cả" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button 
            onClick={() => setSelectedPost(null)}
            variant="outline" 
            className="mb-6 flex items-center gap-2"
          >
            ← Quay lại Blog
          </Button>
          
          <article className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{selectedPost.image}</div>
              <Badge variant="secondary" className="mb-4">{selectedPost.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
              <div className="flex items-center justify-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {selectedPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedPost.date).toLocaleDateString('vi-VN')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedPost.readTime}
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{selectedPost.excerpt}</p>
              <p className="text-gray-700 leading-relaxed">{selectedPost.content}</p>
              
              <div className="mt-8 p-6 bg-teal-50 rounded-lg">
                <h3 className="text-xl font-semibold text-teal-800 mb-3">💡 Lời khuyên từ chuyên gia</h3>
                <p className="text-teal-700">
                  Hãy nhớ rằng việc kết hợp AI vào quá trình học không có nghĩa là thay thế hoàn toàn việc tự học. 
                  AI là công cụ hỗ trợ mạnh mẽ, nhưng sự kiên trì và thực hành đều đặn vẫn là chìa khóa thành công trong IELTS.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-2">
              {selectedPost.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎓 Blog IELTS x AI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá những mẹo hay, lộ trình học hiệu quả và công cụ AI thông minh 
              để chinh phục IELTS với chi phí tối ưu
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-teal-600">
                <Brain className="h-5 w-5" />
                <span className="font-medium">AI-Powered Learning</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Target className="h-5 w-5" />
                <span className="font-medium">Lộ trình cá nhân hóa</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Zap className="h-5 w-5" />
                <span className="font-medium">Chi phí tối ưu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Bài viết nổi bật
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="text-4xl mb-2">{post.image}</div>
                  <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Button 
                    onClick={() => setSelectedPost(post)}
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Đọc tiếp <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-teal-600" />
            Tất cả bài viết
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="text-4xl mb-2">{post.image}</div>
                  <Badge variant="outline" className="w-fit">{post.category}</Badge>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => setSelectedPost(post)}
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Đọc tiếp <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nhận mẹo học IELTS mới nhất
            </h3>
            <p className="text-gray-600 mb-6">
              Đăng ký nhận bản tin hàng tuần với những mẹo hay, công cụ AI mới và 
              lộ trình học IELTS hiệu quả nhất
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input placeholder="Email của bạn..." className="flex-1" />
              <Button className="bg-teal-600 hover:bg-teal-700">
                Đăng ký
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Chúng tôi không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}