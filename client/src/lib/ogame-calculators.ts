import type { LevelScaledEntity } from "@/data/ogame-calculators";

export function getLevelCost(entity: LevelScaledEntity, level: number) {
  return {
    metal: Math.round(entity.baseCost.m * Math.pow(entity.factor, level - 1)),
    crystal: Math.round(entity.baseCost.c * Math.pow(entity.factor, level - 1)),
    deuterium: Math.round(entity.baseCost.d * Math.pow(entity.factor, level - 1)),
  };
}

export function getCumulativeCost(entity: LevelScaledEntity, level: number) {
  let metal = 0;
  let crystal = 0;
  let deuterium = 0;

  for (let currentLevel = 1; currentLevel <= level; currentLevel += 1) {
    const cost = getLevelCost(entity, currentLevel);
    metal += cost.metal;
    crystal += cost.crystal;
    deuterium += cost.deuterium;
  }

  return { metal, crystal, deuterium };
}
