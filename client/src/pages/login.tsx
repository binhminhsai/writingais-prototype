import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock } from "lucide-react";

export default function Login() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-teal-700">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your Writing AI-Hub account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <User size={16} />
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                className="border-teal-200 focus:border-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock size={16} />
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                className="border-teal-200 focus:border-teal-500"
              />
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Sign In
            </Button>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign up here
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}