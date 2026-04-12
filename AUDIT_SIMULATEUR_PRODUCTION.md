# Audit du simulateur de production

Référence auditée: `attached_assets/Simulateur.xlsx`

Périmètre:
- mappings des inputs de l'application vers les cellules Excel
- mappings des outputs API vers les cellules Excel
- cohérence du recalcul par rapport aux formules du classeur

Constat global:
- le moteur serveur ne recode pas les formules métier; il injecte les valeurs dans les feuilles `1. Base` et `2. Simulation`, puis laisse `HyperFormula` recalculer le classeur
- les sorties exposées par l'API correspondent aux cellules du classeur
- un écart fonctionnel existait sur les statuts `Actif/Inactif` des technos FDV; il a été corrigé

Volumes contrôlés:
- formules du classeur: `2303` sur `1. Base`, `2303` sur `2. Simulation`, `3062` sur `3. Comparaison`, `27` sur `4. Synthèse`
- inputs mappés: `45`
- outputs mappés: `44`

## 1. Inputs globaux

| Champ app | Cellule Excel | Vérification |
|---|---|---|
| `universeSpeed` | `E2` | conforme |
| `classChoice` | `E3` | conforme |
| `geologistActive` | `I2` | conforme |
| `fullOffiActive` | `I3` | conforme |
| `merchantClass` | `I4` | conforme |

## 2. Inputs par planète

Règle de mapping:
- planète 1 = colonne `E`
- planète 2 = colonne `F`
- ...
- planète 20 = colonne `X`

Les champs suivants sont injectés sur la ligne indiquée, dans la colonne de la planète active.

| Champ app | Ligne Excel | Libellé Excel | Vérification |
|---|---:|---|---|
| `planetName` | 9 | Nom de Planète | conforme |
| `coordinates` | 10 | Coordonnées de la Planète | conforme |
| `maxTemperature` | 12 | Température Max | conforme |
| `race` | 13 | Race Choisie | conforme |
| `metalMine` | 17 | Mine de Métal | conforme |
| `crystalMine` | 18 | Mine de Cristal | conforme |
| `deutMine` | 19 | Mine de Deut | conforme |
| `fusionPlant` | 20 | Centrale Fusion | conforme |
| `roctaMetalBuilding` | 21 | Fusion Magmatique (Rocta) | conforme |
| `roctaCrystalBuilding` | 22 | Raffinerie de Cristaux (Rocta) | conforme |
| `roctaDeutBuilding` | 23 | Synto de Deut (Rocta) | conforme |
| `humanMetalBuilding` | 24 | Fusion à haute énergie (Humains) | conforme |
| `humanCrystalBuilding` | 25 | Extraction par fusion (Humains) cristal | conforme |
| `humanDeutBuilding` | 26 | Extraction par fusion (Humains) deut | conforme |
| `mecaDeutBuilding` | 27 | Synthétiseur à haut rendement (Méca) | conforme |
| `crawlerCount` | 28 | Nombre de Foreuses | conforme |
| `plasmaTech` | 29 | Tech Plasma | conforme |
| `metalItemBonus` | 31 | % Bonus Objet Mét | conforme |
| `crystalItemBonus` | 32 | % Bonus Objet Cri | conforme |
| `deutItemBonus` | 33 | % Bonus Objet Deut | conforme |
| `humanMetro` | 35 | Métro (Humain) | conforme |
| `mecaHyperTransformer` | 36 | Transfo Hyper (Méca) | conforme |
| `mecaChipProd` | 37 | Prod de Puces (Méca) | conforme |
| `kaeleshCloneLab` | 38 | Labo de Clonage (Kaelesh) | conforme |

## 3. Technologies FDV

Structure Excel réelle:
- statut `Actif/Inactif` global par scénario dans la colonne `C`
- niveau par planète dans les colonnes `E:X`

Exemple:
- `human_1_2`: statut en `C40`, niveau planète 1 en `E40`
- `rocta_3_6`: statut en `C64`, niveau planète 1 en `E64`

