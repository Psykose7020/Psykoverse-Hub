import { MessageSquare, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

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

              <h1 className="font-display text-3xl font-bold text-white mb-2">CENTRE DE SUPPORT</h1>
              <p className="text-primary font-mono text-sm uppercase tracking-widest mb-8">Psykoverse Alliance</p>

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
                Notre équipe de modération est disponible pour répondre à vos questions sur OGame, régler les conflits ou gérer les demandes de recrutement.
              </p>

              <Button size="lg" className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold uppercase tracking-widest h-14 rounded shadow-lg transition-all" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-3 w-5 h-5" />
                  Ouvrir un Ticket sur Discord
                </a>
              </Button>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
