import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import WritingPractice from "@/pages/writing-practice";
import Header from "@/components/layout/header";

function Router() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/writing-practice" component={WritingPractice} />
          <Route path="/about" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
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
