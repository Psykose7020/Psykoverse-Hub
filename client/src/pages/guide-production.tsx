import { Factory, Package, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import { dbImages } from "@/data/database-images";
import {
  PageBackLink,
  PageContainer,
  PageHero,
  ResultStat,
  SectionCard,
} from "@/components/content/page-shell";

const positionBonus = [
  { pos: "1", bonus: "+40% Cristal" },
  { pos: "2", bonus: "+30% Cristal" },
  { pos: "3", bonus: "+20% Cristal" },
  { pos: "6 et 10", bonus: "+17% Métal" },
  { pos: "7 et 9", bonus: "+23% Métal" },
  { pos: "8", bonus: "+35% Métal" },
];

export default function GuideProduction() {
  return (
    <Layout>
      <PageContainer>
        <PageBackLink />

        <PageHero
          icon={Factory}
          title="Production & Énergie"
          description="Comprendre ce qui fait vraiment avancer un compte mineur: les mines, l’énergie, le stockage et le choix de position."
          gradient="bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/20"
          badge={<p className="text-sm text-gray-500">Guide de base pour construire une économie lisible et stable.</p>}
        />

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ResultStat label="Priorité" value="Mines" valueClassName="text-green-300" />
            <ResultStat label="Point de blocage" value="Énergie" valueClassName="text-yellow-300" />
            <ResultStat label="À surveiller" value="Stockage" valueClassName="text-amber-300" />
          </div>

          <SectionCard title="Les trois mines à connaître" description="Votre économie part toujours de ce trio.">
            <p className="mb-5 text-gray-300">
              Le revenu principal d’une planète vient de la mine de métal, de la mine de cristal et du synthétiseur de deutérium.
              Monter un niveau supplémentaire améliore la production, mais augmente aussi le coût et la pression sur l’énergie.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#111827]">
                <img src={dbImages.batiments.mineMetal} alt="Mine de métal" className="h-44 w-full object-cover" />
                <div className="p-4">
                  <p className="font-semibold text-white">Mine de métal</p>
                  <p className="mt-1 text-sm text-gray-400">La base de presque toute progression économique.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#111827]">
                <img src={dbImages.batiments.mineCristal} alt="Mine de cristal" className="h-44 w-full object-cover" />
                <div className="p-4">
                  <p className="font-semibold text-white">Mine de cristal</p>
                  <p className="mt-1 text-sm text-gray-400">Devient vite un goulet si elle reste trop basse.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#111827]">
                <img src={dbImages.batiments.mineDeuterium} alt="Synthétiseur de deutérium" className="h-44 w-full object-cover" />
                <div className="p-4">
                  <p className="font-semibold text-white">Synthétiseur de deutérium</p>
                  <p className="mt-1 text-sm text-gray-400">Clé pour les vols, la fusion et les paliers plus avancés.</p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Énergie: le vrai verrou caché" description="Une bonne mine sans énergie suffisante produit moins que prévu." icon={Zap}>
            <p className="mb-5 text-gray-300">
              Si votre énergie devient négative, la production réelle baisse. Il faut donc suivre l’équilibre entre montée des mines et
              sources d’énergie disponibles.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-[#151924] p-4">
                <img src={dbImages.batiments.centraleSolaire} alt="Centrale solaire" className="mb-3 h-28 w-full rounded-lg object-cover" />
                <p className="font-semibold text-white">Centrale solaire</p>
                <p className="mt-1 text-sm text-gray-400">Simple à monter, mais elle consomme des cases planétaires.</p>
              </div>
              <div className="rounded-xl bg-[#151924] p-4">
                <img src={dbImages.batiments.centraleFusion} alt="Centrale de fusion" className="mb-3 h-28 w-full rounded-lg object-cover" />
                <p className="font-semibold text-white">Centrale de fusion</p>
                <p className="mt-1 text-sm text-gray-400">Plus dense en énergie, mais elle brûle du deutérium.</p>
              </div>
              <div className="rounded-xl bg-[#151924] p-4">
                <img src={dbImages.ressources.deuterium} alt="Satellites solaires" className="mb-3 h-28 w-full rounded-lg bg-[#0B0E14] object-contain" />
                <p className="font-semibold text-white">Satellites solaires</p>
                <p className="mt-1 text-sm text-gray-400">Très efficaces en cases, mais exposés aux attaques.</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Bonus de position" description="Le choix de case influence directement votre économie de spécialisation.">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {positionBonus.map((bonus) => (
                <div key={bonus.pos} className="rounded-xl bg-[#151924] p-4 text-center">
                  <p className="text-lg font-bold text-white">Position {bonus.pos}</p>
                  <p className={`mt-1 text-sm font-semibold ${bonus.bonus.includes("Cristal") ? "text-blue-300" : "text-gray-300"}`}>
                    {bonus.bonus}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-cyan-700/30 bg-cyan-900/20 p-4">
              <p className="text-sm text-cyan-200">
                <strong>Deutérium:</strong> plus la planète est éloignée, plus sa température baisse, ce qui améliore généralement sa production de deutérium.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Stockage et temps morts" description="Une bonne production perd vite de la valeur si les hangars saturent." icon={Package}>
            <p className="mb-5 text-gray-300">
              Quand les hangars ou réservoirs atteignent leur limite, la production s’arrête. Ce n’est pas spectaculaire, mais c’est une perte directe
              sur les longues périodes d’absence.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <img src={dbImages.batiments.hangarMetal} alt="Hangar métal" className="h-28 w-full rounded-xl object-cover" />
              <img src={dbImages.batiments.hangarCristal} alt="Hangar cristal" className="h-28 w-full rounded-xl object-cover" />
              <img src={dbImages.batiments.hangarDeuterium} alt="Réservoir deutérium" className="h-28 w-full rounded-xl object-cover" />
            </div>

            <div className="mt-4 rounded-xl border border-amber-700/30 bg-amber-900/20 p-4">
              <p className="text-sm text-amber-200">
                Montez vos stockages avant une longue absence ou avant de gros paliers de production. Une mine rentable ne sert à rien si elle déborde.
              </p>
            </div>
          </SectionCard>

          <RelatedGuides currentGuide="production" />
        </div>
      </PageContainer>
    </Layout>
  );
}
