import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";

export default function Legal() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 space-bg opacity-30 pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <img src={allianceLogo} alt="Logo" className="w-12 h-12 opacity-80" />
            <h1 className="font-display text-3xl font-bold text-white">Mentions Légales</h1>
          </div>

          <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-8 space-y-8">
            <section>
              <h2 className="font-display text-xl font-bold text-primary mb-4">1. Éditeur du site</h2>
              <p className="text-gray-400 leading-relaxed">
                Ce site est un projet communautaire non commercial, créé et maintenu par la communauté Psykoverse.
                <br /><br />
                <strong className="text-white">Responsable de publication :</strong> Psykose (7020Psykose)
                <br />
                <strong className="text-white">Contact :</strong> Via le serveur Discord de la communauté
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-primary mb-4">2. Hébergement</h2>
              <p className="text-gray-400 leading-relaxed">
                Ce site est hébergé par Replit, Inc.
                <br />
                Adresse : 350 Brannan Street, Suite 125, San Francisco, CA 94107, USA
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-primary mb-4">3. Propriété intellectuelle</h2>
              <p className="text-gray-400 leading-relaxed">
                OGame est une marque déposée de Gameforge AG. Ce site est un projet de fan non affilié à Gameforge.
                <br /><br />
                Les images et éléments graphiques liés à OGame appartiennent à leurs propriétaires respectifs. Ce site est créé dans un but purement communautaire et non lucratif.
                <br /><br />
                Le logo Psykoverse et les contenus originaux de ce site sont la propriété de la communauté Psykoverse.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-primary mb-4">4. Données personnelles</h2>
              <p className="text-gray-400 leading-relaxed">
                Ce site ne collecte aucune donnée personnelle. Aucun cookie de suivi n'est utilisé.
                <br /><br />
                Les liens vers Discord et YouTube sont des liens externes. L'utilisation de ces plateformes est soumise à leurs propres politiques de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-primary mb-4">5. Limitation de responsabilité</h2>
              <p className="text-gray-400 leading-relaxed">
                Les informations présentes sur ce site sont fournies à titre indicatif. La communauté Psykoverse ne peut être tenue responsable des éventuelles erreurs ou omissions.
                <br /><br />
                Les liens vers des sites externes sont fournis à titre informatif. Nous ne sommes pas responsables du contenu de ces sites.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-primary mb-4">6. Contact</h2>
              <p className="text-gray-400 leading-relaxed">
                Pour toute question ou demande, vous pouvez nous contacter via notre serveur Discord :
                <br />
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  discord.gg/3PWk4HmfNn
                </a>
              </p>
            </section>
          </div>

          <p className="text-center text-gray-600 text-sm mt-8">
            Dernière mise à jour : Décembre 2025
          </p>
        </div>
      </div>
    </div>
  );
}
