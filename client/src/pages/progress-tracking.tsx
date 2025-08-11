import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Star, Target, Trophy, Calendar, Clock, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

interface EssayData {
  time: string;
  date: string;
  topic: string;
  score: number;
  isMarked: boolean;
  essayType: string;
  taskType: "Task 1" | "Task 2";
}

const sampleEssays: EssayData[] = [
  {
    time: "45 min",
    date: "02/06/25",
    topic: "The impact of technology on employment",
    score: 5.0,
    isMarked: true,
    essayType: "Opinion",
    taskType: "Task 2"
  },
  {
    time: "40 min",
    date: "04/06/25",
    topic: "The role of government in environmental protection",
    score: 5.0,
    isMarked: true,
    essayType: "Discussion",
    taskType: "Task 2"
  },
  {
    time: "20 min",
    date: "04/06/25",
    topic: "The chart shows the percentage of households with different types of technology",
    score: 5.5,
    isMarked: false,
    essayType: "Bar Chart",
    taskType: "Task 1"
  },
  {
    time: "42 min",
    date: "10/06/25",
    topic: "The importance of university education for career success",
    score: 5.5,
    isMarked: true,
    essayType: "Cause & Solution",
    taskType: "Task 2"
  },
  {
    time: "18 min",
    date: "12/06/25",
    topic: "The process of making chocolate from cocoa beans",
    score: 6.0,
    isMarked: false,
    essayType: "Process Diagram",
    taskType: "Task 1"
  },
  {
    time: "38 min",
    date: "14/06/25",
    topic: "Advantages and disadvantages of online education",
    score: 5.5,
    isMarked: true,
    essayType: "Advantage/Disadvantage",
    taskType: "Task 2"
  },
  {
    time: "22 min",
    date: "17/06/25",
    topic: "The line graph shows population growth in three cities",
    score: 6.5,
    isMarked: false,
    essayType: "Line Graph",
    taskType: "Task 1"
  },
  {
    time: "44 min",
    date: "18/06/25",
    topic: "Job satisfaction or salary – which matters more?",
    score: 7.0,
    isMarked: true,
    essayType: "Opinion",
    taskType: "Task 2"
  },
  {
    time: "19 min",
    date: "19/06/25",
    topic: "The table compares energy consumption in different countries",
    score: 6.0,
    isMarked: false,
    essayType: "Table",
    taskType: "Task 1"
  },
  {
    time: "46 min",
    date: "21/06/25",
    topic: "Is it better to study abroad or locally?",
    score: 7.5,
    isMarked: true,
    essayType: "Advantage/Disadvantage",
    taskType: "Task 2"
  }
];

const basicMistakes = [
  {
    id: 1,
    title: "Underdeveloped Ideas",
    description: "You state a point but don't explain it or give a concrete example.",
    tip: "Use the PEEL structure — Point → Explain → Example → Link — to develop each argument clearly."
  },
  {
    id: 2,
    title: "Overused Linking Devices",
    description: "Repeating the same connectors like \"moreover\" or \"on the other hand\" makes writing sound mechanical.",
    tip: "Vary your transitions with synonyms or embed them naturally into your sentences."
  },
  {
    id: 3,
    title: "Basic Vocabulary",
    description: "Using simple words like \"good\" or \"bad\" limits your lexical score.",
    tip: "Replace them with more precise, academic alternatives to show range and control."
  }
];

