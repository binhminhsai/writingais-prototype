import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Star, Target, Trophy, Calendar, Clock, Search, Filter, Settings } from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";

interface EssayData {
  id: string;
  time: string;
  date: string;
  topic: string;
  score: number;
  isMarked: boolean;
  essayType: string;
  taskType: "Task 1" | "Task 2";
}

const sampleEssays: EssayData[] = [
  // Task 1 Essays - Line Graph
  {
    id: "essay-1",
    time: "22 min",
    date: "17/06/25",
    topic: "The line graph shows population growth in three cities over a 20-year period",
    score: 6.5,
    isMarked: false,
    essayType: "Line Graph",
    taskType: "Task 1"
  },
  {
    id: "essay-2",
    time: "18 min",
    date: "23/06/25",
    topic: "The line graph illustrates changes in air quality in major cities from 2000 to 2020",
    score: 7.0,
    isMarked: true,
    essayType: "Line Graph",
    taskType: "Task 1"
  },

  // Task 1 Essays - Bar Chart
  {
    id: "essay-3",
    time: "20 min",
    date: "04/06/25",
    topic: "The bar chart shows the percentage of households with different types of technology",
    score: 5.5,
    isMarked: false,
    essayType: "Bar Chart",
    taskType: "Task 1"
  },
  {
    id: "essay-4",
    time: "21 min",
    date: "15/06/25",
    topic: "The bar chart compares energy consumption by different sectors in 2023",
    score: 6.0,
    isMarked: true,
    essayType: "Bar Chart",
    taskType: "Task 1"
  },

  // Task 1 Essays - Table
  {
    id: "essay-5",
    time: "19 min",
    date: "19/06/25",
    topic: "The table compares energy consumption in different countries",
    score: 6.0,
    isMarked: false,
    essayType: "Table",
    taskType: "Task 1"
  },
  {
    id: "essay-6",
    time: "20 min",
    date: "26/06/25",
    topic: "The table shows information about the underground railway systems in six cities",
    score: 6.5,
    isMarked: true,
    essayType: "Table",
    taskType: "Task 1"
  },

  // Task 1 Essays - Process Diagram
  {
    id: "essay-7",
    time: "18 min",
    date: "12/06/25",
    topic: "The process of making chocolate from cocoa beans",
    score: 6.0,
    isMarked: false,
    essayType: "Process Diagram",
    taskType: "Task 1"
  },
  {
    id: "essay-8",
    time: "19 min",
    date: "28/06/25",
    topic: "The diagram shows the process of recycling plastic bottles",
    score: 7.0,
    isMarked: false,
    essayType: "Process Diagram",
    taskType: "Task 1"
  },

  // Task 1 Essays - Pie Chart
  {
    id: "essay-9",
    time: "17 min",
    date: "08/06/25",
    topic: "The pie charts show the proportion of carbohydrates, protein and fat in three different diets",
    score: 6.0,
    isMarked: true,
    essayType: "Pie Chart",
    taskType: "Task 1"
  },
  {
    id: "essay-10",
    time: "20 min",
    date: "30/06/25",
    topic: "The pie charts compare the reasons why people travel to work by bicycle in two cities",
    score: 7.5,
    isMarked: false,
    essayType: "Pie Chart",
    taskType: "Task 1"
  },

  // Task 1 Essays - Map
  {
    id: "essay-11",
    time: "21 min",
    date: "11/06/25",
    topic: "The maps show changes to a town center between 1990 and 2010",
    score: 6.5,
    isMarked: false,
    essayType: "Map",
    taskType: "Task 1"
  },
  {
    id: "essay-12",
    time: "19 min",
    date: "29/06/25",
    topic: "The maps show the development of a college campus from 1975 to present day",
    score: 7.0,
    isMarked: true,
    essayType: "Map",
    taskType: "Task 1"
  },

  // Task 2 Essays - Opinion
  {
    id: "essay-13",
    time: "45 min",
    date: "02/06/25",
    topic: "The impact of technology on employment",
    score: 5.0,
    isMarked: true,
    essayType: "Opinion",
    taskType: "Task 2"
  },
  {
    id: "essay-14",
    time: "44 min",
    date: "18/06/25",
    topic: "Job satisfaction or salary – which matters more?",
    score: 7.0,
    isMarked: true,
    essayType: "Opinion",
    taskType: "Task 2"
  },
  {
    id: "money-management-essay",
    time: "43 min",
    date: "25/06/25",
    topic: "Some people believe that students should be taught how to manage money at school",
    score: 8.0,
    isMarked: false,
    essayType: "Opinion",
    taskType: "Task 2"
  },

  // Task 2 Essays - Discussion
  {
    id: "essay-15",
    time: "40 min",
    date: "04/06/25",
    topic: "The role of government in environmental protection",
    score: 5.0,
    isMarked: true,
    essayType: "Discussion",
    taskType: "Task 2"
  },
  {
    id: "essay-16",
    time: "42 min",
    date: "20/06/25",
    topic: "Some people think that university education should be free for all students",
    score: 6.5,
    isMarked: false,
    essayType: "Discussion",
    taskType: "Task 2"
  },
  {
    id: "essay-17",
    time: "41 min",
    date: "27/06/25",
    topic: "The debate about whether celebrities have a responsibility to be role models",
    score: 7.5,
    isMarked: true,
    essayType: "Discussion",
    taskType: "Task 2"
  },

  // Task 2 Essays - Advantage/Disadvantage
  {
    id: "essay-18",
    time: "38 min",
    date: "14/06/25",
    topic: "Advantages and disadvantages of online education",
    score: 5.5,
    isMarked: true,
    essayType: "Advantage/Disadvantage",
    taskType: "Task 2"
  },
  {
    id: "essay-19",
    time: "46 min",
    date: "21/06/25",
    topic: "Is it better to study abroad or locally?",
    score: 7.5,
    isMarked: true,
    essayType: "Advantage/Disadvantage",
    taskType: "Task 2"
  },
  {
    id: "essay-20",
    time: "39 min",
    date: "24/06/25",
    topic: "The advantages and disadvantages of living in a large city",
    score: 6.2,
    isMarked: false,
    essayType: "Advantage/Disadvantage",
    taskType: "Task 2"
  },

  // Task 2 Essays - Problem/Solution
  {
    id: "essay-21",
    time: "44 min",
    date: "09/06/25",
    topic: "Traffic congestion in cities and potential solutions",
    score: 6.4,
    isMarked: false,
    essayType: "Problem/Solution",
    taskType: "Task 2"
  },
  {
    id: "essay-22",
    time: "45 min",
    date: "22/06/25",
    topic: "The problem of plastic pollution and how to address it",
    score: 7.1,
    isMarked: true,
    essayType: "Problem/Solution",
    taskType: "Task 2"
  },

  // Task 2 Essays - Cause & Solution
  {
    id: "essay-23",
    time: "42 min",
    date: "10/06/25",
    topic: "The importance of university education for career success",
    score: 5.5,
    isMarked: true,
    essayType: "Cause & Solution",
    taskType: "Task 2"
  },
  {
    id: "essay-24",
    time: "41 min",
    date: "16/06/25",
    topic: "Causes of youth unemployment and possible solutions",
    score: 6.6,
    isMarked: false,
    essayType: "Cause & Solution",
    taskType: "Task 2"
  },

  // Task 2 Essays - Two-part Question
  {
    id: "essay-25",
    time: "43 min",
    date: "07/06/25",
    topic: "Why do people choose to live in cities? What problems might this cause?",
    score: 6.1,
    isMarked: false,
    essayType: "Two-part Question",
    taskType: "Task 2"
  },
  {
    id: "essay-26",
    time: "44 min",
    date: "13/06/25",
    topic: "What are the benefits of reading books? How can we encourage more people to read?",
    score: 7.4,
    isMarked: true,
    essayType: "Two-part Question",
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

// Format IELTS score to proper display format
const formatIELTSScore = (score: number): string => {
  // Round to nearest 0.5
  const rounded = Math.round(score * 2) / 2;
  
  // For whole numbers, show one decimal place (6.0)
  // For half numbers, show one decimal place (6.5)
  return rounded.toFixed(1);
};

export default function ProgressTracking() {
  const [location, navigate] = useLocation();
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [sortByScore, setSortByScore] = useState("score");
  const [sortByMark, setSortByMark] = useState("mark");
  const [essayType, setEssayType] = useState("all");
  const [showChart, setShowChart] = useState("Essay");
  const [showBasicMistakes, setShowBasicMistakes] = useState(false);
  const [essays, setEssays] = useState<EssayData[]>(sampleEssays);
  
  // Filter states
  const [searchInput, setSearchInput] = useState(""); // What user types in search box
  const [searchTerm, setSearchTerm] = useState(""); // Actual search term used for filtering
  const [sortOrder, setSortOrder] = useState("Mới nhất");
  const [scoreSort, setScoreSort] = useState("Điểm số");
  const [selectedTask, setSelectedTask] = useState("Tất cả");
  const [selectedEssayType, setSelectedEssayType] = useState("Loại bài viết");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  
  // Goals popup states
  const [showGoalsDialog, setShowGoalsDialog] = useState(false);
  const [targetScore, setTargetScore] = useState("8.0");
  const [examDate, setExamDate] = useState("");
  
  // Track original values to detect changes
  const [originalTargetScore, setOriginalTargetScore] = useState("8.0");
  const [originalExamDate, setOriginalExamDate] = useState("");
  
  // Date validation state
  const [dateError, setDateError] = useState("");
  
  // Check if data has changed and is valid
  const hasDataChanged = () => {
    return (targetScore !== originalTargetScore || examDate !== originalExamDate) && !dateError;
  };

  // Validate if date is in the future and is a valid calendar date
  const validateDate = (dateStr: string) => {
    if (!dateStr) {
      setDateError("");
      return;
    }

    const parts = dateStr.split('/');
    if (parts.length !== 3) {
      setDateError("Định dạng ngày không hợp lệ");
      return;
    }

    const [day, month, year] = parts;
    if (!day || !month || !year || day.length !== 2 || month.length !== 2 || year.length !== 4) {
      setDateError("Định dạng ngày không hợp lệ");
      return;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Check basic ranges
    if (dayNum < 1 || dayNum > 31) {
      setDateError("Ngày không hợp lệ (01-31)");
      return;
    }
    
    if (monthNum < 1 || monthNum > 12) {
      setDateError("Tháng không hợp lệ (01-12)");
      return;
    }

    if (yearNum < 1900 || yearNum > 2100) {
      setDateError("Năm không hợp lệ");
      return;
    }

    // Create date and check if it's valid (handles leap years and month-specific day limits)
    const examDate = new Date(yearNum, monthNum - 1, dayNum);
    
    // Check if the date created matches what we input (prevents invalid dates like 31/02)
    if (examDate.getDate() !== dayNum || 
        examDate.getMonth() !== monthNum - 1 || 
        examDate.getFullYear() !== yearNum) {
      setDateError("Ngày không tồn tại trong lịch");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    
    if (examDate < today) {
      setDateError("Ngày thi phải là ngày trong tương lai");
      return;
    }

    setDateError("");
  };

  // Open dialog and set original values
  const handleOpenDialog = () => {
    setOriginalTargetScore(targetScore);
    setOriginalExamDate(examDate);
    setDateError(""); // Clear any existing errors
    setShowGoalsDialog(true);
  };

  // Save goals function
  const handleSaveGoals = () => {
    // Update original values to current values
    setOriginalTargetScore(targetScore);
    setOriginalExamDate(examDate);
    setShowGoalsDialog(false);
  };

  // Cancel changes function
  const handleCancelGoals = () => {
    // Revert to original values
    setTargetScore(originalTargetScore);
    setExamDate(originalExamDate);
    setShowGoalsDialog(false);
  };
  
  // Handle target score change - allow free input but format on blur
  const handleTargetScoreChange = (value: string) => {
    setTargetScore(value);
  };

  // Format target score on blur
  const handleTargetScoreBlur = () => {
    const numValue = parseFloat(targetScore);
    if (isNaN(numValue)) {
      setTargetScore("");
      return;
    }
    
    // Round to nearest 0.5
    const rounded = Math.round(numValue * 2) / 2;
    
    // Clamp between 0 and 9
    const clamped = Math.max(0, Math.min(9, rounded));
    
    // Format to always show 1 decimal place
    setTargetScore(clamped.toFixed(1));
  };
  
  // Calculate exam countdown
  const calculateCountdown = (examDateStr: string) => {
    try {
      if (!examDateStr) return 'Chưa có ngày thi';
      
      const parts = examDateStr.split('/');
      if (parts.length !== 3) return 'Ngày không hợp lệ';
      
      const [day, month, year] = parts;
      if (!day || !month || !year) return 'Ngày không hợp lệ';
      
      // Handle both 2-digit and 4-digit years
      const fullYear = year.length === 2 ? 2000 + parseInt(year) : parseInt(year);
      const examDate = new Date(fullYear, parseInt(month) - 1, parseInt(day));
      
      // Check if date is valid
      if (isNaN(examDate.getTime())) return 'Ngày không hợp lệ';
      
      const today = new Date();
      const diffTime = examDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? `${diffDays} days` : 'Đã qua ngày thi';
    } catch {
      return 'Ngày không hợp lệ';
    }
  };
  
  // Format date for display (YYYY-MM-DD to DD/MM/YYYY)
  const formatDateForDisplay = (dateStr: string) => {
    if (dateStr.includes('/')) return dateStr;
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };
  
  // Format date for input (DD/MM/YYYY to YYYY-MM-DD)
  const formatDateForInput = (dateStr: string) => {
    if (!dateStr || dateStr.includes('-')) return dateStr;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return '';
    
    const [day, month, year] = parts;
    if (!day || !month || !year) return '';
    
    // Handle both 2-digit and 4-digit years
    const fullYear = year.length === 2 ? `20${year}` : year;
    return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
  
  // Handle date input with seamless typing like credit card expiry
  const handleDateInputChange = (value: string) => {
    // Extract only digits from the input
    const digitsOnly = value.replace(/\D/g, '');
    
    // If empty, show placeholder
    if (digitsOnly.length === 0) {
      setExamDate('');
      setDateError("");
      return;
    }
    
    // Format as DD/MM/YYYY with automatic slash insertion
    let formatted = '';
    
    if (digitsOnly.length <= 2) {
      // Just day: "01" or "1"
      formatted = digitsOnly;
    } else if (digitsOnly.length <= 4) {
      // Day + month: "01/02" or "01/2"
      formatted = digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2);
    } else {
      // Day + month + year: "01/02/2025"
      formatted = digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2, 4) + '/' + digitsOnly.slice(4, 8);
    }
    
    setExamDate(formatted);
    
    // Only validate if we have a complete date (8 digits)
    if (digitsOnly.length === 8) {
      validateDate(formatted);
    } else {
      setDateError(""); // Clear errors for incomplete dates
    }
  };

  // Handle date change from calendar picker
  const handleDateChange = (value: string) => {
    const formattedDate = formatDateForDisplay(value);
    setExamDate(formattedDate);
    validateDate(formattedDate);
  };

  // Get display value for the exam date (show actual date or placeholder)
  const getDisplayDate = () => {
    if (examDate === "DD/MM/YYYY" || !examDate || examDate.includes('D') || examDate.includes('M') || examDate.includes('Y')) {
      return examDate;
    }
    return examDate;
  };

  // Get essay types based on selected task
  const getEssayTypesForTask = (taskType: string) => {
    if (taskType === "Task 1") {
      return ["Loại bài viết", "Line Graph", "Bar Chart", "Table", "Process Diagram", "Pie Chart", "Map"];
    } else if (taskType === "Task 2") {
      return ["Loại bài viết", "Opinion", "Discussion", "Advantage/Disadvantage", "Problem/Solution", "Cause & Solution", "Two-part Question"];
    }
    return ["Loại bài viết"];
  };

  // Handle task selection change
  const handleTaskChange = (newTask: string) => {
    setSelectedTask(newTask);
    setSelectedEssayType("Loại bài viết"); // Reset essay type when task changes
  };

  const toggleEssayMarked = (index: number) => {
    setEssays(prev => prev.map((essay, i) => 
      i === index ? { ...essay, isMarked: !essay.isMarked } : essay
    ));
  };

  // Handle search button click
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  // Handle Enter key in search input
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  // Filtered and sorted essays
  const filteredEssays = useMemo(() => {
    let filtered = essays.filter(essay => {
      // Search filter
      const matchesSearch = essay.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           essay.essayType.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Task type filter logic
      let matchesType = true;
      
      // If no task is selected or "Tất cả" is selected, show all essays
      if (selectedTask === "Tất cả") {
        matchesType = true;
      }
      // If a specific task is selected
      else if (selectedTask === "Task 1" || selectedTask === "Task 2") {
        // First filter by task type
        if (essay.taskType !== selectedTask) {
          matchesType = false;
        }
        // Then filter by essay type if a specific type is selected
        else if (selectedEssayType !== "Loại bài viết") {
          matchesType = essay.essayType === selectedEssayType;
        }
      }
      
      // Starred filter
      const matchesStarred = !showStarredOnly || essay.isMarked;
      
      return matchesSearch && matchesType && matchesStarred;
    });

    // Sort the filtered essays - prioritize score sort over date sort
    if (scoreSort === "Điểm cao đến thấp") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (scoreSort === "Điểm thấp đến cao") {
      filtered.sort((a, b) => a.score - b.score);
    } else {
      // Only sort by date if no score sorting is selected
      if (sortOrder === "Cũ nhất") {
        // Old first: ascending order (earliest dates first)
        filtered.sort((a, b) => {
          const dateA = new Date('20' + a.date.split('/').reverse().join('-')); // Convert DD/MM/YY to YYYY-MM-DD
          const dateB = new Date('20' + b.date.split('/').reverse().join('-'));
          return dateA.getTime() - dateB.getTime();
        });
      } else {
        // New first: descending order (latest dates first) 
        filtered.sort((a, b) => {
          const dateA = new Date('20' + a.date.split('/').reverse().join('-')); // Convert DD/MM/YY to YYYY-MM-DD
          const dateB = new Date('20' + b.date.split('/').reverse().join('-'));
          return dateB.getTime() - dateA.getTime();
        });
      }
    }

    return filtered;
  }, [essays, searchTerm, sortOrder, scoreSort, selectedTask, selectedEssayType, showStarredOnly]);

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
                    <span className="text-2xl font-bold w-12 text-right">{formatIELTSScore(overallScore)}</span>
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
                        <span className="text-xl font-bold w-12 text-right">{formatIELTSScore(taskResponse)}</span>
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
                        <span className="text-xl font-bold w-12 text-right">{formatIELTSScore(lexicalResource)}</span>
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
                        <span className="text-xl font-bold w-12 text-right">{formatIELTSScore(coherenceCohesion)}</span>
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
                        <span className="text-xl font-bold w-12 text-right">{formatIELTSScore(grammaticalRange)}</span>
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
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Tìm kiếm theo chủ đề hoặc dạng bài viết..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                        className="pl-10"
                      />
                    </div>
                    <Button
                      variant="default"
                      className="flex items-center gap-2"
                      onClick={handleSearch}
                    >
                      <Search className="w-4 h-4" />
                      Tìm kiếm
                    </Button>
                    {searchTerm && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={handleClearSearch}
                      >
                        Xóa
                      </Button>
                    )}
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

                  {/* Task Filter */}
                  <Select value={selectedTask} onValueChange={handleTaskChange}>
                    <SelectTrigger className="w-auto min-w-[120px]">
                      <span className="flex-1 text-left">{selectedTask}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tất cả">Tất cả</SelectItem>
                      <SelectItem value="Task 1">Task 1</SelectItem>
                      <SelectItem value="Task 2">Task 2</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Essay Type Filter - Disabled if no task selected */}
                  <Select 
                    value={selectedEssayType} 
                    onValueChange={setSelectedEssayType}
                    disabled={selectedTask === "Tất cả"}
                  >
                    <SelectTrigger className={`w-auto min-w-[180px] ${selectedTask === "Tất cả" ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <span className="flex-1 text-left">{selectedEssayType}</span>
                    </SelectTrigger>
                    <SelectContent>
                      {getEssayTypesForTask(selectedTask).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
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
                  <div className="overflow-y-auto progress-table-scroll max-h-[450px] pr-2">
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
                          {filteredEssays.map((essay, filteredIndex) => {
                            const originalIndex = essays.findIndex(e => 
                              e.date === essay.date && 
                              e.topic === essay.topic && 
                              e.score === essay.score &&
                              e.time === essay.time
                            );
                            
                            return (
                              <tr key={filteredIndex} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/essay/${essay.id}/feedback`)}>
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
                                    {formatIELTSScore(essay.score)}
                                  </Badge>
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <button
                                    onClick={() => originalIndex >= 0 && toggleEssayMarked(originalIndex)}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                    disabled={originalIndex < 0}
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
                            );
                          })}
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
                  <CardTitle className="text-lg flex items-center justify-between">
                    Your Goals
                    <Dialog open={showGoalsDialog} onOpenChange={setShowGoalsDialog}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleOpenDialog}>
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]" aria-describedby="goal-dialog-description">
                        <DialogHeader>
                          <DialogTitle>Chỉnh sửa mục tiêu của bạn</DialogTitle>
                          <div id="goal-dialog-description" className="sr-only">
                            Cập nhật điểm mục tiêu và ngày thi IELTS của bạn
                          </div>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="target-score" className="text-right">
                              Mục tiêu
                            </Label>
                            <Input
                              id="target-score"
                              type="text"
                              placeholder="8.0"
                              value={targetScore}
                              onChange={(e) => handleTargetScoreChange(e.target.value)}
                              onBlur={handleTargetScoreBlur}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="exam-date" className="text-right">
                              Ngày thi
                            </Label>
                            <div className="col-span-3">
                              <div className="flex items-center gap-2">
                                <Input
                                  type="text"
                                  placeholder="DD/MM/YYYY"
                                  value={examDate}
                                  onChange={(e) => handleDateInputChange(e.target.value)}
                                  maxLength={10}
                                  className={`flex-1 ${dateError ? 'border-red-500' : ''}`}
                                />
                                <div className="relative">
                                  <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formatDateForInput(examDate)}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className="absolute inset-0 w-6 h-6 opacity-0 cursor-pointer"
                                  />
                                  <Calendar className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors" />
                                </div>
                              </div>
                              {dateError && (
                                <p className="text-red-500 text-sm mt-1">{dateError}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={handleCancelGoals}>
                            Huỷ
                          </Button>
                          <Button 
                            type="submit" 
                            onClick={handleSaveGoals}
                            disabled={!hasDataChanged()}
                          >
                            Lưu thay đổi
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Target Score</span>
                      <span className="font-medium">{targetScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Exam Date</span>
                      <span className="font-medium text-blue-600">
                        {!examDate ? "Chưa thiết lập" : examDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Exam Countdown</span>
                      <span className="font-medium">
                        {!examDate ? "Chưa có ngày thi" : calculateCountdown(examDate)}
                      </span>
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