| Champ app | Ligne Excel | Cellule statut | Cellules niveau | Vérification |
|---|---:|---|---|---|
| `human_1_2` | 40 | `C40` | `E40:X40` | conforme après correction |
| `human_2_2` | 42 | `C42` | `E42:X42` | conforme après correction |
| `meca_1_1` | 44 | `C44` | `E44:X44` | conforme après correction |
| `meca_1_6` | 46 | `C46` | `E46:X46` | conforme après correction |
| `meca_3_1` | 48 | `C48` | `E48:X48` | conforme après correction |
| `rocta_1_2` | 50 | `C50` | `E50:X50` | conforme après correction |
| `rocta_1_3` | 52 | `C52` | `E52:X52` | conforme après correction |
| `rocta_1_5` | 54 | `C54` | `E54:X54` | conforme après correction |
| `rocta_2_1` | 56 | `C56` | `E56:X56` | conforme après correction |
| `rocta_2_4` | 58 | `C58` | `E58:X58` | conforme après correction |
| `rocta_2_5` | 60 | `C60` | `E60:X60` | conforme après correction |
| `rocta_2_6` | 62 | `C62` | `E62:X62` | conforme après correction |
| `rocta_3_6` | 64 | `C64` | `E64:X64` | conforme après correction |
| `kaelesh_1_2` | 66 | `C66` | `E66:X66` | conforme après correction |
| `kaelesh_2_6` | 68 | `C68` | `E68:X68` | conforme après correction |

Correction apportée:
- le code traitait `status` comme une donnée par planète
- l'Excel le traite comme un drapeau global par scénario
- le code synchronise maintenant `Actif/Inactif` sur toutes les planètes du scénario, tout en laissant les niveaux locaux par planète

## 4. Formules structurantes contrôlées

Exemples relevés dans `1. Base`:

- `E11 = --MID(E10,SEARCH(":",E10,SEARCH(":",E10)+1)+1,LEN(E10))`
- `E14 = IF(AND($E$3="Collecteur",$I$2="Oui"),(E17+E18+E19)*8*1.1,(E17+E18+E19)*8)`
- `E41 = IF($C$40="Inactif",0,...)`
- `E71 = E41+E43+E47+E49+E55+E57+E59+E69`
- `Y71 = SUM(E71:X71)`
- `E142 = E78+E82+E85+E89+E92+E95+E98+E101+E104+E107+E136`
- `E145 = SUM(E142:E144)`
- `E146 = E142+E143*1.5+E144*3`
- `E148 = E142*24`
- `E151 = SUM(E148:E150)`

Synthèse:
- `4. Synthèse!E2 = '3. Comparaison'!Y71`
- `4. Synthèse!E20 = '3. Comparaison'!Y148`
- `4. Synthèse!E26 = '3. Comparaison'!Y160`
- `4. Synthèse!E32 = '3. Comparaison'!Y166`

## 5. Outputs API -> cellules Excel

### 5.1 Bonus globaux Base/Simulation

| Sortie API | Cellule Excel |
|---|---|
| `baseBonuses.bonusMetalGlobal` | `1. Base!Y71` |
| `baseBonuses.bonusCrystalGlobal` | `1. Base!Y72` |
| `baseBonuses.bonusDeutGlobal` | `1. Base!Y73` |
| `simulationBonuses.bonusMetalGlobal` | `2. Simulation!Y71` |
| `simulationBonuses.bonusCrystalGlobal` | `2. Simulation!Y72` |
| `simulationBonuses.bonusDeutGlobal` | `2. Simulation!Y73` |

### 5.2 Totaux Base/Simulation

| Sortie API | Cellule Excel |
|---|---|
| `baseTotals.hourlyMetal` | `1. Base!Y142` |
| `baseTotals.hourlyCrystal` | `1. Base!Y143` |
| `baseTotals.hourlyDeut` | `1. Base!Y144` |
| `baseTotals.hourlyPoints` | `1. Base!Y145` |
| `baseTotals.hourlyUsm` | `1. Base!Y146` |
| `baseTotals.dailyMetal` | `1. Base!Y148` |
| `baseTotals.dailyCrystal` | `1. Base!Y149` |
| `baseTotals.dailyDeut` | `1. Base!Y150` |
| `baseTotals.dailyPoints` | `1. Base!Y151` |
| `baseTotals.dailyUsm` | `1. Base!Y152` |
| `simulationTotals.hourlyMetal` | `2. Simulation!Y142` |
| `simulationTotals.hourlyCrystal` | `2. Simulation!Y143` |
| `simulationTotals.hourlyDeut` | `2. Simulation!Y144` |
| `simulationTotals.hourlyPoints` | `2. Simulation!Y145` |
| `simulationTotals.hourlyUsm` | `2. Simulation!Y146` |
| `simulationTotals.dailyMetal` | `2. Simulation!Y148` |
| `simulationTotals.dailyCrystal` | `2. Simulation!Y149` |
| `simulationTotals.dailyDeut` | `2. Simulation!Y150` |
| `simulationTotals.dailyPoints` | `2. Simulation!Y151` |
| `simulationTotals.dailyUsm` | `2. Simulation!Y152` |

