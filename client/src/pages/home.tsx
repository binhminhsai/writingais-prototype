import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileEdit, BookOpen, History, Medal } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Improve Your English Writing Skills
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Practice writing essays, get instant feedback, and enhance your vocabulary
          with our comprehensive writing tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileEdit className="h-5 w-5 text-primary" /> Writing Practice
            </CardTitle>
            <CardDescription>
              Practice writing for different tests and scenarios
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600">
              Choose from IELTS, TOEFL, general essays, or business writing. Select
              your difficulty level and get personalized feedback.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/writing-practice">
              <Button className="w-full">
                Start Practice <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" /> Vocabulary Builder
            </CardTitle>
            <CardDescription>
              Expand your vocabulary with targeted word lists
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600">
              Access curated vocabulary lists for different topics and writing types.
              Learn words that will improve your writing score.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-indigo-600" /> Progress Tracking
            </CardTitle>
            <CardDescription>
              Track your improvement over time
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600">
              See your writing progress and improvement areas. Get insights on your
              vocabulary range, grammar accuracy, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-teal-500/10 via-primary/10 to-teal-500/10 rounded-xl p-8 text-center transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl border border-teal-100">
        <div className="flex items-center justify-center mb-6 animate-bounce-slow">
          <Medal className="h-10 w-10 text-yellow-500 mr-3 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-primary bg-clip-text text-transparent">Premium Writing Assistant</h2>
        </div>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
          Get advanced features with our premium plan: detailed essay analysis,
          personalized improvement suggestions, and professional evaluation.
        </p>
        <Button className="bg-gradient-to-r from-teal-500 to-primary hover:opacity-90 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6 h-auto font-semibold shadow-md hover:shadow-xl" disabled>
          Upgrade to Premium
        </Button>
      </div>
    </div>
  );
}
