import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Menu,
  Home,
  Archive,
  Tag,
  MessageCircle,
  Share2,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  comments: number;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "7 Mẹo Tự Học IELTS Writing Hiệu Quả Với ChatGPT và AI",
    excerpt: "Khám phá cách sử dụng ChatGPT và các công cụ AI khác để cải thiện kỹ năng IELTS Writing của bạn với chi phí gần như bằng 0. Trong bài viết này, chúng ta sẽ tìm hiểu các chiến lược cụ thể để tận dụng sức mạnh của trí tuệ nhân tạo trong việc học IELTS Writing.",
    author: "Mai Linh",
    date: "2024-01-15",
    readTime: "8 phút đọc",
    category: "IELTS Writing",
    tags: ["ChatGPT", "AI", "Tự học", "Writing", "IELTS"],
    comments: 24,
    image: "📝"
  },
  {
    id: 2,
    title: "Lộ Trình Tự Học IELTS 6.5+ Trong 3 Tháng Với Công Cụ AI",
    excerpt: "Hướng dẫn chi tiết lộ trình tự học IELTS từ 0 lên 6.5+ với sự hỗ trợ của các công cụ AI miễn phí và trả phí. Bài viết cung cấp kế hoạch học tập cụ thể theo từng tuần, kết hợp các công cụ AI hiệu quả nhất.",
    author: "Tuấn Anh",
    date: "2024-01-12",
    readTime: "12 phút đọc",
    category: "Lộ trình học",
    tags: ["Lộ trình", "AI Tools", "IELTS 6.5", "Tự học", "Kế hoạch"],
    comments: 18,
    image: "🎯"
  },
  {
    id: 3,
    title: "Top 10 Công Cụ AI Miễn Phí Cho Người Học Tiếng Anh",
    excerpt: "Danh sách các công cụ AI tốt nhất để hỗ trợ việc học tiếng Anh, từ phát âm đến ngữ pháp và từ vựng. Mỗi công cụ được đánh giá chi tiết về tính năng, ưu nhược điểm và cách sử dụng hiệu quả.",
    author: "Hồng Nhung",
    date: "2024-01-10",
    readTime: "6 phút đọc",
    category: "Công cụ AI",
    tags: ["AI Tools", "Miễn phí", "Tiếng Anh", "Công nghệ"],
    comments: 32,
    image: "🤖"
  },
  {
    id: 4,
    title: "Bí Quyết Đạt Band 8.0 IELTS Writing Task 2 Với AI Coaching",
    excerpt: "Phân tích chi tiết cách sử dụng AI như một coach cá nhân để đạt điểm cao trong IELTS Writing Task 2. Học cách tạo ra các bài luận chất lượng cao với sự hỗ trợ của trí tuệ nhân tạo.",
    author: "Quang Huy",
    date: "2024-01-08",
    readTime: "15 phút đọc",
    category: "IELTS Writing",
    tags: ["Band 8.0", "Task 2", "AI Coaching", "Chiến lược"],
    comments: 41,
    image: "🏆"
  }
];

const categories = [
  "IELTS Writing",
  "Lộ trình học", 
  "Công cụ AI",
  "IELTS Speaking",
  "Từ vựng",
  "Ngữ pháp"
];

const recentPosts = [
  "7 Mẹo Tự Học IELTS Writing Hiệu Quả Với ChatGPT",
  "Lộ Trình Tự Học IELTS 6.5+ Trong 3 Tháng",
  "Top 10 Công Cụ AI Miễn Phí Cho Người Học",
  "Cách Sử Dụng Claude AI Để Luyện Speaking",
  "Chiến Lược Học Từ Vựng Với Spaced Repetition"
];

