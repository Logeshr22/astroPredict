export interface BirthData {
  birthDate: string
  birthTime: string
  birthPlace: string
  latitude: string
  longitude: string
  timezone: string
}

export interface BirthChart {
  sun: PlanetPosition
  moon: PlanetPosition
  mercury: PlanetPosition
  venus: PlanetPosition
  mars: PlanetPosition
  jupiter: PlanetPosition
  saturn: PlanetPosition
  ascendant: PlanetPosition
}

export interface PlanetPosition {
  sign: string
  degree: number
  house: number
}

export interface CompatibilityReport {
  id: string
  score: number
  emotionalScore: number
  communicationScore: number
  romanticScore: number
  longTermScore: number
  emotionalAnalysis: string
  communicationAnalysis: string
  romanticAnalysis: string
  longTermAnalysis: string
  challenges: string
  aiInterpretation: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  plan: 'free' | 'premium' | 'pro'
  checksThisMonth: number
  totalChecks: number
}