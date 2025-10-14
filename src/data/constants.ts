/**
 * Constants and mock data for the Ai.lonso Dashboard
 * Centralizes all static data and configuration
 */

import { TelemetryData, TeamStanding, FanActivity } from '@/types/dashboard';

// Color palette
export const COLORS = {
  primary: '#00C39A',
  secondary: '#00B0A9',
  accent: '#00E0FF',
  background: {
    dark: '#000000',
    darker: '#050505',
    card: '#0A0A0A',
  },
} as const;

// Mock telemetry data
export const TELEMETRY_DATA: TelemetryData[] = [
  { time: '0s', speed: 280, lapDelta: 0, tireWear: 10 },
  { time: '5s', speed: 295, lapDelta: -0.2, tireWear: 15 },
  { time: '10s', speed: 310, lapDelta: -0.5, tireWear: 22 },
  { time: '15s', speed: 305, lapDelta: -0.3, tireWear: 28 },
  { time: '20s', speed: 318, lapDelta: -0.7, tireWear: 35 },
  { time: '25s', speed: 300, lapDelta: -0.4, tireWear: 40 },
];

// Constructor standings
export const TEAM_STANDINGS: TeamStanding[] = [
  { position: 1, team: 'Red Bull Racing', points: 354 },
  { position: 2, team: 'Ferrari', points: 312 },
  { position: 3, team: 'McLaren', points: 287 },
  { position: 4, team: 'Mercedes', points: 201 },
  { position: 5, team: 'Aston Martin', points: 98, isHighlighted: true },
];

// Initial fan activities
export const INITIAL_FAN_ACTIVITIES: FanActivity[] = [
  { id: '1', name: 'Maria', points: 19, timestamp: Date.now() },
  { id: '2', name: 'Jaime Lopez', points: 25, timestamp: Date.now() },
  { id: '3', name: 'Emma', action: 'unlocked Speedster Tier', points: 0, timestamp: Date.now() },
];

// Random names for fan activity generation
export const FAN_NAMES = ['Alex', 'Sarah', 'Carlos', 'Hannah', 'Luis', 'Mia'];

// Trivia data
export const TRIVIA = {
  question: 'How many times has Fernando Alonso won the Monaco GP?',
  options: ['1 time', '2 times', 'Never won'],
  correctAnswer: '2 times',
};

// Monaco GP data
export const MONACO_GP = {
  date: 'May 25, 2025',
  temperature: { air: 24, track: 38 },
  currentLap: 47,
  totalLaps: 78,
  alonso: {
    position: 6,
    gap: '+12.3s',
    qualifyingPosition: 7,
    qualifyingTime: '1:11.432',
    number: 14,
    monacoWins: 2,
    monacoPoles: 1,
    monacoPodiums: 4,
  },
  stroll: {
    position: 11,
  },
};