export default function WordPressDemo() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        {/* WordPress Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-blue-600">IELTS x AI Blog</div>
                <div className="hidden md:block text-sm text-gray-500">
                  Mẹo học IELTS thông minh với AI
                </div>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600">Trang chủ</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Về chúng tôi</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Liên hệ</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Home className="h-4 w-4 mr-2" />
              <a href="#" className="hover:text-blue-600">Trang chủ</a>
              <span className="mx-2">/</span>
              <a href="#" className="hover:text-blue-600">{selectedPost.category}</a>
              <span className="mx-2">/</span>
              <span className="text-gray-800">{selectedPost.title}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white">
                <div className="mb-6">
                  <div className="text-6xl mb-4 text-center">{selectedPost.image}</div>
                  <Badge className="mb-4 bg-blue-100 text-blue-800">{selectedPost.category}</Badge>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 text-sm mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Bởi <strong>{selectedPost.author}</strong></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedPost.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {selectedPost.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {selectedPost.comments} bình luận
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                    {selectedPost.excerpt}
                  </p>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Giới thiệu</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Trong thời đại công nghệ 4.0, việc học IELTS không còn phụ thuộc hoàn toàn vào các khóa học đắt đỏ. 
                    Trí tuệ nhân tạo (AI) đã mở ra những cơ hội học tập mới, hiệu quả và tiết kiệm chi phí.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tại sao nên sử dụng AI trong học IELTS?</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Tiết kiệm chi phí so với việc thuê gia sư cá nhân</li>
                    <li>Có thể học bất cứ lúc nào, 24/7</li>
                    <li>Phản hồi tức thì và chi tiết</li>
                    <li>Cá nhân hóa theo nhu cầu và trình độ</li>
                    <li>Cập nhật liên tục các xu hướng đề thi mới</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Mẹo từ chuyên gia</h3>
                    <p className="text-blue-700">
                      Kết hợp AI với việc tự học truyền thống sẽ mang lại hiệu quả tối ưu. 
                      AI là công cụ hỗ trợ mạnh mẽ, nhưng sự kiên trì và thực hành đều đặn vẫn là yếu tố quan trọng nhất.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Kết luận</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Việc tận dụng AI trong học IELTS không chỉ giúp tiết kiệm chi phí mà còn nâng cao hiệu quả học tập đáng kể. 
                    Hãy bắt đầu áp dụng những mẹo này ngay hôm nay để thấy sự khác biệt!
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-700">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="hover:bg-blue-50 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="flex items-center gap-4 py-6 border-t border-gray-200">
                  <span className="font-medium text-gray-700 flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Chia sẻ:
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-blue-600 hover:bg-blue-50">
                      <Facebook className="h-4 w-4 mr-1" />
                      Facebook
                    </Button>
                    <Button size="sm" variant="outline" className="text-blue-400 hover:bg-blue-50">
                      <Twitter className="h-4 w-4 mr-1" />
                      Twitter
                    </Button>
                    <Button size="sm" variant="outline" className="text-blue-700 hover:bg-blue-50">
                      <Linkedin className="h-4 w-4 mr-1" />
                      LinkedIn
                    </Button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center py-6 border-t border-gray-200">
                  <Button 
                    onClick={() => setSelectedPost(null)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    ← Quay lại danh sách bài viết
                  </Button>
                  <Button variant="outline">
                    Bài viết tiếp theo →
                  </Button>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Về tác giả</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedPost.author}</div>
                    <div className="text-sm text-gray-600">IELTS Expert</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Chuyên gia IELTS với hơn 5 năm kinh nghiệm giảng dạy và nghiên cứu về ứng dụng AI trong học tập.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4">Bài viết liên quan</h3>
                <div className="space-y-3">
                  {recentPosts.slice(0, 4).map((post, index) => (
                    <div key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
                      <a href="#" className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2">
                        {post}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* WordPress Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-600">IELTS x AI Blog</div>
              <div className="hidden md:block text-sm text-gray-500">
                Mẹo học IELTS thông minh với AI
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600">Trang chủ</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Về chúng tôi</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Liên hệ</a>
            </nav>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎓 Blog IELTS x AI
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Khám phá những mẹo hay, lộ trình học hiệu quả và công cụ AI thông minh 
            để chinh phục IELTS với chi phí tối ưu
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              AI-Powered Learning
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Lộ trình cá nhân hóa
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Chi phí tối ưu
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết mới nhất</h2>
              <div className="space-y-8">
                {blogPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                            {post.image}
                          </div>
                        </div>
                        <div className="flex-1">
                          <Badge className="mb-3 bg-blue-100 text-blue-800">{post.category}</Badge>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                            <span onClick={() => setSelectedPost(post)}>
                              {post.title}
                            </span>
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {post.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.date).toLocaleDateString('vi-VN')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {post.comments}
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedPost(post)}
                              className="flex items-center gap-1"
                            >
                              Đọc tiếp <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm">Trước</Button>
              <Button size="sm" className="bg-blue-600">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Sau</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Tìm kiếm</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Tìm kiếm bài viết..." className="pl-10" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Chuyên mục</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center justify-between py-1">
                    <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
                      {category}
                    </a>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {Math.floor(Math.random() * 20) + 5}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Bài viết gần đây</h3>
              <div className="space-y-3">
                {recentPosts.map((post, index) => (
                  <div key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
                    <a href="#" className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2">
                      {post}
                    </a>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(Date.now() - index * 86400000).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-4">📧 Đăng ký nhận tin</h3>
              <p className="text-sm text-gray-600 mb-4">
                Nhận mẹo học IELTS và công cụ AI mới nhất qua email
              </p>
              <div className="space-y-3">
                <Input placeholder="Email của bạn..." />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Đăng ký ngay
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Không spam. Hủy đăng ký bất cứ lúc nào.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">IELTS x AI Blog</h4>
              <p className="text-gray-400 text-sm">
                Nền tảng học IELTS thông minh với sự hỗ trợ của trí tuệ nhân tạo
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liên kết hữu ích</h4>
              <div className="space-y-2 text-sm">
                <div><a href="#" className="text-gray-400 hover:text-white">Về chúng tôi</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white">Liên hệ</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white">Chính sách bảo mật</a></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Theo dõi chúng tôi</h4>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" className="text-gray-400 border-gray-400 hover:text-white hover:border-white">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-gray-400 border-gray-400 hover:text-white hover:border-white">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-gray-400 border-gray-400 hover:text-white hover:border-white">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-400">
            © 2024 IELTS x AI Blog. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
}