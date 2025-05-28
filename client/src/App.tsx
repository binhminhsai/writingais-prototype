import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import WritingPractice from "@/pages/writing-practice";
import Login from "@/pages/login";
import Blog from "@/pages/blog";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-0">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/writing-practice" component={WritingPractice} />
          <Route path="/blog" component={Blog} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={NotFound} />
          <Route path="/vocabulary" component={NotFound} />
          <Route path="/progress" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
