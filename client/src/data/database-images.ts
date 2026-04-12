import collecteurImg from "@assets/Database/Classe du Joueur/Collecteur.png";
import explorateurImg from "@assets/Database/Classe du Joueur/Explorateur.png";
import generalImg from "@assets/Database/Classe du Joueur/general.png";
import guerrierImg from "@assets/Database/Classe Alliance/Guerrier.png";
import marchandImg from "@assets/Database/Classe Alliance/Marchand.png";
import chercheurImg from "@assets/Database/Classe Alliance/Chercheur.png";
import humainsImg from "@assets/Database/Races/humains.png";
import kaeleshImg from "@assets/Database/Races/kaelesh.png";
import mecasImg from "@assets/Database/Races/mecas.png";
import roctaImg from "@assets/Database/Races/rocta.png";
import mineMetalImg from "@assets/Database/Batiments/MineMetal.png";
import mineCristalImg from "@assets/Database/Batiments/MineCristal.png";
import mineDeuteriumImg from "@assets/Database/Batiments/MineDeuterium.png";
import centraleSolaireImg from "@assets/Database/Batiments/CentraleSolaire.png";
import centraleFusionImg from "@assets/Database/Batiments/CentraleFusion.png";
import laboratoireRechercheImg from "@assets/Database/Batiments/LaboratoireRecherche.png";
import chantierSpatialImg from "@assets/Database/Batiments/ChantierSpatial.png";
import hangarMetalImg from "@assets/Database/Batiments/HangarMetal.png";
import hangarCristalImg from "@assets/Database/Batiments/HangarCristal.png";
import hangarDeuteriumImg from "@assets/Database/Batiments/HangarDeuterium.png";
import techAstrophysiqueImg from "@assets/Database/Recherches/TechAstrophysique.png";
import techArmesImg from "@assets/Database/Recherches/TechArmes.png";
import techRriImg from "@assets/Database/Recherches/TechRRI.png";
import techPlasmaImg from "@assets/Database/Recherches/TechPlasma.png";
import terraformeurImg from "@assets/Database/Batiments/Terraformeur.png";
import usineNaniteImg from "@assets/Database/Batiments/UsineNanite.png";
import metalImg from "@assets/Database/Ressources/metal.upscaled.png";
import crystalImg from "@assets/Database/Ressources/crystal.upscaled.png";
import deuteriumImg from "@assets/Database/Ressources/deuterium.upscaled.png";
import admiralImg from "@assets/Database/Officiers/admiral.png";
import commanderImg from "@assets/Database/Officiers/commander.png";
import engineerImg from "@assets/Database/Officiers/engineer.png";
import geologistImg from "@assets/Database/Officiers/geologist.png";
import technocratImg from "@assets/Database/Officiers/technocrat.png";

export const dbImages = {
  classes: {
    collecteur: collecteurImg,
    explorateur: explorateurImg,
    general: generalImg,
  },
  alliance: {
    guerrier: guerrierImg,
    marchand: marchandImg,
    chercheur: chercheurImg,
  },
  races: {
    humains: humainsImg,
    kaelesh: kaeleshImg,
    mecas: mecasImg,
    rocta: roctaImg,
  },
  batiments: {
    mineMetal: mineMetalImg,
    mineCristal: mineCristalImg,
    mineDeuterium: mineDeuteriumImg,
    centraleSolaire: centraleSolaireImg,
    centraleFusion: centraleFusionImg,
    laboratoireRecherche: laboratoireRechercheImg,
    chantierSpatial: chantierSpatialImg,
    hangarMetal: hangarMetalImg,
    hangarCristal: hangarCristalImg,
    hangarDeuterium: hangarDeuteriumImg,
  },
  recherches: {
    astrophysique: techAstrophysiqueImg,
    armes: techArmesImg,
    rri: techRriImg,
    plasma: techPlasmaImg,
  },
  divers: {
    terraformeur: terraformeurImg,
    usineNanite: usineNaniteImg,
  },
  ressources: {
    metal: metalImg,
    crystal: crystalImg,
    deuterium: deuteriumImg,
  },
  officiers: {
    amiral: admiralImg,
    commandant: commanderImg,
    ingenieur: engineerImg,
    geologue: geologistImg,
    technocrate: technocratImg,
  },
};
