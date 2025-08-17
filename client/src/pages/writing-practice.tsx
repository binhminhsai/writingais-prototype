import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TestSetup, WritingTestType, DifficultyLevel } from "@/components/writing-practice/test-setup";
import { WritingInterface } from "@/components/writing-practice/writing-interface";
import { FeedbackInterface } from "@/components/writing-practice/feedback-interface";
import { Task2LoadingScreen } from "@/components/ui/task2-loading-screen";

export default function WritingPractice() {
  const [currentStage, setCurrentStage] = useState<"setup" | "writing" | "feedback">("setup");
  const [essayConfig, setEssayConfig] = useState<{
    testType: WritingTestType;
    difficulty: DifficultyLevel;
    topic: string;
    timeLimit: number;
  } | null>(null);
  const [essayContent, setEssayContent] = useState("");
  const [isStartWritingLoading, setIsStartWritingLoading] = useState(false);

  const handleStartWriting = (config: {
    testType: WritingTestType;
    difficulty: DifficultyLevel;
    topic: string;
    timeLimit: number;
  }) => {
    setEssayConfig(config);
    setIsStartWritingLoading(true);
  };

  const handleStartWritingComplete = () => {
    setIsStartWritingLoading(false);
    setCurrentStage("writing");
  };

  const handleSubmitEssay = (content: string) => {
    setEssayContent(content);
    setCurrentStage("feedback");
  };

  const handleTryAgain = () => {
    // Reset essay content but keep the same configuration
    setEssayContent("");
    setCurrentStage("writing");
  };

  const handleNextPractice = () => {
    // Reset everything for a new practice
    setEssayContent("");
    setEssayConfig(null);
    setCurrentStage("setup");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="bg-white rounded-lg shadow-md">
        {currentStage === "setup" && (
          <TestSetup onStart={handleStartWriting} />
        )}
        
        {currentStage === "writing" && essayConfig && (
          <WritingInterface
            testType={essayConfig.testType}
            difficulty={essayConfig.difficulty}
            topic={essayConfig.topic}
            timeLimit={essayConfig.timeLimit}
            onSubmit={handleSubmitEssay}
          />
        )}
        
        {currentStage === "feedback" && (
          <FeedbackInterface
            essayContent={essayContent}
            onTryAgain={handleTryAgain}
            onNextPractice={handleNextPractice}
          />
        )}
      </Card>

      {/* Task 2 Full-Screen Loading Page */}
      <Task2LoadingScreen 
        isVisible={isStartWritingLoading}
        onComplete={handleStartWritingComplete}
      />
    </main>
  );
}
