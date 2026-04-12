import { motion } from "framer-motion";
import { Rocket, Clock, Fuel, Package, Info, CheckCircle, AlertTriangle, Zap, Target, Swords, Recycle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
      <h2 className="font-display text-xl font-bold text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-black font-bold text-sm flex-shrink-0">
      {n}
    </span>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 bg-primary/10 border border-primary/30 rounded-lg p-3 mt-3">
      <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-300">{children}</p>
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mt-3">
      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-200">{children}</p>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-black/40 text-primary px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
}

export default function GuideCalcTempsVol() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Guide du Calculateur de Temps de Vol
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Maîtrisez l'outil pour planifier vos missions, vos ghosts et vos interceptions OGame
              </p>
              <div className="flex justify-center mt-4">
                <Link href="/outils/temps-vol">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
                    Accéder au calculateur →
                  </Button>
                </Link>
              </div>
            </div>

            {/* ── BANDEAU AVERTISSEMENT ── */}
            <div className="flex items-start gap-3 bg-amber-950/60 border border-amber-600/50 rounded-xl px-5 py-4 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-200 text-sm leading-relaxed">
                <span className="font-bold text-amber-300">Outil en cours de développement</span> — Les calculs peuvent contenir des erreurs. Ne pas utiliser pour des décisions critiques en jeu. Nous travaillons à améliorer la précision.
              </p>
            </div>

            <div className="space-y-6">

              {/* 1. Introduction */}
              <Section title="1. Qu'est-ce que le calculateur de temps de vol ?">
                <p className="text-gray-300 mb-4">
                  Le calculateur de temps de vol est un outil interactif qui simule exactement les formules d'OGame pour déterminer :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <p className="text-white font-bold text-sm">Durée du vol</p>
                    <p className="text-gray-400 text-xs mt-1">Pour chaque vitesse de 5% à 100%</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <Fuel className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-bold text-sm">Consommation</p>
                    <p className="text-gray-400 text-xs mt-1">Deutérium nécessaire par trajet</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <Package className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-white font-bold text-sm">Capacité cargo</p>
                    <p className="text-gray-400 text-xs mt-1">Ressources transportables</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">
                  Il prend en compte toutes les variables du jeu : niveaux de technologies, classe de joueur, bonus d'alliance,
                  vitesse de l'univers, et même les bonus de statistiques individuels par vaisseau.
                </p>
                <p className="text-gray-300">
                  Le calculateur propose deux scénarios spécialisés en plus du mode classique :
                  <strong className="text-amber-400"> Moonbreak / Interception</strong> (traquer une flotte vue en phalange)
                  et <strong className="text-orange-400"> CDR — Flotte cachée</strong> (localiser une flotte dissimulée dans un champ de débris).
                </p>
              </Section>

              {/* 2. Choisir son scénario */}
              <Section title="2. Choisir son scénario de calcul">
                <p className="text-gray-300 mb-4">
                  En haut de l'onglet <strong className="text-white">Temps de vol</strong>, deux boutons permettent de basculer de mode :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-amber-900/20 border border-amber-600/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Swords className="w-5 h-5 text-amber-400" />
                      <p className="text-amber-300 font-bold">Moonbreak / Interception</p>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Vous avez scanné une flotte ennemie en transit avec votre phalange de capteurs.
                      Vous connaissez sa composition, sa vitesse affichée et son heure d'arrivée.
                      Le calculateur génère tous les créneaux de départ possibles pour l'intercepter.
                    </p>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-600/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Recycle className="w-5 h-5 text-orange-400" />
                      <p className="text-orange-300 font-bold">CDR — Flotte cachée</p>
                    </div>
                    <p className="text-gray-300 text-sm">
                      La flotte ennemie a disparu dans un champ de débris (CDR). Vous connaissez
                      les coordonnées du CDR, l'heure de disparition et la composition estimée via espionnage.
                      Le calculateur retrouve l'heure de retour probable de la flotte.
                    </p>
                  </div>
                </div>
                <Tip>Si vous n'utilisez aucun de ces deux scénarios (ghost classique, raid, transport…), ignorez ces boutons et passez directement au tableau des résultats.</Tip>
              </Section>

              {/* 3. Paramètres univers */}
              <Section title="3. Configurer les paramètres de l'univers">
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <StepBadge n={1} />
                    <div>
                      <p className="font-bold text-white">Vitesse univers (×)</p>
                      <p>Multiplicateur de vitesse de votre serveur. Un univers ×2 double la vitesse de toutes les flottes. Trouvez cette valeur dans les paramètres de votre univers OGame.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <StepBadge n={2} />
                    <div>
                      <p className="font-bold text-white">Galaxies et systèmes circulaires</p>
                      <p>Certains univers sont "circulaires" : le système 499 est adjacent au système 1. Si c'est le cas sur votre serveur, cochez les cases correspondantes. La distance calculée sera automatiquement optimisée.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <StepBadge n={3} />
                    <div>
                      <p className="font-bold text-white">Point de départ</p>
                      <p>Coordonnées de la planète ou lune depuis laquelle vous envoyez la flotte (Galaxie : Système : Position).</p>
                      <p className="text-sm text-gray-400 mt-1">Ce champ s'intitule toujours <em>"Position de départ"</em>, quel que soit le scénario actif.</p>
                    </div>
                  </div>
                </div>
                <Tip>Sur OGame, vous trouvez la vitesse de votre univers dans le menu "Informations sur l'univers" accessible depuis la vue galaxie.</Tip>
              </Section>

              {/* 4. Technologies */}
              <Section title="4. Renseigner ses technologies">
                <p className="text-gray-300 mb-4">
                  Chaque vaisseau utilise un type de moteur spécifique. Les niveaux de recherche augmentent la vitesse :
                </p>
                <div className="bg-[#151924] rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-amber-400 font-bold mb-2">Réacteur à combustion</p>
                      <p className="text-gray-300">+10% par niveau → Petit/Grand transporteur, Chasseur léger, Recycleur, Sonde</p>
                    </div>
                    <div>
                      <p className="text-amber-400 font-bold mb-2">Réacteur à impulsion</p>
                      <p className="text-gray-300">+20% par niveau → Chasseur lourd, Croiseur, Bombardier, Éclaireur, Vaisseau de colonisation</p>
                    </div>
                    <div>
                      <p className="text-amber-400 font-bold mb-2">Propulseur hyperespace</p>
                      <p className="text-gray-300">+30% par niveau → Traqueur, Faucheur, Vaisseau de bataille, Destructeur, Étoile de la mort</p>
                    </div>
                    <div className="bg-black/20 rounded p-2">
                      <p className="text-gray-500 font-bold mb-1 text-xs">Formule :</p>
                      <Code>vitesse_base × (1 + 0.10×niv)</Code>
                      <p className="text-gray-500 text-xs mt-1">Remplacer 0.10 par 0.20 (impulsion) ou 0.30 (hyperespace)</p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                  <p className="text-amber-300 text-sm font-bold mb-1">Mode Moonbreak — vitesse lue sur la phalange</p>
                  <p className="text-amber-200 text-sm">
                    Si vous avez la vitesse exacte de la flotte ennemie affichée par la phalange, activez
                    <strong> "Vitesse lue sur la phalange"</strong> et saisissez-la directement.
                    Les niveaux de technologie deviennent alors facultatifs.
                  </p>
                </div>
              </Section>

              {/* 5. Classe de joueur */}
              <Section title="5. Choisir sa classe de joueur">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-4">
                    <p className="text-emerald-400 font-bold mb-2">Collecteur</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li className="flex items-start gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /> Réduction consommation deutérium</li>
                      <li className="flex items-start gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /> Bonus cargo avec progression personnage</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-400 font-bold mb-2">Général</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li className="flex items-start gap-1"><CheckCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" /> +10% vitesse de toute la flotte</li>
                      <li className="flex items-start gap-1"><CheckCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" /> Réduction consommation selon sélection</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                    <p className="text-purple-400 font-bold mb-2">Explorateur</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li className="flex items-start gap-1"><CheckCircle className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" /> Pas de bonus de vitesse direct</li>
                      <li className="flex items-start gap-1"><CheckCircle className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" /> Bonus sur expéditions</li>
                    </ul>
                  </div>
                </div>
                <Tip>
                  Si vous êtes Général, entrez votre bonus de personnage (%) dans le champ "Bonus de personnage Général". Ce bonus s'ajoute au +10% de base de la classe.
                </Tip>
              </Section>

              {/* 6. Composer sa flotte */}
              <Section title="6. Composer sa flotte">
                <p className="text-gray-300 mb-4">
                  Dans la section <strong className="text-white">Vaisseaux</strong>, entrez le nombre de chaque vaisseau que vous envoyez.
                </p>
                <div className="bg-[#151924] rounded-lg p-4 mb-4">
                  <p className="text-amber-400 font-bold mb-2 text-sm">La vitesse de la flotte = vitesse du vaisseau le plus LENT</p>
                  <p className="text-gray-300 text-sm">
                    Si vous envoyez 1 Recycleur (vitesse 2.000) et 100 Croiseurs (vitesse 15.000),
                    votre flotte se déplacera à la vitesse du Recycleur. Choisissez votre composition soigneusement !
                  </p>
                </div>
                <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-3 mb-3">
                  <p className="text-orange-300 text-sm font-bold mb-1">Mode CDR — ne supposez pas que c'est que des recycleurs</p>
                  <p className="text-orange-200 text-sm">
                    Une flotte cachée dans un CDR peut contenir <strong>n'importe quel vaisseau</strong>.
                    Utilisez vos rapports d'espionnage pour estimer la vraie composition et saisissez toute la flotte.
                    La vitesse sera celle du vaisseau le plus lent de l'ensemble.
                  </p>
                </div>
                <p className="text-gray-300 text-sm">
                  La vitesse effective de chaque vaisseau est affichée en temps réel sous son nom,
                  tenant compte de vos technologies et bonus de classe.
                </p>
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 mt-3">
                  <p className="text-purple-300 text-sm">
                    <strong className="text-purple-200">Cas spécial — Étoile de la mort :</strong> En mission Guerre,
                    l'EDM ignore la vitesse de l'univers et se déplace toujours comme si l'univers était ×1.
                    Un astérisque (*) vous le signale dans le tableau.
                  </p>
                </div>
              </Section>

              {/* 7. Coordonnées */}
              <Section title="7. Saisir les coordonnées de destination">
                <p className="text-gray-300 mb-4">
                  Dans l'onglet <strong className="text-white">Temps de vol</strong>, entrez le <strong className="text-white">Point d'objectif</strong>
                  (destination de votre flotte). La distance est calculée automatiquement selon les règles OGame :
                </p>
                <div className="space-y-2 mb-4">
                  <div className="bg-[#151924] rounded-lg p-3">
                    <p className="text-cyan-400 font-bold text-sm">Même système</p>
                    <Code>Distance = 5 × |position1 - position2|</Code>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3">
                    <p className="text-blue-400 font-bold text-sm">Même galaxie</p>
                    <Code>Distance = 2700 + 95 × |système1 - système2|</Code>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3">
                    <p className="text-purple-400 font-bold text-sm">Galaxies différentes</p>
                    <Code>Distance = 20000 × |galaxie1 - galaxie2|</Code>
                  </div>
                </div>
                <div className="bg-[#151924] rounded-lg p-3 mt-2">
                  <p className="text-gray-400 text-sm">Le champ s'intitule toujours <em>"Position de destination"</em>, quel que soit le scénario actif (Moonbreak, CDR ou classique).</p>
                </div>
              </Section>

              {/* 8. Lire le tableau */}
              <Section title="8. Lire le tableau des résultats">
                <p className="text-gray-300 mb-4">
                  Le tableau change selon que vous avez renseigné ou non une <strong className="text-white">Heure d'arrivée connue</strong>.
                </p>

                <p className="text-white font-bold mb-2 text-sm">Mode classique (sans heure d'arrivée)</p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm mb-2">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-2 px-3 text-gray-400 font-normal">Colonne</th>
                        <th className="text-left py-2 px-3 text-gray-400 font-normal">Signification</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-[#2E384D]/40">
                        <td className="py-2 px-3 font-mono text-amber-400">Vitesse</td>
                        <td className="py-2 px-3">% de la vitesse maximale de la flotte (100% à 5%)</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/40">
                        <td className="py-2 px-3 font-mono text-white">Durée</td>
                        <td className="py-2 px-3">Temps de vol aller en HH:MM:SS (ou JJ:HH:MM:SS si plus d'un jour)</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/40">
                        <td className="py-2 px-3 font-mono text-blue-300">Deut.</td>
                        <td className="py-2 px-3">Deutérium consommé pour le trajet aller</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono text-emerald-300">Cargo</td>
                        <td className="py-2 px-3">Capacité de chargement totale de la flotte</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mb-4">
                  <p className="text-amber-300 text-sm">
                    La ligne <strong>surlignée en orange</strong> correspond à la vitesse de mission sélectionnée. Cliquez sur n'importe quelle ligne pour la sélectionner.
                    L'icône <strong>[→]</strong> envoie cette durée vers le bloc Planification.
                  </p>
                </div>

                <p className="text-white font-bold mb-2 text-sm">Mode interception (avec heure d'arrivée connue)</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-2 px-3 text-gray-400 font-normal">Colonne</th>
                        <th className="text-left py-2 px-3 text-gray-400 font-normal">Signification</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-[#2E384D]/40">
                        <td className="py-2 px-3 font-mono text-amber-400">Vitesse</td>
                        <td className="py-2 px-3">% de vitesse testé</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/40">
                        <td className="py-2 px-3 font-mono text-white">Durée vol</td>
                        <td className="py-2 px-3">Temps de vol correspondant à cette vitesse</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/40">
                        <td className="py-2 px-3 font-mono text-amber-300">Heure de départ théorique</td>
                        <td className="py-2 px-3">Heure à laquelle la flotte a dû partir pour arriver à l'heure saisie</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono text-cyan-300">Heure de retour</td>
                        <td className="py-2 px-3">Heure d'arrivée au retour (visible si l'heure du clic retour est renseignée)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3 mt-3">
                  <p className="text-green-300 text-sm">
                    La ligne <strong>surlignée en vert</strong> avec ✓ correspond au créneau confirmé par l'heure du clic retour (phalange). C'est la vitesse probable de la flotte ennemie.
                  </p>
                </div>
              </Section>

              {/* 9. Planification */}
              <Section title="9. Utiliser le bloc Planification (ghost classique)">
                <p className="text-gray-300 mb-4">
                  Le bloc de planification à droite du tableau vous permet de calculer précisément vos horaires de mission (en mode classique, sans heure d'arrivée).
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-sm whitespace-nowrap">Mode Départ →</span>
                    <p className="text-gray-300 text-sm">
                      Entrez l'heure à laquelle vous lancez la flotte. Le calculateur affiche l'heure d'arrivée.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-sm whitespace-nowrap">Mode Arrivée →</span>
                    <p className="text-gray-300 text-sm">
                      Entrez l'heure à laquelle vous voulez que la flotte arrive. Le calculateur affiche l'heure de départ requise.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-sm whitespace-nowrap">[⇄] Inverser</span>
                    <p className="text-gray-300 text-sm">Bascule entre les modes Départ et Arrivée d'un clic.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-sm whitespace-nowrap">[+] Ajouter</span>
                    <p className="text-gray-300 text-sm">
                      Créez plusieurs créneaux pour comparer différentes options ou planifier plusieurs missions en parallèle.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-sm whitespace-nowrap">[→] Envoyer</span>
                    <p className="text-gray-300 text-sm">
                      Dans le tableau classique, cliquez l'icône [→] d'une ligne pour verrouiller cette durée dans le bloc Planification.
                    </p>
                  </div>
                </div>
                <Tip>
                  Sélectionnez "Type de mission : Pacifique" et entrez l'heure de votre prochaine connexion en mode Arrivée.
                  Vous obtiendrez l'heure exacte à laquelle vous devez lancer votre ghost !
                </Tip>
              </Section>

              {/* 10. Astuces */}
              <Section title="10. Astuces — Économiser du deutérium, choisir la bonne vitesse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <p className="text-blue-400 font-bold mb-2 text-sm">Économiser le deutérium</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Volez lentement (50%) : réduit drastiquement la consommation (~56% d'économie vs 100%)</li>
                      <li>• Collecteur : profitez de la réduction de carburant</li>
                      <li>• Évitez de surcharger avec des vaisseaux lents qui traînent la flotte</li>
                    </ul>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-400 font-bold mb-2 text-sm">Choisir la bonne vitesse</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• 100% pour les raids urgents ou les contre-attaques</li>
                      <li>• 30–50% pour les ghosts longs (nuit), très économe</li>
                      <li>• 70–80% bon compromis temps/consommation</li>
                      <li>• 5–10% pour les très longs ghosts avec petite flotte</li>
                    </ul>
                  </div>
                </div>
                <Warn>
                  La consommation augmente avec le carré de la vitesse (formule (pct/100 + 1)²).
                  Doubler la vitesse ne double pas la consommation — elle quadruple !
                </Warn>
              </Section>

              {/* ── SCÉNARIO 1 : MOONBREAK ── */}
              <Section title="11. Scénario Moonbreak / Interception — Traquer une flotte vue en phalange">
                <div className="bg-[#151924] rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Swords className="w-5 h-5 text-amber-400" />
                    <p className="font-bold text-white">Situation : votre phalange a détecté une flotte ennemie en transit</p>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Votre phalange vous donne : la composition de la flotte, la vitesse affichée, les coordonnées de départ et d'arrivée, l'heure d'arrivée, et (si disponible) l'heure du clic retour.
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">1</span>
                      <div>
                        <p className="text-white font-bold">Sélectionnez le scénario Moonbreak</p>
                        <p className="text-gray-400">Cliquez le bouton ⚔️ <em>Moonbreak / Interception</em> en haut de l'onglet Temps de vol.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">2</span>
                      <div>
                        <p className="text-white font-bold">Configurez l'univers et entrez les coordonnées de départ</p>
                        <p className="text-gray-400">Le champ <em>"Position de départ"</em> correspond aux coordonnées d'où vient la flotte ennemie.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">3</span>
                      <div>
                        <p className="text-white font-bold">Activez "Vitesse lue sur la phalange" et entrez la vitesse exacte</p>
                        <p className="text-gray-400">Cochez l'option dans la section Paramètres et saisissez la valeur numérique de vitesse affichée par la phalange (ex : 12 500). Inutile de renseigner les technologies.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">4</span>
                      <div>
                        <p className="text-white font-bold">Saisissez la composition de la flotte ennemie</p>
                        <p className="text-gray-400">Dans la section Vaisseaux, entrez les quantités vues sur la phalange.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">5</span>
                      <div>
                        <p className="text-white font-bold">Entrez les coordonnées de destination ennemie et l'heure d'arrivée</p>
                        <p className="text-gray-400">Le champ <em>"Position de destination"</em> est la destination de la flotte ennemie. Dans le calculateur d'interception, saisissez l'heure d'arrivée vue sur la phalange.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">6</span>
                      <div>
                        <p className="text-white font-bold">(Optionnel) Entrez l'heure du clic retour</p>
                        <p className="text-gray-400">Si votre phalange affiche l'heure du clic retour, saisissez-la. La ligne confirmée (vitesse probable) sera surlignée en vert avec ✓. Vous saurez exactement à quelle heure la flotte revient.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                    <p className="text-green-300 text-sm">
                      <strong>Résultat :</strong> Le tableau affiche pour chaque vitesse (5%–100%) l'heure à laquelle la flotte a dû partir.
                      La ligne verte ✓ confirme la vitesse réelle utilisée et vous donne l'heure exacte de retour de la flotte ennemie.
                    </p>
                  </div>
                </div>
              </Section>

              {/* ── SCÉNARIO 2 : CDR ── */}
              <Section title="12. Scénario CDR — Flotte cachée dans un champ de débris">
                <div className="bg-[#151924] rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Recycle className="w-5 h-5 text-orange-400" />
                    <p className="font-bold text-white">Situation : la flotte ennemie a disparu dans un CDR (mission recyclage)</p>
                  </div>
                  <p className="text-gray-300 text-sm">
                    La flotte s'est cachée en lançant une mission de recyclage. Vous connaissez les coordonnées du CDR, la composition estimée par espionnage et l'heure à laquelle le CDR a disparu de la vue galaxie.
                  </p>

                  <div className="bg-orange-950/40 border border-orange-600/50 rounded-xl px-4 py-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <p className="text-orange-200 text-sm">
                      Une flotte dans un CDR peut contenir <strong>n'importe quel vaisseau</strong>, pas uniquement des recycleurs. Sa vitesse est déterminée par le vaisseau le plus lent de l'ensemble.
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">1</span>
                      <div>
                        <p className="text-white font-bold">Sélectionnez le scénario CDR</p>
                        <p className="text-gray-400">Cliquez le bouton ♻️ <em>CDR — Flotte cachée</em>.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">2</span>
                      <div>
                        <p className="text-white font-bold">Configurez l'univers et entrez les coordonnées du CDR</p>
                        <p className="text-gray-400">Le champ <em>"Coordonnées du CDR"</em> correspond à la position du champ de débris où la flotte s'est cachée.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">3</span>
                      <div>
                        <p className="text-white font-bold">Renseignez les technologies et la composition de la flotte ennemie</p>
                        <p className="text-gray-400">Utilisez vos rapports d'espionnage. Saisissez TOUTE la flotte, même les vaisseaux de combat qui ralentiraient l'ensemble.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">4</span>
                      <div>
                        <p className="text-white font-bold">Entrez la planète ennemie (destination du retour) et l'heure de disparition du CDR</p>
                        <p className="text-gray-400">Le champ <em>"Position de destination"</em> est là où la flotte va retourner après le recyclage. Dans le calculateur d'interception, l'heure à entrer est <strong>l'heure à laquelle le CDR a disparu</strong> de la vue galaxie — c'est l'heure d'arrivée de la flotte dans le CDR.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">5</span>
                      <div>
                        <p className="text-white font-bold">Lisez les heures de départ théoriques</p>
                        <p className="text-gray-400">Le tableau montre pour chaque vitesse l'heure à laquelle la flotte a dû partir. En croisant avec l'activité observée chez le joueur ennemi, vous pouvez identifier la vitesse utilisée.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                    <p className="text-green-300 text-sm">
                      <strong>Résultat :</strong> Pour chaque vitesse possible, vous obtenez l'heure de départ théorique et l'heure de retour estimée.
                      En choisissant la ligne la plus cohérente avec vos observations, vous pouvez anticiper le retour et préparer votre frappe.
                    </p>
                  </div>
                </div>
              </Section>

              {/* ── CATÉGORIES DE MISSIONS ── */}
              <Section title="13. Catégories de missions — vitesse et comportement">
                <div className="flex items-start gap-3 bg-amber-950/60 border border-amber-600/50 rounded-xl px-5 py-4 mb-5">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-200 text-sm leading-relaxed">
                    <span className="font-bold text-amber-300">Section en cours d'écriture</span> — Les détails et exemples seront complétés prochainement.
                  </p>
                </div>

                <p className="text-gray-300 mb-4 text-sm">
                  Dans OGame, chaque mission appartient à une catégorie qui détermine sa vitesse par défaut et son comportement à l'arrivée.
                  Dans le calculateur, un seul curseur de vitesse s'applique à toutes les catégories.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4">
                    <p className="text-red-400 font-bold mb-1">Hostiles</p>
                    <p className="text-gray-400 text-xs mb-2">Attaque, Espionnage en territoire ennemi, Recyclage adversaire</p>
                    <p className="text-gray-300">La flotte retourne automatiquement à son point de départ après la mission. Délai d'annulation limité.</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
                    <p className="text-blue-400 font-bold mb-1">Pacifiques</p>
                    <p className="text-gray-400 text-xs mb-2">Transport, Stationnement allié</p>
                    <p className="text-gray-300">Envoyer des ressources ou se stationner chez un allié. La flotte reste sur place jusqu'au rappel.</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4">
                    <p className="text-green-400 font-bold mb-1">Propres</p>
                    <p className="text-gray-400 text-xs mb-2">Déploiement, Colonisation, Expédition, Stationnement</p>
                    <p className="text-gray-300">Missions vers vos propres planètes ou vers l'espace inconnu. Comportement variable selon le type exact.</p>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-4">
                    <p className="text-yellow-400 font-bold mb-1">Espionnage</p>
                    <p className="text-gray-400 text-xs mb-2">Sondes d'espionnage uniquement</p>
                    <p className="text-gray-300">Missions ultrarapides grâce à la vitesse extrême des sondes. Retour automatique après rapport.</p>
                  </div>
                  <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-xl p-4 md:col-span-2">
                    <p className="text-cyan-400 font-bold mb-1">Recyclage</p>
                    <p className="text-gray-400 text-xs mb-2">Recycleurs sur un champ de débris</p>
                    <p className="text-gray-300">Collecte de ressources laissées par un combat. Peut servir à masquer une flotte (voir scénario CDR).</p>
                  </div>
                </div>

                <div className="bg-[#151924] border border-[#2E384D] rounded-lg p-3 mt-4">
                  <p className="text-gray-400 text-sm">
                    <span className="text-white font-bold">Étoile de la mort (EDM) :</span> En mission hostile, espionnage ou recyclage,
                    l'EDM ignore le multiplicateur de vitesse de l'univers et vole toujours comme si l'univers était ×1.
                    Le calculateur l'indique par un astérisque (*) dans le tableau.
                  </p>
                </div>
              </Section>

              {/* ── SCÉNARIO 3 : GHOST CLASSIQUE ── */}
              <Section title="14. Scénario Ghost classique — Protéger sa flotte pour la nuit">
                <div className="bg-[#151924] rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    <p className="font-bold text-white">Situation : déconnexion de nuit (23h00 → 07h30)</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">1</span>
                      <div>
                        <p className="text-white font-bold">Configurez votre univers</p>
                        <p className="text-gray-400">Vitesse univers : ×2, point de départ : 4:125:9</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">2</span>
                      <div>
                        <p className="text-white font-bold">Entrez vos technologies et composez votre flotte</p>
                        <p className="text-gray-400">Ex : Combustion 15, Impulsion 10. Flotte : 200 Croiseurs + 50 Grands transporteurs.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">3</span>
                      <div>
                        <p className="text-white font-bold">Choisissez une destination et le type de mission Pacifique</p>
                        <p className="text-gray-400">Ex : 4:200:9. Mission pacifique = aller-retour automatique à l'arrivée.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-xs">4</span>
                      <div>
                        <p className="text-white font-bold">Utilisez le bloc Planification en mode Arrivée</p>
                        <p className="text-gray-400">Entrez 07:30:00. Le calculateur affiche l'heure de départ requise. Si l'heure est dans le passé, réduisez la vitesse jusqu'à obtenir une heure valide après 23:00.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                    <p className="text-green-300 text-sm">
                      <strong>Résultat :</strong> Vous lancez votre flotte à 23:15 à 30% de vitesse → arrivée à 07:30 →
                      vous la rappelez dès votre connexion et vous êtes safe toute la nuit !
                    </p>
                  </div>
                </div>
              </Section>

              <div className="flex justify-center mt-4">
                <Link href="/outils/temps-vol">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3">
                    <Rocket className="w-4 h-4 mr-2" />
                    Accéder au calculateur
                  </Button>
                </Link>
              </div>

              <RelatedGuides currentGuide="calc-temps-vol" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
