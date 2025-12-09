import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center p-4 py-16 md:py-24">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="font-display text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-8">
            Cette page n'existe pas ou a été déplacée.
          </p>
          
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
