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

      <div className="bg-gradient-to-br from-teal-50 via-primary/5 to-yellow-50 rounded-2xl p-10 text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-teal-100/50 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 p-4 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <Medal className="h-10 w-10 text-yellow-700" />
            </div>
            <h2 className="text-3xl font-bold ml-4 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">Premium Writing Assistant</h2>
          </div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Get advanced features with our premium plan: detailed essay analysis,
            personalized improvement suggestions, and professional evaluation.
          </p>
          <Button 
            className="bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-auto transform hover:scale-105" 
            disabled
          >
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </div>
  );
}
