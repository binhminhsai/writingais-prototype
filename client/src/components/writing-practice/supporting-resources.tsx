import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getOutline } from "@/data/outlines";
import { getVocabulary } from "@/data/vocabulary";
import { getPhrases } from "@/data/phrases";
import { WritingTestType } from "./test-setup";

interface SupportingResourcesProps {
  testType: WritingTestType;
  topic: string;
}

export function SupportingResources({ testType, topic }: SupportingResourcesProps) {
  const [showOutline, setShowOutline] = useState(true);
  const [activeTab, setActiveTab] = useState("vocabulary");
  
  const outline = getOutline(testType, topic);
  const vocabulary = getVocabulary(testType, topic);
  const phrases = getPhrases(testType);
  
  return (
    <div className="lg:w-1/3 mt-6 lg:mt-0">
      {/* Outline Suggestions */}
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gray-50">
          <h3 className="font-medium">Suggested Outline</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowOutline(!showOutline)}
          >
            <ChevronUp className={`h-4 w-4 ${!showOutline ? "rotate-180" : ""}`} />
          </Button>
        </CardHeader>
        {showOutline && (
          <CardContent className="py-4">
            <ul className="space-y-2 text-sm">
              {outline.map((section, index) => (
                <li key={index}>
                  <span className="font-medium">{section.title}:</span>
                  <ul className="pl-4 mt-1 space-y-1 list-disc">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>
      
      {/* Vocabulary and Phrases Tabs */}
      <Card>
        <Tabs 
          defaultValue="vocabulary" 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
            <TabsTrigger value="phrases">Useful Phrases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vocabulary" className="p-4">
            <div className="space-y-3 text-sm">
              {vocabulary.map((category, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-800">{category.name}</h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {category.words.map((word, wordIndex) => (
                      <Badge 
                        key={wordIndex} 
                        variant="secondary" 
                        className={
                          category.type === "positive" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : category.type === "negative" 
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : category.type === "academic"
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }
                      >
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="phrases" className="p-4">
            <div className="space-y-4 text-sm">
              {phrases.map((category, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-800">{category.name}</h4>
                  <ul className="mt-1 space-y-1 text-gray-600 pl-4">
                    {category.phrases.map((phrase, phraseIndex) => (
                      <li key={phraseIndex}>{phrase}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
