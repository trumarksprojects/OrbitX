export type ViewState = 'dashboard' | 'factions' | 'economics' | 'roadmap' | 'tasks' | 'profile' | 'market' | 'events' | 'companions' | 'admin';

export interface UserStats {
  balance: number;
  miningPower: number;
  efficiency: number;
  energy: number;
  maxEnergy: number;
  reactorHeat: number;
  reactorStability: number;
  reputation: number;
  activityScore: number;
  streak: number;
  streakMultiplier: number;
  isStreakFrozen: boolean;
  rank: string;
  rankTier: number;
  username: string;
  avatar: string;
  xp: number;
  nextRankXp: number;
  activeDrones: number;
  lastCheckIn?: number;
  trustScore?: number;
  verified?: boolean;
  securityStatus?: 'green' | 'yellow' | 'red';
  isPrime?: boolean;
  primeTier?: 'basic' | 'elite' | 'mythic';
}

export interface Faction {
  id: string;
  name: string;
  members: number;
  totalMined: number;
  color: string;
  theme: string;
  bonus: string;
  desc: string;
}

export interface Squad {
  id: string;
  name: string;
  level: number;
  members: number;
  maxMembers: number;
  activeMembers: number;
  synergyMultiplier: number;
  vaultBalance: number;
}

export interface Task {
  id: string;
  title: string;
  reward: number;
  xpReward: number;
  energyCost?: number;
  completed: boolean;
  type: 'daily' | 'social' | 'global' | 'advanced' | 'emergency';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  expiresIn?: string;
}

export interface MarketItem {
  id: string;
  name: string;
  type: 'drone' | 'skin' | 'pass';
  price: number;
  rarity: 'common' | 'rare' | 'legendary';
  description: string;
}

export interface Companion {
  id: string;
  name: string;
  class: 'mining' | 'reactor' | 'exploration' | 'combat' | 'utility';
  type: 'drone' | 'synthetic' | 'core';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  level: number;
  energy: number;
  maxEnergy: number;
  passiveAbility: string;
  activeAbility: string;
  imageUrl?: string;
}

export interface LiveEvent {
  id: string;
  title: string;
  type: 'global' | 'emergency' | 'mythic' | 'faction';
  theme: 'quantum_storm' | 'solar_surge' | 'black_hole' | 'alien_signal' | 'crisis';
  description: string;
  expiresIn: string;
  participants: number;
  rewardPool: string;
  isActive: boolean;
}
