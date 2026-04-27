import { CircleHelp, Monitor, PanelsTopLeft, Route } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import {
  PageBackLink,
  PageContainer,
  PageHero,
  ResultStat,
  SectionCard,
} from "@/components/content/page-shell";

const zones = [
  { color: "bg-white", label: "Blanc", description: "Pseudo, classement, notes, amis, recherche, options, support, déconnexion et heure serveur." },
  { color: "bg-pink-500", label: "Rose", description: "Ressources en temps réel: métal, cristal, deutérium, antimatière et énergie." },
  { color: "bg-yellow-500", label: "Jaune", description: "Classe du compte: Collecteur, Général ou Explorateur." },
  { color: "bg-blue-500", label: "Bleu", description: "Officiers et bonus payants associés." },
  { color: "bg-gray-500", label: "Gris", description: "Tutoriel de départ et récompenses des premiers jours." },
  { color: "bg-red-500", label: "Rouge", description: "Événements de flotte en cours et messagerie." },
  { color: "bg-green-500", label: "Vert", description: "Menu principal du jeu." },
  { color: "bg-orange-500", label: "Orange", description: "Détails de la planète active et items planétaires." },
  { color: "bg-purple-500", label: "Violet", description: "Liste des planètes et des lunes." },
  { color: "bg-amber-700", label: "Marron", description: "Constructions et recherches en cours." },
];

export default function GuideInterface() {
  return (
    <Layout>
      <PageContainer>
        <PageBackLink />

        <PageHero
          icon={Monitor}
          title="L'Interface du Jeu"
          description="Comprendre rapidement les zones utiles de l’interface OGame et éviter de chercher les informations au hasard."
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-500/20"
          badge={<p className="text-sm text-gray-500">Guide de prise en main pour les premières heures de jeu.</p>}
        />

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ResultStat label="Objectif" value="Se repérer vite" valueClassName="text-cyan-300" />
            <ResultStat label="Niveau visé" value="Débutant" valueClassName="text-green-300" />
            <ResultStat label="À retenir" value="Lire les zones" valueClassName="text-white" />
          </div>

          <SectionCard title="Vue d’ensemble" description="L’écran principal concentre navigation, économie et activité du compte." icon={PanelsTopLeft}>
            <p className="mb-5 text-gray-300">
              La vue d’ensemble sert de point d’entrée: elle vous permet de vérifier vos ressources, surveiller les mouvements de flotte
              et basculer rapidement vers les pages clés du jeu.
            </p>
            <div className="rounded-xl bg-[#0B0E14] p-4">
              <img
                src="https://img.tedomum.net/data/FaQ%201-8e2ee4.png"
                alt="Vue d'ensemble OGame"
                className="w-full rounded-lg"
              />
            </div>
          </SectionCard>

          <SectionCard title="Décoder les zones de l’interface" description="Chaque couleur correspond à un bloc fonctionnel précis.">
            <div className="rounded-xl bg-[#0B0E14] p-4">
              <img
                src="https://img.tedomum.net/data/Tuto%202-12afb5.png"
                alt="Interface détaillée"
                className="w-full rounded-lg"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {zones.map((zone) => (
                <div key={zone.label} className="flex items-start gap-3 rounded-xl border border-[#2E384D] bg-[#151924] p-4">
                  <div className={`mt-1 h-4 w-4 flex-shrink-0 rounded ${zone.color}`} />
                  <div>
                    <p className="font-semibold text-white">{zone.label}</p>
                    <p className="mt-1 text-sm text-gray-400">{zone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Lire les prérequis sans se perdre" description="Un réflexe utile dès le début pour planifier ses constructions." icon={CircleHelp}>
            <p className="mb-5 text-gray-300">
              Quand un bâtiment, une recherche ou un vaisseau est grisé, cliquez sur le <span className="font-bold text-primary">?</span> affiché sur l’élément.
              OGame vous montre alors les prérequis exacts et leur état.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-[#0B0E14] p-3">
                <img src="https://img.tedomum.net/data/FaQ%203-6571db.png" alt="Bouton prérequis" className="w-full rounded-lg" />
                <p className="mt-2 text-center text-xs text-gray-500">1. Ouvrir la fiche</p>
              </div>
              <div className="rounded-xl bg-[#0B0E14] p-3">
                <img src="https://img.tedomum.net/data/FaQ%204-5f846d.png" alt="Fiche technique" className="w-full rounded-lg" />
                <p className="mt-2 text-center text-xs text-gray-500">2. Lire la fiche technique</p>
              </div>
              <div className="rounded-xl bg-[#0B0E14] p-3">
                <img src="https://img.tedomum.net/data/FaQ%205-85117c.png" alt="Liste des prérequis" className="w-full rounded-lg" />
                <p className="mt-2 text-center text-xs text-gray-500">3. Vérifier les prérequis manquants</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Réflexe utile pour progresser" tone="accent" icon={Route}>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Commencez par repérer ressources, événements et menu principal.</li>
              <li>Puis apprenez à lire les fiches de prérequis avant de lancer une montée.</li>
              <li>Une fois ce socle acquis, enchaînez avec les guides sur les classes, l’univers et la production.</li>
            </ul>
          </SectionCard>

          <RelatedGuides currentGuide="interface" />
        </div>
      </PageContainer>
    </Layout>
  );
}
