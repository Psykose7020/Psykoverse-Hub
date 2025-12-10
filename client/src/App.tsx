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
import GuideActivite from "@/pages/guide-activite";
import GuideInterface from "@/pages/guide-interface";
import GuideClasses from "@/pages/guide-classes";
import GuideProduction from "@/pages/guide-production";
import GuideChantier from "@/pages/guide-chantier";
import GuideGalaxie from "@/pages/guide-galaxie";
import GuideJargon from "@/pages/guide-jargon";
import GuideRecherches from "@/pages/guide-recherches";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tutoriels" component={Tutorials} />
      <Route path="/guide/activite" component={GuideActivite} />
      <Route path="/guide/interface" component={GuideInterface} />
      <Route path="/guide/classes" component={GuideClasses} />
      <Route path="/guide/production" component={GuideProduction} />
      <Route path="/guide/chantier" component={GuideChantier} />
      <Route path="/guide/galaxie" component={GuideGalaxie} />
      <Route path="/guide/jargon" component={GuideJargon} />
      <Route path="/guide/recherches" component={GuideRecherches} />
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
