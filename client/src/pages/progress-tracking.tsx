import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Star, Target, Trophy, Calendar, Clock } from "lucide-react";
import { useState } from "react";

interface EssayData {
  week: string;
  date: string;
  topic: string;
  score: number;
  isMarked: boolean;
  essayType: string;
}

const sampleEssays: EssayData[] = [
  {
    week: "W1",
    date: "02/06/25",
    topic: "The impact of technology on employment",
    score: 5.0,
    isMarked: true,
    essayType: "Opinion"
  },
  {
    week: "W1",
    date: "04/06/25",
    topic: "The role of government in environmental protection",
    score: 5.0,
    isMarked: true,
    essayType: "Discussion"
  },
  {
    week: "W1",
    date: "04/06/25",
    topic: "The influence of social media on human behavior",
    score: 5.5,
    isMarked: false,
    essayType: "Advantage/Disadvantage"
  },
  {
    week: "W2",
    date: "10/06/25",
    topic: "The importance of university education for career success",
    score: 5.5,
    isMarked: true,
    essayType: "Cause & Solution"
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
  const [sortBy, setSortBy] = useState("newest");
  const [sortByScore, setSortByScore] = useState("score");
  const [sortByMark, setSortByMark] = useState("mark");
  const [essayType, setEssayType] = useState("all");
  const [showChart, setShowChart] = useState("Essay");
  const [showBasicMistakes, setShowBasicMistakes] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6">
          {/* Band Tracker Chart - 1.5x wider */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Select value={showChart} onValueChange={setShowChart}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Essay">Essay</SelectItem>
                      <SelectItem value="Date">Date</SelectItem>
                      <SelectItem value="Week">Week</SelectItem>
                      <SelectItem value="Month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <CardTitle className="text-lg text-center flex-1">IELTS Writing Task 2 Band Tracker</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-52 bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg p-3">
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

          {/* Overall Band Score - Reduced width */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Overall Band Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-5 mr-3">
                      <div 
                        className="bg-black h-5 rounded-full transition-all duration-300"
                        style={{ width: `${(overallScore / 9) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xl font-bold">{overallScore}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 mb-1">Task Response:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="bg-gray-600 h-4 rounded-full"
                            style={{ width: `${(taskResponse / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{taskResponse}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 mb-1">Lexical Resource:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="bg-gray-600 h-4 rounded-full"
                            style={{ width: `${(lexicalResource / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{lexicalResource}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 mb-1">Coherence & Cohesion:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="bg-gray-600 h-4 rounded-full"
                            style={{ width: `${(coherenceCohesion / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{coherenceCohesion}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 mb-1">Grammatical Range & Accuracy:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="bg-gray-600 h-4 rounded-full"
                            style={{ width: `${(grammaticalRange / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{grammaticalRange}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-1">
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

        {/* Current Streak and Goals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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



        {/* Basic Mistakes Section */}
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

        {/* Progress Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">IELTS Writing Task 2 Progress Tracker</CardTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortByScore} onValueChange={setSortByScore}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Sort by Score</SelectItem>
                  <SelectItem value="highest">Highest Score</SelectItem>
                  <SelectItem value="lowest">Lowest Score</SelectItem>
                </SelectContent>
              </Select>
              <Select value={essayType} onValueChange={setEssayType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Essay Type</SelectItem>
                  <SelectItem value="opinion">Opinion</SelectItem>
                  <SelectItem value="discussion">Discussion</SelectItem>
                  <SelectItem value="advantage">Advantage/Disadvantage</SelectItem>
                  <SelectItem value="cause">Cause & Solution</SelectItem>
                  <SelectItem value="double">Double Question</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortByMark} onValueChange={setSortByMark}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mark">Sort by Mark</SelectItem>
                  <SelectItem value="marked">Marked</SelectItem>
                  <SelectItem value="notmarked">Not Marked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-900">Week</th>
                    <th className="text-left p-3 font-medium text-gray-900">Topic</th>
                    <th className="text-left p-3 font-medium text-gray-900">Score</th>
                    <th className="text-left p-3 font-medium text-gray-900">Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleEssays.map((essay, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <div className="text-sm">
                          <div className="font-medium">{essay.week}</div>
                          <div className="text-gray-500">({essay.date})</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm text-gray-900">{essay.topic}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-sm">{essay.score}</div>
                      </td>
                      <td className="p-3">
                        <Star 
                          className={`w-5 h-5 ${essay.isMarked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <span>1 / 5</span>
              <div className="flex items-center gap-2">
                <span>→</span>
                <span>1-10 of 43 essays</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}