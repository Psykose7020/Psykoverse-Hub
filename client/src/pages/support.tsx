import { MessageSquare, ShieldAlert, Heart, Beer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { EditableText } from "@/components/EditableText";

export default function Support() {
  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center p-4 py-16 md:py-24">
        <div className="max-w-2xl w-full">
          <div className="bg-[#13171F] border border-[#2A3241] p-1 rounded-lg shadow-2xl">
            <div className="bg-[#0B0E14] border border-[#2A3241]/50 p-8 rounded text-center">
              
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
                <ShieldAlert className="w-10 h-10 text-primary animate-pulse" />
              </div>

              <EditableText
                id="support-hero-title"
                defaultValue="CENTRE DE SUPPORT"
                as="h1"
                className="font-display text-3xl font-bold text-white mb-2"
              />
              <p className="text-primary font-mono text-sm uppercase tracking-widest mb-8">
                <EditableText
                  id="support-subtitle"
                  defaultValue="Psykoverse Alliance"
                  as="span"
                />
              </p>

              <div className="bg-[#1F2532] p-6 rounded border border-[#2A3241] mb-8 text-left">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-secondary block"></span>
                  PROCÉDURE DE TICKET
                </h3>
                <ol className="text-gray-400 space-y-4 text-sm list-decimal list-inside">
                  <li>Rejoignez notre serveur Discord officiel via le bouton ci-dessous.</li>
                  <li>Rendez-vous dans le salon <span className="text-white font-mono bg-black/50 px-2 py-0.5 rounded">❓┆𝐃𝐞𝐦𝐚𝐧𝐝𝐞𝐬</span>.</li>
                  <li>Cliquez sur l'icône 📩 pour ouvrir un ticket privé avec le staff.</li>
                  <li>Décrivez votre problème ou votre demande en détail.</li>
                </ol>
              </div>

              <p className="text-gray-500 text-sm mb-8">
                <EditableText
                  id="support-description"
                  defaultValue="Notre équipe de modération est disponible pour répondre à vos questions sur OGame, régler les conflits ou gérer les demandes de recrutement."
                  as="span"
                  multiline
                />
              </p>

              <Button size="lg" className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold uppercase tracking-widest h-14 rounded shadow-lg transition-all" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-3 w-5 h-5" />
                  Ouvrir un Ticket sur Discord
                </a>
              </Button>

            </div>
          </div>

          <div className="bg-[#13171F] border border-[#2A3241] p-1 rounded-lg shadow-2xl mt-8">
            <div className="bg-gradient-to-br from-[#0B0E14] to-[#1a1f2e] border border-[#2A3241]/50 p-8 rounded text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/30">
                  <Heart className="w-8 h-8 text-yellow-500" />
                </div>

                <h2 className="font-display text-2xl font-bold text-white mb-3">
                  Soutenir le projet
                </h2>
                
                <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  Ce site est un projet 100% bénévole, créé avec passion pour la communauté OGame francophone. 
                  Chaque guide, chaque fonctionnalité représente des heures de travail offertes à tous les joueurs.
                </p>

                <p className="text-gray-500 text-xs mb-6 italic">
                  Si ce projet vous est utile et que vous souhaitez m'encourager à continuer, 
                  une petite bière fait toujours plaisir ! Aucune obligation bien sûr, 
                  votre présence dans la communauté est déjà un soutien précieux.
                </p>

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-display font-bold uppercase tracking-widest h-12 px-8 rounded shadow-lg transition-all hover:shadow-yellow-500/20 hover:shadow-xl" 
                  asChild
                >
                  <a href="https://buymeacoffee.com/psykose" target="_blank" rel="noopener noreferrer">
                    <Beer className="mr-3 w-5 h-5" />
                    Buy me a beer
                  </a>
                </Button>

                <p className="text-gray-600 text-xs mt-4">
                  Merci pour votre soutien ! 💙
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
