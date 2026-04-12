import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import IntroAnimation from "@/components/IntroAnimation";
import { EditModeProvider } from "./contexts/EditModeContext";
import { AdminEditBar } from "./components/AdminEditBar";
import { GlobalEditOverlay } from "./components/GlobalEditOverlay";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const Support = lazy(() => import("@/pages/support"));
const Legal = lazy(() => import("@/pages/legal"));
const Admin = lazy(() => import("@/pages/admin"));
const Tutorials = lazy(() => import("@/pages/tutorials"));
const Alliance = lazy(() => import("@/pages/alliance"));
const Projects = lazy(() => import("@/pages/projects"));
const GuideActivite = lazy(() => import("@/pages/guide-activite"));
const GuideInterface = lazy(() => import("@/pages/guide-interface"));
const GuideClasses = lazy(() => import("@/pages/guide-classes"));
const GuideProduction = lazy(() => import("@/pages/guide-production"));
const GuideChantier = lazy(() => import("@/pages/guide-chantier"));
const GuideGalaxie = lazy(() => import("@/pages/guide-galaxie"));
const GuideJargon = lazy(() => import("@/pages/guide-jargon"));
const GuideRecherches = lazy(() => import("@/pages/guide-recherches"));
const GuideColonisation = lazy(() => import("@/pages/guide-colonisation"));
const GuideClassements = lazy(() => import("@/pages/guide-classements"));
const GuideFleetsave = lazy(() => import("@/pages/guide-fleetsave"));
const GuideEspionnage = lazy(() => import("@/pages/guide-espionnage"));
const GuideExpeditions = lazy(() => import("@/pages/guide-expeditions"));
const GuideLune = lazy(() => import("@/pages/guide-lune"));
const GuideAttaque = lazy(() => import("@/pages/guide-attaque"));
const GuideACS = lazy(() => import("@/pages/guide-acs"));
const GuideRaid = lazy(() => import("@/pages/guide-raid"));
const GuideDeveloppement = lazy(() => import("@/pages/guide-developpement"));
const GuideSplit = lazy(() => import("@/pages/guide-split"));
const GuideRapidFire = lazy(() => import("@/pages/guide-rapid-fire"));
const GuideRapidFireFormules = lazy(() => import("@/pages/guide-rapid-fire-formules"));
const GuideMoonbreak = lazy(() => import("@/pages/guide-moonbreak"));
const GuideVolante = lazy(() => import("@/pages/guide-volante"));
const GuideFDV = lazy(() => import("@/pages/guide-fdv"));
const GuideUnivers = lazy(() => import("@/pages/guide-univers"));
const GuideAllianceClasses = lazy(() => import("@/pages/guide-alliance-classes"));
const GuideRechercheCibles = lazy(() => import("@/pages/guide-recherche-cibles"));
const GuideEviterInterception = lazy(() => import("@/pages/guide-eviter-interception"));
const GuideTimingRaid = lazy(() => import("@/pages/guide-timing-raid"));
const GuideDecalageSonde = lazy(() => import("@/pages/guide-decalage-sonde"));
const SuggestionTutoriel = lazy(() => import("@/pages/suggestion-tutoriel"));
const GuideRRI = lazy(() => import("@/pages/guide-rri"));
const GuideReductionFDV = lazy(() => import("@/pages/guide-reduction-fdv"));
const GuideTechnosPrioritaires = lazy(() => import("@/pages/guide-technos-prioritaires"));
const GuideReco3h = lazy(() => import("@/pages/guide-reco-3h"));
const GuideRocktal = lazy(() => import("@/pages/guide-rocktal"));
const GuideFormules = lazy(() => import("@/pages/guide-formules"));
const GuideCoutFlotte = lazy(() => import("@/pages/guide-cout-flotte"));
const GuideDefenses = lazy(() => import("@/pages/guide-defenses"));
const GuideOrdreConstruction = lazy(() => import("@/pages/guide-ordre-construction"));
const GuideCalcTempsVol = lazy(() => import("@/pages/guide-calc-temps-vol"));
const Rules = lazy(() => import("@/pages/rules"));
const RulesCompte = lazy(() => import("@/pages/rules-compte"));
const RulesSitting = lazy(() => import("@/pages/rules-sitting"));
const RulesPush = lazy(() => import("@/pages/rules-push"));
const Soutenir = lazy(() => import("@/pages/soutenir"));
const NotreHistoire = lazy(() => import("@/pages/notre-histoire"));
const RulesBash = lazy(() => import("@/pages/rules-bash"));
const Classement = lazy(() => import("@/pages/classement"));
const SurveyCompositions = lazy(() => import("@/pages/survey-compositions"));
const OutilsProduction = lazy(() => import("@/pages/outils-production"));
const OutilsProductionResultats = lazy(() => import("@/pages/outils-production-resultats"));
const OutilsMoonbreak = lazy(() => import("@/pages/outils-moonbreak"));
const OutilsBatiments = lazy(() => import("@/pages/outils-batiments"));
const OutilsRecherches = lazy(() => import("@/pages/outils-recherches"));
const OutilsConsommation = lazy(() => import("@/pages/outils-consommation"));
const OutilsColonisation = lazy(() => import("@/pages/outils-colonisation"));
const OutilsTempsVol = lazy(() => import("@/pages/outils-temps-vol"));
const OutilsTempsVolDev = lazy(() => import("@/pages/outils-temps-vol-dev"));
const OutilsIntercepteur = lazy(() => import("@/pages/outils-intercepteur"));
const Twitch = lazy(() => import("@/pages/twitch"));
const JournalBanni = lazy(() => import("@/pages/journal-banni"));

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
        Chargement...
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
        <Route path="/guide/rapid-fire" component={GuideRapidFire} />
        <Route path="/tutoriels/rapid-fire" component={GuideRapidFire} />
        <Route path="/guide/rapid-fire-formules" component={GuideRapidFireFormules} />
        <Route path="/tutoriels/rapid-fire-formules" component={GuideRapidFireFormules} />
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
        <Route path="/guide/reco-3h" component={GuideReco3h} />
        <Route path="/guide/rocktal" component={GuideRocktal} />
        <Route path="/guide/formules" component={GuideFormules} />
        <Route path="/guide/cout-flotte" component={GuideCoutFlotte} />
        <Route path="/guide/defenses" component={GuideDefenses} />
        <Route path="/guide/ordre-construction" component={GuideOrdreConstruction} />
        <Route path="/guide/calc-temps-vol" component={GuideCalcTempsVol} />
        <Route path="/alliance" component={Alliance} />
        <Route path="/projets" component={Projects} />
        <Route path="/support" component={Support} />
        <Route path="/mentions-legales" component={Legal} />
        <Route path="/admin" component={Admin} />
        <Route path="/classement" component={Classement} />
        <Route path="/soutenir" component={Soutenir} />
        <Route path="/notre-histoire" component={NotreHistoire} />
        <Route path="/sondage-compositions" component={SurveyCompositions} />
        <Route path="/outils/production" component={OutilsProduction} />
        <Route path="/outils/production/resultats" component={OutilsProductionResultats} />
        <Route path="/outils/moonbreak" component={OutilsMoonbreak} />
        <Route path="/outils/batiments" component={OutilsBatiments} />
        <Route path="/outils/recherches" component={OutilsRecherches} />
        <Route path="/outils/consommation" component={OutilsConsommation} />
        <Route path="/outils/colonisation" component={OutilsColonisation} />
        <Route path="/outils/temps-vol" component={OutilsTempsVol} />
        <Route path="/outils/temps-vol-dev" component={OutilsTempsVolDev} />
        <Route path="/outils/intercepteur" component={OutilsIntercepteur} />
        <Route path="/twitch" component={Twitch} />
        <Route path="/journal-banni" component={JournalBanni} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
