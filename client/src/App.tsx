import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Support from "@/pages/support";
import Legal from "@/pages/legal";
import Admin from "@/pages/admin";
import Tutorials from "@/pages/tutorials";
import Alliance from "@/pages/alliance";
import Projects from "@/pages/projects";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tutoriels" component={Tutorials} />
      <Route path="/alliance" component={Alliance} />
      <Route path="/projets" component={Projects} />
      <Route path="/support" component={Support} />
      <Route path="/mentions-legales" component={Legal} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
