import Layout from "@/components/layout/Layout";

export default function Legal() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-8">
            Mentions Légales
          </h1>

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
                Ce site collecte des données de visite anonymisées à des fins statistiques. Aucun cookie de suivi n'est utilisé.
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
    </Layout>
  );
}