### 5.3 Métriques de synthèse

| Sortie API | Cellule Excel |
|---|---|
| `metrics.bonusMetalGlobal` | `4. Synthèse!E2` |
| `metrics.bonusCrystalGlobal` | `4. Synthèse!E3` |
| `metrics.bonusDeutGlobal` | `4. Synthèse!E4` |
| `metrics.dailyMetal` | `4. Synthèse!E20` |
| `metrics.dailyCrystal` | `4. Synthèse!E21` |
| `metrics.dailyDeut` | `4. Synthèse!E22` |
| `metrics.dailyPoints` | `4. Synthèse!E23` |
| `metrics.dailyUsm` | `4. Synthèse!E24` |
| `metrics.monthlyMetal` | `4. Synthèse!E26` |
| `metrics.monthlyCrystal` | `4. Synthèse!E27` |
| `metrics.monthlyDeut` | `4. Synthèse!E28` |
| `metrics.monthlyPoints` | `4. Synthèse!E29` |
| `metrics.monthlyUsm` | `4. Synthèse!E30` |
| `metrics.yearlyMetal` | `4. Synthèse!E32` |
| `metrics.yearlyCrystal` | `4. Synthèse!E33` |
| `metrics.yearlyDeut` | `4. Synthèse!E34` |
| `metrics.yearlyPoints` | `4. Synthèse!E35` |
| `metrics.yearlyUsm` | `4. Synthèse!E36` |

## 6. Résultats vérifiés sur l'état par défaut du classeur

Comparaison effectuée:
- état `defaultState.base`
- état `defaultState.simulation`
- recalcul via l'API serveur
- lecture des valeurs de référence embarquées dans `Simulateur.xlsx`

Résultat:
- bonus globaux Base: conforme
- bonus globaux Simulation: conforme
- totaux horaires Base: conformes
- totaux horaires Simulation: conformes
- totaux journaliers Base: conformes
- totaux journaliers Simulation: conformes
- métriques de synthèse journalières, mensuelles et annuelles: conformes

Valeurs de référence confirmées:

| Sortie | Valeur |
|---|---:|
| `baseBonuses.bonusMetalGlobal` | `0.07942` |
| `baseBonuses.bonusCrystalGlobal` | `0.05214` |
| `baseBonuses.bonusDeutGlobal` | `0.08646` |
| `simulationBonuses.bonusMetalGlobal` | `0.08664` |
| `simulationBonuses.bonusCrystalGlobal` | `0.05688` |
| `simulationBonuses.bonusDeutGlobal` | `0.09432` |
| `baseTotals.hourlyMetal` | `3000049.1737100766` |
| `baseTotals.hourlyCrystal` | `591132.453608837` |
| `baseTotals.hourlyDeut` | `1134106.3037804086` |
| `simulationTotals.hourlyMetal` | `2367493.7048812266` |
| `simulationTotals.hourlyCrystal` | `509212.0489766602` |
| `simulationTotals.hourlyDeut` | `1117788.7196254933` |
| `metrics.dailyMetal` | `-15181331.251892392` |
| `metrics.dailyCrystal` | `-1966089.711172243` |
| `metrics.dailyDeut` | `-391622.019717964` |
| `metrics.monthlyMetal` | `-470621268.80866414` |
| `metrics.yearlyMetal` | `-5541185906.940722` |

## 7. Anomalie restante dans le fichier Excel

Formule suspecte:
- `1. Base!E65:X65`
- `2. Simulation!E65:X65`

Formule observée:
- `IF($C$64="Inactif",0,IF(E15="Rocta",...`

Point problématique:
- la comparaison se fait sur `E15`
- la race est pourtant stockée en `E13`
- `E15` correspond à `Alerte Foreuse`

Conclusion:
- le code suit fidèlement cette formule source
- si le bonus Rocta collecteur paraît incohérent en jeu, l'erreur est probablement dans le classeur lui-même, pas dans le mapping applicatif

## 8. Fichiers modifiés pour alignement Excel

- [server/production-simulator.ts](/var/www/psykoverse/server/production-simulator.ts:349)
- [client/src/lib/productionSimulator.ts](/var/www/psykoverse/client/src/lib/productionSimulator.ts:99)
- [client/src/pages/outils-production.tsx](/var/www/psykoverse/client/src/pages/outils-production.tsx:228)

## 9. Vérification technique

Commande exécutée:

```bash
npx tsc --noEmit --incremental false
```

Résultat:
- compilation TypeScript valide
