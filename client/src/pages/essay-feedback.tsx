import { useRoute, useLocation } from "wouter";
import { FeedbackInterface } from "@/components/writing-practice/feedback-interface";
import { Card } from "@/components/ui/card";

// Sample essay data based on essay ID
const getEssayData = (id: string) => {
  const essays = [
    {
      id: "essay-1",
      content: `The line graph shows population growth in three major cities (New York, London, and Tokyo) from 2000 to 2020. Overall, all three cities experienced population growth, with Tokyo showing the most dramatic increase.

New York's population grew steadily from 8.2 million in 2000 to 8.8 million in 2020, representing a moderate increase of approximately 7.3%. The growth was relatively consistent throughout the period, with slight acceleration after 2010.

London experienced more significant growth, rising from 7.2 million to 9.0 million over the same period, an increase of 25%. The most notable growth occurred between 2005 and 2015, when the population increased by nearly 1.2 million.

Tokyo demonstrated the most substantial population growth, climbing from 12.1 million in 2000 to 14.8 million in 2020, representing a 22% increase. The growth was particularly pronounced between 2008 and 2016, during which the population expanded by over 2 million.

In conclusion, while all three cities showed population growth over the 20-year period, Tokyo had the largest absolute increase, followed by London and New York respectively.`
    },
    {
      id: "essay-2", 
      content: `The line graph illustrates changes in air quality measured by PM2.5 levels in four major cities (Beijing, Delhi, Los Angeles, and London) from 2000 to 2020.

Overall, the data reveals significant variations in air quality trends across the four cities. Beijing and Delhi showed concerning pollution levels, while Los Angeles and London demonstrated improvements over the period.

Beijing's air quality deteriorated dramatically from 2000 to 2010, with PM2.5 levels rising from 45 μg/m³ to a peak of 85 μg/m³. However, from 2010 onwards, there was a notable improvement, with levels declining to 55 μg/m³ by 2020.

Delhi experienced the most severe air quality issues, with PM2.5 levels increasing consistently from 55 μg/m³ in 2000 to 95 μg/m³ in 2020. This represents the highest pollution levels among all four cities by the end of the period.

In contrast, Los Angeles showed steady improvement throughout the entire period. PM2.5 levels decreased from 35 μg/m³ in 2000 to just 12 μg/m³ in 2020, representing the best air quality achievement.

London maintained relatively stable air quality, with minor fluctuations between 18-25 μg/m³ throughout the period, ending at approximately 20 μg/m³ in 2020.

In conclusion, while Western cities like Los Angeles and London maintained or improved their air quality, Asian cities faced significant challenges, with Delhi showing the most concerning trend.`
    },
    {
      id: "essay-3",
      content: `The bar chart compares the percentage of households owning different types of technology devices (smartphones, tablets, laptops, and smart TVs) across five countries in 2023.

Overall, smartphone ownership is universally high across all countries, while other technologies show more varied adoption rates. South Korea leads in most categories, reflecting its advanced digital infrastructure.

Smartphone ownership is remarkably consistent, ranging from 85% in Brazil to 98% in South Korea. The USA, Japan, and Germany all show ownership rates above 90%, indicating smartphones have achieved near-universal adoption in developed nations.

Tablet ownership varies considerably more, with South Korea leading at 78%, followed by the USA at 65%. Japan and Germany show moderate adoption at 58% and 52% respectively, while Brazil lags significantly at 35%.

Laptop ownership follows a similar pattern, with South Korea again leading at 82%. The USA and Germany are closely matched at 71% and 68%, while Japan shows 61% and Brazil 28%. This suggests a strong correlation between economic development and laptop penetration.

Smart TV adoption shows interesting variations from the general trend. The USA leads this category at 74%, followed closely by South Korea at 71%. Germany and Japan show moderate adoption at 56% and 48%, while Brazil again shows the lowest penetration at 31%.

In conclusion, while smartphone ownership has achieved near-universal adoption across all surveyed countries, other technologies show clear correlations with economic development, with South Korea and the USA generally leading adoption rates.`
    }
  ];

  return essays.find(essay => essay.id === id) || essays[0];
};

export default function EssayFeedback() {
  const [, params] = useRoute("/essay/:id/feedback");
  const [, navigate] = useLocation();
  const essayId = params?.id || "essay-1";
  
  const essayData = getEssayData(essayId);

  const handleTryAgain = () => {
    // Could navigate back to writing practice or show a different action
    navigate("/writing-practice");
  };

  const handleNextPractice = () => {
    // Navigate back to progress tracking
    navigate("/progress-tracking");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="bg-white rounded-lg shadow-md">
        <FeedbackInterface
          essayContent={essayData.content}
          onTryAgain={handleTryAgain}
          onNextPractice={handleNextPractice}
          context="essay-grading"
        />
      </Card>
    </main>
  );
}