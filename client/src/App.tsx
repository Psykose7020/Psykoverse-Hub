import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import IntroAnimation from "@/components/IntroAnimation";
import { EditModeProvider } from "./contexts/EditModeContext";
import { AdminEditBar } from "./components/AdminEditBar";
import { GlobalEditOverlay } from "./components/GlobalEditOverlay";

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
import GuideColonisation from "@/pages/guide-colonisation";
import GuideClassements from "@/pages/guide-classements";
import GuideFleetsave from "@/pages/guide-fleetsave";
import GuideEspionnage from "@/pages/guide-espionnage";
import GuideExpeditions from "@/pages/guide-expeditions";
import GuideLune from "@/pages/guide-lune";
import GuideAttaque from "@/pages/guide-attaque";
import GuideACS from "@/pages/guide-acs";
import GuideRaid from "@/pages/guide-raid";
import GuideDeveloppement from "@/pages/guide-developpement";
import GuideSplit from "@/pages/guide-split";
import GuideMoonbreak from "@/pages/guide-moonbreak";
import GuideVolante from "@/pages/guide-volante";
import GuideFDV from "@/pages/guide-fdv";
import GuideUnivers from "@/pages/guide-univers";
import GuideAllianceClasses from "@/pages/guide-alliance-classes";
import GuideRechercheCibles from "@/pages/guide-recherche-cibles";
import GuideEviterInterception from "@/pages/guide-eviter-interception";
import GuideTimingRaid from "@/pages/guide-timing-raid";
import GuideDecalageSonde from "@/pages/guide-decalage-sonde";
import SuggestionTutoriel from "@/pages/suggestion-tutoriel";
import GuideRRI from "@/pages/guide-rri";
import GuideReductionFDV from "@/pages/guide-reduction-fdv";
import GuideTechnosPrioritaires from "@/pages/guide-technos-prioritaires";
import Rules from "@/pages/rules";
import RulesCompte from "@/pages/rules-compte";
import RulesSitting from "@/pages/rules-sitting";
import RulesPush from "@/pages/rules-push";
import RulesBash from "@/pages/rules-bash";
import Classement from "@/pages/classement";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tutoriels" component={Tutorials} />
      <Route path="/regles" component={Rules} />
      <Route path="/regles/compte" component={RulesCompte} />
      <Route path="/regles/sitting" component={RulesSitting} />
      <Route path="/regles/push" component={RulesPush} />
      <Route path="/regles/bash" component={RulesBash} />
      <Route path="/guide/activite" component={GuideActivite} />
      <Route path="/guide/interface" component={GuideInterface} />
      <Route path="/guide/classes" component={GuideClasses} />
      <Route path="/guide/production" component={GuideProduction} />
      <Route path="/guide/chantier" component={GuideChantier} />
      <Route path="/guide/galaxie" component={GuideGalaxie} />
      <Route path="/guide/jargon" component={GuideJargon} />
      <Route path="/guide/recherches" component={GuideRecherches} />
      <Route path="/guide/colonisation" component={GuideColonisation} />
      <Route path="/guide/classements" component={GuideClassements} />
      <Route path="/guide/fleetsave" component={GuideFleetsave} />
      <Route path="/guide/espionnage" component={GuideEspionnage} />
      <Route path="/guide/expeditions" component={GuideExpeditions} />
      <Route path="/guide/lune" component={GuideLune} />
      <Route path="/guide/attaque" component={GuideAttaque} />
      <Route path="/guide/acs" component={GuideACS} />
      <Route path="/guide/raid" component={GuideRaid} />
      <Route path="/guide/developpement" component={GuideDeveloppement} />
      <Route path="/guide/split" component={GuideSplit} />
      <Route path="/guide/moonbreak" component={GuideMoonbreak} />
      <Route path="/guide/volante" component={GuideVolante} />
      <Route path="/guide/fdv" component={GuideFDV} />
      <Route path="/guide/univers" component={GuideUnivers} />
      <Route path="/guide/alliance-classes" component={GuideAllianceClasses} />
      <Route path="/guide/recherche-cibles" component={GuideRechercheCibles} />
      <Route path="/guide/eviter-interception" component={GuideEviterInterception} />
      <Route path="/guide/timing-raid" component={GuideTimingRaid} />
      <Route path="/guide/decalage-sonde" component={GuideDecalageSonde} />
      <Route path="/suggestion-tutoriel" component={SuggestionTutoriel} />
      <Route path="/guide/rri" component={GuideRRI} />
      <Route path="/guide/reduction-fdv" component={GuideReductionFDV} />
      <Route path="/guide/technos-prioritaires" component={GuideTechnosPrioritaires} />
      <Route path="/alliance" component={Alliance} />
      <Route path="/projets" component={Projects} />
      <Route path="/support" component={Support} />
      <Route path="/mentions-legales" component={Legal} />
      <Route path="/admin" component={Admin} />
      <Route path="/classement" component={Classement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EditModeProvider>
          <IntroAnimation>
            <AdminEditBar />
            <GlobalEditOverlay />
            <ScrollToTop />
            <Toaster />
            <Router />
          </IntroAnimation>
        </EditModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