export default function ProgressTracking() {
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [sortByScore, setSortByScore] = useState("score");
  const [sortByMark, setSortByMark] = useState("mark");
  const [essayType, setEssayType] = useState("all");
  const [showChart, setShowChart] = useState("Essay");
  const [showBasicMistakes, setShowBasicMistakes] = useState(false);
  const [essays, setEssays] = useState<EssayData[]>(sampleEssays);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Mới nhất");
  const [scoreSort, setScoreSort] = useState("Điểm số");
  const [essayTypeFilter, setEssayTypeFilter] = useState("Dạng bài viết");
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const toggleEssayMarked = (index: number) => {
    setEssays(prev => prev.map((essay, i) => 
      i === index ? { ...essay, isMarked: !essay.isMarked } : essay
    ));
  };

  // Filtered and sorted essays
  const filteredEssays = useMemo(() => {
    let filtered = essays.filter(essay => {
      // Search filter
      const matchesSearch = essay.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           essay.essayType.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Essay type filter
      const matchesType = essayTypeFilter === "Dạng bài viết" || 
                         essay.essayType === essayTypeFilter ||
                         essay.taskType === essayTypeFilter;
      
      // Starred filter
      const matchesStarred = !showStarredOnly || essay.isMarked;
      
      return matchesSearch && matchesType && matchesStarred;
    });

    // Sort the filtered essays
    if (sortOrder === "Cũ nhất") {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    if (scoreSort === "Điểm cao đến thấp") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (scoreSort === "Điểm thấp đến cao") {
      filtered.sort((a, b) => a.score - b.score);
    }

    return filtered;
  }, [essays, searchTerm, sortOrder, scoreSort, essayTypeFilter, showStarredOnly]);

  const overallScore = 7.5;
  const taskResponse = 7.5;
  const lexicalResource = 7.0;
  const coherenceCohesion = 7.0;
  const grammaticalRange = 8.0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracking</h1>
          <p className="text-gray-600">You've written 18 essays. That's 18 steps closer to your goal!</p>
        </div>

        {/* Horizontal Layout - Band Tracker, Overall Score, Action Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Band Tracker Chart - Back to previous size */}
          <div className="lg:col-span-6">
            <Card className="h-full">
              <CardHeader className="pb-1 pt-3">
                <div className="flex items-center justify-between">
                  <div className="w-32">
                    <Select value={showChart} onValueChange={setShowChart}>
                      <SelectTrigger className="w-full text-left">
                        <span className="flex-1 text-left">{showChart}</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Essay">Essay</SelectItem>
                        <SelectItem value="Date">Date</SelectItem>
                        <SelectItem value="Week">Week</SelectItem>
                        <SelectItem value="Month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <CardTitle className="text-lg flex-1 text-center">IELTS Writing Task 2 Band Tracker</CardTitle>
                  <div className="w-32"></div> {/* Spacer to balance the layout */}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="relative h-64 bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg p-3">
                  {/* Chart Grid */}
                  <div className="absolute inset-3 grid grid-cols-10 grid-rows-8 gap-1">
                    {/* Y-axis labels */}
                    <div className="col-span-1 row-span-8 flex flex-col justify-between text-xs text-gray-600 pr-2">
                      <span>8</span>
                      <span>7</span>
                      <span>6</span>
                      <span>5</span>
                      <span>4</span>
                      <span>3</span>
                      <span>2</span>
                      <span>1</span>
                      <span>0</span>
                    </div>
                    
                    {/* Chart Area */}
                    <div className="col-span-9 row-span-7 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 grid grid-rows-8 border-l border-gray-300">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="border-b border-gray-200 border-dashed"></div>
                        ))}
                      </div>
                      
                      {/* Line Chart */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 102">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                        
                        <polyline
                          points="0,77 45,77 90,77 135,77 180,64 225,51 270,51 315,51 360,38 405,26"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                        <polyline
                          points="0,102 0,77 45,77 90,77 135,77 180,64 225,51 270,51 315,51 360,38 405,26 405,102"
                          fill="url(#gradient)"
                        />
                        
                        {/* Data points */}
                        {[5.0, 5.0, 5.0, 5.0, 5.5, 6.0, 6.0, 6.0, 6.5, 7.0].map((score, i) => (
                          <circle
                            key={i}
                            cx={i * 45}
                            cy={102 - (score * 13)}
                            r="3"
                            fill="#3b82f6"
                          />
                        ))}
                      </svg>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="col-span-9 row-span-1 flex justify-between text-xs text-gray-600 pt-1">
                      <span>Es.1</span>
                      <span>Es.2</span>
                      <span>Es.3</span>
                      <span>Es.4</span>
                      <span>Es.5</span>
                      <span>Es.6</span>
                      <span>Es.7</span>
                      <span>Es.8</span>
                      <span>Es.9</span>
                      <span>Es.10</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Band Score - Slightly reduced width */}
          <div className="lg:col-span-4">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Overall Band Score</CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-5 mr-4">
                      <div 
                        className="bg-black h-5 rounded-full transition-all duration-300"
                        style={{ width: `${(overallScore / 9) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold w-12 text-right">{overallScore}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 mb-1">Task Response:</span>
                      <div className="flex items-center justify-between">
                        <div className="bg-gray-200 rounded-full h-4 flex-1 mr-4">
                          <div 
                            className="bg-gray-600 h-4 rounded-full"
                            style={{ width: `${(taskResponse / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xl font-bold w-12 text-right">{taskResponse}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 mb-1">Lexical Resource:</span>
                      <div className="flex items-center justify-between">
                        <div className="bg-gray-200 rounded-full h-4 flex-1 mr-4">
                          <div 
                            className="bg-gray-600 h-4 rounded-full"
                            style={{ width: `${(lexicalResource / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xl font-bold w-12 text-right">{lexicalResource}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 mb-1">Coherence & Cohesion:</span>
                      <div className="flex items-center justify-between">
                        <div className="bg-gray-200 rounded-full h-4 flex-1 mr-4">
                          <div 
                            className="bg-gray-600 h-4 rounded-full"
                            style={{ width: `${(coherenceCohesion / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xl font-bold w-12 text-right">{coherenceCohesion}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 mb-1">Grammatical Range & Accuracy:</span>
                      <div className="flex items-center justify-between">
                        <div className="bg-gray-200 rounded-full h-4 flex-1 mr-4">
                          <div 
                            className="bg-gray-600 h-4 rounded-full"
                            style={{ width: `${(grammaticalRange / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xl font-bold w-12 text-right">{grammaticalRange}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons - Increased width */}
          <div className="lg:col-span-2">
            <div className="space-y-3 h-full flex flex-col justify-center">
              <Button variant="outline" className="w-full h-24 text-sm">
                Progress Report
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-24 text-sm"
                onClick={() => setShowBasicMistakes(!showBasicMistakes)}
              >
                {showBasicMistakes ? 'Hide' : 'Basic Mistakes'}
              </Button>
            </div>
          </div>
        </div>

        {/* Basic Mistakes Section - Full Width Between Band Tracker and Progress Tracker */}
        {showBasicMistakes && (
          <div className="mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {basicMistakes.map((mistake) => (
                    <div key={mistake.id} className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {mistake.id}. {mistake.title}
                      </h4>
                      <p className="text-sm text-gray-700 mb-2">{mistake.description}</p>
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-gray-600">→</span>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Tip:</span> {mistake.tip}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Tracker with Summary Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Progress Table */}
          <div className="lg:col-span-8">
            <Card className="flex flex-col h-full">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-center">
                  <CardTitle className="text-lg text-center">Lịch sử bài viết IELTS Writing</CardTitle>
                </div>
                
                {/* Search Bar */}
                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm theo chủ đề hoặc dạng bài viết..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {/* Sort Order */}
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-auto min-w-[120px]">
                      <span className="flex-1 text-left">{sortOrder}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mới nhất">Mới nhất</SelectItem>
                      <SelectItem value="Cũ nhất">Cũ nhất</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Score Sort */}
                  <Select value={scoreSort} onValueChange={setScoreSort}>
                    <SelectTrigger className="w-auto min-w-[140px]">
                      <span className="flex-1 text-left">{scoreSort}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Điểm số">Điểm số</SelectItem>
                      <SelectItem value="Điểm cao đến thấp">Điểm cao đến thấp</SelectItem>
                      <SelectItem value="Điểm thấp đến cao">Điểm thấp đến cao</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Essay Type Filter */}
                  <Select value={essayTypeFilter} onValueChange={setEssayTypeFilter}>
                    <SelectTrigger className="w-auto min-w-[140px]">
                      <span className="flex-1 text-left">{essayTypeFilter}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dạng bài viết">Dạng bài viết</SelectItem>
                      <SelectItem value="Task 1">Task 1</SelectItem>
                      <SelectItem value="Task 2">Task 2</SelectItem>
                      <SelectItem value="Line Graph">Line Graph</SelectItem>
                      <SelectItem value="Bar Chart">Bar Chart</SelectItem>
                      <SelectItem value="Table">Table</SelectItem>
                      <SelectItem value="Process Diagram">Process Diagram</SelectItem>
                      <SelectItem value="Opinion">Opinion</SelectItem>
                      <SelectItem value="Discussion">Discussion</SelectItem>
                      <SelectItem value="Advantage/Disadvantage">Advantage/Disadvantage</SelectItem>
                      <SelectItem value="Problem/Solution">Problem/Solution</SelectItem>
                      <SelectItem value="Cause & Solution">Cause & Solution</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Starred Filter Button */}
                  <Button
                    variant={showStarredOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowStarredOnly(!showStarredOnly)}
                    className="flex items-center gap-2"
                  >
                    <Star className={`w-4 h-4 ${showStarredOnly ? 'fill-current' : ''}`} />
                    Đã đánh dấu
                  </Button>
                </div>
                
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden p-0">
                <div className="relative">
                  <div className="overflow-y-auto progress-table-scroll max-h-[280px] pr-2">
                    <div className="px-6 pb-6">
                      <table className="w-full border-collapse table-fixed">
                        <thead className="sticky top-0 bg-white z-10">
                          <tr className="border-b">
                            <th className="py-3 px-4 font-medium w-24 text-left">Date</th>
                            <th className="py-3 px-4 font-medium text-left">Topic</th>
                            <th className="py-3 px-4 font-medium w-20 text-center">Time</th>
                            <th className="py-3 px-4 font-medium w-16 text-center">Score</th>
                            <th className="py-3 px-4 font-medium w-16 text-center">
                              <Star className="w-4 h-4 mx-auto" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEssays.map((essay, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="py-4 px-4">{essay.date}</td>
                              <td className="py-4 px-4">
                                <div>
                                  <div className="text-sm truncate">{essay.topic}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {essay.taskType} - {essay.essayType}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center text-sm">{essay.time}</td>
                              <td className="py-4 px-4 text-center">
                                <Badge 
                                  variant={essay.score >= 7 ? "default" : essay.score >= 6 ? "secondary" : "destructive"}
                                  className="font-medium"
                                >
                                  {essay.score}
                                </Badge>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button
                                  onClick={() => toggleEssayMarked(essays.findIndex(e => e === essay))}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                  <Star
                                    className={`w-5 h-5 ${
                                      essay.isMarked 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'fill-none text-gray-400'
                                    }`}
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {filteredEssays.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          Không tìm thấy bài viết nào phù hợp với bộ lọc
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Boxes - Stacked Vertically */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Current Streak */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Current Streak
                    <span className="text-2xl font-bold ml-auto">13 Days</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Highest Streak</span>
                      <span className="font-medium">15 Days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Hours</span>
                      <span className="font-medium">40 Hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Your Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Target Score</span>
                      <span className="font-medium">8.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Exam Date</span>
                      <span className="font-medium text-blue-600">13/01/26</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Exam Countdown</span>
                      <span className="font-medium">280 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}